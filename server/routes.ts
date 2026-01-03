import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import MemoryStore from "memorystore";
import { insertUserSchema } from "@shared/schema";

const SessionStore = MemoryStore(session);

function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });
  next();
}

async function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session.userId) return res.status(401).json({ message: "Unauthorized" });
  const user = await storage.getUser(req.session.userId);
  if (user?.role !== "admin") return res.status(403).json({ message: "Forbidden" });
  next();
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new SessionStore({ checkPeriod: 86400000 }),
      resave: false,
      saveUninitialized: false,
      secret: "cyber-secret-key",
    })
  );

  app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await storage.getUserByUsername(username);
    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.userId = user.id;
    res.json(user);
  });

  // Public registration endpoint for participants
  app.post("/api/register", async (req, res) => {
    const parsed = insertUserSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);

    // Prevent duplicate usernames
    const existing = await storage.getUserByUsername(parsed.data.username);
    if (existing) return res.status(409).json({ message: "Username already exists" });

    // Force role to participant and default round access to false
    const toCreate = {
      ...parsed.data,
      role: "participant",
      round1Access: false,
      round2Access: false,
      round3Access: false,
    };

    const user = await storage.createUser(toCreate as any);

    // Do NOT log the user in automatically; admin must approve rounds
    res.status(201).json({
      id: user.id,
      username: user.username,
      teamName: user.teamName,
      teamId: user.teamId,
      message: "Registration successful. Await admin approval for round access.",
    });
  });

  // Helpful GET endpoint so visiting in a browser shows instructions
  app.get("/api/register", (_req, res) => {
    res.json({
      message: "This endpoint accepts POST requests to register participants.",
      example: {
        method: "POST",
        url: "/api/register",
        body: { username: "teamA", password: "pass123", teamName: "Team A", teamId: "A1" }
      },
      notes: "Use the client Register page at /register or POST with JSON to register."
    });
  });

  app.post("/api/logout", (req, res) => {
    req.session.destroy(() => res.sendStatus(200));
  });

  app.get("/api/me", requireAuth, async (req, res) => {
    const user = await storage.getUser(req.session.userId!);
    res.json(user);
  });

  // Admin: User Management
  app.get("/api/admin/users", requireAdmin, async (req, res) => {
    const users = await storage.listUsers();
    res.json(users);
  });

  app.post("/api/admin/users", requireAdmin, async (req, res) => {
    const parsed = insertUserSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const user = await storage.createUser(parsed.data);
    res.json(user);
  });

  app.patch("/api/admin/users/:id/access", requireAdmin, async (req, res) => {
    const { round, access } = req.body;
    const user = await storage.updateUserAccess(req.params.id, round, access);
    res.json(user);
  });

  // Anti-cheat - accepts single or batch reports
  app.post("/api/violations", requireAuth, async (req, res) => {
    const payload = req.body;

    const processEvent = async (event: any) => {
      const { type, details = {}, severity = "info" } = event;
      return storage.logViolation(req.session.userId!, type, details, severity);
    };

    if (Array.isArray(payload)) {
      const results = [];
      for (const e of payload) {
        results.push(await processEvent(e));
      }
      res.json(results);
      return;
    }

    const { type, details = {}, severity = "info" } = payload;
    const violation = await storage.logViolation(req.session.userId!, type, details, severity);
    res.json(violation);
  });

  // Export violations as CSV (admin only). Optional query params: type, severity, since, until
  app.get("/api/admin/violations/export", requireAdmin, async (req, res) => {
    const { type, severity, since, until } = req.query as Record<string, string | undefined>;
    let violations = await storage.getViolations();

    // parse details if needed and filter
    violations = violations.map((v: any) => ({
      ...v,
      details: typeof v.details === 'string' ? JSON.parse(v.details || "{}") : (v.details || {}),
    }));

    if (type) violations = violations.filter((v: any) => v.type === type);
    if (severity) violations = violations.filter((v: any) => v.severity === severity);
    if (since) violations = violations.filter((v: any) => new Date(v.timestamp) >= new Date(since));
    if (until) violations = violations.filter((v: any) => new Date(v.timestamp) <= new Date(until));

    // Build CSV
    const rows = ["id,userId,username,teamName,type,severity,timestamp,details"]; 
    for (const v of violations) {
      const detailStr = JSON.stringify(v.details).replace(/"/g, '""');
      rows.push(`${v.id},${v.userId},${v.username || ''},${v.teamName || ''},${v.type},${v.severity || 'info'},${v.timestamp},"${detailStr}"`);
    }

    const csv = rows.join("\n");
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="violations.csv"');
    res.send(csv);
  });

  app.get("/api/admin/violations", requireAdmin, async (req, res) => {
    const violations = await storage.getViolations();
    res.json(violations);
  });

  // Server Sent Events stream for real-time violations (admin only)
  app.get("/api/admin/violations/stream", requireAdmin, async (req, res) => {
    // set headers for SSE
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders?.();

    const onViolation = (violation: any) => {
      // send event named "violation" with JSON payload
      res.write(`event: violation\n`);
      res.write(`data: ${JSON.stringify(violation)}\n\n`);
    };

    // subscribe
    storage.violationEmitter.on("violation", onViolation);

    // cleanup on client disconnect
    req.on("close", () => {
      storage.violationEmitter.off("violation", onViolation);
    });
  });

  // Admin helper: simulate a violation for testing (admin only)
  app.post("/api/admin/violations/simulate", requireAdmin, async (req, res) => {
    const { userId, type, details } = req.body;
    if (!userId || !type) return res.status(400).json({ message: "userId and type required" });

    try {
      const violation = await storage.logViolation(userId, type, details || {});
      res.json(violation);
    } catch (e: any) {
      res.status(500).json({ message: e.message || "Failed to simulate violation" });
    }
  });

  return httpServer;
}

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

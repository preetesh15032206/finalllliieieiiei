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

  // Anti-cheat
  app.post("/api/violations", requireAuth, async (req, res) => {
    const { type } = req.body;
    const violation = await storage.logViolation(req.session.userId!, type);
    res.json(violation);
  });

  app.get("/api/admin/violations", requireAdmin, async (req, res) => {
    const violations = await storage.getViolations();
    res.json(violations);
  });

  return httpServer;
}

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

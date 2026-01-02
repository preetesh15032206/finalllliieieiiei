import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import session from "express-session";
import MemoryStore from "memorystore";
import { insertUserSchema } from "@shared/schema";

const SessionStore = MemoryStore(session);

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new SessionStore({
        checkPeriod: 86400000,
      }),
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
    req.session.destroy(() => {
      res.sendStatus(200);
    });
  });

  app.get("/api/me", async (req, res) => {
    if (!req.session.userId) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    const user = await storage.getUser(req.session.userId);
    res.json(user);
  });

  // Admin routes
  app.get("/api/admin/users", async (req, res) => {
    const user = await storage.getUser(req.session.userId!);
    if (user?.role !== "admin") return res.sendStatus(403);
    const users = await storage.listUsers();
    res.json(users);
  });

  app.post("/api/admin/users", async (req, res) => {
    const user = await storage.getUser(req.session.userId!);
    if (user?.role !== "admin") return res.sendStatus(403);
    const parsed = insertUserSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const newUser = await storage.createUser(parsed.data);
    res.json(newUser);
  });

  app.patch("/api/admin/users/:id/access", async (req, res) => {
    const user = await storage.getUser(req.session.userId!);
    if (user?.role !== "admin") return res.sendStatus(403);
    const { round, status } = req.body;
    const updatedUser = await storage.updateUserAccess(req.params.id, round, status);
    res.json(updatedUser);
  });

  app.post("/api/admin/change-password", async (req, res) => {
    if (!req.session.userId) return res.sendStatus(401);
    const user = await storage.getUser(req.session.userId);
    if (user?.role !== "admin") return res.sendStatus(403);
    
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters" });
    }
    
    const updatedUser = await storage.updatePassword(req.session.userId, newPassword);
    res.json({ message: "Password updated successfully" });
  });

  app.delete("/api/admin/users/:id", async (req, res) => {
    const user = await storage.getUser(req.session.userId!);
    if (user?.role !== "admin") return res.sendStatus(403);
    await storage.deleteUser(req.params.id);
    res.sendStatus(200);
  });

  return httpServer;
}

declare module "express-session" {
  interface SessionData {
    userId: string;
  }
}

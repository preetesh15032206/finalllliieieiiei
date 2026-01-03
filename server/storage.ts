import { type User, type InsertUser, type Violation } from "@shared/schema";
import { randomUUID } from "crypto";

import EventEmitter from "events";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserAccess(id: string, round: "round1" | "round2" | "round3", access: boolean): Promise<User>;
  listUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;
  // details is an optional object with additional context about the violation
  logViolation(userId: string, type: string, details?: Record<string, any>, severity?: string): Promise<Violation>;
  getViolations(): Promise<Violation[]>;
  // EventEmitter to broadcast new violations in real-time
  violationEmitter: EventEmitter;
}


export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private violations: Array<Violation & { details?: Record<string, any>; username?: string | null; teamName?: string | null }>;
  public violationEmitter: EventEmitter;

  constructor() {
    this.users = new Map();
    this.violations = [];
    this.violationEmitter = new EventEmitter();
    
    // Default Admin
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      password: "admin_password",
      role: "admin",
      teamName: "Organizer",
      teamId: "ADMIN",
      round1Access: true,
      round2Access: true,
      round3Access: true,
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role ?? "participant",
      teamName: insertUser.teamName ?? null,
      teamId: insertUser.teamId ?? null,
      round1Access: insertUser.round1Access ?? false,
      round2Access: insertUser.round2Access ?? false,
      round3Access: insertUser.round3Access ?? false,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserAccess(id: string, round: "round1" | "round2" | "round3", access: boolean): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    const updatedUser = { ...user, [`${round}Access`]: access };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async deleteUser(id: string): Promise<void> {
    this.users.delete(id);
  }

  async logViolation(userId: string, type: string, details: Record<string, any> = {}, severity = "info"): Promise<Violation & { details?: Record<string, any>; severity?: string; username?: string | null; teamName?: string | null }> {
    const timestamp = new Date().toISOString();
    const id = randomUUID();

    const user = await this.getUser(userId);

    const violation = {
      id,
      userId,
      type,
      timestamp,
      severity,
      details,
      username: user?.username ?? null,
      teamName: user?.teamName ?? null,
    } as Violation & { details?: Record<string, any>; severity?: string; username?: string | null; teamName?: string | null };

    this.violations.push(violation as any);

    // Emit for real-time listeners
    this.violationEmitter.emit("violation", violation);

    return violation;
  }

  async getViolations(): Promise<Violation[]> {
    // Return violations without exposing internal objects directly; map to Violation shape (details as JSON string for DB compatibility)
    return this.violations.map((v) => ({
      id: v.id,
      userId: v.userId,
      type: v.type,
      timestamp: v.timestamp,
      severity: v.severity ?? "info",
      // If details is an object, stringify for compatibility with shared schema (DB expects JSON string in `details`)
      details: JSON.stringify(v.details || {}),
      // keep user metadata when returning so admin UI and exports can include it
      username: v.username ?? null,
      teamName: v.teamName ?? null,
    })) as Violation[];
  }
}

export const storage = new MemStorage();

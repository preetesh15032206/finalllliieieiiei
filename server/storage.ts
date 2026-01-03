import { type User, type InsertUser, type Violation } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserAccess(id: string, round: "round1" | "round2" | "round3", access: boolean): Promise<User>;
  listUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;
  logViolation(userId: string, type: string): Promise<Violation>;
  getViolations(): Promise<Violation[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private violations: Violation[];

  constructor() {
    this.users = new Map();
    this.violations = [];
    
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

  async logViolation(userId: string, type: string): Promise<Violation> {
    const violation: Violation = {
      id: randomUUID(),
      userId,
      type,
      timestamp: new Date().toISOString()
    };
    this.violations.push(violation);
    return violation;
  }

  async getViolations(): Promise<Violation[]> {
    return this.violations;
  }
}

export const storage = new MemStorage();

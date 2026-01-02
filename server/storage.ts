import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserAccess(id: string, round: "round1" | "round2" | "round3", status: string): Promise<User>;
  listUsers(): Promise<User[]>;
  deleteUser(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;

  constructor() {
    this.users = new Map();
    // Initialize admin
    const adminId = randomUUID();
    this.users.set(adminId, {
      id: adminId,
      username: "admin",
      password: "admin_password", // In production, use hashing
      role: "admin",
      teamName: "Organizer",
      teamId: "ADMIN",
      round1Access: "active",
      round2Access: "active",
      round3Access: "active",
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role ?? "participant",
      teamName: insertUser.teamName ?? null,
      teamId: insertUser.teamId ?? null,
      round1Access: insertUser.round1Access ?? "locked",
      round2Access: insertUser.round2Access ?? "locked",
      round3Access: insertUser.round3Access ?? "locked",
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserAccess(id: string, round: "round1" | "round2" | "round3", status: string): Promise<User> {
    const user = this.users.get(id);
    if (!user) throw new Error("User not found");
    const updatedUser = { ...user, [`${round}Access`]: status };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async listUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async deleteUser(id: string): Promise<void> {
    this.users.delete(id);
  }
}

export const storage = new MemStorage();

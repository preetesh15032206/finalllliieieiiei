import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("participant"), // "admin" or "participant"
  teamName: text("team_name"),
  teamId: text("team_id"),
  round1Access: text("round1_access").notNull().default("locked"), // "locked", "active", "disqualified"
  round2Access: text("round2_access").notNull().default("locked"),
  round3Access: text("round3_access").notNull().default("locked"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
}).extend({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

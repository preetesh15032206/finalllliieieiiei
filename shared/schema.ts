import { pgTable, text, varchar, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("participant"), // "admin" or "participant"
  teamName: text("team_name"),
  teamId: text("team_id"),
  round1Access: boolean("round1_access").notNull().default(false),
  round2Access: boolean("round2_access").notNull().default(false),
  round3Access: boolean("round3_access").notNull().default(false),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
}).extend({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const violations = pgTable("violations", {
  id: varchar("id").primaryKey(),
  userId: varchar("user_id").notNull(),
  type: text("type").notNull(), // "tab_switch", "screenshot", "right_click"
  timestamp: text("timestamp").notNull(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Violation = typeof violations.$inferSelect;

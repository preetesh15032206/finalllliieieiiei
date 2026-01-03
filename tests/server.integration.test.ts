import express from "express";
import { createServer } from "http";
import request from "supertest";
import { describe, it, expect, beforeAll } from "vitest";
import { registerRoutes } from "../server/routes";

let app: express.Express;

beforeAll(async () => {
  app = express();
  const httpServer = createServer(app);
  await registerRoutes(httpServer, app);
});

describe("Server integration", () => {
  it("registers a participant, allows admin to approve, and records violations and export", async () => {
    // Register a new participant
    const reg = await request(app)
      .post("/api/register")
      .send({ username: "team_integ", password: "pass123", teamName: "Team Integration", teamId: "TI" })
      .expect(201);

    expect(reg.body).toHaveProperty("id");
    const userId = reg.body.id as string;

    // Login as admin
    const adminAgent = request.agent(app);
    await adminAgent.post("/api/login").send({ username: "admin", password: "admin_password" }).expect(200);

    // Approve round1 for the user
    const patch = await adminAgent.patch(`/api/admin/users/${userId}/access`).send({ round: "round1", access: true }).expect(200);
    expect(patch.body.round1Access).toBe(true);

    // Login as participant
    const partAgent = request.agent(app);
    await partAgent.post("/api/login").send({ username: "team_integ", password: "pass123" }).expect(200);

    // Post a single violation
    const vio = await partAgent.post("/api/violations").send({ type: "copy", details: { length: 12 } }).expect(200);
    expect(vio.body).toHaveProperty("id");
    expect(vio.body.type).toBe("copy");

    // Post a batch of violations
    const batch = await partAgent.post("/api/violations").send([{ type: "paste", details: { length: 40 } }, { type: "tab_switch" }]).expect(200);
    expect(Array.isArray(batch.body)).toBe(true);

    // Admin fetches violations
    const list = await adminAgent.get("/api/admin/violations").expect(200);
    expect(Array.isArray(list.body)).toBe(true);
    const found = list.body.find((v: any) => v.type === "copy");
    expect(found).toBeDefined();

    // Export CSV
    const csv = await adminAgent.get("/api/admin/violations/export").expect(200);
    expect(csv.header["content-type"]).toContain("text/csv");
    expect(csv.text).toContain("copy");
  });
});

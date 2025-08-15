import { Express } from "express";
import { createServer } from "http";

export function registerRoutes(app: Express) {
  app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Simple server running" });
  });

  return createServer(app);
}
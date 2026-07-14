import "dotenv/config";
import express from "express";
import cors from "cors";
import chatHandler from "./api/chat.js";

const app = express();
const PORT = process.env.PORT || 3001;

// ─── Middleware ─────────────────────────────────────
app.use(cors({ origin: process.env.CORS_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "1mb" }));

// ─── Routes ─────────────────────────────────────────
app.post("/api/chat", chatHandler);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// ─── Start ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n  ✦ Infera AI Backend running on http://localhost:${PORT}`);
  console.log(`  ✦ Chat endpoint: POST http://localhost:${PORT}/api/chat\n`);
});

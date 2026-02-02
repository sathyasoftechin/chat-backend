const express = require("express");
const cors = require("cors");

const app = express();

/**
 * ✅ DEV-SAFE CORS (ngrok + localhost guaranteed)
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin || "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Credentials", "true");

  // 🔥 IMMEDIATELY END PREFLIGHT
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// ✅ Body parser
app.use(express.json());

/**
 * Health check
 */
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

/**
 * Routes
 */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/password", require("./routes/password.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

module.exports = app;

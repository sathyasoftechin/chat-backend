const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

/**
 * ✅ HEALTH CHECK (MUST BE FIRST)
 */
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

/**
 * ✅ API ROUTES
 */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/password", require("./routes/password.routes"));
app.use("/api/dashboard", require("./routes/dashboard.routes"));

module.exports = app;

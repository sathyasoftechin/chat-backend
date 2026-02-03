const express = require("express");
const cors = require("cors");

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

/* ================= BODY PARSER ================= */
app.use(express.json());

/* ================= ROUTES ================= */
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/chats", require("./routes/chat.routes"));

/* ================= HEALTH ================= */
app.get("/health", (req, res) => {
  res.json({ status: "UP" });
});

module.exports = app;

const { User } = require("../models");
const authService = require("../services/auth.service");

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log("LOGIN PAYLOAD:", username, password);
    if (!username || !password) {
      return res.status(400).json({ message: "Missing credentials" });
    }
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    const token = await authService.authenticate(user, password);
    if (!token) {
      return res.status(401).json({ message: "Authentication failed" });
    }
    return res.json({
      token,
      passwordChanged: user.passwordChanged,
      message: "Login successful"
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
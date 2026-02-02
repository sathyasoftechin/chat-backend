const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const passwordController = require("../controllers/password.controller");

router.post("/change", authMiddleware, passwordController.changePassword);

module.exports = router;

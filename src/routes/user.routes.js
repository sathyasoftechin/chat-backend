const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const userController = require("../controllers/user.controller");

// 🔐 PROTECTED
router.get("/", auth, userController.getUsers);

module.exports = router;

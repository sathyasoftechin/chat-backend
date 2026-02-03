const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth.middleware");
const chatController = require("../controllers/chat.controller");

// 🔐 Protect all chat routes
router.use(auth);

router.get("/", chatController.getMyChats);
router.post("/dm", chatController.createDM);
router.get("/:id/messages", chatController.getMessages);
router.post("/:id/message", chatController.sendMessage);

module.exports = router;

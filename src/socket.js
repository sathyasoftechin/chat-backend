const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const { secret } = require("./config/jwt");
const { Message } = require("./models");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // dev-safe
    },
  });

  /**
   * 🔐 JWT AUTH FOR SOCKET
   */
  io.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token;
      const decoded = jwt.verify(token, secret);
      socket.user = decoded;
      next();
    } catch {
      next(new Error("Unauthorized"));
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 User connected:", socket.user.username);

    /**
     * Join a conversation room
     */
    socket.on("join-chat", (conversationId) => {
      socket.join(`chat_${conversationId}`);
    });

    /**
     * Send message
     */
    socket.on("send-message", async ({ conversationId, content }) => {
      const message = await Message.create({
        conversationId,
        senderId: socket.user.id,
        content,
      });

      io.to(`chat_${conversationId}`).emit("new-message", {
        id: message.id,
        content,
        senderId: socket.user.id,
        createdAt: message.createdAt,
      });
    });

    socket.on("disconnect", () => {
      console.log("🔴 User disconnected:", socket.user.username);
    });
  });
};

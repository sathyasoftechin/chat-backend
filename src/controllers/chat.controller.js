const { Conversation, User, Message, Sequelize } = require("../models");
const { Op } = require("sequelize");

/**
 * GET /api/chats
 * Get chats for logged-in user
 */
exports.getMyChats = async (req, res) => {
  try {
    const userId = req.user.id;

    const chats = await Conversation.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "role"],
          where: { id: userId },
        },
      ],
      order: [["updatedAt", "DESC"]],
    });

    res.json(chats);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch chats" });
  }
};

/**
 * POST /api/chats/dm
 * Get or create DM
 */
exports.createDM = async (req, res) => {
  try {
    const myId = req.user.id;
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID required" });
    }

    // 🔍 Check if DM already exists
    const existingDM = await Conversation.findOne({
      where: { type: "DM" },
      include: [
        {
          model: User,
          where: { id: { [Op.in]: [myId, userId] } },
        },
      ],
      group: ["Conversation.id"],
      having: Sequelize.literal("COUNT(Users.id) = 2"),
    });

    if (existingDM) {
      return res.json(existingDM);
    }

    // ➕ Create new DM
    const conversation = await Conversation.create({ type: "DM" });
    await conversation.addUsers([myId, userId]);

    res.status(201).json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create DM" });
  }
};

/**
 * POST /api/chats/group
 */
exports.createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const creatorId = req.user.id;

    if (!name || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ message: "Invalid group data" });
    }

    const conversation = await Conversation.create({
      type: "GROUP",
      name,
    });

    await conversation.addUsers([creatorId, ...members]);

    res.status(201).json(conversation);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create group" });
  }
};

/**
 * GET /api/chats/:id/messages
 */
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({
      where: { conversationId: req.params.id },
      include: {
        model: User,
        attributes: ["id", "name"],
      },
      order: [["createdAt", "ASC"]],
    });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

/**
 * POST /api/chats/:id/message
 */
exports.sendMessage = async (req, res) => {
  try {
    const message = await Message.create({
      conversationId: req.params.id,
      senderId: req.user.id,
      content: req.body.content,
    });

    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ message: "Failed to send message" });
  }
};

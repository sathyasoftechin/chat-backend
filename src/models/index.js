const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    logging: false,
  }
);

/**
 * MODELS
 */
const User = require("./user.model")(sequelize, DataTypes);
const Conversation = require("./conversation.model")(sequelize, DataTypes);
const ConversationMember = require("./conversationMember.model")(sequelize, DataTypes);
const Message = require("./message.model")(sequelize, DataTypes);

/**
 * ASSOCIATIONS
 */

// Users ↔ Conversations (Many-to-Many)
Conversation.belongsToMany(User, {
  through: ConversationMember,
  foreignKey: "conversationId",
});

User.belongsToMany(Conversation, {
  through: ConversationMember,
  foreignKey: "userId",
});

// Conversation → Messages
Conversation.hasMany(Message, { foreignKey: "conversationId" });
Message.belongsTo(Conversation, { foreignKey: "conversationId" });

// Message → Sender
Message.belongsTo(User, { foreignKey: "senderId" });
User.hasMany(Message, { foreignKey: "senderId" });

module.exports = {
  sequelize,
  Sequelize,
  User,
  Conversation,
  ConversationMember,
  Message,
};

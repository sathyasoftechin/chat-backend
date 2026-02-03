module.exports = (sequelize, DataTypes) => {
  const ConversationMember = sequelize.define("ConversationMember", {
    role: {
      type: DataTypes.ENUM("ADMIN", "MEMBER"),
      defaultValue: "MEMBER",
    },
  });

  return ConversationMember;
};

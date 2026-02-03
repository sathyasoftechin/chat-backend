module.exports = (sequelize, DataTypes) => {
  const Conversation = sequelize.define("Conversation", {
    type: {
      type: DataTypes.ENUM("DM", "GROUP"),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true, // null for DM
    },
  });

  return Conversation;
};

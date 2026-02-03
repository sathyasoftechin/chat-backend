const { User } = require("../models");
const { Op } = require("sequelize");

/**
 * GET /api/users
 */
exports.getUsers = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    if (!req.user || !req.user.username) {
      return res.status(401).json({ message: "Unauthorized user" });
    }

    const currentUser = await User.findOne({
      where: { username: req.user.username },
    });

    if (!currentUser) {
      console.error("User not found in DB:", req.user.username);
      return res.status(404).json({ message: "User not found" });
    }

    const users = await User.findAll({
      where: {
        id: { [Op.ne]: currentUser.id },
      },
      attributes: ["id", "username", "role"],
      order: [["username", "ASC"]],
    });

    console.log("USERS RETURNED:", users.length);

    return res.json(users);
  } catch (error) {
    console.error("GET USERS CRASHED:", error);
    return res.status(500).json({ message: "Failed to fetch users" });
  }
};

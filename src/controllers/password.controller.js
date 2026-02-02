const bcrypt = require("bcrypt");
const { User } = require("../models");

exports.changePassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    const username = req.user.username;

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
      {
        password: hashedPassword,
        passwordChanged: true
      },
      { where: { username } }
    );

    res.json({ message: "Password updated successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error updating password" });
  }
};

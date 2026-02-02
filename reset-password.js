const bcrypt = require("bcrypt");
const { sequelize, User } = require("./src/models");

(async () => {
  await sequelize.authenticate();

  const hash = await bcrypt.hash("mads@123", 10);

  await User.update(
    {
      password: hash,
      passwordChanged: false
    },
    { where: { username: "maddy@ssti.com" } }
  );

  console.log("✅ Password reset to mads@123");
  process.exit(0);
})();

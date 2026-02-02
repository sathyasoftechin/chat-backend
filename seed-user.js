const bcrypt = require("bcrypt");
const { sequelize, User } = require("./src/models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    const hashedPassword = await bcrypt.hash("mads@123", 10);

    await User.upsert({
      username: "maddy@ssti.com",
      password: hashedPassword,
      passwordChanged: false,
      role: "EMPLOYEE"
    });

    console.log("✅ User ensured with fresh password");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding failed:", error.message);
    process.exit(1);
  }
})();

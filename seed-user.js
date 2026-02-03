const bcrypt = require("bcrypt");
const { sequelize, User } = require("./src/models");

(async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ DB connected");

    const DEFAULT_PASSWORD = "Temp@123";
    const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

    const employees = [
      {
        username: "madan@ssti.com",
        role: "EMPLOYEE",
      },
      {
        username: "rahul@ssti.com",
        role: "EMPLOYEE",
      },
      {
        username: "mani@ssti.com",
        role: "Manager",
      },
      {
        username: "Krishna@ssti.com",
        role: "EMPLOYEE",
      },
      {
        username: "Nikhil@ssti.com",
        role: "EMPLOYEE",
      },
    ];

    for (const emp of employees) {
      await User.upsert({
        username: emp.username,
        password: hashedPassword,
        passwordChanged: false,
        role: emp.role,
      });

      console.log(`✅ Ensured user: ${emp.username}`);
    }

    console.log("🎉 Employee seeding completed");
    process.exit(0);

  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
})();

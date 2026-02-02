const bcrypt = require("bcrypt");

(async () => {
  const password = "Temp@123"; // default password to give employee
  const hash = await bcrypt.hash(password, 10);
  console.log("Hashed password:\n", hash);
})();

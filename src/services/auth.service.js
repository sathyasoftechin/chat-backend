const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwt");

exports.authenticate = async (user, password) => {
  const match = await bcrypt.compare(password, user.password);

  console.log("BCRYPT MATCH RESULT:", match);
  console.log("JWT SECRET LOADED:", !!secret);

  if (!match) {
    return null;
  }

  if (!secret) {
    return null;
  }

 return jwt.sign(
  {
    id: user.id,           
    username: user.username,
    role: user.role
  },
  secret,
  { expiresIn }
);
};

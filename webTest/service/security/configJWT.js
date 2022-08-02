const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./src/.env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const generateToken = (user) => {
  const payload = {
    email: user.email,
    password: user.password,
  };
  const options = {
    expiresIn: "1h",
  };
  return jwt.sign(payload, PRIVATE_KEY, options);
};

module.exports = { generateToken };

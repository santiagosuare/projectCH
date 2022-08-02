const jwt = require("jsonwebtoken");
const logger = require("../../logs/logs");
require("dotenv").config({ path: "./src/.env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

function auth(req, res, next) {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    logger.warn("No token provided");
    return res.status(401).json({ status: 401, message: "No token provided" });
  }

  jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
}

module.exports = { auth };

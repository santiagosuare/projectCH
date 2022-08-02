const express = require("express");
const loginRouter = express.Router();

const {
  readUserByNameAndPassword,
} = require("../controllers/login.controller.js");

loginRouter.get("/", readUserByNameAndPassword);

module.exports = loginRouter;

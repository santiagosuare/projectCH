const express = require("express");
const userRouter = express.Router();
const {
  readAllUsers,
  readUserById,
  createUser,
} = require("../controllers/user.controller");

userRouter.get("/", readAllUsers);
userRouter.post("/", createUser);

module.exports = userRouter;

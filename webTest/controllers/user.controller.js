const Daos = require("../daos/mongo/mainMongo.daos");
const User = new Daos.userDaos();
const logger = require("../logs/logs");

module.exports = {
  //READ USER
  readAllUsers: async (req, res) => {
    try {
      const users = await User.getAll();
      res.status(200).send({
        status: 200,
        message: "Success read all users",
        users: users,
      });
      logger.info(`Success read all users ${users}`);
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error reading all users",
        data: error,
      });
      logger.error(`Error reading all users ${error}`);
    }
  },

  //READ USER BY ID
  readUserById: async (req, res) => {
    try {
      const user = await User.getById(req.params.id);
      res.status(200).send({
        status: 200,
        message: "Success read user by id",
        user: user,
      });
      logger.info(`Success read user by id ${user}`);
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error reading user by id",
        data: error,
      });
      logger.error(`Error reading user by id ${error}`);
    }
  },
  //CREATE USER
  createUser: async (req, res) => {
    try {
      const user = await User.save(req.body);
      res.status(200).send({
        status: 200,
        message: "Success create user",
        user: { user },
      });
      logger.info(`Success create user ${user}`);
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error create users ",
        data: error,
      });
      logger.error(`Error create users ${error}`);
    }
  },
};

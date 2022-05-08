/// IMPORT FROM MONGO ///
const mongoose = require("mongoose");
const connectMongoDb = require("./config/mongo.js");
const schemaMessages = require("../models/schemaMessages.js");

class Messages {
  async connectDb() {
    return await connectMongoDb();
  }

  async getAll() {
    try {
      await this.connectDb();
      const messages = await schemaMessages.find();
      mongoose.disconnect();
      return messages;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async createMessages(message) {
    try {
      await this.connectDb();
      console.log("connected");
      console.log(message);
      const messageModel = await schemaMessages.create({
        ...message,
      });
      mongoose.disconnect();
      return messageModel;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Messages;

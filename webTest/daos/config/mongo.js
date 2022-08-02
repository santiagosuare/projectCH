const connect = require("mongoose").connect;
const logger = require("../../logs/logs");
require("dotenv").config({ path: "./.env" });

const url = process.env.NODE_URL_MONGO_DB;

async function connectMongoDb() {
  try {
    const client = await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("MongoDB connected ", client.connection.name);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectMongoDb;

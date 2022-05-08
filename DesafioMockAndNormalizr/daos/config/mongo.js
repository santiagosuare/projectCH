const connect = require("mongoose").connect;

const url =
  "mongodb+srv://ssuarez:Aa123456@cluster0.q9i2x.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function connectMongoDb() {
  try {
    const client = await connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected ", client.connection.name);
  } catch (error) {
    console.log(error);
  }
}

module.exports = connectMongoDb;

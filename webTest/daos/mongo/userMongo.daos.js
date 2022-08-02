const mongoose = require("mongoose");
const connectMongoDb = require("../config/mongo");
const schemaUser = require("../../models/schemaUser");

class User {
  async connectDb() {
    return await connectMongoDb();
  }

  async getAll() {
    try {
      await this.connectDb();
      const users = await schemaUser.find();
      mongoose.disconnect();
      return users;
    } catch (error) {
      console.log("Error en conexion a la base de datos");
      throw Error(error.message);
    }
  }

  async getByNameAndPassword(email, password) {
    try {
      await this.connectDb();
      const user = await schemaUser.findOne({ email, password });
      mongoose.disconnect();
      return user;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async getById(id) {
    try {
      await this.connectDb();
      const user = await schemaUser.findById(id);
      mongoose.disconnect();
      return user;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async save(user) {
    try {
      await this.connectDb();
      if (!user || typeof user !== "object") {
        throw Error("No se a agregado un usuario");
      }
      if (Object.keys(user).length === 0) {
        throw Error("No se a agregado un usuario");
      }
      console.log("Conecte");
      const userModel = await schemaUser.create({
        ...user,
        timestamp: Date.now(),
      });
      mongoose.disconnect();
      return userModel;
    } catch (error) {
      throw Error("No se conecto");
    }
  }
}

module.exports = User;

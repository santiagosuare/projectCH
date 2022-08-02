const mongoose = require("mongoose");
const connectMongoDb = require("../config/mongo.js");
const schemaProduct = require("../../models/schemaProducts.js");

class Product {
  async connectDb() {
    return await connectMongoDb();
  }

  async getAll() {
    try {
      await this.connectDb();
      const products = await schemaProduct.find();
      mongoose.disconnect();
      return products;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async save(product) {
    try {
      await this.connectDb();
      if (!product || typeof product !== "object") {
        throw Error("No se a agregado un producto");
      }
      if (Object.keys(product).length === 0) {
        throw Error("No se a agregado un producto");
      }
      console.log("Conecte");
      const productModel = await schemaProduct.create({
        ...product,
        timestamp: Date.now(),
      });
      mongoose.disconnect();
      return productModel;
    } catch (error) {
      throw Error("No se conecto");
    }
  }

  async getById(id) {
    try {
      if (!id || typeof id !== "string") {
        throw Error("Mal formato del id");
      }
      await this.connectDb();
      const product = await schemaProduct.findById(id);
      mongoose.disconnect();
      return product;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async updateById(id, product) {
    try {
      if (!id || typeof id !== "string") {
        throw Error("Mal formato del id");
      }
      if (!product || typeof product !== "object") {
        throw Error("No se a agregado un producto");
      }
      if (Object.keys(product).length === 0) {
        throw Error("No se a agregado un producto");
      }
      await this.connectDb();
      const productModel = await schemaProduct.findByIdAndUpdate(id, product);
      mongoose.disconnect();
      return productModel;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteById(id) {
    try {
      if (!id || typeof id !== "string") {
        throw Error("Mal formato del id");
      }
      await this.connectDb();
      const productModel = await schemaProduct.findByIdAndDelete(id);
      mongoose.disconnect();
      return productModel;
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Product;

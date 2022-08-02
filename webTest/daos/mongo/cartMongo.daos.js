const mongoose = require("mongoose");
const connectMongoDb = require("../config/mongo.js");
const schemaCarts = require("../../models/schemaCarts.js");
const schemaProducts = require("../../models/schemaProducts.js");

class Cart {
  async connectDb() {
    return await connectMongoDb();
  }

  async createCart() {
    try {
      await this.connectDb();
      const cart = await schemaCarts.create({
        products: [],
        timestamp: Date.now(),
      });
      mongoose.disconnect();
      return cart;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async addProductToCart(idCart, idProduct) {
    try {
      await this.connectDb();
      const idExist = await schemaCarts.findById(idCart);
      if (!idExist) {
        throw Error("No se a elegido un carrito");
      }
      const idExistproduct = await schemaProducts.findById(idProduct);
      if (!idExistproduct) {
        throw Error("No se a agregado un producto");
      }
      if (idExist && idExistproduct) {
        await schemaCarts.updateOne(
          { _id: idCart },
          { $push: { products: idProduct } }
        );
        return;
      }
      mongoose.disconnect();
    } catch (error) {
      throw Error(error.message + "Aca ");
    }
  }

  async getCartById(id) {
    try {
      await this.connectDb();
      const cart = await schemaCarts.findById(id);
      mongoose.disconnect();
      return cart;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteCartById(id) {
    try {
      await this.connectDb();
      const cart = await schemaCarts.findById(id);
      if (!cart) {
        throw Error("No se a elegido un carrito");
      }
      await schemaCarts.findByIdAndRemove({ _id: id });
      mongoose.disconnect();
      return;
    } catch (error) {
      throw Error(error.message);
    }
  }

  async deleteProductFromCart(idCart, idProduct) {
    try {
      await this.connectDb();
      const cart = await schemaCarts.findById(idCart);
      if (!cart) {
        throw Error("No se a elegido un carrito");
      }
      if (cart) {
        console.log(cart);
        cart.products.pull(idProduct);
        await cart.save();
        mongoose.disconnect();
        return;
      }
    } catch (error) {
      throw Error(error.message);
    }
  }
}

module.exports = Cart;

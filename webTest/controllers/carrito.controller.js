// Mongo
const Daos = require("../daos/mongo/mainMongo.daos");
const Cart = new Daos.cartDaos();

module.exports = {
  //CREATE CART
  createCart: async (req, res) => {
    try {
      const cart = await Cart.createCart();
      res.status(201).send({
        status: 201,
        message: "Carrito creado correctamente",
        carrito: { cart },
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error interno del servidor" + error,
      });
    }
  },
  //ADD PRODUCT TO CART
  addProductToCart: async (req, res) => {
    try {
      if (!req.body.id) {
        throw Error("No se a agregado un producto");
      }
      if (!req.params.id) {
        throw Error("No se a elegido un carrito");
      }
      const idCart = req.params.id;
      const idProduct = req.body.id;
      console.log(idCart, idProduct);
      const cart = await Cart.addProductToCart(idCart, idProduct);
      res.status(200).send({
        status: 200,
        message: "Producto agregado correctamente",
        carrito: { cart },
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error interno del servidor " + error,
      });
    }
  },
  //READ CART BY ID
  readCartById: async (req, res) => {
    try {
      const cart = await Cart.getCartById(req.params.id);
      if (cart) {
        res.status(200).send({
          status: 200,
          message: "Carrito encontrado",
          carrito: { cart },
        });
      } else {
        res.status(404).send({
          status: 404,
          message: "Carrito no encontrado",
        });
      }
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error interno del servidor" + error,
      });
    }
  },
  //DELETE CART BY ID
  deleteCartById: async (req, res) => {
    try {
      await Cart.deleteCartById(req.params.id);
      res.status(200).send({
        status: 200,
        message: "Carrito eliminado correctamente",
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error interno del servidor" + error,
      });
    }
  },
  //DELETE PRODUCT FROM CART
  deleteProductFromCart: async (req, res) => {
    try {
      if (!req.params.id) {
        throw Error("No se a agregado un producto");
      }
      if (!req.params.idProduct) {
        throw Error("No se a elegido un carrito");
      }
      const idCart = req.params.id;
      const idProduct = req.params.idProduct;
      const cart = await Cart.deleteProductFromCart(idCart, idProduct);
      res.status(200).send({
        status: 200,
        message: "Producto eliminado correctamente",
        carrito: { cart },
      });
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error interno del servidor" + error,
      });
    }
  },
};

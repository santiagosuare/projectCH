const express = require("express");
const router = express.Router();
const {
  createCart,
  addProductToCart,
  readCartById,
  deleteCartById,
  deleteProductFromCart,
} = require("../controllers/carrito.controller");

router.post("/", createCart);
router.post("/:id/productos", addProductToCart);
router.get("/:id/productos", readCartById);
router.delete("/:id/productos", deleteCartById);
router.delete("/:id/productos/:idProduct", deleteProductFromCart);

module.exports = router;

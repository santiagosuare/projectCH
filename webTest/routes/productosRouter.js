const express = require("express");
const productoRouter = express.Router();
const isAdmin = require("../middlewares/isAdmin.js");
const { auth } = require("../service/security/configOauth.js");

const {
  readAllProducts,
  readProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/producto.controller.js");

productoRouter.get("/", auth, readAllProducts);
productoRouter.post("/", isAdmin, createProduct);
productoRouter.get("/:id", readProductById);
productoRouter.put("/:id", isAdmin, updateProduct);
productoRouter.delete("/:id", isAdmin, deleteProduct);

module.exports = productoRouter;

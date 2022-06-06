const express = require("express");
const path = require("path");
const router = express.Router();
const {
  getProductsTest,
  getProducts,
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/product.controller");

router.get("/productos-test", getProductsTest);
router.get("/test", async (req, res) => {
  res.sendFile(path.join(__dirname, "../public/test.html"));
});

router.post("/productos", createProduct);

router.get("/productos", getProducts);

router.get("/productos/:id", getProductById);

router.put("/productos/:id", updateProductById);

router.delete("/productos/:id", deleteProductById);

router.get("/randoms/", (req, res) => {
  let num = req.query.cant;

  if (Object.keys(req.query).length === 0) {
    return res.send({
      port: process.port,
      pid: process.pid,
      num: req.query.cant,
      numDefault: "100.000.000",
      random: Math.floor(Math.random() * 100000000),
    });
  } else {
    return res.send({
      num: req.query.cant,
      random: Math.floor(Math.random() * num),
    });
  }
});

module.exports = router;

// Mongo
const Daos = require("../daos/mongo/mainMongo.daos.js");
const Product = new Daos.productDaos();
const logger = require("../logs/logs.js");

module.exports = {
  //READ PRODUCT
  readAllProducts: async (req, res) => {
    try {
      const products = await Product.getAll();
      res.status(200).send({
        status: 200,
        message: "Success read all products",
        productos: products,
      });
      logger.info(`Success read all products ${products}`);
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error reading all products",
        data: error,
      });
      logger.error(`Error reading all products ${error}`);
    }
  },
  //CREATE PRODUCT
  createProduct: async (req, res) => {
    try {
      const product = await Product.save(req.body);
      res.status(200).send({
        status: 200,
        message: "Success create product",
        producto: { product },
      });
      logger.info(`Success create product ${product}`);
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error reading all products ",
        data: error,
      });
      logger.error(`Error reading all products ${error}`);
    }
  },
  //READ PRODUCT BY ID
  readProductById: async (req, res) => {
    try {
      const product = await Product.getById(req.params.id);
      res.status(200).send({
        status: 200,
        message: "Success read product by id",
        producto: product,
      });
      logger.info(`Success read product by id ${product}`);
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error reading product by id",
        data: error,
      });
      logger.error(`Error reading product by id ${error}`);
    }
  },
  //UPDATE PRODUCT
  updateProduct: async (req, res) => {
    try {
      const product = await Product.updateById(req.params.id, req.body);
      res.status(200).send({
        status: 200,
        message: "Success update product",
        producto: product,
      });
      logger.info(`Success update product ${product}`);
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error update product",
        data: error,
      });
      logger.error(`Error update product ${error}`);
    }
  },
  //DELETE PRODUCT
  deleteProduct: async (req, res) => {
    try {
      const product = await Product.deleteById(req.params.id);
      res.status(200).send({
        status: 200,
        message: "Success delete product",
        producto: product,
      });
      logger.info(`Success delete product ${product}`);
    } catch (error) {
      res.status(500).send({
        status: 500,
        message: "Error delete product",
        data: error,
      });
      logger.error(`Error delete product ${error}`);
    }
  },
};

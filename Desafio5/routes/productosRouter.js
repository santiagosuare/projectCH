const express = require("express");
const productosRouter = express.Router();

let productos = [];

productosRouter.get("/", (req, res) => {
  res.render("formulario", { productos });
});

productosRouter.get("/:id", (req, res) => {
  try {
    console.log(req.params.id);
    const productoId = productos.find(
      (productos) => productos.id == req.params.id
    );
    return res.json(productoId);
  } catch {
    res.status(404).json({ error: "Producto no encontrado " + error });
  }
});

productosRouter.post("/", (req, res) => {
  console.log(res.body);
  productos.push(req.body);
  res.render("formulario", { productos });
});

productosRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const { title, price, url } = req.body;

  try {
    let busquedaID = productos.find((productos) => productos.id == id);
    if (parseInt(busquedaID.id) === parseInt(id)) {
      productos.splice(busquedaID.id - 1, 1, req.body);
      res.json({ productos });
    } else {
      res.json("Error de Ingreso");
    }
  } catch (error) {
    throw "Error Server";
  }
});

productosRouter.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  try {
    console.log("entre");
    productos = productos.filter((productos) => productos.id !== id);
    res.json(productos);
  } catch (error) {
    throw "Error Server";
  }
});

module.exports = productosRouter;

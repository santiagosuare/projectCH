const express = require("express");
const productosRouter = express.Router();

let productos = [
  {
    id: 1,
    titulo: "santiago",
    precio: 110,
    url: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  },
  {
    id: 2,
    titulo: "estefania",
    precio: 220,
    url: "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
  },
];

productosRouter.get("/", (req, res) => {
  res.json(productos);
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
  productos.push(req.body);
  res.json({
    mensaje: "se agrego correctamente el producto con id: " + req.body.id,
  });
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

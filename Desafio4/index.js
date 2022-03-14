const express = require("express");
const productosRouter = require("./routes/productosRouter");
const app = express();
const PORT = 8080;

//Funciones para POST & PUT para traer y leer archivos
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//URL de productos
app.use("/api/productos", productosRouter);

//Instancia del Servidor
const server = app.listen(PORT, () => {
  console.log("Servidor levantado en puerto " + server.address().port);
});

//Tomamos en caso de error
server.on("error", (error) => console.log("Hubo un error " + error));

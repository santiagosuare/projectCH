const express = require("express");
const productosRouter = require("./routes/productosRouter");
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const server = app.listen(PORT, () => {
  console.log("Server escuchando puerto: " + server.address().port);
});

server.on("error", (error) => console.log("Hubo un error: " + error));

app.set("view engine", "ejs");

app.use("/productos", productosRouter);

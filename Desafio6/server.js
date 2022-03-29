const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const axios = require("axios");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

let productos = [
  {
    title: "Escuadra",
    price: 123.45,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
    id: 0,
  },
  {
    title: "Calculadora",
    price: 234.56,
    thumbnail:
      "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
    id: 1,
  },
];

const mensaje = [];

io.on("connection", (socket) => {
  console.log("Conectadoasdasdasd");

  axios.get("http://localhost:8080/tabla.hbs").then((response) => {
    const template = response.data;
    socket.emit("Datosiniciales", { productos, mensaje, template });
  });

  socket.on("AgregarProducto", (producto) => {
    productos.push(producto);
    console.log(productos);
    io.sockets.emit("NuevoProducto", productos);
  });
});

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto " + server.address().port);
});

server.on("error", (error) => console.log("buno un error " + error));

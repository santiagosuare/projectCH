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

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto " + server.address().port);
});

server.on("error", (error) => console.log("buno un error " + error));

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

const mensajes = [
  { author: "pedro@gmail.com", message: "!Hola¡" },
  { author: "lucia@gmail.com", message: "Que tal" },
];

// IO Connection
io.on("connection", (socket) => {
  console.log("Conectado al servidor");

  // socket.emit("Datosiniciales", { productos, template });
  axios.get("http://localhost:8080/tabla.hbs").then((response) => {
    const template = response.data;
    socket.emit("Datosiniciales", { productos, template });
  });

  socket.on("AgregarProducto", (producto) => {
    productos.push(producto);
    io.sockets.emit("NuevoProducto", productos);
  });

  // socket.emit("DatosinicialesMensajes", { mensaje, template });
  axios.get("http://localhost:8080/messages.hbs").then((response) => {
    const template = response.data;
    socket.emit("DatosinicialesMensajes", { mensajes, template });
  });

  socket.on("AgregarMensaje", (mensaje) => {
    mensajes.push(mensaje);
    io.sockets.emit("NuevoMensaje", mensajes);
  });
});

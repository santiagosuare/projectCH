const express = require("express");
const { Server } = require("socket.io");
const Sockets = require("./sockets");
const router = require("./routes");
const app = express();
const PORT = 8080;

// const database = require("./database/mysql/seed");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname + "/public"));

app.set("port", process.env.PORT || PORT);
app.use("/api", router);

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on("error", (err) => {
  console.log(`Error: ${err}`);
});

const io = new Server(server);
Sockets(io);

// database.seedDatabaseProductsMySQL();

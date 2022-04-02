const express = require("express");
const PORT = 8080;
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.static(__dirname + "/public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

httpServer.listen(PORT, () => console.log(`Listening on port ${PORT}`));

const message = [
  { author: "Juan", message: "Hola" },
  { author: "Pedro", message: "Como andas?" },
  { author: "Ana", message: "!Genial!" },
];

io.on("connection", (socket) => {
  console.log("Conectado correctamente al socket io");

  socket.emit("messages", message);
  socket.on("new-message", (data) => {
    message.push(data);
    io.emit("messages", message);
  });
});

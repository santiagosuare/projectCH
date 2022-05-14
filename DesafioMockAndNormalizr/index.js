const express = require("express");
const { urlencoded } = require("express");
const { Server } = require("socket.io");
const path = require("path");
const router = require("./routes");
const Sockets = require("./sockets");
const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("port", process.env.PORT || 8080);
app.use("/api", router);

const server = app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

server.on("error", (error) => {
  console.log(error);
});

const io = new Server(server);

Sockets(io);

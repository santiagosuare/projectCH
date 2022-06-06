const express = require("express");
const hbs = require("express-handlebars");
const { Server } = require("socket.io");
const Sockets = require("./sockets");
const router = require("./routes/index.js");
const routerPlus = require("./routes/indexPlus.js");
const routerLogin = require("./routes/indexLogin.js");
const passport = require("passport");
const session = require("express-session");

const PORT = 8081;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("views", "./public/log");
app.engine(
  "hbs",
  hbs.engine({
    defaultLayout: "main",
    layoutsDir: "./public/log/layouts",
    extname: "hbs",
  })
);

app.set("view engine", ".hbs");

// const database = require("./database/mysql/seed");

app.use(express.static(__dirname + "/public"));

app.set("port", process.env.PORT || PORT);
app.use("/api", router);
app.use("/info", routerPlus);
// app.use("/", routerLogin);

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on("error", (err) => {
  console.log(`Error: ${err}`);
});

const io = new Server(server);
Sockets(io);

// database.seedDatabaseProductsMySQL();

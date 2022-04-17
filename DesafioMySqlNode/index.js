const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const axios = require("axios");
const { options } = require("./options/mysqlDB");

const knexProductos = require("knex")(options);

let knex = require("knex")({
  client: "sqlite3",
  connection: { filename: "./DB/mibase.sqlite" },
});

/////////////// TABLA MENSAJES //////////////////////
// // CREAR TABLA
// knex.schema
//   .createTable("mesagges", (table) => {
//     table.increments("id");
//     table.string("author");
//     table.string("message");
//   })
//   .then(() => console.log("tabla creada"))
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });

// // INSERT REGISTROS
// knex("mesagges")
//   .insert(mensajes)
//   .then(() => console.log("registros insertados"))
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });

//SELECT
let mensajeSql = [];

knex
  .select("*")
  .from("mesagges")
  .then((rows) => {
    for (rows of rows) {
      //   console.log(`${rows.id} ${rows.author} ${rows.message}`);
      // console.log(rows);
      mensajeSql = [...mensajeSql, rows];
    }
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });

/////////////// TABLA PRODUCTOS //////////////////////
// knexProductos.schema
//   .createTable("productos", (table) => {
//     table.increments("id");
//     table.string("title");
//     table.integer("price");
//     table.string("thumbnail");
//   })
//   .then(() => console.log("tabla creada"))
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });

// INSERT
// knexProductos("productos")
//   .insert(productos)
//   .then(() => console.log("registros insertados"))
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });

//SELECT
let productosSql = [];

knexProductos
  .from("productos")
  .select("*")
  .then((rows) => {
    for (rows of rows) {
      productosSql = [...productosSql, rows];
    }
  })
  .catch((err) => {
    console.log(err);
    throw err;
  })
  .finally(() => {
    knex.destroy();
  });

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

// IO Connection
io.on("connection", (socket) => {
  console.log("Conectado al servidor");

  // socket.emit("Datosiniciales", { productos, template });
  axios.get("http://localhost:8080/tabla.hbs").then((response) => {
    const template = response.data;
    socket.emit("Datosiniciales", { productosSql, template });
  });

  socket.on("AgregarProducto", (producto) => {
    // console.log(producto);
    productosSql = [...productosSql, producto];
    console.log(productosSql);
    io.sockets.emit("NuevoProducto", productosSql);
  });

  // socket.emit("DatosinicialesMensajes", { mensaje, template });
  axios.get("http://localhost:8080/messages.hbs").then((response) => {
    const template = response.data;
    socket.emit("DatosinicialesMensajes", { mensajeSql, template });
  });

  socket.on("AgregarMensaje", (mensaje) => {
    mensajeSql = [...mensajeSql, mensaje];
    io.sockets.emit("NuevoMensaje", mensajeSql);
  });
});

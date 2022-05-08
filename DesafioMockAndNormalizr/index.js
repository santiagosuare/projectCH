const express = require("express");
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const axios = require("axios");
const { options } = require("./options/mysqlDB");

//FAKER PRODUCTS
const faker = require("faker");
faker.locale = "es";
const { commerce, finance, image } = faker;

const generarProducto = () => {
  const producto = {
    title: commerce.productName(),
    price: finance.amount(50, 300, 0),
    thumbnail: image.imageUrl(480, 480, "product", true),
  };
  return producto;
};

const getProductos = () => {
  const productos = [];
  for (let i = 0; i < 5; i++) {
    productos.push(generarProducto());
  }
  return productos;
};

/// MONGO ////
const Messages = require("./daos/messages.controllers.js");
const MessagesDao = new Messages();

//create message in mongo
const messagesToCreate = {
  author: {
    id: "santiago@gmial.com",
    nombre: "Santiago",
    apellido: "Gonzalez",
    edad: 30,
    alias: "santigonz",
    avatar: image.imageUrl(480, 480, "people", true),
  },
  text: "Hola, como estas?",
};
// console.log(messagesToCreate);

// MessagesDao.createMessages(messagesToCreate);

// console.log(getProductos());

// const knexProductos = require("knex")(options);

let knex = require("knex")({
  client: "sqlite3",
  connection: { filename: "./DB/mibase.sqlite" },
});

/////////// TABLA MENSAJES //////////////////////
// CREAR TABLA
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

// const mensajes = [
//   { author: "pedro@gmail.com", message: "!Hola¡" },
//   { author: "lucia@gmail.com", message: "Que tal" },
//   { author: "santiago@gmail.com", message: "¿Cómo estás?" },
//   { author: "rodrigo@gmail.com", message: "¿Qué tal?" },
// ];

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

// knex
//   .select("*")
//   .from("mesagges")
//   .then((rows) => {
//     for (rows of rows) {
//       // console.log(`${rows.id} ${rows.author} ${rows.message}`);
//       // console.log(rows);
//       mensajeSql = [...mensajeSql, rows];
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });

///////////// TABLA PRODUCTOS //////////////////////
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

// let productos = [
//   {
//     title: "Escuadra",
//     price: 123.45,
//     thumbnail:
//       "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
//     id: 1,
//   },
//   {
//     title: "Calculadora",
//     price: 234.56,
//     thumbnail:
//       "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
//     id: 2,
//   },
// ];

// // INSERT
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

// SELECT
let productosSql = [];

// knexProductos
//   .from("productos")
//   .select("*")
//   .then((rows) => {
//     for (rows of rows) {
//       productosSql = [...productosSql, rows];
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

// console.log(productosSql);

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
    socket.emit("Datosiniciales", getProductos(), { template });
  });

  socket.on("AgregarProducto", (producto) => {
    // console.log(producto);
    const productoArrayNew = getProductos();
    productoArrayNew.push(producto);
    productosSql = [...productosSql, producto];
    // console.log(productosSql);
    io.sockets.emit("NuevoProducto", productoArrayNew);
  });

  //get mensages from mongo
  const getMessages = async (req, res) => {
    const messages = await MessagesDao.getAll();
    // console.log(messages);
    return messages;
  };

  console.log(getMessages());
  // socket.emit("DatosinicialesMensajes", { mensaje, template });
  axios.get("http://localhost:8080/messages.hbs").then((response) => {
    const template = response.data;
    socket.emit("DatosinicialesMensajes", getMessages(), { template });
  });

  socket.on("AgregarMensaje", (mensaje) => {
    mensajeSql = [...mensajeSql, mensaje];
    io.sockets.emit("NuevoMensaje", mensajeSql);
  });
});

const express = require("express");
const app = express();
const { options } = require("./options/mysqlDB");
const knex = require("knex")(options);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log("Servidor escuchando en el puerto " + server.address().port);
});

server.on("error", (error) => console.log("buno un error " + error));

//CREAR TABLA
// knex.schema
//   .createTable("users", (table) => {
//     table.increments("id");
//     table.string("name");
//     table.integer("price");
//   })
//   .then(() => console.log("tabla creada"))
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });
// ---------------------------------------------------------------------------

//INSERT
// const users = [
//   { name: "Juan", price: 100 },
//   { name: "Pedro", price: 200 },
//   { name: "Luis", price: 300 },
// ];

// knex("users")
//   .insert(users)
//   .then(() => console.log("registros insertados"))
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });
// ---------------------------------------------------------------------------

//SELECT
// knex
//   .from("users")
//   .select("*")
//   .then((rows) => {
//     for (rows of rows) {
//       console.log(`${rows.id} ${rows.name} ${rows.price}`);
//     }
//   })
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });
// ---------------------------------------------------------------------------

//DELETE REGISTROS
// knex
//   .from("users")
//   .where("price", ">", 200)
//   .del()
//   .then(() => console.log("registros eliminados"))
//   .catch((err) => {
//     console.log(err);
//     throw err;
//   })
//   .finally(() => {
//     knex.destroy();
//   });
// ---------------------------------------------------------------------------

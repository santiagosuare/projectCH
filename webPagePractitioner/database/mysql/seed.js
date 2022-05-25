const { config } = require("./config");
const knex = require("knex")(config);
const { products } = require("./products");

const seedDatabaseProductsMySQL = async () => {
  try {
    console.log("Iniciando la carga de datos en la base de datos MySQL");
    const existTableProducts = await knex.schema.hasTable("PRODUCTS");
    if (existTableProducts) {
      await knex.schema.dropTable("PRODUCTS");
    }
    await knex.schema.createTable("PRODUCTS", (table) => {
      table.string("id", 40).primary();
      table.string("name", 20).nullable(false);
      table.float("price").nullable(false);
      table.string("url", 300).nullable(false);
    });
    await knex("PRODUCTS").insert(products);
    await knex.destroy();
    console.log("Carga de datos en la base de datos MySQL finalizada");
  } catch (error) {
    console.log(error.message);
  }
};

seedDatabaseProductsMySQL();

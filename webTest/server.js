const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const router = require("./routes/indexRouter.js");
const logger = require("./logs/logs.js");
const app = express();
require("dotenv").config({ path: "./.env" });
const PORT = process.env.PORT;
//GraphQL Dependencias
const graphqlHTTP = require("express-graphql");
const schema = require("./graphQL/schema.js");
const productsController = require("./graphQL/productsController.js");
const { getAll, addProduct, updateProduct, deleteProduct } = productsController;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const connectedServer = app.listen(PORT, function () {
  logger.info(`Server running on port ${PORT}`);
});
connectedServer.on("error", (error) =>
  console.log(`Error en servidor ${error}`)
);

//GraphQL
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: {
      getAll,
      addProduct,
      updateProduct,
      deleteProduct,
    },
    graphiql: true,
  })
);

app.use("/api", router);

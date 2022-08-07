const buildSchema = require("graphql").buildSchema;

export const schema = buildSchema(`
    type Product {
        _id: String,
        name: String,
        description: String,
        code: String,
        thumbnail: String,
        price: Float,
        stock: Int
    }
    input ProductInput {
        name: String,
        description: String,
        code: String,
        thumbnail: String,
        price: Float,
        stock: Int
    }
    type Query {
        getAll: [Product],
    }
    type Mutation {
        addProduct(data: ProductInput): Product,
        updateProduct(id: String, data: ProductInput): Product,
        deleteProduct(id: String): Product,
    }
`);

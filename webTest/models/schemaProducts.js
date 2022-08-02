const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
  name: { type: String, require: true, max: 100 },
  description: { type: String, require: true, max: 100 },
  price: { type: Number, require: true, max: 10000 },
  url: { type: String, require: true, max: 100 },
  stock: { type: Number, require: true },
  code: { type: String, require: true },
  timestamp: { type: String, require: true },
});

module.exports = mongoose.model("productstests", productsSchema);

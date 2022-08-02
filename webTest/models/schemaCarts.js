const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  products: { type: Array, require: false },
  timestamp: { type: String, require: false },
});

module.exports = mongoose.model("cartsTest", cartSchema);

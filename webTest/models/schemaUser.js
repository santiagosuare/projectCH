const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, max: 100 },
  password: { type: String, require: true, max: 100 },
  name: { type: String, require: true, max: 100 },
  address: { type: String, require: true, max: 100 },
  age: { type: Number, require: true, max: 100 },
  phone: { type: String, require: true, max: 100 },
  imageUrl: { type: String, require: true },
  timestamp: { type: String, require: true },
});

module.exports = mongoose.model("users", userSchema);

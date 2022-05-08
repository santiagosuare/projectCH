const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  author: {
    id: { type: String, required: true },
    nombre: { type: String, required: true, max: 100 },
    apellido: { type: String, required: true, max: 100 },
    edad: { type: Number, required: true },
    alias: { type: String, required: true, max: 100 },
    avatar: { type: String, required: true, max: 100 },
  },
  text: { type: String, required: true, max: 1000 },
});

module.exports = mongoose.model("messageTest", messageSchema);

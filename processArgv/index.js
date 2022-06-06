require("dotenv").config();

const FRENTE = process.env.FRENTE || "rojo";
const FONDO = process.env.FONDO || "verde";

console.log({ FRENTE, FONDO });

// console.log(process.env);

const MODO = process.env.MODO || "prod";
const PORT = process.env.PORT || 1;
const DEBUG = process.env.DEBUG || true;

console.log({ MODO, PORT, DEBUG });

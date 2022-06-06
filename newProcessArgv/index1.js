process.on("exit", () => {
  console.log("codigo: ", +codigoError);
});

let codigoError = 0;

const args = process.argv.slice(2).sort((a, b) => {
  return a - b;
});

console.log(args);

if (args.length == 0) {
  const objeto = { error: { descripcion: "entrada vacia" } },
    codigoError = -4;
  console.log(codigoError);
  process.exit();
}

const objeto = {
  datos: {
    numberos: args,
    promedio: "",
    max: args[args.length - 1],
    min: args[0],
    ejecutable: process.title,
    pid: process.pid,
  },
};

console.log(objeto);

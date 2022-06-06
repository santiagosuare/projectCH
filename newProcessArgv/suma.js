let suma = 0;

process.on("message", (msg) => {
  for (let i = 0; i < 6e9; i++) {
    suma += i;
  }
  process.send(suma);
});

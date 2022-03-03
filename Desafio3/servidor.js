const { response } = require("express");
const express = require("express");
const app = express();

// ARCHIVO Productos
const fs = require("fs");

class Contenedor {
  constructor(archivo) {
    this.archivo = archivo;
  }

  getAll() {
    try {
      const contenido = fs.readFileSync(this.archivo);
      const archivoCompleto = JSON.parse(contenido);
      return archivoCompleto;
    } catch (error) {
      console.log("No se lee");
    }
  }

  getRandom() {
    try {
      const contenido = fs.readFileSync(this.archivo);
      const archivoCompleto = JSON.parse(contenido);
      const random = Math.floor(Math.random() * archivoCompleto.length);

      return archivoCompleto[random];
    } catch (error) {
      console.log("Error " + error);
    }
  }
}

const PORT = 8080;

let contador = 0;

const server = app.listen(PORT, () => {
  console.log(`servidor iniciado en el puerto ${server.address().port}`);
});

app.get("/", (req, res) => {
  contador++;
  res.send(
    `<h1 style ='color:blue;'> Direcciones a: /productos para ver todos los productos o /productoRandom para ver un producto random </h1>`
  );
});

const cont = new Contenedor("./productos.txt");

// cont.getAll();

app.get("/productos", (req, res) => {
  res.send(cont.getAll());
});

app.get("/productoRandom", (req, res) => {
  res.send(cont.getRandom());
});

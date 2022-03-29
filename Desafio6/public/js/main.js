const socket = io();
let tabla;

socket.on("Datosiniciales", ({ productos, mensaje, template }) => {
  tabla = Handlebars.compile(template);

  const html = tabla({ productos });

  document.getElementById("tabla").innerHTML = html;
});

// AGREGO NUEVO PRODUCTO
socket.on("NuevoProducto", (productos) => {
  const html = tabla({ productos });
  console.log(productos);

  document.getElementById("tabla").innerHTML = html;
});

document.getElementById("productoNew").onsubmit = (e) => {
  e.preventDefault();

  const title = e.target[0].value;
  const price = e.target[1].value;
  const thumbnail = e.target[2].value;

  e.target[0].value = "";
  e.target[1].value = "";
  e.target[2].value = "";

  socket.emit("AgregarProducto", { title, price, thumbnail });
};

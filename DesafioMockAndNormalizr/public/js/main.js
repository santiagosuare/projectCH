const socket = io();
let tabla;
let messages;

//Escucho DatosIniciales
socket.on("Datosiniciales", (productosSql, { template }) => {
  tabla = Handlebars.compile(template);

  const html = tabla({ productosSql });

  document.getElementById("tabla").innerHTML = html;
});

// AGREGO NUEVO PRODUCTO
socket.on("NuevoProducto", (productosSql) => {
  // console.log(productosSql);
  const html = tabla({ productosSql });

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

//Escucho DatosInicialesMensajes
socket.on("DatosinicialesMensajes", (mensajeSql, { template }) => {
  messages = Handlebars.compile(template);

  const html = messages({ mensajeSql });

  document.getElementById("mensajes").innerHTML = html;
});

// AGREGO NUEVO MENSAJE
socket.on("NuevoMensaje", (mensajeSql) => {
  const html = messages({ mensajeSql });

  document.getElementById("mensajes").innerHTML = html;
});

document.getElementById("mensajeNew").onsubmit = (e) => {
  e.preventDefault();

  console.log(e.target[0].value); //email
  console.log(e.target[1].value); //nombre
  console.log(e.target[2].value); //apellido
  console.log(e.target[3].value); //edad
  console.log(e.tarjet[4].value); //alias
  console.log(e.target[5].value); //avatar
  console.log(e.target[6].value); //mensaje

  const author = e.target[0].value;
  const message = e.target[1].value;

  e.target[0].value = "";
  e.target[1].value = "";

  socket.emit("AgregarMensaje", { author, message });
};

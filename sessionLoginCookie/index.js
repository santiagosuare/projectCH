const express = require("express");
const session = require("express-session");
const app = express();

let PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

server.on("error", (error) => {
  console.log(error);
});

app.use(
  session({
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/con-session", (req, res) => {
  if (req.session.contador) {
    req.session.contador++;
    res.send(`Ud ha visitado el sitio ${req.session.contador} veces`);
  } else {
    req.session.contador = 1;
    res.send("Bienvenido a la página");
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (!error) {
      res.send("Sesión cerrada");
    } else {
      res.send({ status: "error", message: "No se pudo cerrar la sesión" });
    }
  });
});

app.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "admin" || password !== "password") {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = true;
  res.send("login success");
});

function auth(req, res, next) {
  if (req.session?.user === "admin" && req.session?.admin) {
    return next();
  }
  return res.status(401).send("No está autorizado");
}

app.get("/privado", auth, (req, res) => {
  res.send("Esta es una página privada");
});

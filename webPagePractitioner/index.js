const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const hbs = require("express-handlebars");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { Server } = require("socket.io");
const Sockets = require("./sockets");
const router = require("./routes");

const users = [
  { nombre: "admin", password: "admin" },
  { nombre: "user", password: "user" },
];

const PORT = 8080;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser());
app.use(
  session({
    secret: "1234567890!@#$%^&*()",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 600000, //10 minutos
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "registrar",
  new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, done) => {
      console.log(username, password);
      console.log("aca");
      const exist = users.find((user) => user.nombre === username);
      if (exist) {
        console.log("El usuario ya existe");
        return done(null, false, { message: "El usuario ya existe" });
      } else {
        users.push({ nombre: username, password: password });
        console.log(users);
        return done(null, { nombre: username });
      }
    }
  )
);

passport.use(
  "login",
  new LocalStrategy((username, password, done) => {
    console.log("entre a login");
    const existe = users.find((user) => {
      return user.nombre === username && user.password === password;
    });
    console.log(existe);
    if (!existe) {
      return done(null, false);
    } else {
      console.log("error");
      return done(null, existe);
    }
  })
);

passport.serializeUser((users, done) => {
  console.log(users.nombre + "serializeUser");
  done(null, users.nombre);
});

passport.deserializeUser((nombre, done) => {
  const user = users.find((user) => user.nombre === nombre);
  done(null, user);
});

app.set("views", "./public/log");
app.engine(
  "hbs",
  hbs.engine({
    defaultLayout: "main",
    layoutsDir: "./public/log/layouts",
    extname: "hbs",
  })
);

app.set("view engine", ".hbs");

app.get("/registrar", (req, res) => {
  res.render("register");
});

app.get("/login", (req, res) => {
  // req.logOut();
  res.render("login");
});

app.post(
  "/registrar",
  passport.authenticate("registrar", {
    successRedirect: "/login",
    failureRedirect: "/register-error",
  })
);

app.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/datos",
    failureRedirect: "/login-error",
  })
);

app.get("/datos", (req, res) => {
  const { nombre } = req.user;
  res.send({ nombre });
});

app.get("/logout", (req, res) => {
  // req.logOut();
  res.redirect("/login");
});

app.get("/register-error", (req, res) => {
  res.render("register-error");
});

app.get("/login-error", (req, res) => {
  res.render("login-error");
});

// const database = require("./database/mysql/seed");

app.use(express.static(__dirname + "/public"));

app.set("port", process.env.PORT || PORT);
app.use("/api", router);

const server = app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

server.on("error", (err) => {
  console.log(`Error: ${err}`);
});

const io = new Server(server);
Sockets(io);

// database.seedDatabaseProductsMySQL();

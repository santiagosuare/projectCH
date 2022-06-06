const express = require("express");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const LocalStrategy = require("passport-local").Strategy;
const router = express.Router();
const session = require("express-session");
const hbs = require("express-handlebars");

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

const users = [
  { nombre: "admin", password: "admin" },
  { nombre: "user", password: "user" },
];

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

router.get("/logout", (req, res) => {
  // req.logOut();
  res.redirect("/login");
});

router.get("/register-error", (req, res) => {
  res.render("register-error");
});

router.get("/login-error", (req, res) => {
  res.render("login-error");
});

module.exports = router;

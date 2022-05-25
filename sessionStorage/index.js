const express = require("express");
// const cookieParse = require("cookie-parser");
const session = require("express-session");
const fileStore = require("session-file-store")(session);
const app = express();

const connectMongo = require("connect-mongo");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const server = app.listen(8080, () => {
  console.log("Server is running on port 8080");
});

server.on("error", (error) => {
  console.log(error);
});

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

app.use(
  session({
    store: connectMongo.create({
      mongoUrl:
        "mongodb+srv://ssuarez:Aa123456@cluster0.q9i2x.mongodb.net/sessiones?retryWrites=true&w=majority",
      mongoOptions: advancedOptions,
    }),
    secret: "secreto",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      sameSite: "lax",
      secure: false,
    },
  })
);

app.get("/login", (req, res) => {
  const { username, password } = req.query;
  if (username !== "admin" || password !== "password") {
    return res.send("login failed");
  }
  req.session.user = username;
  req.session.admin = true;
  res.send("login success!!!");
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

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("logout success!!");
});

const express = require("express");
const router = express.Router();

let products = require("./productosRouter.js");
let cards = require("./carritoRouter.js");
let user = require("./userRouter.js");
let login = require("./loginRouter.js");

//ROUTES
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

router.use("/user", user);
router.use("/productos", products);
router.use("/carrito", cards);
router.use("/login", login);

module.exports = router;

const express = require("express");
const app = express();
const log4js = require("log4js");
// const compression = require("compression");

const ENT = "DEV";

if (ENT == "PRO") {
  log4js.configure({
    appenders: {
      miLoggerFile: {
        type: "file",
        filename: "debug.log",
      },
      miErrorFile: {
        type: "file",
        filename: "error.log",
      },
    },
    categories: {
      default: {
        appenders: ["miLoggerFile"],
        level: "all",
      },
      logwn: {
        appenders: ["miErrorFile"],
        level: "warn",
      },
      logInfo: {
        appenders: ["miLoggerFile"],
        level: "info",
      },
    },
  });
} else {
  log4js.configure({
    appenders: {
      miLoggerConsole: {
        type: "console",
      },
    },
    categories: {
      default: {
        appenders: ["miLoggerConsole"],
        level: "all",
      },
      logwn: {
        appenders: ["miLoggerConsole"],
        level: "warn",
      },
      logInfo: {
        appenders: ["miLoggerConsole"],
        level: "info",
      },
    },
  });
}

const logWarning = log4js.getLogger("logwn");
const logInfo = log4js.getLogger("logInfo");

// app.get("/saludo", (req, res) => {
//   let msg = "Hola que tal";
//   res.send(msg.repeat(1000));
// });

// app.get("/saludogzip", compression(), (req, res) => {
//   let msg = "Hola que tal";
//   res.send(msg.repeat(1000));
// });

app.get("/suma", (req, res) => {
  if (isNaN(req.query.val1) || isNaN(req.query.val2)) {
    logWarning.error("Error de datos, no es un valor numerico");
    res.send("error datos");
  } else {
    logInfo.info("procesamiento exitoso");
    res.send({
      resultado: parseInt(req.query.val1) + parseInt(req.query.val2),
    });
  }
});

app.use((req, res) => {
  logWarning.warn("ruta incorrecta");
  res.send("ruta incorrecta");
});

const PORT = 8080;

app.listen(PORT, (err) => {
  if (!err) {
    console.log(`Server running on port ${PORT} - PID: ${process.pid}`);
  }
});

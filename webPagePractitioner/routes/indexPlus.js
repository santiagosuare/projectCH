const express = require("express");
const router = express.Router();
const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

console.log();

router.get("/", (req, res) => {
  res.send(
    `Carpeta del Proyecto : ${process.argv[1]}` +
      `<br>` +
      `Sistema Operativo: ${process.platform}` +
      `<br>` +
      `Node Version: ${process.versions.node}` +
      `<br>` +
      `Memoria: ${process.memoryUsage.rss()}` +
      `<br>` +
      `Proceso pid: ${process.pid}` +
      `<br>` +
      `Numero de CPUs: ${numCPUs}`
  );
});

module.exports = router;

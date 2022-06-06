const http = require("http");
const PORT = process.argv[2] || 8081;

http
  .createServer((req, res) => {
    console.log(`Worker ${process.pid} received request and port is ${PORT}`);
    res.writeHead(200);
    res.end(`servidor con PID ${process.pid} y puerto ${PORT}`);
  })
  .listen(PORT);

console.log(`Worker ${process.pid} started`);

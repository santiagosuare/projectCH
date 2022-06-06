const cluster = require("cluster");
const http = require("http");
const numCPUs = require("os").cpus().length;

console.log(`numCPUs: ${numCPUs}`);

if (cluster.isPrimary) {
  console.log(`Master ${process.pid} is running`);
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  console.log(`Worker ${process.pid} started`);
  http
    .createServer((req, res) => {
      console.log(`Worker ${process.pid} received request`);
      res.writeHead(200);
      res.end("hello world\n");
    })
    .listen(8000);
  console.log(`Worker ${process.pid} started`);
}

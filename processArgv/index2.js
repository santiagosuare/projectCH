//YARS
const yargs = require("yargs/yargs")(process.argv.slice(2));
const argv = yargs.default({
  modo: "prod",
  port: 8080,
  debug: false,
}).argv;

console.log(yargs.argv);

// ARGS
// const parseArgs = require("minimist");
// const args = parseArgs(process.argv);

// const options = {
//   alias: {
//     p: "port",
//     d: "debug",
//     m: "mode",
//   },
// };

// console.log(parseArgs(process.argv.slice(2), options))

// for (let j = 0; j < process.argv.length; j++) {
//   console.log(j + "-->" + process.argv[j]);
// }

// console.log(parseArgs(["1", "2", "3", "4"]));
// // { _: [ 1, 2, 3, 4 ] }

// console.log(parseArgs(["-a", "1", "-b", "2", "3", "4"]));
// //{ _: [ 3, 4 ], a: 1, b: 2 }

// console.log(parseArgs(["--n1", "1", "--n2", "2", "3", "4"]));
// // { _: [ 3, 4 ], n1: 1, n2: 2 }

// console.log(parseArgs(["-a", "1", "-b", "2", "--colores", "--cursiva"]));
// // { _: [], a: 1, b: 2, colores: true, cursiva: true }

// console.log(parseArgs(["-a", "1", "-b", "2", "-c", "-x"]));
// // { _: [], a: 1, b: 2, c: true, x: true }

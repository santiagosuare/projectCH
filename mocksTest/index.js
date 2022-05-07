const faker = require("faker");
faker.locale = "es";
const { name, internet, random, vehicle } = faker;
const writeFile = require("fs").writeFile;

let str = "NOMBRE;APELLIDO;EMAIL;TRABAJO;LUGAR\n";

for (let i = 0; i < 100; i++) {
  str +=
    name.firstName() +
    ";" +
    name.lastName() +
    ";" +
    internet.email() +
    ";" +
    name.jobTitle() +
    ";" +
    random.locale() +
    ";" +
    vehicle.vehicle() +
    "\n";
}

writeFile("./test.csv", str, (err) => {
  if (err) console.log(err);
  console.log("archivo guardado");
});

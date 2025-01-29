//importar express
const express = require("express");
//importar middleware
const cors = require("cors");

//importar rutas
const testRouter = require("./routes/test");

//crear la aplicacion
const app = express();

//usar middleware
app.use(cors());
app.use(express.json());

//usar rutas
app.use("/test", testRouter);

//exportar la aplicacion
module.exports = app;
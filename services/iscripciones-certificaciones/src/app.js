//importar express
const express = require('express');
//importar middleware
const cors = require('cors');
//importar rutas
const routes = require("./routes/test");

const app = express();
//configurar la app
app.use(cors());
app.use(express.json());

//usar las rutas
app.use("/test",routes);

//exportar la app
module.exports = app;
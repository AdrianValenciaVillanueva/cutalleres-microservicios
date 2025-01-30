//importar express
const express = require('express');
//importar cors 
const cors = require('cors');
//importar rutas
const testRoute = require('./routes/test');
const usersRoute = require('./routes/users');

const app = express();

//middlewares
app.use(cors());
app.use(express.json());//para que entienda json

//rutas
app.use("/test", testRoute);
app.use("/users", usersRoute);

module.exports = app;
//importar express
const express = require('express');
//importar middleware
const cors = require('cors');
//importar rutas
const testRoute = require('./routes/test');
const GestionTallerRoute = require('./routes/taller')

const app = express();

//middlewares
app.use(cors({
    origin: 'http://localhost:5173', //Permitir solo solicitudes desde el frontend(localhost:5173)
    methods: ['GET', 'POST', 'DELETE', 'PATCH'], //Métodos que se permiten
}));
app.use(express.json());//para que entienda json

//rutas
app.use("/test", testRoute);
app.use("/taller", GestionTallerRoute)

module.exports = app;
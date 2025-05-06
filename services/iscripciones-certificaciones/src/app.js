const express = require('express');
const app = express();
const inscripcionRoutes = require('./routes/inscripcionRoutes');
const db = require('../models');
const certificacionRoutes = require("./routes/certificacionRoutes");



app.use(express.json());
app.use('/api/inscripciones', inscripcionRoutes);
app.use("/api/certificaciones", certificacionRoutes);


db.sequelize.sync({ alter: true }) // Usar { alter: true } para actualizar la estructura de la tabla
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.log('Error sincronizando la base de datos', err));

module.exports = app;
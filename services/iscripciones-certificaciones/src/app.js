const express = require('express');
const app = express();
const inscripcionRoutes = require('./routes/inscripcionRoutes');
const db = require('../models');
const certificacionRoutes = require("./routes/certificacionRoutes");



app.use(express.json());
app.use('/api/inscripciones', inscripcionRoutes);
app.use("/api/certificaciones", certificacionRoutes);


db.sequelize.sync({ alter: true }) // Usa alter para actualizar las tablas sin perder datos
    .then(() => console.log('Base de datos sincronizada correctamente'))
    .catch(err => console.error('Error al sincronizar la base de datos:', err));

module.exports = app;
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
    process.env.DB_NAME, // Nombre de la base de datos
    process.env.DB_USER, // Usuario de la base de datos
    process.env.DB_PASSWORD, // Contraseña de la base de datos
    {
        host: process.env.DB_HOST, // Host de la base de datos
        port: process.env.DB_PORT || 3306, // Puerto de la base de datos
        dialect: 'mysql', // Dialecto de la base de datos
        logging: false, // Cambia a true si quieres ver las consultas SQL en la consola
    }
);

sequelize
    .authenticate()
    .then(() => console.log('Conexión a la base de datos establecida correctamente.'))
    .catch((err) => console.error('No se pudo conectar a la base de datos:', err));

module.exports = {
    sequelize,
    Sequelize,
};
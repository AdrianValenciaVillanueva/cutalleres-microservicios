const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false,
  }
);

// Importa e inicializa los modelos
const Inscripcion = require('./inscripcion')(sequelize, DataTypes);
const Certificacion = require('./certificacion')(sequelize, DataTypes);
// Si tienes un modelo Taller, impórtalo igual:
// const Taller = require('./taller')(sequelize, DataTypes);

module.exports = {
  sequelize,
  Sequelize,
  Inscripcion,
  Certificacion,
};
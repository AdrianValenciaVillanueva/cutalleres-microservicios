const Sequelize = require('sequelize');
const config = require('../config/config'); // Importar configuración de DB

const sequelize = new Sequelize(config.development);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Inscripcion = require('./inscripcion')(sequelize, Sequelize.DataTypes);
db.Certificacion = require('./certificacion')(sequelize, Sequelize.DataTypes);


module.exports = db;
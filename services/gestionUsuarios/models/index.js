const Sequelize = require('sequelize');//importar sequelize
const config = require('../config/config');//importar configuración de la base de datos
const sequelize = new Sequelize(config.development);//crear una instancia de sequelize con la configuración

const db = {};//crear un objeto vacío para almacenar los modelos

db.Sequelize = Sequelize;//agregar la instancia de sequelize al objeto db para a sus funcionalidades desde db
db.sequelize = sequelize;//instancia para realizar consultas y sincronizar la base de datos

db.Usuario = require('./usuario')(sequelize, Sequelize.DataTypes);//agregar el modelo Usuario al objeto db
db.Registro = require('./registro')(sequelize, Sequelize.DataTypes);//agregar el modelo Registro al objeto db

db.sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.log('Error sincronizando la base de datos', err));

module.exports = db;
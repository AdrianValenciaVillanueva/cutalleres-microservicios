const Sequelize = require('sequelize'); // Importar Sequelize
const config = require('../config/config'); // Importar configuración de la base de datos
const sequelize = new Sequelize(config.development); // Crear una instancia de Sequelize con la configuración

const db = {}; // Crear un objeto vacío para almacenar los modelos

db.Sequelize = Sequelize; // Agregar la instancia de Sequelize al objeto db para acceder a sus funcionalidades
db.sequelize = sequelize; // Instancia para realizar consultas y sincronizar la base de datos

// Agregar los modelos al objeto db
db.GestionTaller = require('./gestionTaller')(sequelize, Sequelize.DataTypes);
db.DatosTaller = require('./datosTaller')(sequelize, Sequelize.DataTypes);

// Definir las asociaciones entre los modelos
db.GestionTaller.hasOne(db.DatosTaller, {
    foreignKey: 'ID_TALLER',  // Clave foránea en 'DatosTaller' que apunta a 'GestionTaller'
    as: 'datosTaller'  // Alias para la relación
});

db.DatosTaller.belongsTo(db.GestionTaller, {
    foreignKey: 'ID_TALLER',  // Clave foránea en 'DatosTaller' que apunta a 'GestionTaller'
    as: 'gestionTaller'  // Alias para la relación
});

// Sincronizar la base de datos
db.sequelize.sync()
    .then(() => console.log('Base de datos sincronizada'))
    .catch(err => console.log('Error sincronizando la base de datos', err));

module.exports = db;

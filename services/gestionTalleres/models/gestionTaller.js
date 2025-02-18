//Modelo de la tabla gestion_taller
module.exports = (sequelize, DataTypes) => {
    const GestionTaller = sequelize.define('gestionTaller', {
      ID_Taller: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
      },
      nombre_taller: {
        type: DataTypes.STRING,
        allowNull: true
      }
    }, {
      tableName: 'gestion_taller',
      timestamps: false 
    });
  
    return GestionTaller;
  };
  
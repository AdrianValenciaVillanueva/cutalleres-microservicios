// models/registro.js
module.exports = (sequelize, DataTypes) => {
    const Registro = sequelize.define('Registro', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      codigo_udg: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: true
      },
      sexo: {
        type: DataTypes.ENUM('hombre', 'mujer', 'prefiero no decirlo'),
        allowNull: false
      },
      edad: {
        type: DataTypes.INTEGER,
        allowNull: true
      }
    }, {
      tableName: 'registro',
      timestamps: false
    });
  
    Registro.associate = (models) => {
      Registro.belongsTo(models.Usuario, { foreignKey: 'codigo_udg' });
    };
  
    return Registro;
  };
  
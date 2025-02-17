// models/usuario.js
module.exports = (sequelize, DataTypes) => {
    const Usuario = sequelize.define('Usuario', {
      codigo_udg: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
      },
      correo: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      contrasena: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    
    {
      tableName: 'usuarios',
      timestamps: false ,
      
      defaultScope:{
        attributes: {exclude: ['contrasena']} //para que no se muestre la contraseña en las consultas
      },
      
      scopes:{//para que se muestre la contraseña en la consulta
        withPassword: {
          attributes: {}
        }
      }

    });
  
    return Usuario;
  };
  
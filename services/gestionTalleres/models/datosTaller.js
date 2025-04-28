module.exports = (sequelize, DataTypes) => {
    const DatosTaller = sequelize.define('datosTaller', {
      ID_TALLER: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'Gestion_taller', //Nombre de la tabla
          key: 'ID_Taller' //Nombre de la variable
        }
      },
      estado: {
        type: DataTypes.BOOLEAN,
        allowNull: true
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: true
      },
      imagen: {
        type: DataTypes.BLOB('long'), //Especificación del BLOB
        allowNull: true
      },
      fecha: {
        type: DataTypes.DATEONLY, //DATE de SQL es DATEONLY en Sequelize
        allowNull: true
      },
      horario: {
        type: DataTypes.TIME,
        allowNull: true
      },
      admin_ID: {
        type: DataTypes.INTEGER(10),
        allowNull: true
      }
    }, {
      tableName: 'datos_taller',
      timestamps: false //Timestamp es para agregar 2 columnas en la tabla que registran el tiempo de creación y actualización de una fila
    });
  
    return DatosTaller;
  };
  
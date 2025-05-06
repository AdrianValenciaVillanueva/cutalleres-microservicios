module.exports = (sequelize, DataTypes) => {
  const Certificacion = sequelize.define('Certificacion', {
      ID_certificado: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      ID_inscripcion: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      estado: {
          type: DataTypes.STRING(50),
          allowNull: false
      },
      fecha_emision: {
          type: DataTypes.DATE,
          allowNull: true
      },
      Certificado: {
          type: DataTypes.BLOB,
          allowNull: true
      }
  }, {
      tableName: 'Certificacion',  // Usa el mismo nombre de la tabla en MySQL
      timestamps: false
  });

  return Certificacion;
};

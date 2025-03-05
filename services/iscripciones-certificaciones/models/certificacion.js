module.exports = (sequelize, DataTypes) => {
    const Certificacion = sequelize.define('Certificacion', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        usuario_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        taller_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        fecha_certificacion: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        calificacion: {
            type: DataTypes.FLOAT,
            allowNull: true
        }
    }, {
        tableName: 'certificaciones',
        timestamps: false
    });

    Certificacion.associate = (models) => {
        Certificacion.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
        Certificacion.belongsTo(models.Taller, { foreignKey: 'taller_id' });
    };

    return Certificacion;
};
module.exports = (sequelize, DataTypes) => {
    const Inscripcion = sequelize.define('Inscripcion', {
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
        fecha_inscripcion: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }
    }, {
        tableName: 'inscripciones',
        timestamps: false
    });

    Inscripcion.associate = (models) => {
        Inscripcion.belongsTo(models.Usuario, { foreignKey: 'usuario_id' });
        Inscripcion.belongsTo(models.Taller, { foreignKey: 'taller_id' });
    };

    return Inscripcion;
};
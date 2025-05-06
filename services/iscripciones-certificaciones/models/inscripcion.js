module.exports = (sequelize, DataTypes) => {
    const Inscripcion = sequelize.define('Inscripcion', {
        ID_inscripcion: {  // Cambia 'id' por 'ID_inscripcion'
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        Codigo_alumno: {  // Cambia 'usuario_id' por 'Codigo_alumno'
            type: DataTypes.INTEGER,
            allowNull: false
        },
        ID_taller: {  // Cambia 'taller_id' por 'ID_taller'
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: 'Inscripciones',  // Usa el mismo nombre que MySQL
        timestamps: false
    });

    return Inscripcion;
};

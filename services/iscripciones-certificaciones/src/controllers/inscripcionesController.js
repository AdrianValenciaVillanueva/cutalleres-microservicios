const { Inscripcion, Taller } = require('../models');

const getAllInscripciones = async (req, res) => {
    try {
        const inscripciones = await Inscripcion.findAll();
        res.status(200).json(inscripciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTalleresByAlumno = async (req, res) => {
    try {
        const { codigoAlumno } = req.params;
        
        const talleresInscritos = await Inscripcion.findAll({
            where: { Codigo_alumno: codigoAlumno },
            include: [{
                model: Taller,
                attributes: ['nombre', 'impartidor', 'fecha_inicio', 'estado', 'imagen']
            }]
        });

        if (!talleresInscritos.length) {
            return res.status(404).json({ message: "No tienes talleres inscritos" });
        }

        // Formatear la respuesta para el frontend
        const response = talleresInscritos.map(inscripcion => ({
            ID_inscripcion: inscripcion.ID_inscripcion,
            ...inscripcion.Taller.get({ plain: true })
        }));

        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getInscripcionById = async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findByPk(req.params.id);
        if (!inscripcion) {
            return res.status(404).json({ error: "Inscripción no encontrada" });
        }
        res.status(200).json(inscripcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createInscripcion = async (req, res) => {
    const { Codigo_alumno, ID_taller } = req.body;

    if (!Codigo_alumno || !ID_taller) {
        return res.status(400).json({ error: "Codigo_alumno e ID_taller son obligatorios" });
    }

    try {
        const inscripcionExistente = await Inscripcion.findOne({
            where: { Codigo_alumno, ID_taller }
        });

        if (inscripcionExistente) {
            return res.status(409).json({ 
                error: "El alumno ya está inscrito en este taller" 
            });
        }

        const nuevaInscripcion = await Inscripcion.create({ Codigo_alumno, ID_taller });
        res.status(201).json(nuevaInscripcion);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateInscripcion = async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findByPk(req.params.id);
        if (!inscripcion) {
            return res.status(404).json({ error: "Inscripción no encontrada" });
        }
        await inscripcion.update(req.body);
        res.status(200).json(inscripcion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteInscripcion = async (req, res) => {
    try {
        const inscripcion = await Inscripcion.findByPk(req.params.id);
        if (!inscripcion) {
            return res.status(404).json({ error: "Inscripción no encontrada" });
        }
        await inscripcion.destroy();
        res.status(200).json({ message: "Inscripción eliminada" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllInscripciones,
    getTalleresByAlumno,
    getInscripcionById,
    createInscripcion,
    updateInscripcion,
    deleteInscripcion
};
const { Inscripcion } = require('../../models');

const getAllInscripciones = async (req, res) => {
    try {
        const inscripciones = await Inscripcion.findAll();
        res.status(200).json(inscripciones);
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
    try {
        const inscripcion = await Inscripcion.create(req.body);
        res.status(201).json(inscripcion);
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
    getInscripcionById,
    createInscripcion,
    updateInscripcion,
    deleteInscripcion
};
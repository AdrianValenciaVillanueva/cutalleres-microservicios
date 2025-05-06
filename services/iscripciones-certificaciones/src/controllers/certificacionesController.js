const { Certificacion } = require('../../models'); // Importa desde index.js

// Obtener todas las certificaciones
exports.getAllCertificaciones = async (req, res) => {
    try {
        const certificaciones = await Certificacion.findAll();
        res.json(certificaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener certificaciones' });
    }
};

// Obtener una certificación id
exports.getCertificacionById = async (req, res) => {
    try {
        const certificacion = await Certificacion.findByPk(req.params.id);
        if (certificacion) {
            res.json(certificacion);
        } else {
            res.status(404).json({ error: 'Certificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la certificación' });
    }
};

// Crear una nueva certificación
exports.createCertificacion = async (req, res) => {
    try {
        const { ID_inscripcion, estado, fecha_emision, Certificado } = req.body;
        const nuevaCertificacion = await Certificacion.create({
            ID_inscripcion,
            estado,
            fecha_emision,
            Certificado
        });
        res.status(201).json(nuevaCertificacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la certificación' });
    }
};

// Actualizar una certificación
exports.updateCertificacion = async (req, res) => {
    try {
        const certificacion = await Certificacion.findByPk(req.params.id);
        if (certificacion) {
            await certificacion.update(req.body);
            res.json(certificacion);
        } else {
            res.status(404).json({ error: 'Certificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la certificación' });
    }
};

// Eliminar una certificación
exports.deleteCertificacion = async (req, res) => {
    try {
        const certificacion = await Certificacion.findByPk(req.params.id);
        if (certificacion) {
            await certificacion.destroy();
            res.json({ message: 'Certificación eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Certificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la certificación' });
    }
};

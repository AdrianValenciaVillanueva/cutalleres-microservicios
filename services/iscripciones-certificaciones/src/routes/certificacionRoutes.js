const express = require('express');
const router = express.Router();
const certificacionesController = require('../controllers/certificacionesController');

// Obtener todas las certificaciones
router.get('/', certificacionesController.getAllCertificaciones);

// Obtener una certificación por ID
router.get('/:id', certificacionesController.getCertificacionById);

// Crear una nueva certificación
router.post('/', certificacionesController.createCertificacion);

// Actualizar una certificación
router.put('/:id', certificacionesController.updateCertificacion);

// Eliminar una certificación
router.delete('/:id', certificacionesController.deleteCertificacion);

module.exports = router;

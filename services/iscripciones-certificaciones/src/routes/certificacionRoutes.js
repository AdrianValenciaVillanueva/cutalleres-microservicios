const express = require('express');
const router = express.Router();
const certificacionesController = require('../controllers/certificacionesController');
const upload = require('../../config/multerConfig'); // Importar configuración de multer

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

// Ruta para subir un certificado basado en ID_inscripcion
router.post('/subir/:ID_inscripcion', upload.single('pdf'), certificacionesController.subirCertificado);

// Ruta para descargar un certificado basado en Codigo_alumno
router.get('/descargar/:Codigo_alumno', certificacionesController.descargarCertificado);

module.exports = router;

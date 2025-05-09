const express = require('express');
const router = express.Router();
const inscripcionesController = require('../../controllers/inscripcionesController');

// Ruta para obtener talleres de un alumno (antes estaba duplicada)
router.get('/alumno/:codigoAlumno', inscripcionesController.getTalleresByAlumno);

// Rutas CRUD estándar
router.route('/')
  .get(inscripcionesController.getAllInscripciones)
  .post(inscripcionesController.createInscripcion);

router.route('/:id')
  .get(inscripcionesController.getInscripcionById)
  .put(inscripcionesController.updateInscripcion)
  .delete(inscripcionesController.deleteInscripcion);

module.exports = router;

//GET    /api/inscripciones             # Todos los registros
//POST   /api/inscripciones             # Crear nueva inscripción
//GET    /api/inscripciones/alumno/:codigoAlumno  # Talleres de un alumno
//GET    /api/inscripciones/:id         # Una inscripción específica
//PUT    /api/inscripciones/:id         # Actualizar inscripción
//DELETE /api/inscripciones/:id         # Eliminar inscripción
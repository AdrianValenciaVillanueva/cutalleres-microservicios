//importar express
const express = require('express');

//Obtener el controlador
const {crearTaller, getTaller, updateTaller, deleteTaller, listaTalleres, vistaTaller} = require('../controllers/tallerController');

//Se crea el router
const router = express.Router();

//rutas de los metodos establecidos en el controlador
router.post('/crearTaller', crearTaller);
router.get('/getTaller/:id', getTaller);
router.get('/updateTaller', updateTaller);
router.delete('/deleteTaller', deleteTaller);
router.get("/listaTalleres", listaTalleres);
router.get("/vistaTaller", vistaTaller);

module.exports = router;
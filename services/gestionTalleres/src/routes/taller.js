//importar express
const express = require('express');

//Obtener el controlador
const {createTaller, getTaller, updateTaller, deleteTaller} = require('../controllers/tallerController');

//Se crea el router
const router = express.Router();

//rutas de los metodos establecidos en el controlador
router.post('/createTaller', createTaller);
router.get('/getTaller/:id', getTaller);
router.get('/updateTaller', updateTaller);
router.delete('/deleteTaller', deleteTaller);

module.exports = router;
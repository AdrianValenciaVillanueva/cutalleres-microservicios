//importar express
const express = require('express');

//Obtener el controlador
const {crearTaller, getTaller, actualizarDes, deleteTaller, listaTalleres, vistaTaller, bajaTaller, concluirTaller} = require('../controllers/tallerController');
//Es el middleware de las imagenes
const upload = require('./uploadMiddleware');
//Se crea el router
const router = express.Router();

//rutas de los metodos establecidos en el controlador
router.post('/crearTaller', upload.single('imagen'), crearTaller);
router.get('/getTaller/:id', getTaller);
router.patch('/actualizarDes', actualizarDes);
router.delete('/deleteTaller', deleteTaller);
router.get("/listaTalleres", listaTalleres);
router.post("/vistaTaller", vistaTaller);
router.patch('/bajaTaller', bajaTaller);
router.patch('/concluirTaller',concluirTaller)

module.exports = router;
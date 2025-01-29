//importar express
const express = require('express');
//obtener el controlador
const {getTest} = require('../controllers/testController')

//crear el router
const router = express.Router();

//ruta get
router.get('/', getTest);

module.exports = router;


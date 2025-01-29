//importar express
const express = require('express');

const { getTest } = require('../controllers/testController');

const router = express.Router();

//ruta get
router.get('/', getTest);

module.exports = router;

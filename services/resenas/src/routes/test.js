//importar express
const express = require("express");
//obtener el controlador
const {getTest} = require("../controllers/testController");

//crear router
const router = express.Router();

//ruta get
router.get("/", getTest);

//exportar router
module.exports = router;


//importar express
const express = require('express');

//obtener el controlador
const {createUser, getUser, updateUser, deleteUser} = require('../controllers/usersController');

//crear el router
const router = express.Router();

//rutas
router.post('/create', createUser);
router.get('/get', getUser);
router.get('/update', updateUser);
router.get('/delete', deleteUser);

module.exports = router;


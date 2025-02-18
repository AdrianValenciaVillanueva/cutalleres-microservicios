//importar express
const express = require('express');

//obtener el controlador
const {createUser, getUsers,loginUser, updateUser, deleteUser} = require('../controllers/usersController');

//crear el router
const router = express.Router();

//rutas
router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/getall', getUsers);
router.get('/update', updateUser);
router.get('/delete', deleteUser);

module.exports = router;


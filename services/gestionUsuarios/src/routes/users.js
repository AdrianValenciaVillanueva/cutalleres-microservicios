//importar express
const express = require('express');

//obtener el controlador
const {createUser, getUsers,loginUser, updateUser, deleteUser,dataUser, roleChange} = require('../controllers/usersController');

//importar el middleware
const authenticateUsers = require('../middlewares/authenticateUsers');
//crear el router
const router = express.Router();

//rutas
router.post('/create', createUser);
router.post('/login', loginUser);
router.get('/getall', authenticateUsers,getUsers);
router.patch('/update', authenticateUsers,updateUser);
router.delete('/delete', authenticateUsers,deleteUser);
router.post('/addInfo',authenticateUsers,dataUser );

module.exports = router;


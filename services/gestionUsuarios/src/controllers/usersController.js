const db = require('../../models');
const bcrypt = require('bcrypt');

const createUser = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
        const usuario = await db.Usuario.create({
            codigo_udg: req.body.codigo_udg,
            correo: req.body.correo,
            contrasena: hashedPassword
        });
        res.status(201).json(usuario);
    }catch(error){
        res.status(500).json({error: "Error al crear usuario"});
    }
};

const getUser = async (req, res) => {
    try{
        const usuarios = await db.Usuario.findAll();
        res.status(200).json(usuarios);
    }catch(error){
        res.status(500).json({error: "Error al obtener usuario"});
    }
}

const updateUser = async (req, res) => {
    res.send("Usuario actualizado");
}

const deleteUser = async (req, res) => {
    res.send("Usuario eliminado");
}

module.exports = { createUser, getUser, updateUser, deleteUser };
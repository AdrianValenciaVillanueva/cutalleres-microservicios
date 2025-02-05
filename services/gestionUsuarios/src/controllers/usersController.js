const db = require('../../models');

const createUser = async (req, res) => {
    try{
        const usuario = await db.Usuario.create({
            codigo_udg: req.body.codigo_udg,
            correo: req.body.correo,
            contrasena: req.body.contrasena
        });
        res.status(201).json(usuario);
    }catch(error){
        res.status(500).json({error: "Error al crear usuario"});
    }
};

const getUser = async (req, res) => {
    res.send("Usuario obtenido");
}

const updateUser = async (req, res) => {
    res.send("Usuario actualizado");
}

const deleteUser = async (req, res) => {
    res.send("Usuario eliminado");
}

module.exports = { createUser, getUser, updateUser, deleteUser };
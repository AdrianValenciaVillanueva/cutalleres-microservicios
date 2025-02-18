const db = require('../../models');
const bcrypt = require('bcrypt');
const { use } = require('../routes/users');

const createUser = async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
        const usuario = await db.Usuario.create({
            codigo_udg: req.body.codigo_udg,
            correo: req.body.correo,
            contrasena: hashedPassword
        });
        const {contrasena, ...userWithoutPassword} = usuario.toJSON();
        res.status(201).json(userWithoutPassword);
    }catch(error){
        res.status(500).json({error: "Error al crear usuario"});
    }
};

const getUsers = async (req, res) => {
    try{
        const usuarios = await db.Usuario.findAll();
        res.status(200).json(usuarios);
    }catch(error){
        res.status(500).json({error: "Error al obtener usuario"});
    }
}

const loginUser = async (req,res) => {
    try{
        const usuario = await db.Usuario.scope('withPassword').findOne(
            {
               where:{
                    codigo_udg: req.body.codigo_udg
               } 
            }
        );
        if(!usuario){
            return res.status(404).json({error: "Usuario no encontrado"});
        }

        const contrasenaValida = await bcrypt.compare(req.body.contrasena, usuario.contrasena);

        if(contrasenaValida){
            const { contrasena, ...userWithoutPassword } = usuario.toJSON();//desestructacion del objeto usuario para ocultar la contrasena
            return res.status(200).json(userWithoutPassword);
        }else{
            return res.status(401).json({error: "Contraseña incorrecta"});
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error al obtener usuario"});
    }
}

const updateUser = async (req, res) => {
    res.send("Usuario actualizado");
}

const deleteUser = async (req, res) => {
    res.send("Usuario eliminado");
}

module.exports = { createUser, getUsers,loginUser, updateUser, deleteUser };
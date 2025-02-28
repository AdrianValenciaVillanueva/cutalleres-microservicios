const db = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
            //crear token
            const token = jwt.sign(userWithoutPassword, process.env.JWT_SECRET, {expiresIn: '1h'});

            res.setHeader('Authorization', `Bearer ${token}`);
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
    try{
        const usuario = await db.Usuario.scope("withPassword").findOne({
            where:{
                codigo_udg: req.body.codigo_udg
            }
        });
        if(!usuario){
            return res.status(404).json({error: "Usuario no encontrado"});
        }
        
        const updates = {
            correo: req.body.correo,
            codigo_udg: req.body.codigo_udg
        };
        if(req.body.contrasena){
            const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
            updates.contrasena = hashedPassword;
        }

        await usuario.update(updates);

        const {contrasena, ...userWithoutPassword} = usuario.toJSON();
        return res.status(200).json(userWithoutPassword);
    
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error al actualizar usuario"});
    }
}

const deleteUser = async (req, res) => {
    try{
        const usuario = await db.Usuario.findOne({
            where:{
                codigo_udg: req.body.codigo_udg
            }
        });
        if(!usuario){
            return res.status(404).json({error: "Usuario no encontrado"});
        }
        await usuario.destroy();
        return res.status(200).json({message: "Usuario eliminado"});
        
    }catch(error){
        console.log(error);
        return res.status(500).json({error: "Error al eliminar usuario"});
    }
}

module.exports = { createUser, getUsers,loginUser, updateUser, deleteUser };
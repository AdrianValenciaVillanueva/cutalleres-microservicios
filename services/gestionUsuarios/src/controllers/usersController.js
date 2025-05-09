const db = require('../../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    try{
        //validacion basica de los datos
        if(!req.body.codigo_udg || !req.body.correo || !req.body.contrasena){
            return res.status(400).json({error: "todos los datos son requeridos"});
        }

        const hashedPassword = await bcrypt.hash(req.body.contrasena, 10);
        const usuario = await db.Usuario.create({
            codigo_udg: req.body.codigo_udg,
            correo: req.body.correo,
            contrasena: hashedPassword,
            rol: req.body.rol || 'user'
        });
        const {contrasena, ...userWithoutPassword} = usuario.toJSON();
        return res.status(201).json(userWithoutPassword);
    }catch(error){
        console.log(error);
        if(error.name === 'SequelizeUniqueConstraintError'){
            return res.status(409).json({error: 'El usuario ya existe'});
        }
        return res.status(500).json({error: "Error al crear usuario"});
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
        //validacion basica de los datos
        if(!req.body.codigo_udg || !req.body.contrasena){
            return res.status(400).json({error: "Codigo UDG y contraseña son requeridos"});
        }

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
            const { contrasena, ...userWithoutPassword } = usuario.toJSON();

            // Obtener la información adicional del usuario
            const infoUsuario = await db.Registro.findOne({
                where: { codigo_udg: usuario.codigo_udg }
            });

            // Unir la información adicional al payload del token
            const payload = {
                ...userWithoutPassword,
                info: infoUsuario ? infoUsuario.toJSON() : null
            };
            console.log("Payload:", payload);

            //crear token con el payload extendido
            const token = jwt.sign(
                payload,
                process.env.JWT_SECRET, 
                {
                    expiresIn: '1h',
                    issuer: 'gestionUsuarios-api'
                });

            //enviar respuesta
            return res.status(200).json({
                user: payload,
                token: token
            });
            
        }else{
            return res.status(401).json({error: "Contraseña incorrecta"});
        }

    }catch(error){
        console.log("Error en el:",error);
        return res.status(500).json({error: "Error al procesar la solicitud"});
    }
}

const updateUser = async (req, res) => {
    try{

        const codigoUdg = req.user.codigo_udg;

        const usuario = await db.Usuario.scope("withPassword").findOne({
            where:{
                codigo_udg: codigoUdg
            }
        });

        if(!usuario){
            return res.status(404).json({error: "Usuario no encontrado"});
        }

        //datos a actualizar
        const updates = {};


        if(req.body.correo){
            updates.correo = req.body.correo;
        }
        if(req.body.contrasena){
            updates.contrasena = await bcrypt.hash(req.body.contrasena, 10);
        }

        await usuario.update(updates);

        const {contrasena, ...userWithoutPassword} = usuario.toJSON();
        return res.status(200).json(userWithoutPassword);
    
    }catch(error){
        console.log("Error al actualizar usuario:",error);
        return res.status(500).json({error: "Error al actualizar usuario"});
    }
}

const deleteUser = async (req, res) => {
    try{

        //validar que sea admin si no solo se puede eliminar asimismo
        const codigoUdg = req.user.rol === 'admin'
            ? req.body.codigo_udg
            : req.user.codigo_udg;

        const usuario = await db.Usuario.findOne({
            where:{
                codigo_udg: codigoUdg
            }
        });

        if(!usuario){
            return res.status(404).json({error: "Usuario no encontrado"});
        }

        //eliminar informacion asociada al usuario
        const infoUsuario = await db.Registro.findOne({
            where:{
                codigo_udg: codigoUdg
            }
        });
        if(infoUsuario){
            await infoUsuario.destroy();
        }
        
        await usuario.destroy();
        return res.status(200).json({message: "Usuario eliminado correctamente"});
        
    }catch(error){
        console.log("Error al eliminar usuario:",error);
        return res.status(500).json({error: "Error al eliminar usuario"});
    }
}

//metodos para gurdar informacion adicional del usuario
const dataUser = async (req,res) => {
    try {
        //validacion basica
        if(!req.body.nombre || !req.body.sexo || !req.body.edad){
            return res.status(400).json({error: "Nombre, sexo y edad son requeridos"});
        }

        const codigoUdg = req.user.codigo_udg;

        //verificar si ya existe informacion para este usuario
        const existingInfo = await db.Registro.findOne({
            where:{
                codigo_udg: codigoUdg
            }
        });

        if(existingInfo){
            await existingInfo.update({
                nombre: req.body.nombre,
                sexo: req.body.sexo,
                edad: req.body.edad
            });
            return res.status(200).json(existingInfo);
        }

        //crear nueva informacion
        const newInfo = await db.Registro.create({
            nombre: req.body.nombre,
            sexo: req.body.sexo,
            edad: req.body.edad,
            codigo_udg: codigoUdg
        });

        return res.status(201).json(newInfo);
    } catch(error) {
        console.log("Error al guardar informacion del usuario:", error);
        return res.status(500).json({error: "Error al guardar información del usuario"});
    }
}


//Cambio de Rol Usuario - Tallerista

const roleChange = async (req, res) => {
    try{
        const codigo = req.body.codigo_udg;

        const usuario = await db.Usuario.findOne({
            where: {codigo_udg: codigo}
        });

        if(!usuario){
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        if(usuario.rol === "tallerista"){
            return res.status(404).json({error: "El usuario ya era tallerista"});
        }

        await usuario.update({
            rol: "tallerista"
        });

        return res.status(200).json({ message: "Rol cambiado a tallerista correctamente" });

            
    }catch(error){
        res.status(500).json({error: "Error al intentar cambiar de rol al usuario"});
    }

}


module.exports = { 
        createUser,
        getUsers,
        loginUser,
        updateUser,
        deleteUser,
        dataUser,
        roleChange
    };
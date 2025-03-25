const jwt = require('jsonwebtoken');

// Middleware para verificar si el usuario está autenticado
const authenticateUsers = (req, res, next) => {
    try {
        //obtener el token del encabezado
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];//separar el token del texto 'Bearer'

        //si no hay token, se envía un error
        if(!token){
            return res.status(401).json({error: 'Acceso denegado. No se proporciono el token'});
        }

        //verificar el token 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;//guardar el usuario decodificado para usarlo en los controladores
        next();

    } catch (err) {  
        //si el token no es valido, se envía un error
        if(err.name === 'TokenExpiredError'){
            return res.status(401).json({error: 'Token expirado. Por favor inicie sesión nuevamente'});
        }
        return res.status(403).json({error: 'Token no válido'});
    }
};

module.exports = authenticateUsers;
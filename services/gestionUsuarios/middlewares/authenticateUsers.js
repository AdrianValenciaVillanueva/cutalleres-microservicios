const jwt = require('jsonwebtoken');

// Middleware para verificar si el usuario está autenticado
const authenticateUsers = (req, res, next) => {
    // Obtener el token del encabezado
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Separar el texto Bearer del token

    // Si no hay token
    if (!token) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token.' });
    }

    // Verificar el token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        // Si hay un error
        if (err) {
            return res.status(403).json({ error: 'Token no válido.' });
        }

        req.user = user; // Guardar el usuario ya decodificado para usarlo en los controladores
        next();
    });
};

module.exports = authenticateUsers;
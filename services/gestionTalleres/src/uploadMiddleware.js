// uploadMiddleware.js
const multer = require('multer');

// Configuración del almacenamiento (directo en memoria para enviar a la BD)
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Limite de 5MB
});

module.exports = upload;

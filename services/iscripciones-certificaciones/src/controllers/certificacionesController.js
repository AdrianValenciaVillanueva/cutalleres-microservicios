const { Certificacion, Inscripcion } = require('../../models'); // Importa desde index.js
const fs = require('fs');
const path = require('path');

//Obtener todas las certificaciones
exports.getAllCertificaciones = async (req, res) => {
    try {
        const certificaciones = await Certificacion.findAll();
        res.json(certificaciones);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener certificaciones' });
    }
};

//Obtener una certificación id
exports.getCertificacionById = async (req, res) => {
    try {
        const certificacion = await Certificacion.findByPk(req.params.id);
        if (certificacion) {
            res.json(certificacion);
        } else {
            res.status(404).json({ error: 'Certificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la certificación' });
    }
};

//Crear una nueva certificación
exports.createCertificacion = async (req, res) => {
    try {
        const { ID_inscripcion, estado, fecha_emision, Certificado } = req.body;
        const nuevaCertificacion = await Certificacion.create({
            ID_inscripcion,
            estado,
            fecha_emision
        });
        res.status(201).json(nuevaCertificacion);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la certificación' });
    }
};

//Actualizar una certificación
exports.updateCertificacion = async (req, res) => {
    try {
        const certificacion = await Certificacion.findByPk(req.params.id);
        if (certificacion) {
            await certificacion.update(req.body);
            res.json(certificacion);
        } else {
            res.status(404).json({ error: 'Certificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la certificación' });
    }
};

// Eliminar una certificación
exports.deleteCertificacion = async (req, res) => {
    try {
        const certificacion = await Certificacion.findByPk(req.params.id);
        if (certificacion) {
            await certificacion.destroy();
            res.json({ message: 'Certificación eliminada correctamente' });
        } else {
            res.status(404).json({ error: 'Certificación no encontrada' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la certificación' });
    }
};

// Subir certificado PDF basado en ID_inscripcion
exports.subirCertificado = async (req, res) => {
    try {
        const { ID_inscripcion } = req.params; // ID de la inscripción desde la URL
        const pdfFile = req.file; // Archivo subido vía multer

        // Verificar si se proporcionó un archivo
        if (!pdfFile) {
            return res.status(400).json({ error: "No se proporcionó ningún archivo PDF" });
        }

        // Leer el archivo como buffer
        const pdfBuffer = fs.readFileSync(pdfFile.path);

        // Actualizar el registro en la tabla Certificacion
        const [updated] = await Certificacion.update(
            { Certificado: pdfBuffer },
            { where: { ID_inscripcion } }
        );

        if (!updated) {
            return res.status(404).json({ error: "Certificación no encontrada" });
        }

        // Eliminar el archivo temporal
        fs.unlinkSync(pdfFile.path);

        res.status(201).json({
            message: "Certificado subido exitosamente",
            ID_inscripcion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al subir el certificado" });
    }
};

// Descargar certificado PDF basado en Codigo_alumno
exports.descargarCertificado = async (req, res) => {
    try {
        const { ID_inscripcion } = req.params; // ID de la inscripción desde la URL

        // Buscar el certificado asociado al ID_inscripcion
        const certificado = await Certificacion.findOne({
            where: { ID_inscripcion }
        });

        if (!certificado || !certificado.Certificado) {
            return res.status(404).json({ error: "Certificado no encontrado" });
        }

        if (certificado.estado !== "Generado") {
            return res.status(400).json({ error: "El certificado no está en estado 'Generado'" });
        }

        // Convertir el buffer a un archivo PDF (opcional, si necesitas inspeccionarlo)
        const pdfBuffer = Buffer.from(certificado.Certificado);
        const filePath = `certificado_${ID_inscripcion}.pdf`;

        // Si deseas guardar el archivo temporalmente para inspección
        // const fs = require('fs');
        // fs.writeFileSync(filePath, pdfBuffer);

        // Configurar headers para la descarga
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', `attachment; filename=${filePath}`);

        // Enviar el buffer como archivo
        res.send(pdfBuffer);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al descargar el certificado" });
    }
};
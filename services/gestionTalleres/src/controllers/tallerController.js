const db = require('../../models'); //se selecciona la carpeta "models", donde se encuentran los modelos de las 2 tablas de la BD
const upload = require('../uploadMiddleware');

//Crea un taller
const crearTaller = async (req, res) => {
    try{
        const imagen = req.file ? req.file.buffer : null;
        //Creación de fila en la primera tabla
        const taller = await db.GestionTaller.create({
            nombre_taller: req.body.nombre_taller
        });

        //Creación de fila en la segunda tabla
        const tallerInfo = await db.DatosTaller.create({
            ID_TALLER: taller.ID_Taller,  //Se usara la ID del taller generado en la primera tabla
            estado: true, //Siempre que se cree el taller va a estar disponible
            descripcion: req.body.descripcion,
            concluido: false,
            imagen: imagen,//Por el momento la imagen se salteara hasta tener el front (Se colocara aquí la linea de código)
            fecha: req.body.fecha,
            horario: req.body.horario,
            admin_ID: req.body.admin_ID
        });

        //Respuesta que regresara la info de las filas creadas
        res.status(201).json({
            taller: taller,
            tallerInfo: tallerInfo
        });

    }catch(error){
        res.status(500).json({error: "Error al intentar crear el taller"});
    }
};


//Obtiene la información de un taller (Solo la primera tabla, metodo de prueba)
const getTaller = async (req, res) => {
    try {
        const id = req.params.id; //Obtenemos el ID de los parámetros de la URL
        const taller = await db.GestionTaller.findOne({ 
            where: { ID_Taller: id } 
        });

        if (!taller) {
            return res.status(404).json({ message: "Taller no encontrado" });
        }

        res.status(200).json(taller); //Enviamos el taller encontrado como respuesta
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el taller" });
    }
}

//Actualiza la descripción del taller (Solo para talleristas)
const actualizarDes = async (req, res) => {
    try{
        const {ID_TALLER} = req.body
        const {descripcion} = req.body //Se obtiene la descripción del JSON

        const taller = await db.DatosTaller.findOne({ where: { ID_TALLER: ID_TALLER } });

        if(!taller){
            res.status(404).json({error: "Taller no encontrado"})
        }

        //Aqui cambia la descripción donde este el ID_TALLER en la BD
        await db.DatosTaller.update(
            {descripcion}, //Solo pongo descripción ya que ambos se llaman igual y asi simplicar descripcion : descripcion
            {where: {ID_TALLER}} //Lo mismo aqui se evita ser redundante (ID_TALLER: ID_TALLER)
        );

        res.status(200).json("Descripción actualizada correctamente")

    }catch(error){
        res.status(500).json({error: "Error al cambiar la desscripción del taller"})
    }
}

//Elimina un taller de las 2 tablas
const deleteTaller = async (req, res) => {
    try{
        const { ID_Taller } = req.body; //Se extrae del JSON la variable ID_Taller

        //Buscar en las tablas usando el nombre correcto de la columna en la BD
        const [tallerDatos, taller] = await Promise.all([
            db.DatosTaller.findOne({ where: { ID_TALLER: ID_Taller } }), 
            db.GestionTaller.findOne({ where: { ID_TALLER: ID_Taller } })
        ]);

        if (!taller && !tallerDatos) {
            return res.status(404).json({ error: "Taller no encontrado en ninguna de las tablas" });
        }

        //Primero eliminar en la tabla con la clave foránea
        if (tallerDatos) 
            await tallerDatos.destroy();
        if (taller) 
            await taller.destroy();

        return res.status(200).json({ message: "Taller eliminado correctamente" });
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al eliminar el taller" });
    }
};

//Muestra los datos de las targetas de la página "lista de talleres" / Falta agregar la imagen
const listaTalleres = async (req, res) => {
    try {
        const talleres = await db.GestionTaller.findAll({
            include: {
                model: db.DatosTaller,
                as: 'datosTaller',
                required: true
            }
        });

        const talleresData = talleres.map(taller => ({
            ID_Taller: taller.ID_Taller,
            nombre: taller.nombre_taller,
            concluido: taller.datosTaller?.concluido ? "Finalizado" : "Activo",
            estado: taller.datosTaller.estado,
            fecha: taller.datosTaller.fecha,
            horario: taller.datosTaller.horario,
            admin_ID: taller.datosTaller.admin_ID,
            imagen: taller.datosTaller.imagen 
                ? `data:image/jpeg;base64,${taller.datosTaller.imagen.toString('base64')}`
                : null
        }));

        console.log("Datos mapeados para el front:", talleresData);
        return res.status(200).json(talleresData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al obtener los talleres" });
    }
};


//Vista de los detalles completos del taller 
const vistaTaller = async (req, res) => {
    try {
        const { ID_Taller } = req.body;

        const taller = await db.GestionTaller.findOne({
            where: { ID_Taller },
            include: {
                model: db.DatosTaller,
                as: 'datosTaller'
            }
        });

        if (!taller) {
            return res.status(404).json({ error: "Taller no encontrado" });
        }

        const tallerInfo = {
            id: taller.ID_Taller,
            nombre: taller.nombre_taller,
            estado: taller.datosTaller.estado ? "Alta" : "Baja",
            descripcion: taller.datosTaller.descripcion,
            concluido: taller.datosTaller.concluido ? "Concluido" : "Taller",
            imagen: taller.datosTaller.imagen 
                ? `data:image/jpeg;base64,${taller.datosTaller.imagen.toString('base64')}`
                : null,
            fecha: taller.datosTaller.fecha,
            horario: taller.datosTaller.horario,
            admin_ID: taller.datosTaller.admin_ID
        };

        res.status(200).json(tallerInfo);

    } catch (error) {
        res.status(500).json("Error al obtener los datos del taller");
    }
};

//Metodo para dar de baja un taller
const bajaTaller = async (req, res) => {
    try{
        const id = req.body.ID_Taller;

        //Buscar en las tabla "DatosTaller" la fila con el id obtenido
        const datosTaller = await db.DatosTaller.findOne({
            where: {ID_Taller: id}
        });

        if (!datosTaller) {
            return res.status(404).json({ error: "Taller no encontrado" });
        }

        if (datosTaller.estado === false) {
            return res.status(400).json({ error: "El taller ya estaba dado de baja." });
        }

        await datosTaller.update({ 
            estado: false 
        });

        return res.status(200).json({ message: "Taller dado de baja correctamente" });

    }catch(error){
        res.status(500).json("Error al tratar de dar de baja el taller")
        details: error.message 
    }
}

//Metodo para finalizar un taller
const concluirTaller = async(req,res) => {
    try{
        const id = req.body.ID_Taller;

        const datosTaller = await db.DatosTaller.findOne({
            where:{ ID_Taller: id}
        })

        if (!datosTaller) {
            return res.status(404).json({ error: "Taller no encontrado" });
        }

        if (datosTaller.concluido === true) {
            return res.status(400).json({ error: "El taller ya se habia registrado como concluido" });
        }

        await datosTaller.update({ 
            concluido: true 
        });

        return res.status(200).json({ message: "Taller concluido correctamente, SUBA LOS CERTIFICADOS" });
    }catch(error){

    }
}




//El comando para correr el docker "docker compose up --build -d"

//Se exportan los metodos, si no no se detectaran en otros archivos
module.exports = {crearTaller, getTaller, actualizarDes, deleteTaller, listaTalleres, vistaTaller, bajaTaller, concluirTaller};
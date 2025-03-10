const db = require('../../models'); //se selecciona la carpeta "models", donde se encuentran los modelos de las 2 tablas de la BD

//Crea un taller
const createTaller = async (req, res) => {
    try{
        const Taller = await db.GestionTaller.create({
            ID_Taller: req.body.ID_Taller,
            nombre_taller: req.body.nombre_taller
        });

        res.status(201).json(Taller);
    }catch(error){
        res.status(500).json({error: "Error al intentar crear el taller"});
    }
};

//Obtiene la información de un taller
const getTaller = async (req, res) => {
    try {
        const id = req.params.id; // Obtenemos el ID de los parámetros de la URL
        const taller = await db.GestionTaller.findOne({ 
            where: { ID_Taller: id } 
        });

        if (!taller) {
            return res.status(404).json({ message: "Taller no encontrado" });
        }

        res.status(200).json(taller); // Enviamos el taller encontrado como respuesta
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el taller" });
    }
}

//Solo prueba
const updateTaller = async (req, res) => {
    res.send("Taller actualizado");
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

        // Primero eliminar en la tabla con la clave foránea
        if (tallerDatos) await tallerDatos.destroy();
        if (taller) await taller.destroy();

        return res.status(200).json({ message: "Taller eliminado correctamente" });
    }catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Error al eliminar el taller" });
    }
};

//Muestra los datos de las targetas de la lista de talleres
const listaTalleres = async (req, res) => {
    try {
        //Obtener talleres con su información de DatosTaller
        const talleres = await db.GestionTaller.findAll({
            include: {
                model: db.DatosTaller,
                as: 'datosTaller', //Se debe de usar este nombre para poder tomar datos de la tabla "datos-taller"
                required: true //Solo tomará talleres que tengan datos en la otra tabla
            }
        });

       //Constante que tendra los datos de los talleres
        const talleresData = talleres.map(taller => ({
            id: taller.ID_Taller,
            nombre: taller.nombre_taller,
            estado: taller.datosTaller?.estado ? "Activo" : "Inactivo",
            fecha: taller.datosTaller.fecha,
            horario: taller.datosTaller.horario,
        }));

        return res.status(200).json(talleresData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al obtener los talleres" });
    }
};

//Comando para correr el docker "docker compose up --build -d"
module.exports = {createTaller, getTaller, updateTaller, deleteTaller, listaTalleres};
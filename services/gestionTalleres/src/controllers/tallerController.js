const db = require('../../models'); //se selecciona la carpeta "models", donde se encuentran los modelos de las 2 tablas de la BD

//Crea un taller
const crearTaller = async (req, res) => {
    try{
        //Creación de fila en la primera tabla
        const taller = await db.GestionTaller.create({
            nombre_taller: req.body.nombre_taller
        });

        //Creación de fila en la segunda tabla
        const tallerInfo = await db.DatosTaller.create({
            ID_TALLER: taller.ID_Taller,  //Se usara la ID del taller generado en la primera tabla
            estado: true, //Siempre que se cree el taller va a estar disponible
            descripcion: req.body.descripcion,
            //Por el momento la imagen se salteara hasta tener el front (Se colocara aquí la linea de código)
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

//Vista de los detalles completos del taller 
const vistaTaller = async (req, res) => {
    try{
        const {ID_Taller} = req.body //Se obtiene de la solicitud del JSON

        //Se busca el ID del taller en las tablas
        const taller = await db.GestionTaller.findOne({
            where: {ID_Taller},
            include: {
                model: db.DatosTaller, //Modelo de la BD
                as: 'datosTaller' //Relacion definida al modelo
            }
        });

        if(!taller) //Si no se encuentra el taller solicitado
            return res.status(404).json({ error: "Taller no encontrado" });

        //Respuesta de la solicitud, solo si se encontro
        const tallerInfo = {
            id: taller.ID_Taller,
            nombre: taller.nombre_taller,
            estado: taller.datosTaller.estado ? "Activo" : "Inactivo", //Si es true o false
            descripcion: taller.datosTaller.descripcion,
            imagen: taller.datosTaller?.imagen, //Por el momento la imagen es opcional, no marcara error
            fecha: taller.datosTaller.fecha,
            horario: taller.datosTaller.horario,
            admin_ID: taller.datosTaller.admin_ID
        };

         res.status(200).json(tallerInfo); //Se envian los datos completos del taller

    }catch(error){
         res.status(500).json("Error al obtener los datos del taller")
    }
}



//Comando para correr el docker "docker compose up --build -d"
module.exports = {crearTaller, getTaller, actualizarDes, deleteTaller, listaTalleres, vistaTaller};
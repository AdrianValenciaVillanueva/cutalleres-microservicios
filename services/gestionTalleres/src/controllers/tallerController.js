const db = require('../../models'); //se selecciona la carpeta "models", donde se encuentran los modelos de las 2 tablas de la BD

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

const getTaller = async (req, res) => {
    res.send("Taller obtenido");
}

//Solo prueba
const updateTaller = async (req, res) => {
    res.send("Taller actualizado");
}

//Solo prueba
const deleteTaller = async(req, res) => {
    res.send("taller eliminado");
}

module.exports = {createTaller, getTaller, updateTaller, deleteTaller};
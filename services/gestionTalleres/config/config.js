//cargar variables de entorno
require('dotenv').config();

module.exports = {
    //configuracion de la base de datos
    development:{
        //Datos del .env del microservicio
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect:'mysql',
        port: process.env.DB_PORT,
    }
};
//importar variables de entorno
require('dotenv').config();

//importar configuracion de la app
const app = require("./src/app");

//definir puerto
const PORT = process.env.PORT || 3000;

//iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
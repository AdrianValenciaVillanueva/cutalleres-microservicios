//obrener variables de entorno
require('dotenv').config();
//importa la configuracion da la app
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

//iniciar el servidor
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
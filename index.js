//Connection BD
const { dbConnection } = require('./database/config');
//Necesario para poder acceder a las Variables de Entorno
require('dotenv').config();

const cors = require('cors');

//Express
const express = require('express');

//Rutes Express
const app = express();
dbConnection();


//CORS - permite peticiones o restringir 
//Postman se salta los cors porque esta en local
app.use(cors());



//Lectura y parseo del body - Para procesar lo que venga en JSON
app.use( express.json() );

//Auth - todo lo que ./routes/auth vaya a exportar lo vaya a habilitar en esta ruta
app.use('/api/auth', require('./routes/auth'));


//Port for listen to petitions
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${ process.env.PORT }`);
})
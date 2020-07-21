//Require

    //Usando variables de entorno
require('dotenv').config();

    //Const
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


//Conf. de BD
const { dbConnection } = require('./database/config');

//Inicializar variables
var app = express();

//Configurar CORS
app.use( cors() );

//Base de datos
dbConnection();


//Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/usuario');


//Rutas
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);
app.use('/login', loginRoutes);

//escuchar peticiones
const puerto = 3000;
app.listen(puerto,() => {
    console.log('Node/Express: \x1b[36m%s\x1b[0m', 'online','Corriendo en el puerto:' + ' \x1b[36m'+puerto+'\x1b[0m\ ');
} );






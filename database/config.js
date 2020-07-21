 const mongoose = require('mongoose');
require('dotenv').config();

//Conexion a BD

 //mongo User y Pass
 //user_mongo
 //gg01O35GvuBQ8d0I


 const dbConnection = async () => {

     try{
         mongoose.connect(process.env.DB_CNN, {
             useNewUrlParser: true,
             useUnifiedTopology: true,
             useCreateIndex: true

         });

         console.log('Base de datos: \x1b[36m%s\x1b[0m', 'online');

     }catch (error) {
         console.log(error);
         throw new Error('Error al iniciar la BD');
     }

     /*Conexion anterior
     mongoose.connection.openUri('mongodb://localhost:27017/Hospital-BD', (err, res)=> {
         if (err) throw err;
         console.log('Base de datos: \x1b[36m%s\x1b[0m', 'online');
     });*/

 }

 module.exports = {
     dbConnection
 }

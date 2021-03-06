var express = require('express');
var bcrypt = require('bcrypt');

var app = express();

var Usuario = require('../models/usuario');


//
//Obtener Todos los usuarios | GET
//
app.get('/', (req, res, next) =>{
    Usuario.find({}, 'nombre email img role')
        .exec (
                (err, usuarios) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            mensaje: 'Error al cargar Usuarios',
                            errors: err
                        });
                    }
        res.status(200).json({
            ok: true,
            usuarios: usuarios
        });
    });
});


//
//Actualizar usuario | PUT
//


app.put('/:id', (req, res) => {

   var id = req.params.id;
   var body = req.body;

   Usuario.findById( id, (err, usuario ) =>{

       if (err) {
           return res.status(500).json({
               ok: false,
               mensaje: 'Error al buscar usuario',
               errors: err
           });
       }

       if (!usuario) {
           return res.status(400).json({
               ok: false,
               mensaje: 'El usuario con el id ' + id + ' no existe',
               errors: { message: 'No existe un usuario con ese ID'}
           });
       }

       usuario.nombre = body.nombre;
       usuario.email = body.email;
       usuario.role = body.role;

       usuario.save ( (err, usuarioGuardado) =>{
           if (err) {
               return res.status(400).json({
                   ok: false,
                   errors: err,
                   mensaje: 'Error al actualizar usuario'
               });
           }

           usuarioGuardado.password = 'Hello...';

           res.status(200).json({
               ok: true,
               usuario: usuarioGuardado
           });

       });

   });

});



//
//Crear un usuario | POST
//

app.post('/', (req, res) => {
    var body = req.body;

    var usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role
    })

    usuario.save( (err, usuarioGuardado) =>{

        if (err) {
            return res.status(400).json({
               ok: false,
               mensaje: 'Error al crear usuario',
               errors: err
            });
        }

        res.status(201).json({
            ok: true,
            usuario: usuarioGuardado
        });
    });

});

//
//Borrar usuario por Id | DELETE
//


app.delete('/:id', (req, res)=> {
   var id = req.params.id;

   Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {
       if (err) {
           return res.status(500).json({
               ok: false,
               mensaje: 'Error al borrar usuario',
               errors: err
           });
       }

       if (!usuarioBorrado) {
           return res.status(400).json({
               ok: false,
               mensaje: 'No existe un usuario con este id: ' + id ,
               errors: err
           });
       }

       res.status(202).json({
           ok: true,
           usuario: usuarioBorrado
       });
   })
});




module.exports = app;
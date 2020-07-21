var express = require('express');
var bcrypt = require('bcrypt');

var app = express();
var Usuario = require('../models/usuario');

app.post('/', (req, res) => {

    res.status(200).json({
       ok: true,
       mensaje: 'login post correcto'
    });
});

module.exports = app;
const path = require('path');
require('dotenv').config()

const express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('Este es el Home');
})

app.get('/detalle-producto', function(req, res) {
    res.send('Este es el Detail Product');
})

app.get('/carrito', function(req, res) {
    res.send('Este es el Cart');
})

app.get('/nicio-sesion', function(req, res) {
    res.send('Este es el Login');
})


app.get('/registrarme', function(req, res) {
    res.send('Este es el Register');
})

app.listen(process.env.PUERTO, function() {
    console.log("Servidor iniciado en puerto: " + process.env.PUERTO + "...")
});
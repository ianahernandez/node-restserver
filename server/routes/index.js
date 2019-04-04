const express = require('express');

const app = express();


//Uso de las rutas definidas para el usuario
app.use(require('./usuario'));
//Uso de las rutas definidas para el login
app.use(require('./login'));

module.exports = app;
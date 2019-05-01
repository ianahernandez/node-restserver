const express = require('express');

const app = express();


//Uso de las rutas definidas para el usuario
app.use(require('./usuario'));
//Uso de las rutas definidas para el login
app.use(require('./login'));
//Uso de las rutas definidas para las categorias 
app.use(require('./categoria'));
//Uso de las rutas definidas para los productos 
app.use(require('./producto'));

module.exports = app;
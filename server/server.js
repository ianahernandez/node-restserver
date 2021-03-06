require('./config/config.js');

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

// Body parser ser utiliza para traer los datos al servidor en formato JSON
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// habilitar la carpeta public
app.use(express.static(path.resolve(__dirname, '../public')));
//console.log(path.resolve(__dirname, '../public'));

//Configuracion global de las rutas
app.use(require('./routes/index'));

app.get('/', function(req, res) {
    res.json('Hello World');
})


//Conexión a la base de datos de Mongo
mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true },
    (err, resp) => {
        if (err) throw new Error(err);
        console.log('Base de datos online');
    });

app.listen(process.env.PORT, () => {
    console.log(`Escuchando al puerto ${process.env.PORT}`);
})
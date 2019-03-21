require('./config/config.js');

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())


app.get('/', function(req, res) {
        res.json('Hello World')
    })
    //get
app.get('/usuario', function(req, res) {
        res.json('get Usuario')
    })
    //post
app.post('/usuario', function(req, res) {
        let body = req.body;
        if (body.nombre === undefined) {
            res.status(400).json({
                ok: false,
                mensaje: 'El nombre es requerido'
            })

        }
        res.json({
            persona: body
        });
    })
    //put
app.put('/usuario/:id', function(req, res) {

        let id = req.params.id;
        res.json({
            id
        })
    })
    //delete
app.delete('/usuario', function(req, res) {
    res.json('delete Usuario')
})


app.listen(process.env.PORT, () => {
    console.log(`Escuchando al puerto ${process.env.PORT}`);
})
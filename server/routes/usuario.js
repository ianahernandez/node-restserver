const express = require('express');

const bcrypt = require('bcrypt');

const _ = require('underscore');

const Usuario = require('../models/usuario');

const { verificarToken, verificarAdminRole } = require('../middlewares/autenticacion')

const app = express();

//get
app.get('/usuario', verificarToken, (req, res) => {

    //Parametros opcionales req.query

    let desde = req.query.desde || 0;

    desde = Number(desde);

    let limite = req.query.limite || 5;

    limite = Number(limite);

    Usuario.find({ estado: true }, 'nombre email rol estado')
        .skip(desde)
        .limit(limite)
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                })
            }

            Usuario.count({}, (err, cantidad) => {
                res.json({
                    ok: true,
                    usuarios,
                    cantidad
                });

            })
        })

});
//post
app.post('/usuario', [verificarToken, verificarAdminRole], function(req, res) {

    let body = req.body;

    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    usuario.save((err, usuariodb) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        //usuariodb.password = null;
        res.json({
            ok: true,
            usuario: usuariodb
        });
    })

});
//put
app.put('/usuario/:id', [verificarToken, verificarAdminRole], function(req, res) {

    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'img', 'email', 'estado']);

    delete body.password;
    delete body.google;

    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, usuariodb) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        //usuariodb.password = null;
        res.json({
            ok: true,
            usuario: usuariodb
        });
    })

});
//delete
app.delete('/usuario/:id', [verificarToken, verificarAdminRole], function(req, res) {
    let id = req.params.id;
    Usuario.findByIdAndUpdate(id, { estado: false }, (err, usuariodb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        //usuariodb.password = null;
        if (!usuariodb) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            })
        }

        res.json({
            ok: true,
            usuario: usuariodb
        });
    })
});


module.exports = app;
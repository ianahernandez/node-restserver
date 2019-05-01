const express = require('express');

const { verificarToken, verificarAdminRole } = require('../middlewares/autenticacion');

const app = express();

const _ = require('underscore');

const Categoria = require('../models/categoria');

// ========================================
//      MOSTRAR TODAS LAS CATEGORIAS 
// ========================================
app.get('/categoria', verificarToken, (req, res) => {

    Categoria.find({})
        .exec((err, categorias) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                categorias
            });
        });
});

// ========================================
//     MOSTRAR UNA CATEGORIA POR ID
// ========================================
app.get('/categoria/:id', verificarToken, (req, res) => {

    let id = req.params.id
    Categoria.findById(id, (err, categoria) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            categoria
        });
    });

});

// ========================================
//         CREAR NUEVA CATEGORIA
// ========================================
app.post('/categoria', [verificarToken, verificarAdminRole], (req, res) => {

    let body = req.body;
    let usuario = req.usuario;

    console.log(usuario);

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: usuario._id
    });

    categoria.save((err, categoriadb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!categoriadb) {
            return res.status(400).json({
                ok: false,
                err
            })
        }
        res.json({
            ok: true,
            categoriadb
        });
    });
});

// ========================================
//         ACTUALIZAR CATEGORIA
// ========================================
app.put('/categoria/:id', [verificarToken, verificarAdminRole], (req, res) => {
    let body = req.body;
    let id = req.params.id;
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, categoriadb) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            categoria: categoriadb
        });
    });

});

// ========================================
//         ELIMINAR UNA CATEGORIA
// ========================================
// Solo un admin puede eliminar la categoria (Eliminacion fisica)
app.delete('/categoria/:id', (req, res) => {

    let id = req.params.id;
    Categoria.findByIdAndRemove(id, (err, categoriadb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriadb) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "Categoria no encontrada"
                }
            })
        }

        res.json({
            ok: true,
            categoria: categoriadb
        });
    })
});

module.exports = app;
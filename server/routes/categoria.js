const express = require('express');

let { verificarToken, verificarAdminRole } = require('../middlewares/autenticacion');

let app = express();

const Categoria = require('../models/categoria');

// ========================================
//      MOSTRAR TODAS LAS CATEGORIAS 
// ========================================
app.get('/categoria', (req, res) => {

    Categoria.find({})
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
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
app.get('/categoria/:id', (req, res) => {

    Categoria.findById(id, (err, categoria) => {
        if (err) {
            return res.status(400).json({
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
app.post('/categoria', verificarToken, (req, res) => {

});

// ========================================
//         ACTUALIZAR CATEGORIA
// ========================================
app.put('/categoria/:id', verificarToken, (req, res) => {

});

// ========================================
//         ELIMINAR UNA CATEGORIA
// ========================================
// Solo un admin puede eliminar la categoria (Eliminacion fisica)
app.delete('/categoria/:id', (req, res) => {

});
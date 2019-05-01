const express = require('express');

const app = express();

const { verificarToken } = require('../middlewares/autenticacion');

const Producto = require('../models/producto');

// ========================================
//      MOSTRAR TODOS LOS PRODUCTOS
// ========================================
app.get('/producto', verificarToken, (req, res) => {
    //Trae todos los productos
    //Paginados
    //Populate categoria y usuario
    Producto.find({})
        .populate('categoria', 'descripcion')
        .populate('usuario', 'nombre email')
        .skip(3)
        .limit(3)
        .exec((err, productos) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!productos) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                productos
            })

        });
});

// ========================================
//      MOSTRAR UN PRODUCTO POR ID
// ========================================
app.get('/producto/:id', verificarToken, (req, res) => {
    //Populate categoria y usuario
    let id = req.params.id;

    Producto.findById(id)
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            if (!producto) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                producto
            });
        })

});

// ========================================
//      CREAR NUEVO PRODUCTO
// ========================================
app.post('/producto', verificarToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado
    let body = req.body;
    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: true,
        categoria: body.categoria,
        usuario: req.usuario._id
    });

    producto.save((err, productodb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productodb) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            producto: productodb
        });
    });
});


// ========================================
//      ACTUALIZAR UN PRODUCTO
// ========================================
app.put('/producto/id', verificarToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado
});

// ========================================
//      BORRAR UN PRODUCTO
// ========================================
app.delete('/producto/id', verificarToken, (req, res) => {
    //disponible : false
});



module.exports = app;
const express = require('express');

const app = express();

const { verificarToken } = require('../middlewares/autenticacion');

const Producto = require('../models/producto');

// ========================================
//      MOSTRAR TODOS LOS PRODUCTOS
// ========================================
app.get('/producto', (req, res) => {
    //Trae todos los productos
    //Paginados
    //Populate categoria y usuario
});

// ========================================
//      MOSTRAR UN PRODUCTO POR ID
// ========================================
app.get('/producto/:id', (req, res) => {
    //Populate categoria y usuario

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
        usuario: req.usuario.id
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
app.put('/producto/id', (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado
});

// ========================================
//      BORRAR UN PRODUCTO
// ========================================
app.delete('/producto/id', (req, res) => {
    //disponible : false
});



module.exports = app;
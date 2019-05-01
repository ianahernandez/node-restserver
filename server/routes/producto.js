const express = require('express');

const app = express();

const _ = require('underscore');

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
            res.status(201).json({
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
app.put('/producto/:id', verificarToken, (req, res) => {
    //grabar el usuario
    //grabar una categoria del listado
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioUni', 'descripcion', 'categoria']);
    body.usuario = req.usuario;

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, productodb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!productodb) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El producto no esta disponible"
                }
            });
        }
        res.json({
            ok: true,
            producto: productodb
        });
    })

});

// ========================================
//      BORRAR UN PRODUCTO
// ========================================
app.delete('/producto/:id', verificarToken, (req, res) => {
    //disponible : false
    let id = req.params.id;
    let disponibleFalse = {
        disponible: false
    }
    Producto.findByIdAndUpdate(id, disponibleFalse, { new: true }, (err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        if (!producto) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "El producto que desea eliminar no esta disponible"
                }
            });
        }
        res.json({
            ok: true,
            producto
        });
    })
});
// ========================================
//      BUSCAR PRODUCTOS POR NOMBRE
// ========================================
app.get('/producto/buscar/:termino', verificarToken, (req, res) => {

    let termino = req.params.termino;
    //Expresion regular basada en el termino
    // i: hace que sea accesible a las mayusculas y minusculas
    let regex = new RegExp(termino, 'i');
    Producto.find({ nombre: regex })
        .populate('categoria', 'descripcion')
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
                    err: {
                        message: `No se han encontrado resultados para ${termino} `
                    }
                });
            }
            res.json({
                ok: true,
                productos
            })
        });
})


module.exports = app;
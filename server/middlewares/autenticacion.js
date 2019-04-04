const jwt = require('jsonwebtoken');

//================================
//    Verificacion del Token
//================================

let verificarToken = (req, res, next) => {

    let token = req.get('Authorization');
    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    })
};

//================================
//    Verificacion de adminRole
//================================

let verificarAdminRole = (req, res, next) => {
    let usuario = req.usuario;
    if (usuario.role != 'ADMIN_ROLE') {
        return res.json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
    next();
}

module.exports = {
    verificarToken,
    verificarAdminRole
}
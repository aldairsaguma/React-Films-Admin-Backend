const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {

    // x.token - headers
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            ok : false,
            msg : 'No hay token'
        });
    }

    try {
        
        //Verificando el token

        const { uid, name } = jwt.verify(
            token,
            process.env.SECRET_JWT_SEED
        );
        
        req.uid = uid;
        req.name = name;

    } catch (error) {
        return res.status(401).status({
            ok : false,
            msg : 'Token no válido'
        });
    }


    next();
}

module.exports = {
    validateJWT
}
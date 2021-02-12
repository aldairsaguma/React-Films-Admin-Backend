const express = require('express');
const { validationResult } = require('express-validator');


const validateFields = ( req, res = express.response , next ) => {

    //Manejo de errores de express-validator
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            ok : false,
            errors : errors.mapped()
        });
    }

    //Next le dice que continue si todo está bien
    next();
}

module.exports = {
    validateFields
}
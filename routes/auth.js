/*  
    Rutas de Usuarios / Auth
    host + api/auth 
*/

const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { newUser, userLogin, renewToken } = require('../controllers/auth');
//Middlewares para validar los campos
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');



// Nuevo Usuario
//Validaciones Backend con express validator

router.post(
        '/new',
        [
            //Un middleware no es más que una función que se ejecuta antes de otra cosa
            check('name', 'El nombre es obligatirio.').not().isEmpty(),
            check('lastname', 'Los apellidos son obligatirio.').not().isEmpty(),
            check('email', 'Por favor, Ingrese un correo valido.').isEmail(),
            check('password', 'La contraseña debe tener de 4 a 30 caracteres.').isLength({ min : 4 , max : 30 }),
            validateFields
        ],   
        newUser);

//Login
router.post(
        '/', 
        [
            check('email', 'Por favor, Ingrese un correo valido.').isEmail(),
            check('password', 'La contraseña debe tener de 4 a 30 caracteres.').isLength({ min : 4 , max : 30 }),
            validateFields
        ],
        userLogin);

// Renovar Token
router.get('/renew', validateJWT, renewToken);

module.exports = router;
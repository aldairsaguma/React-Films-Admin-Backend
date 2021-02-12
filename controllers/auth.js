//Express aquí es opcional, solo se usa para habilar el autocompletado
const express = require('express');

//Crear Usuario
const User = require('../models/User');

//Encriptar contraseña
const bcrypt = require('bcryptjs');

//JWT
const { generateJWT } = require('../helpers/jwt');


//Estos controllers no son más que las funciones que que se van a desplegar en routes
const newUser = async (req, res = express.response) => {

    const { email, password } = req.body;
    
    try {
        //Buscamos en la BD si el usuario ya existe
        let user = await User.findOne({ email });
        
        if(user){
            return res.status(400).json({
                ok : false,
                msg : 'El correo ya existe'
            });
        }

      
        //Caso contrario se crear un nuevo usuario
        user = new User(req.body);
       
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        await user.save();

        //Después de guardar generamos el JWT
        const token = await generateJWT(user.id, user.name);  
    
        //No se necesita return ya que es el final de código
        //Status 201 para cuando se grabar información 
        res.status(201).json({
            ok : true,
            msg : 'Registro creado',
            uid : user.id,
            name : user.name,
            token

        });
    } catch (errors) {
        console.log(errors);
        res.status(500).json({
            ok : false,
            msg : 'Comunicarse con servicio técnico'
        });
    }
}

const userLogin = async(req, res = express.response ) => {

    const { email, password } = req.body;

    try {

        //Verificamos si el correo existe
        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                ok : false,
                msg : 'El usuario no existe'
            });
        }

        //Confirmamos si la contraseña es correcta
        const validPassword = bcrypt.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                ok : false,
                msg : 'Contraseña incorrecta'
            });
        }

        //SI las contraseñas hacen match entonces generamos el Json Web Token
        const token = await generateJWT(user.id, user.name);  
        res.status(200).json({
            ok : true,
            msg : 'Login',
            uid : user.id,
            name : user.name,
            token
        });
        
    } catch (errors) {
        console.log(errors);
        return res.status(500).json({
            ok : false,
            msg : 'Comunicarse con servicio técnico'
        });
    }

}

const renewToken = async(req, res = express.response ) => {

    const {uid, name} = req;
    
    //Generate new token
    const token = await generateJWT(uid, name);

    res.status(200).json({
        ok : true,
       token
    });
}


module.exports = {
    newUser,
    userLogin,
    renewToken
}
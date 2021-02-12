const { Schema, model } = require('mongoose');

const userSchema = Schema ({

    name:{
        type : String,
        require : true
    },

    lastname:{
        type : String,
        require : true
    },      

    email:{
        type : String,
        require : true,
        unique : true
    },

    password:{
        type : String,
        require : true
    },

    registerDate:{
        type : Date,
        require : true,
        default : Date.now()
    }

});

module.exports = model('users', userSchema);
//Iniciamos mongoose
const mongoose = require('mongoose');
//Solucionar error de deprecated
mongoose.set('useFindAndModify', false);

const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.DB_CNN,{
            //Valores predefinidos
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('Conectado');
    } catch (error) {
        console.log(error);
    }

}

module.exports = {
    dbConnection
}

const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config({ path: 'variables.env' });

const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect(process.env.BD_URL, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
});

//crear el servidor
const app = express();

//habilitar bodyparser
app.use(bodyParser.json());
//Para leer los valores que son leidos por postman
app.use(bodyParser.urlencoded({ extended: true }))

//Definir un dominio(s) para recibir las peticiones 
const whiteList = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        // console.log(origin);
        //Revisar si la peticion viene de un servidor que esta en la lista blanca
        //some va revisar si en este arreglo existe lo que viene hacer el origen , ya una vez que se llama a 
        //cors , el origin se va ejecutar para tener acceso a esa informacion
        const existe = whiteList.some(dominio => dominio === origin);
        if (existe) {
            callback(null, true);
            /*No va a tener ningun error ,que valla al sgte middelware, 
            o que continue su ejecucion o este permitido lo que esta haciendo */
        } else {
            callback(new Error('No permitido por CORS'));
        }
    }
}

//Habilitar cors
app.use(cors(corsOptions));


//Rutas de la app
app.use('/', router());


//carpeta publica 

app.use(express.static('uploads'));

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 5000 ;


//Iniciar app
app.listen(port, host, () => {
    console.log("El servidor esta funcionando");
});
const express = require('express');
const router = require('./routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const cors = require('cors');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis', {
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

app.use(cors());
//Rutas de la app
app.use('/', router());

//puerto

app.listen(5000);
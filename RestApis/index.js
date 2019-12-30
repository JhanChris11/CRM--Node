const express = require('express');
const router =require('./routes');
const mongoose =require('mongoose');

//conectar mongo
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/restapis',{
    useNewUrlParser:true
});

//crear el servidor
const app = express();

//Rutas de la app
app.use('/',router());

//puerto

app.listen(5000);
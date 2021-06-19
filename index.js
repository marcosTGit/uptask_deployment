const express = require('express'); //import express from 'express'
const bodyParser = require('body-parser') // para manipular variabkes a traves del requiere
const routes = require('./routes'); // incluimos el archivo que contine elas rutas
const path = require('path'); // libreria parta movernos entre archivos
const helpers = require('./helpers'); 
const session = require('express-session'); 
const flash = require('connect-flash'); 
const cookieParser = require('cookie-parser'); 
const passport = require('./config/passport'); 
// variable de entorno
require('dotenv').config({path: 'config/var.env'})


// // conectando a bases de datos
// const db= require('./config/db');
// const { nextTick } = require('process');
// db.authenticate()
// .then(()=>console.log('conectado al servidor'))
// .catch((error)=>console.log(error))
// // importando modelo
// require('./models/Proyectos');
// require('./models/Tareas');
// require('./models/Usuarios');
// db.sync()
// .then(()=>console.log('los mdelos se importaron Exito'))
// .catch((error)=>console.log(error))


// //crear una app
const app = express();


// //habilitamos el bodyparser
// app.use(express.urlencoded({ extended: false }));

// //cargar public
// app.use(express.static('public'));

// // habilitar pug
// app.set('view engine','pug');

// // configuramos carpetas views
// app.set('views', path.join(__dirname,'./views'));

// //flash messages
// app.use(flash());

// /// llamamosa cookie parser ==> 1
// app.use(cookieParser());
// //app.use(bodyParser.json())

// // seteamos las sesiones ==> 2
// app.use(session({
    // secret: 'supersecreto',
    // resave: false,
    // saveUninitialized: false
    
// }));
// app.use(passport.initialize());// ==> 3 
// app.use(passport.session());  // ==> 4

// //habilitar funciones del helpers
// app.use((req, res, next)=>{
    // res.locals.vardump = helpers.vardump;
    // res.locals.mensaje = req.flash();
    // res.locals.usuario = {...req.user} || null;
    // //console.log(res.locals.usuario);
    // next();
// });




// app.use('/',routes());

app.get('/',(req,res)=>{
    res.send('En linea...');
});

const host=process.env.HOST || '0.0.0.0';
const port=process.env.PORT || 3000;
app.listen(port, host,()=>{
    console.log("SERVIDRO EN LINEA");
});

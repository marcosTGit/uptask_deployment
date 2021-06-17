const Usuarios = require("../models/Usuarios");
const bcryptjs =require('bcryptjs'); //habilitamos bcrypt para encritacion de claves

//0000000000000000000000000000000000000000000
//0000000000000000000000000000000000000000000

exports.Login = async(req, res) =>{
    const {error}=res.locals.mensaje;
    res.render('login',{error});
}

//0000000000000000000000000000000000000000000
//0000000000000000000000000000000000000000000

exports.Registro = async(req, res) =>{
    
    res.render('registrarse',{
        titlepage :'Registrarse'
    });
}

//0000000000000000000000000000000000000000000
//0000000000000000000000000000000000000000000

exports.NuevoUsuario = async(req, res, next) =>{
    const {mail,password}=req.body;
    try {
        await Usuarios.create({
            mail,
            password: await bcryptjs.hash(password,8)
        });
        res.render('login');
    } catch (error) {
        //const {message,value} = error.errors[0]; // obtengo el valor de los mensajes
        req.flash('error',error.errors.map(error=>error.message));
        res.render('registrarse',{
            titlepage :'Registrarse',
            mensajes: req.flash(),
            mail,
            password
        });
    }
}


exports.FormReestablecer = async(req, res, next) =>{
    res.render('reestablecer');
    
}


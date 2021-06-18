const Usuarios = require("../models/Usuarios");
const enviarEmail = require('../handlers/email')
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
            password: await bcryptjs.hash(password,8),
            activo:0
        });
        // crear URL 
        const URLconfirmarCuenta= `${req.headers.host}/activar-cuenta/${mail}`;
        // crear objeto  de usuario 
        usuario={mail};
        // enviar mail
        await enviarEmail.enviar({
            usuario,
            subject:'Confima tu cuenta Uptask',
            url: URLconfirmarCuenta,
            archivo:'confirmar-cuenta.pug'
        });

        // redirijimos al usuario
        req.flash('correcto','Enviamo un correo.! revisa tu casilla de correo');
        res.redirect('/iniciar-sesion');
    } catch (error) {
        
        // const {message,value} = error.errors[0]; // obtengo el valor de los mensajes
        req.flash('error',error.errors.map(error => error.message));
        res.render('registrarse',{
            titlepage :'Registrarse',
            mensaje: req.flash(),
            mail,
            password
        });
    }
}

//0000000000000000000000000000000000000000000
//0000000000000000000000000000000000000000000

exports.FormReestablecer = async(req, res, next) =>{
    res.render('reestablecer');
    
}

//0000000000000000000000000000000000000000000
//0000000000000000000000000000000000000000000

exports.ActivarCuenta = async(req, res) =>{
    const usuario = await Usuarios.findOne({
        where:{
            mail: req.params.correo
        }
    });
    if(!usuario){
        req.flash('error','No valido');
        res.redirect('/crear-cuenta');
    }
    usuario.activo=1;
    await usuario.save();
    req.flash('correcto','Cuenta activada');
    res.redirect('/iniciar-sesion');

    
}



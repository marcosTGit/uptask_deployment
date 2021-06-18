const passport =require('passport'); 
const Usuarios = require("../models/Usuarios");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto =require('crypto'); 
const bcryptjs =require('bcryptjs'); //habilitamos bcrypt para encritacion de claves
const enviarEmail = require('../handlers/email')


//000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000

exports.Autenticar = passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

//000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000

exports.SessionControl=(req, res, next)=>{
    if (req.isAuthenticated()) {
        return next();
    }
    // sino esta auntentocado 
    return res.redirect('/iniciar-sesion');
};

//000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000

exports.Logout=(req, res, next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
    
};

//000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000

exports.GenerarToken= async(req, res)=>{
    // verificamos si el usuario existe
    const usuario= await Usuarios.findOne({where:{mail: req.body.mail}});
    
    if (!usuario) {
        req.flash('error','el e-mail no esta registrado')
        res.redirect('/reestablecer');
    }
    // usuario existe
    usuario.token = crypto.randomBytes(20).toString('hex');
    // expiracion 
    usuario.expiracion = Date.now()+3600000;
    const resetUrl= `${req.headers.host}/reestablecer/${usuario.token}`
    await usuario.save();

    // enviamos el email con el enlace
    await enviarEmail.enviar({
        usuario,
        subject:'Password Reset',
        url: resetUrl,
        archivo:'resetPass.pug'
    });

    req.flash('correcto','Exito.! revisa tu casilla de correo')
    res.redirect("/iniciar-sesion");
    
    
}

//000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000

exports.ValidarToken= (req, res)=>{
    // res.send(req.params.token);
    res.render('resetPassword');
}

//000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000

exports.ActualizarPassword= async (req, res)=>{
    //res.send(req.params.token);
    // verificar token valido 
    try {
        
        const usuario= await Usuarios.findOne({
            where:{
                token: req.params.token,
                expiracion:{[Op.gt] : Date.now()}
            }
        });
        
        usuario.password=await bcryptjs.hash(req.body.password,8);
        usuario.token=null;
        usuario.expiracion=null;
        usuario.save(); // guardamos los cambios 
        req.flash('correcto','Exito.! password actualizada')
        res.redirect("/iniciar-sesion");
        
    } catch (error) {
        
        req.flash('error','URL No valido intente nuevamente')
        res.redirect("/reestablecer");
    }
}
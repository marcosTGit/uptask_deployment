const passport =require('passport'); 
const Usuarios = require("../models/Usuarios");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const crypto =require('crypto'); 
const bcryptjs =require('bcryptjs'); //habilitamos bcrypt para encritacion de claves



//0000000000000000000000000000000000000000000
//0000000000000000000000000000000000000000000

exports.Autenticar = passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/iniciar-sesion',
    failureFlash: true,
    badRequestMessage: 'Ambos campos son obligatorios'
});

exports.SessionControl=(req, res, next)=>{
    if (req.isAuthenticated()) {
        return next();
    }
    // sino esta auntentocado 
    return res.redirect('/iniciar-sesion');
};

exports.Logout=(req, res, next)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    });
    
};

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
    req.flash('error','revisa tu casilla de correo')
    res.redirect('/reestablecer');
    //console.log(resetUrl);
    
}

exports.ValidarToken= (req, res)=>{
    // res.send(req.params.token);
    res.render('resetPassword');
}

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
        res.redirect("/iniciar-sesion");
        
    } catch (error) {
        
        req.flash('erro','URL No valido intente nuevamente')
        res.redirect("/reestablecer");
    }
    //verificamos is existe el usuario 

    // encriptamos el pass


    // req.flash('error','Tu password se ha modificado correctamente');
}
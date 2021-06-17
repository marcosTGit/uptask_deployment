const passport = require ('passport');
const localStrategy = require ('passport-local');

// indimacomo el modelo que usamos
const Usuarios =require('../models/Usuarios');

passport.use(
    new localStrategy(
        // definimos los campo que usamos 
        {
            usernameField : 'mail',
            passwordField : 'password'
        },
        async(mail, password, done)=>{
            try {
                const usuario = await Usuarios.findOne({where:{mail}});
                //console.log("en passport");
                const resultado = usuario.verificarPassword(password);
                //console.log('el rsultgado: '+resultado);

                if (!usuario.verificarPassword(password)) {
                    // console.log("password incorrecto");
                    // console.log(usuario);
                    return done(null,false,{message:'Password incorrecto'});
                }
                //console.log("correcto");
                return done(null,usuario);

            } catch (error) {
                // no existe el usuario
                // detrorna don con tre sparametros  
                return done(null, false,{
                    message:'Esta cuenta no existe'
                });
                
            }
        }
    )
);

// serilisamos ek usuario 
passport.serializeUser((usuario, callback)=>{
    callback(null, usuario);
});
// desserialisamos el usuario 
passport.deserializeUser((usuario, callback)=>{
    callback(null, usuario);
});

// exportamos
module.exports =passport;
const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');
const bcryptjs =require('bcryptjs');



const Usuarios = db.define('Usuarios',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    mail: {
        type: Sequelize.STRING(60),
        allowNull: false,
        //validate:{isEmail:{ msg:'Agerga un Correo valido' }},
        //validate:{notEmpty:{msg:'El e-mail no puede ir vacio'}},
        validate: {
            notNull: {msg: 'El e-mail no puede ir vacio'},
            isEmail:{ msg:'Agerga un Correo valido' }
        },
        unique:{
            args:true,
            msg:'Usuario ya registrado'
            }
        }
    ,
    password: {
        type: Sequelize.STRING(60),
        allowNull: false,
        validate:{notEmpty:{msg:'El passwords no puede ir vacio'}}
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE
});

Usuarios.prototype.verificarPassword= function(password){ 
    return  bcryptjs.compareSync(password, this.password)
    
}
Usuarios.hasMany(Proyectos);
module.exports=Usuarios;
const Sequelize = require('sequelize');
const db = require('../config/db');
const Proyectos = require('./Proyectos');



const Tareas = db.define('tareas',{
    id:{
        type: Sequelize.INTEGER(11),
        primaryKey:true,
        autoIncrement:true
    },
    tarea: Sequelize.STRING(100),
    estado: Sequelize.INTEGER
});
// definimos llave foraneas o relacion con otra tabla

Tareas.belongsTo(Proyectos);// una tarea pertenece a un proyecto
//Proyectos.hasMany(Tareas);

module.exports=Tareas;
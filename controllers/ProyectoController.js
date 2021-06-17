const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000

exports.index = async(req, res) =>{
    const UsuarioId =res.locals.usuario.id;
    //res.send("hola desde el controllador index");
    const proyectos =await Proyectos.findAll({where:{UsuarioId}})
    res.render('index',{
        titlepage :'Home',
        proyectos
    });
}
//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000

exports.Nuevo = async(req, res) =>{
    //res.send("hola desde el controllador productos");
    const UsuarioId =res.locals.usuario.id;
    res.render('nuevo-proyecto',{
        proyectos :await Proyectos.findAll({where:{UsuarioId}}),
        titlepage :'Nuevo Proyecto'
    });
}
//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000

exports.Editar = async(req, res) =>{

    const UsuarioId =res.locals.usuario.id;
    const[proyectos,proyecto]= await Promise.all([
        Proyectos.findAll({where:{UsuarioId}}),
        Proyectos.findOne({
            where:{
                id: req.params.id
            }
        })

    ]);
    res.render('nuevo-proyecto',{
        titlepage :'Editar proyecto',
        proyectos,
        proyecto
    });
}
//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000

exports.GuardarNuevo = async(req, res) =>{
    //res.send("enviaste el formulario");
    //console.log(req.body);
    const UsuarioId =res.locals.usuario.id;
    const {nombre} = req.body;
    let errores=[];
    if (!nombre){
        errores.push({'texto':'agrega un Nombre al proyecto'})
    }
    //si hay errores
    if (errores.length>0) { 
        res.render('nuevo-proyecto',{
            titlepage :'Nuevo Proyecto',
            errores
        });        
    }
    else{// si no hay errores insertamo en la DB
        const UsuarioId =res.locals.usuario.id;
        const proyecto= await Proyectos.create({nombre, UsuarioId});
        res.redirect('/');
        
    }
}
//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000

exports.GuardarCambios = async(req, res) =>{
    const {nombre} = req.body;
    let errores=[];
    if (!nombre){
        errores.push({'texto':'agrega un Nombre al proyecto'})
    }
    //si hay errores
    if (errores.length>0) {
        res.render('nuevo-proyecto',{
            titlepage :'Editar Proyecto',
            errores
        });        
    }
    else{// si no hay errores insertamo en la DB    
        await Proyectos.update(
            {nombre},
            {where:{id:req.params.id}}
            );
        res.redirect('/');
    }
}

//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000
exports.ProyectoPorURL = async(req, res) =>{

    const UsuarioId =res.locals.usuario.id;
    const[proyectos,proyecto]= await Promise.all([
        Proyectos.findAll({where:{UsuarioId}}),
        Proyectos.findOne({where:{url: req.params.url}})
    ]);
    if(!proyecto) return next();
    res.render('tareas',{
        titlepage :'Proyecto por url',
        proyectos,
        proyecto,
        tareas: await Tareas.findAll({
            where:{proyectoId:proyecto.id},// traer tareas del proyecto actual 
            include:[{model:Proyectos}] // incluir el modelo como si fuera un Join
        }) 
    });
}
//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000
//  eliminnar

exports.EliminarProyecto =async(req, res, next)=>{
    const resultado= await Proyectos.destroy({where:{url:req.params.url}});
    if(!resultado){
        return next();
    }
    res.status(200).send('Proyecto eliminado correctamente');
}

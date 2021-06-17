const Tareas = require("../models/Tareas");
const Proyectos = require("../models/Proyectos");

//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000

exports.cambiarEstadoTarea = async(req, res,next) =>{
    // res.send("hola desde el controllador ");
    const tarea =await Tareas.findOne({where:{id:req.params.id}}); 
    let estado=0;
    if(tarea.estado===estado){
        estado=1;
    }
    tarea.estado=estado;
    const resultado = await tarea.save();
    if(!resultado) return next();
    res.status(200).send("Actualizado");
}

//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000

exports.GuardarNuevo = async(req, res) =>{
    //console.log(req.body);
    const {nombretarea} = req.body;
    const proyecto=await Proyectos.findOne({where:{url: req.params.url}})
    let errores=[];
    if (!nombretarea){
        errores.push({'texto':'agrega un Nombre al proyecto'})
    }
    //si hay errores
    if (errores.length>0) {
        res.send("estamos por aqui");
        return;
        res.render('tareas',{
            titlepage :'Tareas',
            proyecto: proyecto,
            errores
        });        
    }
    else{// si no hay errores insertamos en la DB
        
        const tarea= await Tareas.create({
            tarea:nombretarea,
            estado:0,
            proyectoId: proyecto.id
        });
        res.redirect('/');
        
    }
}
//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000

exports.ProyectoPorURL = async(req, res) =>{
    const[tareas,proyecto]= await Promise.all([
        Tareas.findAll(),
        Tareas.findOne({
            where:{
                url: req.params.url
            }
        })
        
    ]);
    res.render('tareas',{
        titlepage :'Proyecto por url',
        tareas,
        proyecto
    });
}

//000000000000000000000000000000000000000000000000000000000000000
//000000000000000000000000000000000000000000000000000000000000000
//  eliminnar

exports.EliminarTarea =async(req, res, next)=>{
    const resultado= await Tareas.destroy({where:{id:req.params.id}});
    if(!resultado){
        return next();
    }
    res.status(200).send('Tarea eliminado correctamente');
}

const express = require('express');
const router = express.Router();
const {body} = require('express-validator');
//const {body} = require('express-validator/check');
// seteamos variable de session 
const session = require('express-session');

// por aqui los ocntroladores 
const TareaController = require('../controllers/TareaController');
const ProyectoController = require('../controllers/ProyectoController');
const UsuarioController = require('../controllers/usuarioController');
const autenticarController = require('../controllers/autenticarController');


// DEFINIMOS RUTAS
module.exports = ()=>{

    router.get('/',
        autenticarController.SessionControl,
        ProyectoController.index);

    router.get('/cerrar-sesion', autenticarController.Logout); // cerrar sesion  
    router.get('/iniciar-sesion', UsuarioController.Login);// formulario login
    router.post('/iniciar-sesion', autenticarController.Autenticar); // autenticacion 
    
    router.get('/reestablecer', UsuarioController.FormReestablecer);// formulario restablecer
    router.post('/reestablecer', autenticarController.GenerarToken);// procesa formulario y genera token
    router.get('/reestablecer/:token', autenticarController.ValidarToken);// recibe el url y valida  los datos
    router.post('/reestablecer/:token', autenticarController.ActualizarPassword);// recibe los datos y nuevamente verifica los datos y actualiza el ppass
    
    router.get('/crear-cuenta', UsuarioController.Registro);
    router.post('/crear-cuenta', UsuarioController.NuevoUsuario); // registramos un nuevo usuario 
    router.get('/activar-cuenta/:correo', UsuarioController.ActivarCuenta); // registramos un nuevo usuario 



// PROYECTOS

    router.get('/nuevo-proyecto',
    autenticarController.SessionControl,
    ProyectoController.Nuevo); // FORM NUEVO PORYECTO   
 // GUARDA NUEVO PROYECTO

    router.post('/nuevo-proyecto',
        autenticarController.SessionControl,
        body('nombre').not().isEmpty().trim().escape(),
        ProyectoController.GuardarNuevo);   
 // FORM EDITAR ELIMINAR Y LISTAR TAREAS DE UN  PROYECTO  

    router.get('/proyecto/:url',
        autenticarController.SessionControl,
        ProyectoController.ProyectoPorURL); 
//  FORM EDITAR NOMBRE PROYECTO

    router.get('/proyecto/editar/:id',
        autenticarController.SessionControl,
        ProyectoController.Editar);  
// ELIMINAR PROYECTO

    router.delete('/proyecto/:url',
        autenticarController.SessionControl,
        ProyectoController.EliminarProyecto); 
// GUARDAR CAMBIOS NOMBRE DEL PROYECTO

    router.post('/nuevo-proyecto/:id',
        autenticarController.SessionControl,
        body('nombre').not().isEmpty().trim().escape(),
        ProyectoController.GuardarCambios); // GUARDAR CAMBIOS NOMBRE DEL PROYECTO
// TAREAS 
// GUARDA NUEVA TAREA PROYECTO

    router.post('/nueva-tarea/:url',
        autenticarController.SessionControl,
        body('tarea').not().isEmpty().trim().escape(),
        TareaController.GuardarNuevo); 

// CAMBIAR EL ESTADO DE LA TAREA

    router.patch('/tareas/:id',
        autenticarController.SessionControl,
        TareaController.cambiarEstadoTarea);

    router.delete('/tareas/:id',
        autenticarController.SessionControl,
        TareaController.EliminarTarea); // ELIMINA TAREA
//0000000000000000000000000000000    
    return router; 
}

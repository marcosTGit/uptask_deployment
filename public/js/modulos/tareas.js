import axios from "axios";
import Swal from "sweetalert2";
import { actualizarAvance } from'./avance';

const tareas = document.querySelector('.listado-pendientes');

actualizarAvance();
if (tareas) {
    tareas.addEventListener('click',e =>{
        // cambiamos el estado de una tarea
        if(e.target.classList.contains('fa-check-circle')){
            const icono =e.target;
            const idTarea =icono.parentElement.parentElement.dataset.tarea;
            const url=`${location.origin}/tareas/${idTarea}`;
            // peticion al controlador
            axios.patch(url,{idTarea})
            .then(function(response){
                if(response.status===200){
                    console.log("actualizamos");
                    icono.classList.toggle('completo');
                }
                actualizarAvance();
            });
        }
        // eliminamos un tarea
        if(e.target.classList.contains('fa-trash')){
            // damos formato al link 
            const htmltarea =e.target.parentElement.parentElement;
            const idTarea = htmltarea.dataset.tarea;
            const url=`${location.origin}/tareas/${idTarea}`;
            // generamos el mensaje swal
            Swal.fire({
                title: 'Deseas borrar esta Tarea',
                text: "Una tarea eliminada no se puede recuperar!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, Borrar!',
                cancelButtonText: 'No, Cancelar!'
            }).then((result) => { // si confirma
                if (result.isConfirmed) {
                    
                    //000000000000000000000000
                    //peticion con axios               
                    const datos={idtarea:idTarea};
                    axios.delete(url, {headers: datos})
                    .then(response=> {
                        // eliminanos el elemento li
                        htmltarea.parentElement.removeChild(htmltarea);
                        //mensaje con swalalert
                        Swal.fire(
                               'tarea elimina !',
                               response.data,
                               'success'
                               )
                            actualizarAvance();
                        })
                        .catch(()=>{
                            Swal.fire({
                                     type:'error',
                                     title:'Hubo un error',
                                     text:'No se pudo eliminar la tarea'
                                 }) 
                                actualizarAvance();
                            })       
                    }   
                })
        }
    });
}
export default tareas;
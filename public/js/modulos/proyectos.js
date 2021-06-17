import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#eliminar-proyecto');
if(btnEliminar){
    btnEliminar.addEventListener('click',(e)=>{
        
        Swal.fire({
            title: 'Deseas borrar este proyecto?',
            text: "Un proyecto eliminado no se puede recuperar!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Borrar!',
            cancelButtonText: 'No, Cancelar!'
        }).then((result) => {
            if (result.isConfirmed) {
                // peticion con axios
                const urlProyecto=e.target.dataset.proyectoUrl;
                const url=`/proyecto/${urlProyecto}`;
                const datos={
                    url:urlProyecto
                }
    
                //000000000000000000000000
                axios.delete(url, {headers: datos})
                    .then(response=> {
                        // mensaje con swalalert
                        Swal.fire(
                          'Proyecto eliminado !',
                          response.data,
                          'success'
                          )
                        setTimeout(()=>{window.location.href='/'},3000);
                    })
                    .catch(()=>{
                        Swal.fire({
                            type:'error',
                            title:'Hubo un error',
                            text:'No se pudo eliminar el proyecto'
                        })
                        // redireccionamos 
                        setTimeout(()=>{window.location.href='/'},3000);
                    })
                        
                }
 
        
                
            })
    });
}
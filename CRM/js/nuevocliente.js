(function() {
    let DB;
    const formulario = document.querySelector('#formulario')

    document.addEventListener('DOMContentLoaded', () => {
        conectarDB();
        
        formulario.addEventListener('submit', validarCliente); 
    });
})();



function validarCliente(e) {
    e.preventDefault(); 

    const nombre = document.querySelector('#nombre').value; 
    const email = document.querySelector('#email').value; 
    const telefono = document.querySelector('#telefono').value; 
    const empresa = document.querySelector('#empresa').value; 

    if(nombre === '' || email === '' || telefono === '' || empresa === '') {
        imprimirAlerta('Todos los cambios son obligatorios', 'error')
        
    }

     //crear un objeto con la informacion 

     const cliente = {
        nombre,
        telefono,
        email,
        empresa,
        id :Date.now()
    }
    crearNuevocliente(cliente);

}
function crearNuevocliente (cliente) {

    const transaction = DB.transaction(['crm'], 'readwrite'); 

    const objectStore = transaction.objectStore('crm');

    objectStore.add(cliente);

    transaction.onerror = function () {
        imprimirAlerta('hubo un error', 'error');
    }

    transaction.oncomplete = function (){
        imprimirAlerta('el cliente se agrego correctamente');

        setTimeout(() => {
            window.location.href = 'index.html'
        }, 3000);
    }
   
} 



    




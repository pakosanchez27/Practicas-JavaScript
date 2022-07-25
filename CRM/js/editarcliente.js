(function() {
    let DB;
    let idCliente
    const nombreInput = document.querySelector('#nombre');
    const correoInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    const formulario = document.querySelector('#formulario'); 
    
    document.addEventListener('DOMContentLoaded', () => {

       conectarDB();

    //    Actualiza el registro
        formulario.addEventListener('submit', actualizarCliente);
        


        //verificar el id de la url  

        const parametrosURL = new URLSearchParams(window.location.search);
   

         idCliente = parametrosURL.get('id');
 

        if(idCliente){
            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 200);
           
        }
    });

    function actualizarCliente(e) {
        e.preventDefault();

        if(nombreInput.value === '' || correoInput.value === '' || empresaInput.value === ''|| telefonoInput.value === ''){
            imprimirAlerta('Todos los campor son obligatorios', 'error');
            return; 
        }
        // Actualizar Cliente

        const clienteActualizado = {
            nombre: nombreInput.value,
            email: correoInput.value, 
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente)
        }

        const transaction = DB.transaction(['crm'], 'readwrite'); 
        const objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualizado);

        transaction.oncomplete = function() {
            console.log('Editado Correctamente');
            e.target.parentElment.parentElment.remuve();
        } ;

        transaction.onerror= function() {
            imprimirAlerta('Hubo un error', 'error');
        }
        
    }
    

        function obtenerCliente(id){

            const transaction = DB.transaction(['crm'], 'readwrite');
            const objectStore = transaction.objectStore('crm'); 
           

            const cliente = objectStore.openCursor();
            cliente.onsuccess = function(e){
                const cursor = e.target.result; 

                if(cursor) {
                    
                    if(cursor.value.id === Number(id)){
                        
                        llenarFormulario(cursor.value);
                    }


                    cursor.continue();
                }
            }
        }

        function llenarFormulario(datosCliente) {
            const {nombre, email, telefono, empresa} = datosCliente;
            nombreInput.value = nombre;
            correoInput.value = email;
            telefonoInput.value = telefono;
            empresaInput.value = empresa;
            
            return;
        }

        function conectarDB() {
            const abrirConexion = window.indexedDB.open('crm', 1);

            abrirConexion.onerror = function() {
                console.log('Hubo un error');
            }
        
            abrirConexion.onsuccess = function() {
                DB = abrirConexion.result;
            }
        }
   


})();
function descargarClientes(){
    return new Promise((resolve, recject) => {
        const error = true;

        setTimeout(() => {
            if (!error) {
                resolve('El listado de Clientes se descargo correctamente');
            } else {
                recject('Error en la conexión');
            }
        }, 3000);
    })
}


async function ejecutar(){
    try {
        const respuesta = await descargarClientes();

        console.log(2+2);
        console.log(respuesta);
    } catch (error) {
        console.log(error);
    }
}

ejecutar();
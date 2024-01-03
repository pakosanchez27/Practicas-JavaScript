document.addEventListener('DOMContentLoaded', function () {


    const email = {
        email: '',
        cc: '',
        asunto: '',
        mensaje: ''
    }

    // Seleccionar los elementos de la intefaz

    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type ="submit"]');
    const btnReset = document.querySelector('#formulario button[type ="reset"]');
    const spinner = document.querySelector('#spinner');

    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    inputCC.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

    btnReset.addEventListener('click', function (e) {
        e.preventDefault();
        // reiniciar el objeto
        resetearFormulario();
    });

    function resetearFormulario() {
        email.email = '';
        email.cc = ''
        email.asunto = '';
        email.mensaje = '';
        formulario.reset();
        comprobarEmail();
    }
    function enviarEmail(e) {
        e.preventDefault();

        spinner.classList.add('flex');
        spinner.classList.remove('hidden');

        setTimeout(() => {
            spinner.classList.add('hidden');
            spinner.classList.remove('flex');
            resetearFormulario();

            // Crear una aleta
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase'); 
            alertaExito.textContent = "Mensaje enviado correctamente"; 
            formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 1500);

        }, 3000);
    };

 
    function validar(e) {
        if (e.target.value.trim() === '' && e.target.id !== 'cc') {
            mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }

        if (e.target.id === 'cc' && !validarEmail(e.target.value) && e.target.value.trim() !== "") {
            mostrarAlerta('El email no es valido', e.target.parentElement);
            email[e.target.name] = '';
            comprobarEmail();
            return;
        }
        
        limpiarAlerta(e.target.parentElement);

        //asignar los valores
        email[e.target.name] = e.target.value.trim().toLowerCase();

        // Comprobar el objto de email
        comprobarEmail();

    }

    function mostrarAlerta(mensaje, referencia) {
        // Limpiar alrtas
        limpiarAlerta(referencia);

        // Generar alert en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600', 'text-white', 'p-2', 'text-center')

        // Inyectar el error al formulario
        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia) {
        // Limpiar alrtas
        const alerta = referencia.querySelector('.bg-red-600');
        if (alerta) {
            alerta.remove();
        }
    }

    function validarEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnSubmit.classList.add('opacity-50');
            btnSubmit.disabled = true;
            return;

        }
        btnSubmit.classList.remove('opacity-50');
        btnSubmit.disabled = false;

    }
});
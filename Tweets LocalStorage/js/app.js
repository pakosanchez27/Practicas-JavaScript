// Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];



evenListeners();
//Event Listener
function evenListeners() {

    // cuando el usuario agrega un nuevo click
    formulario.addEventListener('submit', agregarTweet);

    // cuando carga la pagina

    document.addEventListener('DOMContentLoaded', () =>{
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];
        console.log(tweets);

        crearHTML();
    }); 

}

// Funciones

function agregarTweet(e) {
    e.preventDefault();

    // Texarea donde el usaurio escribe

    const tweet = document.querySelector('#tweet').value;

    // Validación

    if (tweet === '') {
        mostrarError('Un mensaje no puede ir vacio');
        return;
    }

    const tweetObj = {
        id: Date.now(),
        tweet // esto es igual a tweet: tweet
    }

    console.log(tweetObj);

    // Añadir al arreglo de tweet


    tweets = [...tweets, tweetObj];

    // Una vez agregando vamos a crear el html
    crearHTML();

    // reiniciar el fomulario
    formulario.reset();
}

// Mostrar Mensaje de Error

function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 2000);

}

function crearHTML() {
    
    limpiarHTML();

    if (tweets.length > 0) {
        tweets.forEach(tweet => {

            // Agragar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la funcion de btnEliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el html

            const li = document.createElement('li');

            // Añadir en el html
            li.innerText = tweet.tweet;

            // insertar en el html
            li.appendChild(btnEliminar);
            listaTweets.appendChild(li);
            


        });
    }

    sincronizarStorge();

}

function sincronizarStorge(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }

}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    crearHTML();
}
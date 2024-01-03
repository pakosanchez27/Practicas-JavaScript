//Constructores

function Seguro(marca, year, tipo){
    this.marca = marca;
    this.year = year;
    this.tipo = tipo;

}
// realiza la cotización con los datos}
Seguro.prototype.contizarSeguro = function(){
    /*
        1 = Americano 1.15 
        2 = Asiatico 1.05
        3 = Europeo 1.35
    */
   const americano = 1.15;
   const asiatico = 1.05;
   const europeo = 1.35;
   
    let cantidad; 
    const base = 2000; 
    
    switch(this.marca){

        case '1':
            cantidad = base * americano;
            break;
        case '2':
            cantidad = base * asiatico;
            break;
        case '3':
            cantidad = base * europeo;
            break;
        default: 
            break;
    }

    // Leer el año
        const diferencia = new Date().getFullYear() - this.year;

    // Cada año que la diferencia es mayor, el costo va a reducirse un 3%
    cantidad -= ((diferencia * 3) * cantidad) / 100; 

    /*
    Si el seguro es Básico se multiplica por un 30% más
    Si el seguro es Completo  se multiplica por un 50% más
    */
   if(this.tipo === "basico"){
        cantidad * 1.30;
        
   }else{
        cantidad * 1.50;
   }

   return cantidad;

}

function UI(){

}

// LLEna las opciónes de los años

UI.prototype.llenarOpciones = () =>{
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max; i > min; i--){
        let option = document.createElement('option');
        option.value = i;
        option.textContent= i;
        selectYear.appendChild(option);

    };

};

// Muestra alertas en pantalla
UI.prototype.mostrarMensaje = (mensaje, tipo) => {

    const div = document.createElement('div');

    if(tipo === 'error'){
        div.classList.add('error');
    }else{
        div.classList.add('correcto');
    }

    div.classList.add('mensaje', 'mt-10');
    div.textContent = mensaje;
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.insertBefore(div, document.querySelector('resultado'));

    setTimeout(() => {
        div.remove();
    }, 2000);
};

UI.prototype.mostrarResultado = (total, seguro ) =>{

    const {marca, year, tipo} = seguro;
    let textoMarca;

    switch(marca){
        case '1':
            textoMarca = 'Americano';
            break;
        case '2':
            textoMarca = 'Asiatico';
            break;
        case '3':
            textoMarca = 'Europeo';
            break;        
        default:
            break;    
    }
    // Crear el resultado

    const div = document.createElement('div');
    div.classList.add('mt-10');

    div.innerHTML=`
        <p class="header"> Tu Resumen <p>
        <p class="font-bold"> Marca:<span class="font-normal"> ${textoMarca}</span><p>
        <p class="font-bold"> Año: <span class="font-normal"> ${year}</span><p>
        <p class="font-bold"> Cobertura: <span class="font-normal capitalize"> ${tipo}</span> <p>
        <p class="font-bold"> Total:<span class="font-normal"> $${total}.00 MXN</span> <p>
    `

    const resultadoDiv = document.querySelector('#resultado');
   

    // Mostar el sppiner
    const spinner = document.querySelector('#cargando'); 
    spinner.style.display = "block"
    setTimeout(() => {
        spinner.style.display = 'none';
        resultadoDiv.appendChild(div);
        
    }, 2000);
}

// instanciar UI

const ui = new UI;
console.log(ui);


document.addEventListener('DOMContentLoaded', () =>{
    ui.llenarOpciones();
});

evenListners();
function evenListners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
};

function cotizarSeguro(e){
    e.preventDefault();

    // leer la marca seleccionada
    const marca = document.querySelector('#marca').value;

    // Leer el año Seleccionado
    const year = document.querySelector('#year').value;

    // Leer el tipo de cobertura
    const tipo = document.querySelector('input[name="tipo"]').value;


    if(marca === '' || year === '' || tipo ===''){
        ui.mostrarMensaje('Todos los campos son obligatorios', 'error');
        return;
    };

    ui.mostrarMensaje('contizando...', 'correcto');

    //ocultar las cotizaciones previas 

    const resultado = document.querySelector('#resultado div'); 
    if(resultado != null){
        resultado.remove();
    }

// Instancias el serguro
const seguro = new Seguro(marca, year, tipo);
const total = seguro.contizarSeguro();
seguro.contizarSeguro()

// Utilizar el prototype que va a cotizar
ui.mostrarResultado(total, seguro);

};


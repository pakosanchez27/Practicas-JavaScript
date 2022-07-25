const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscaClima);
});

function buscaClima(e) {
  e.preventDefault();
  console.log("buscando en el clima");

  // Validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (pais === "" || ciudad === "") {
    mmostrarError("Ambos campos son obligatorios");
    return;
  }
  // consultar la API
  consultarAPI(ciudad, pais);
  console.log(ciudad, pais);
}

function consultarAPI(ciudad, pais) {
  const appId = "dd3cab64bbc8f16d39c5fca1807b07e8";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  console.log(url);

    Spinner();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      limpiarHTML();
      console.log(datos);
      if (datos.cod === "404") {
        mmostrarError("Ciudad no Encontrada");
        return;
      }

      // Imprime la respuesta en el HTML
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const centigrados = kelvinAcentigrados(temp);
  const max = kelvinAcentigrados(temp_max);
  const min = kelvinAcentigrados(temp_min);
  const nombreCiudad = document.createElement("p");
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMax = document.createElement("p");
  tempMax.innerHTML = `Max: ${max} &#8451;`;
  tempMax.classList.add("font-xl");

  const temMin = document.createElement("p");
  temMin.innerHTML = `Min: ${min} &#8451;`;
  temMin.classList.add("font-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(tempMax);
  resultadoDiv.appendChild(temMin);

  resultado.appendChild(resultadoDiv);
}

const kelvinAcentigrados = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

// validar el formulario

function mmostrarError(mensaje) {
  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "py-3",
      "py-3",
      "rounder",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
        <strong class="font-bold">Erro!</strong>
        <span class="block">${mensaje}</span>
        `;
    container.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function Spinner() {
    limpiarHTML();
  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-fading-circle");

  divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    resultado.appendChild(divSpinner);
}

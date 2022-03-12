// variables

const carrito = document.querySelector("#carrito");
const listaCursos = document.querySelector("#lista-cursos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarrritoBtn = document.querySelector("#vaciar-carrito");
let articulosCarrito = [];

cargarEventListener();

function cargarEventListener() {
  // cuando agregas un curso precionando "Agregar al carrito"
  listaCursos.addEventListener("click", agregarcurso);

  // Elimina cursos del carrito
  carrito.addEventListener("click", eliminarCurso);

  //   Vaciar el carrito
  vaciarCarrritoBtn.addEventListener('click', () => {
    articulosCarrito = []; 
    limpiarHTMl();
  });

  // Cuando el documento este listo
  document.addEventListener('DOMContentLoaded', () => {
     articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || []; 
    carritoHTML();
  })
}

// Funciones

function agregarcurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
   
}

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cursoId = e.target.getAttribute("data-id");

    // elimina el articulo por el data-id
    articulosCarrito = articulosCarrito.filter((curso) => curso.id !== cursoId);
    console.log(articulosCarrito);
  }

  carritoHTML();
}

function leerDatosCurso(curso) {
  // console.log(curso);

  // Crear un objeto con el contenido del curso actual

  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisar si un Elemento ya existe en el carrito

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe === true) {
    // Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso; // retorna el objeto actualizado
      } else {
        return curso;
      }
    });

    articulosCarrito = [...cursos];
  } else {
    // Agrega elementos al arreglo de carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  //   console.log(articulosCarrito);
  carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {
  // Limpiar html
  limpiarHTMl();

  // recorre el carrito y crea el html
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
            <td> <img src="${imagen}" width="100" </td>
            <td> ${titulo} </td>
            <td> ${precio} </td>
            <td> ${cantidad} </td>
            <td> <a href="#" class="borrar-curso" data-id="${id}"> x </a> </td>
        `;

    // Agregar al html
    contenedorCarrito.appendChild(row);
  });

  sicronizarLocalStorage();
}

function sicronizarLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}
// Funcion para limpiar html
function limpiarHTMl() {
  // Forma Lenta
  // contenedorCarrito.innerHTML = '';

  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}

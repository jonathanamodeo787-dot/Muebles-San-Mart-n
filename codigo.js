"use strict";

const opinionesContainer = document.querySelector(".opiniones-lista");
const lista = document.querySelector(".opiniones-lista");

const modal = document.getElementById("modal-opinion");
const abrirModal = document.getElementById("abrir-modal");
const cerrarModal = document.getElementById("cerrar-modal");

const reseñaButton = document.querySelector(".modal-enviar");

const nombreInput = document.getElementById("nombre-opinion");
const mensajeInput = document.getElementById("mensaje-opinion");

const estrellas = document.querySelectorAll(".estrella");

const flechaIzquierda = document.querySelector(".opiniones-izquierda");
const flechaDerecha = document.querySelector(".opiniones-derecha");

let posicion = 0;
let calificacion = 0;


// ==============================
// MODAL
// ==============================

abrirModal.addEventListener("click", () => {
    modal.classList.add("activo");
});

cerrarModal.addEventListener("click", () => {
    modal.classList.remove("activo");
});

modal.addEventListener("click", (e) => {

    if (e.target === modal) {
        modal.classList.remove("activo");
    }

});


// ==============================
// ESTRELLAS
// ==============================

estrellas.forEach((estrella, index) => {

    estrella.addEventListener("click", () => {

        calificacion = index + 1;

        estrellas.forEach((estrella, i) => {

            if (i <= index) {
                estrella.style.color = "#e5a928";
            } else {
                estrella.style.color = "#ccc";
            }

        });

    });

});


// ==============================
// OPINIONES
// ==============================

const opiniones = [
    {
        nombre: "Jonathan",
        mensaje: "Muy bueno.",
        estrellas: 5
    },
    {
        nombre: "Juan",
        mensaje: "Demasiado bueno y lindo servicio.",
        estrellas: 5
    },
    {
        nombre: "Dalto",
        mensaje: "Hola, son los mejores en lo que hacen.",
        estrellas: 5
    },
    {
        nombre: "Lucas",
        mensaje: "Excelente atención y muy buenos muebles.",
        estrellas: 4
    },
    {
        nombre: "Martín",
        mensaje: "Muy recomendable.",
        estrellas: 5
    },
    {
        nombre: "Sofía",
        mensaje: "El resultado quedó excelente.",
        estrellas: 5
    }
];


function crearOpinion(nombre, mensaje, cantidadEstrellas = 5) {

    const opinion = document.createElement("div");

    opinion.className = "opinion";

    opinion.innerHTML = `

        <span class="estrellas-reseña">
            ${"★".repeat(cantidadEstrellas)}
            <span class="estrellas-vacias">
                ${"★".repeat(5 - cantidadEstrellas)}
            </span>
        </span>

        <p>${nombre}</p>

        <p>${mensaje}</p>

    `;

    opinionesContainer.appendChild(opinion);
}


// Cargar opiniones iniciales

opiniones.forEach(opinion => {

    crearOpinion(
        opinion.nombre,
        opinion.mensaje,
        opinion.estrellas
    );

});


// ==============================
// CARRUSEL
// ==============================

function obtenerCantidadVisible() {

    if (window.innerWidth <= 700) {
        return 1;
    }

    return 3;
}


function actualizarCarrusel() {

    const tarjetas = document.querySelectorAll(".opinion");

    if (tarjetas.length === 0) return;

    const cantidadVisible = obtenerCantidadVisible();

    const maxPosicion = Math.max(
        0,
        Math.ceil(tarjetas.length / cantidadVisible) - 1
    );

    if (posicion > maxPosicion) {
        posicion = maxPosicion;
    }

    const ancho = tarjetas[0].offsetWidth;

    const gap = 20;

    lista.style.transform =
        `translateX(-${posicion * cantidadVisible * (ancho + gap)}px)`;


    // Activar/desactivar flechas

    flechaIzquierda.disabled = posicion === 0;

    flechaDerecha.disabled = posicion === maxPosicion;
}


// Flecha derecha

flechaDerecha.addEventListener("click", () => {

    const tarjetas = document.querySelectorAll(".opinion");

    const cantidadVisible = obtenerCantidadVisible();

    const maxPosicion =
        Math.ceil(tarjetas.length / cantidadVisible) - 1;

    if (posicion < maxPosicion) {

        posicion++;

        actualizarCarrusel();

    }

});


// Flecha izquierda

flechaIzquierda.addEventListener("click", () => {

    if (posicion > 0) {

        posicion--;

        actualizarCarrusel();

    }

});


// Actualizar al cambiar tamaño

window.addEventListener("resize", actualizarCarrusel);


// ==============================
// PUBLICAR OPINIÓN
// ==============================

reseñaButton.addEventListener("click", () => {

    const nombre = nombreInput.value.trim();
    const mensaje = mensajeInput.value.trim();

    if (!nombre || !mensaje) {
        alert("Completá tu nombre y tu opinión.");
        return;
    }

    if (calificacion === 0) {
        alert("Seleccioná una calificación.");
        return;
    }


    // Crear nueva opinión

    crearOpinion(
        nombre,
        mensaje,
        calificacion
    );


    // Cerrar modal

    modal.classList.remove("activo");


    // Limpiar formulario

    nombreInput.value = "";
    mensajeInput.value = "";

    calificacion = 0;


    // Resetear estrellas

    estrellas.forEach(estrella => {
        estrella.style.color = "#ccc";
    });


    // Llevar al último grupo de reseñas

    const tarjetas = document.querySelectorAll(".opinion");

    const cantidadVisible = obtenerCantidadVisible();

    posicion =
        Math.ceil(tarjetas.length / cantidadVisible) - 1;

    actualizarCarrusel();

});

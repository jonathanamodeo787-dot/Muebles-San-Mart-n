const opinionesContainer = document.querySelector(".opiniones-lista");
const button = document.querySelector(".opiniones-button");

const opiniones = [
    {
        nombre: "Jonathan",
        mensaje: "Muy bueno."
    },
    {
        nombre: "Juan",
        mensaje: "Demasiado bueno y lindo servicio."
    },
    {
        nombre: "Dalto",
        mensaje: "Hola, son los mejores en lo que hacen."
    }
];

function crearOpinion(nombre, mensaje) {
    const opinion = document.createElement("div");
    opinion.className = "opinion";

    opinion.innerHTML = `
        <p>${nombre}</p>
        <p>${mensaje}</p>
    `;

    opinionesContainer.appendChild(opinion);
}

opiniones.forEach(opinion => {
    crearOpinion(opinion.nombre, opinion.mensaje);
});

button.addEventListener("click", () => {
    const nombre = prompt("¿Cuál es tu nombre?");
    if (!nombre) return;

    const mensaje = prompt("Escribí tu opinión:");
    if (!mensaje) return;

    crearOpinion(nombre, mensaje);
});

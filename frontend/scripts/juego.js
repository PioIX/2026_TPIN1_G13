let pistaActual = "";
let usoPista = false;
let letrasUsadas = [];

document
    .querySelector("#btnPista")
    .addEventListener("click", usarPista);

console.log("Juego iniciado");

let palabraActual = "";
let palabraMostrada = [];
let vidas = 3;

document
    .querySelector("#btnIntentar")
    .addEventListener("click", intentarLetra);

// Obtener la categoría elegida en la pantalla anterior
const categoria = localStorage.getItem("categoria");

// Cargar la primera palabra
obtenerPalabra(categoria);

async function obtenerPalabra(idCategoria) {

    try {

        const respuesta = await fetch(
            `http://localhost:4000/PalabraRandom?id_categoria=${idCategoria}`
        );

        const datos = await respuesta.json();

        if (!datos.ok) {

            alert(datos.mensaje);
            return;

        }

        console.log("Palabra recibida:");
        console.log(datos.palabra);

        palabraActual = datos.palabra.palabra.toUpperCase();

        vidas = 3;

        document.querySelector("#vidas").textContent =
            "❤️❤️❤️";

        pistaActual = datos.palabra.pista;
        usoPista = false;

        document.querySelector("#pista").textContent =
            "Pista: --------";

        inicializarPalabra();

        letrasUsadas = [];

        document.querySelector("#letrasUsadas").textContent =
            "Letras usadas:";

    }
    catch (error) {

        console.error("Error al obtener palabra:", error);

    }

}

function mostrarPista(pista) {

    document.querySelector("#pista").textContent =
        `Pista: ${pista}`;

}

function inicializarPalabra() {

    palabraMostrada = [];

    for (let i = 0; i < palabraActual.length; i++) {

        if (palabraActual[i] === " ") {

            palabraMostrada.push(" ");

        }
        else {

            palabraMostrada.push("_");

        }

    }

    actualizarPalabra();

}

function actualizarPalabra() {

    document.querySelector("#palabra").textContent =
        palabraMostrada.join(" ");

}

function intentarLetra() {

    let letra = document
        .querySelector("#letra")
        .value
        .toUpperCase();


    if (letra === "") {

        return;
    }

    if (letrasUsadas.includes(letra)) {

        alert("Ya utilizaste esa letra.");

        document.querySelector("#letra").value = "";

        return;

    }

    letrasUsadas.push(letra);

    document.querySelector("#letrasUsadas").textContent =
        "Letras usadas: " +
        letrasUsadas.join(" - ");

    document.querySelector("#letra").value = "";

    if (letra === "") {

        return;

    }

    let encontrada = false;

    for (let i = 0; i < palabraActual.length; i++) {

        if (palabraActual[i] === letra) {

            palabraMostrada[i] = letra;

            encontrada = true;

        }

    }

    if (!encontrada) {

        vidas--;

        document.querySelector("#vidas").textContent =
            `Vidas: ${"❤️".repeat(vidas)}`;

    }

    actualizarPalabra();

}

function usarPista() {

    if (usoPista) {

        alert("La pista ya fue utilizada.");
        return;

    }

    usoPista = true;

    document.querySelector("#pista").textContent =
        `Pista: ${pistaActual}`;

}
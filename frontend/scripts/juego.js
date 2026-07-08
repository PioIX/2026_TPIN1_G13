let pistaActual = "";
let usoPista = false;
let letrasUsadas = [];

let palabraActual = "";
let palabraMostrada = [];
let dificultadActual = 1;

let vidas = 3;
let ronda = 1;



const letras = [
    "A", "B", "C", "D", "E", "F", "G",
    "H", "I", "J", "K", "L", "M", "N",
    "O", "P", "Q", "R", "S", "T", "U",
    "V", "W", "X", "Y", "Z"
];

crearTeclado();

function normalizar(texto) {
    return texto
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toUpperCase();
}

function crearTeclado() {

    const teclado =
        document.querySelector("#teclado");

    teclado.innerHTML = "";


    letras.forEach(letra => {

        let boton =
            document.createElement("button");

        boton.textContent = letra;

        boton.classList.add("tecla");

        boton.addEventListener("click", () => {
            if (boton.classList.contains("usada")) {
                return;
            }
            boton.classList.add("usada");
            intentarLetra(boton.textContent);
        });
        teclado.appendChild(boton);
    });
}

// Categoría elegida
const categoria = localStorage.getItem("categoria");

document
    .querySelector("#btnPista")
    .addEventListener("click", usarPista);

// Cargar primera palabra
obtenerPalabra(categoria);

async function obtenerPalabra(idCategoria) {

    if (!idCategoria) {
        mostrarCategoria();
        document.querySelector("#pista").textContent =
            "Pista: --------";
        document.querySelector("#letrasUsadas").textContent =
            "Letras usadas:";
        document.querySelector("#vidas").textContent =
            "❤️❤️❤️";
        alert("No se ha seleccionado ninguna categoría. Regresa a la pantalla de selección.");
        return;
    }

    try {

        const respuesta = await fetch(
            `http://localhost:4000/PalabraRandom?id_categoria=${idCategoria}`
        );

        const datos = await respuesta.json();
        console.log(datos);
        console.log(datos.palabra);

        if (!datos.ok) {

            alert(datos.mensaje);
            return;

        }

        palabraActual =
            datos.palabra.palabra.trim().toUpperCase();

        dificultadActual =
            datos.palabra.dificultad;

        pistaActual =
            datos.palabra.pista || "";

        usoPista = false;

        vidas = 3;

        letrasUsadas = [];
        crearTeclado();

        document.querySelector("#vidas").textContent =
            "❤️❤️❤️";

        document.querySelector("#pista").textContent =
            "Pista: --------";

        document.querySelector("#letrasUsadas").textContent =
            "Letras usadas:";

        document.querySelector("#ronda").textContent =
            `Ronda ${ronda} / 10`;

        mostrarCategoria(idCategoria);

        inicializarPalabra();

        document.querySelector("#puntaje").textContent =
            "Puntaje: " + puntajeTotal;

    }

    catch (error) {

        console.error(error);

    }

}

function mostrarCategoria(idCategoria) {

    let nombre = "Sin categoría";

    switch (Number(idCategoria)) {

        case 1:
            nombre = "Series y Películas";
            break;

        case 2:
            nombre = "Videojuegos";
            break;

        case 3:
            nombre = "Deportes";
            break;

        case 4:
            nombre = "Música";
            break;

    }

    document.querySelector("#categoria").textContent =
        "Categoría: " + nombre;

}

function inicializarPalabra() {

    palabraMostrada = [];

    for (let i = 0; i < palabraActual.length; i++) {

        if (palabraActual[i] == " ") {

            palabraMostrada.push(" ");

        }

        else {

            palabraMostrada.push("_");

        }

    }

    actualizarPalabra();

}

function actualizarPalabra() {

    let texto = "";

    for (let i = 0; i < palabraMostrada.length; i++) {

        if (palabraMostrada[i] == " ") {

            texto += "&nbsp;&nbsp;&nbsp;&nbsp;";

        }
        else {

            texto += palabraMostrada[i] + "&nbsp;";

        }
    }

    document.querySelector("#palabra").innerHTML = texto;

}

function intentarLetra(letra) {

    letra = letra.toUpperCase();

    const letraNormalizada = normalizar(letra);

    if (letrasUsadas.includes(letra)) {
        return;
    }

    letrasUsadas.push(letra);

    document.querySelector("#letrasUsadas").textContent =
        "Letras usadas: " + letrasUsadas.join(" - ");

    let encontrada = false;

    for (let i = 0; i < palabraActual.length; i++) {

        const caracterActual = palabraActual[i];

        if (normalizar(caracterActual) == letraNormalizada) {

            palabraMostrada[i] = caracterActual;

            encontrada = true;

        }

    }

    if (!encontrada) {

        vidas--;

        document.querySelector("#vidas").textContent =
            "❤️".repeat(vidas);

        if (vidas == 0) {

            setTimeout(() => {

                perderRonda();

                alert(
                    "Perdiste la ronda.\n\n" +
                    "La palabra era:\n" +
                    palabraActual
                );

                pasarRonda();

            }, 300);

        }

        return;

    }

    actualizarPalabra();

    if (palabraMostrada.join("") == palabraActual) {

        const puntos =
            ganarRonda(dificultadActual);

        setTimeout(() => {

            alert(
                "¡Ganaste la ronda!\n\n" +
                "Puntos obtenidos: " + puntos
            );

            pasarRonda();

        }, 300);

    }

}

async function pasarRonda() {

    ronda++;

    if (ronda > 10) {

        terminarPartida();

        return;

    }

    await obtenerPalabra(categoria);

}

function usarPista() {

    if (usoPista) {

        alert("La pista ya fue utilizada.");

        return;

    }

    usoPista = true;

    document.querySelector("#pista").textContent =
        "Pista: " + pistaActual;

}



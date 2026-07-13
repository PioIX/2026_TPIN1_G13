let pistaActual = "";
let usoPista = false;
let letrasUsadas = [];
let palabrasUsadas = [];
let palabraActual = "";
let palabraMostrada = [];
let dificultadActual = 1;
let idPalabraActual = 0;
let errores = 0;
let vidas = 3;
let ronda = 1;



const letras = [
    "Q", "W", "E", "R", "T", "Y", "U",
    "I", "O", "P", "A", "S", "D", "F",
    "G", "H", "J", "K", "L", "Z", "X",
    "C", "V", "B", "N", "M"
];

crearTeclado();

function ponerTextoSiExiste(selector, text) {
    const el = document.querySelector(selector);
    if (el) el.textContent = text;
}

function normalizar(texto) {  // Función para normalizar texto eliminando acentos y convirtiendo a mayúsculas
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

document
    .querySelector("#btnSalir")
    .addEventListener("click", () => {
        const confirmarSalida = confirm("¿Seguro que querés salir de la partida? Se perderá el progreso actual.");

        if (confirmarSalida) {
            window.location.href = "menu.html";
        }
    });

// Cargar primera palabra
obtenerPalabra(categoria);

async function obtenerPalabra(idCategoria) {

    if (!idCategoria) {
        mostrarCategoria();
        document.querySelector("#pista").textContent =
            "Pista: --------";
        ponerTextoSiExiste("#letrasUsadas", "Letras usadas:");
        document.querySelector("#vidas").textContent =
            `Vidas: ${"❤️".repeat(vidas)}`;
        alert("No se ha seleccionado ninguna categoría. Regresa a la pantalla de selección.");
        return;
    }

    try {

        const excluir = palabrasUsadas.join(",");

        const respuesta = await fetch(

            `http://localhost:4000/PalabraRandom?id_categoria=${idCategoria}&excluir=${excluir}`

        );

        const datos = await respuesta.json();
        console.log(datos);
        console.log(datos.palabra);

        if (!datos.ok) {

            alert(datos.mensaje);
            return;

        }

        // Guardar la palabra para no repetirla
        palabrasUsadas.push(datos.palabra.id_palabra);

        palabraActual =
            datos.palabra.palabra.trim().toUpperCase();
        

        idPalabraActual = datos.palabra.id_palabra;

        dificultadActual =
            datos.palabra.dificultad;

        let textoDificultad = "";

        if (dificultadActual == 1) {

            textoDificultad = "Fácil";

        }
        else if (dificultadActual == 2) {

            textoDificultad = "Media";

        }
        else {

            textoDificultad = "Difícil";

        }

        document.querySelector("#dificultad").textContent =
            "Dificultad: " + textoDificultad;


        pistaActual =
            datos.palabra.pista || "";

        usoPista = false;

        vidas = 3;

        letrasUsadas = [];
        crearTeclado();

        document.querySelector("#vidas").textContent =
            `Vidas: ${"❤️".repeat(vidas)}`;

        document.querySelector("#pista").textContent =
            "Pista: --------";

        ponerTextoSiExiste("#letrasUsadas", "Letras usadas:");

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

    const contenedor =
        document.querySelector("#palabra");

    contenedor.innerHTML = "";

    for (let i = 0; i < palabraMostrada.length; i++) {

        if (palabraMostrada[i] == " ") {

            const espacio =
                document.createElement("div");

            espacio.style.width = "40px";

            contenedor.appendChild(espacio);

        }

        else {

            const letra =
                document.createElement("span");

            letra.textContent =
                palabraMostrada[i];

            letra.style.display = "inline-block";
            letra.style.margin = "0 6px";

            contenedor.appendChild(letra);

        }

    }

}

function intentarLetra(letra) {

    letra = letra.toUpperCase();

    const letraNormalizada = normalizar(letra);

    if (letrasUsadas.includes(letra)) {
        return;
    }

    letrasUsadas.push(letra);

    ponerTextoSiExiste("#letrasUsadas", "Letras usadas: " + letrasUsadas.join(" - "));

    let encontrada = false;

    for (let i = 0; i < palabraActual.length; i++) {

        const caracterActual = palabraActual[i];

        if (normalizar(caracterActual) == letraNormalizada) {

            palabraMostrada[i] = caracterActual;

            encontrada = true;

        }

    }

    if (!encontrada) {

        errores++;

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

    console.log("Ronda:", ronda);

    if (ronda > 10) {

        console.log("Voy a llamar a terminarPartida()");

        terminarPartida();

        return;

    }

    await obtenerPalabra(categoria);

    errores = 0;

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



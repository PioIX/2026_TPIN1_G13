console.log("Juego iniciado");

let palabraActual = "";
let palabraMostrada = [];
let vidas = 3;

document
    .querySelector("#btnIntentar")
    .addEventListener("click", intentarLetra);

async function obtenerPalabra(idCategoria){

    try{

        const respuesta = await fetch(
            `http://localhost:4000/PalabraRandom?id_categoria=${idCategoria}`
        );

        const palabra = await respuesta.json();

        console.log("Palabra recibida:");
        console.log(palabra);

        palabraActual = palabra.palabra.toUpperCase();

        mostrarPista(palabra.pista);

        inicializarPalabra();

    }
    catch(error){

        console.error("Error al obtener palabra:", error);

    }

}

function mostrarPista(pista){

    document.querySelector("#pista").textContent =
        `Pista: ${pista}`;

}

function inicializarPalabra(){

    palabraMostrada = [];

    for(let i = 0; i < palabraActual.length; i++){

        if(palabraActual[i] === " "){

            palabraMostrada.push(" ");

        }
        else{

            palabraMostrada.push("_");

        }

    }

    actualizarPalabra();

}

function actualizarPalabra(){

    document.querySelector("#palabra").textContent =
        palabraMostrada.join(" ");

}

function intentarLetra(){

    let letra = document
        .querySelector("#letra")
        .value
        .toUpperCase();

    document.querySelector("#letra").value = "";

    if(letra === ""){

        return;

    }

    let encontrada = false;

    for(let i = 0; i < palabraActual.length; i++){

        if(palabraActual[i] === letra){

            palabraMostrada[i] = letra;

            encontrada = true;

        }

    }

    if(!encontrada){

        vidas--;

        document.querySelector("#vidas").textContent =
            `Vidas: ${vidas}`;

    }

    actualizarPalabra();

}

obtenerPalabra(3);
// =========================
// SISTEMA DE PUNTAJE
// =========================

let puntajeTotal = 0;

let rondasGanadas = 0;
let rondasPerdidas = 0;

const PUNTAJE_OBJETIVO = 2000;


// =========================
// PUNTAJE BASE
// =========================

function obtenerPuntajeBase(dificultad) {

    switch (Number(dificultad)) {

        case 1:
            return 100;

        case 2:
            return 200;

        case 3:
            return 300;

        default:
            return 0;

    }

}


// =========================
// CALCULAR PUNTOS
// =========================

function calcularPuntaje(
    dificultad,
    vidas,
    usoPista
) {

    let puntos =
        obtenerPuntajeBase(dificultad);

    // Bonus por vidas

    puntos += vidas * 25;

    // Penalización por pista

    if (usoPista) {

        puntos -= 50;

    }

    return puntos;

}


// =========================
// GANAR RONDA
// =========================

function ganarRonda(dificultad) {

    const puntosRonda =
        calcularPuntaje(
            dificultad,
            vidas,
            usoPista
        );

    puntajeTotal += puntosRonda;

    rondasGanadas++;

    document.querySelector("#puntaje").textContent =
        "Puntaje: " + puntajeTotal;

    return puntosRonda;

}


// =========================
// PERDER RONDA
// =========================

function perderRonda() {

    rondasPerdidas++;

}


// =========================
// FINALIZAR PARTIDA
// =========================

function terminarPartida() {

    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );

    localStorage.setItem(

        "resultadoPartida",

        JSON.stringify({

            usuario: usuario.usuario,

            puntaje: puntajeTotal,

            victoria:
                puntajeTotal >= PUNTAJE_OBJETIVO,

            rondasGanadas,

            rondasPerdidas

        })

    );

    window.location.href =
        "/frontend/pages/resultado.html";

}
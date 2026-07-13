// =========================
// SISTEMA DE PUNTAJE
// =========================

let puntajeTotal = 0;

let rondasGanadas = 0;
let rondasPerdidas = 0;
let ultimoResultado = "";
let ultimoPuntajeRonda = 0;
let ultimoUsoPista = false;
let ultimoErrores = 0;

const PUNTAJE_OBJETIVO = 1500;


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

    ultimoResultado = "GANO";
    ultimoPuntajeRonda = puntosRonda;
    ultimoUsoPista = usoPista;
    ultimoErrores = errores;

    document.querySelector("#puntaje").textContent =
        "Puntaje: " + puntajeTotal;

    guardarRonda();

    return puntosRonda;

}


// =========================
// PERDER RONDA
// =========================

function perderRonda() {

    rondasPerdidas++;

    ultimoResultado = "PERDIO";
    ultimoPuntajeRonda = 0;
    ultimoUsoPista = usoPista;
    ultimoErrores = errores;

    guardarRonda();

}

async function guardarRonda() {

    const usuario =
        JSON.parse(
            localStorage.getItem("usuario")
        );

    await fetch(
        "http://localhost:4000/GuardarRonda",
        {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                id_usuario: usuario.id_usuario,

                id_palabra: idPalabraActual,

                uso_pista: ultimoUsoPista,

                errores: ultimoErrores,

                puntos_ganados: ultimoPuntajeRonda,

                resultado: ultimoResultado

            })

        }

    );

}



// =========================
// FINALIZAR PARTIDA
// =========================

async function terminarPartida() {

    console.log("ENTRÉ A terminarPartida");

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

    await fetch("http://localhost:4000/FinalizarPartida", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            id_usuario: usuario.id_usuario,

            puntaje: puntajeTotal,

            victoria: puntajeTotal >= PUNTAJE_OBJETIVO

        })

    });

    window.location.href =
        "/frontend/pages/resultado.html";

}
// Puntaje acumulado durante toda la partida
let puntajeTotal = 0;

// Cantidad de rondas ganadas
let rondasGanadas = 0;

// Cantidad de rondas perdidas
let rondasPerdidas = 0;

// Resultado final de la partida
let resultadoPartida = "";

/*
Devuelve el puntaje base de una palabra
según su dificultad.
*/

function obtenerPuntajeBase(dificultad) {

    switch (dificultad) {

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

/*
Calcula el puntaje obtenido
en una ronda.

Parámetros:

- dificultad
- vidas restantes
- si usó pista
*/

function calcularPuntaje(dificultad, vidas, usoPista) {

    let puntos = obtenerPuntajeBase(dificultad);

    // Bonus por vidas

    puntos += vidas * 25;

    // Penalización por pista

    if (usoPista) {

        puntos -= 50;

    }

    return puntos;

}

/*
Se ejecuta únicamente
cuando el jugador adivina la palabra.
*/

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

/*
Si pierde una ronda
no suma puntos.
*/

function perderRonda() {

    rondasPerdidas++;

}


function terminarPartida() {

    resultadoPartida = "";

    if (rondasGanadas > rondasPerdidas) {

        resultadoPartida = "Victoria";

    }
    else if (rondasGanadas < rondasPerdidas) {

        resultadoPartida = "Derrota";

    }
    else {

        resultadoPartida = "Empate";

    }
    alert(

        "Partida terminada\n\n" +

        "Puntaje: " + puntajeTotal +

        "\nGanadas: " + rondasGanadas +

        "\nPerdidas: " + rondasPerdidas +

        "\nResultado: " + resultadoPartida

    );

    return {

        puntaje: puntajeTotal,

        ganadas: rondasGanadas,

        perdidas: rondasPerdidas,

        resultado: resultadoPartida

    }
}
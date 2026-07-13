const datos =
    JSON.parse(
        localStorage.getItem("resultadoPartida")
    );

if (!datos) {

    window.location.href =
        "/frontend/pages/menu.html";

}

document.querySelector("#puntajeFinal").textContent =
    datos.puntaje;

document.querySelector("#ganadas").textContent =
    datos.rondasGanadas;

document.querySelector("#perdidas").textContent =
    datos.rondasPerdidas;

if (datos.victoria) {

    document.querySelector("#tituloResultado").textContent =
        "¡GANASTE!";

    document.querySelector("#mensajeResultado").textContent =
        "Superaste los 1500 puntos.";

    document.querySelector("#tituloResultado").style.color =
        "#39FF14";

}
else {

    document.querySelector("#tituloResultado").textContent =
        "PERDISTE";

    document.querySelector("#mensajeResultado").textContent =
        "No alcanzaste los 1500 puntos.";

    document.querySelector("#tituloResultado").style.color =
        "#ff4b4b";

}

document.querySelector("#btnMenu")
.addEventListener("click", () => {

    window.location.href =
        "/frontend/pages/menu.html";

});

document.querySelector("#btnRanking")
.addEventListener("click", () => {

    window.location.href =
        "/frontend/pages/ranking.html";

});

document.querySelector("#btnJugarOtra")
.addEventListener("click", () => {

    window.location.href =
        "/frontend/pages/seleccionar_categoria.html";

});
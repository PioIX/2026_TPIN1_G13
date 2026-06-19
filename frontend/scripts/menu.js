const usuario = JSON.parse(
    localStorage.getItem("usuario")
);

if (!usuario) {
    window.location.href = "login.html";
}

document.querySelector("#bienvenida").innerHTML =
    `Bienvenido ${usuario.usuario}`;

document.querySelector("#btnJugar")
    .addEventListener("click", () => {

        window.location.href =
            "seleccionar_categoria.html";

    });

document.querySelector("#btnRanking")
    .addEventListener("click", () => {

        window.location.href =
            "ranking.html";

    });

document.querySelector("#btnEstadisticas")
    .addEventListener("click", () => {

        window.location.href =
            "estadisticas.html";

    });

document.querySelector("#btnLogout")
    .addEventListener("click", () => {

        localStorage.removeItem("usuario");

        window.location.href =
            "login.html";

    });
const usuario =
    JSON.parse(localStorage.getItem("usuario"));

if (!usuario || usuario.es_admin != 1) {

    alert("Acceso denegado");

    window.location.href = "login.html";

}

// BOTONES

document
    .getElementById("btnPalabras")
    .addEventListener("click", () => {

        window.location.href =
            "admin_palabras.html";

    });

document
    .getElementById("btnUsuarios")
    .addEventListener("click", () => {

        window.location.href =
            "admin_usuarios.html";

    });

document
    .getElementById("btnPartidas")
    .addEventListener("click", () => {

        window.location.href =
            "admin_partidas.html";

    });

document
    .getElementById("btnCerrarSesion")
    .addEventListener("click", cerrarSesion);

function cerrarSesion() {

    localStorage.removeItem("usuario");

    window.location.href = "login.html";

}
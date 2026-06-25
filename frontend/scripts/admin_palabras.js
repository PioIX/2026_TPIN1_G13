document
    .querySelectorAll(".categoria")
    .forEach(boton => {

        boton.addEventListener("click", () => {

            const idCategoria =
                boton.dataset.id;

            window.location.href =
                `admin_palabras_categoria.html?id_categoria=${idCategoria}`;        

        });

    });

document
    .querySelector("#btnVolver")
    .addEventListener("click", () => {

        window.location.href =
            "panel_admin.html";

    });
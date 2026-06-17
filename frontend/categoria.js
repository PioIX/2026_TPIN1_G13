/*document
    .querySelector("#btnComenzar")
    .addEventListener("click", () => {

        const categoria =
            document.querySelector("#categoria").value;

        localStorage.setItem(
            "categoria",
            categoria
        );

        window.location.href =
            "juego.html";

    });*/

    document
    .querySelectorAll(".card")
    .forEach(card => {

        card.addEventListener("click", () => {

            document
                .querySelectorAll(".card")
                .forEach(c =>
                    c.classList.remove("seleccionada")
                );

            card.classList.add("seleccionada");

            document
                .querySelector("#categoria")
                .value =
                    card.dataset.id;

        });

    });

document
    .querySelector("#btnComenzar")
    .addEventListener("click", () => {

        const categoria =
            document.querySelector("#categoria").value;

        if(categoria === ""){
            alert("Seleccioná una categoría");
            return;
        }

        localStorage.setItem(
            "categoria",
            categoria
        );

        window.location.href =
            "juego.html";

    });
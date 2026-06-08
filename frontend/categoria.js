document
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

    });
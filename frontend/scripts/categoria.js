let categoriaSeleccionada = "";

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

    card.addEventListener("click", () => {

        cards.forEach(c =>
            c.classList.remove("seleccionada")
        );

        card.classList.add("seleccionada");

        categoriaSeleccionada =
            card.dataset.id;

    });

});

document
    .querySelector("#btnComenzar")
    .addEventListener("click", comenzarPartida);

function comenzarPartida(){

    if(categoriaSeleccionada === ""){

        alert("Seleccione una categoría.");
        return;

    }

    localStorage.setItem(
        "categoria",
        categoriaSeleccionada
    );

    window.location.href =
        "juego.html";

}
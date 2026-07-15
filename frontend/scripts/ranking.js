console.log("Ranking");


document
    .querySelector("#btnVolver")    // Botón volver
    .addEventListener("click", () => {

        window.location.href = "menu.html";

    });


cargarRanking();    // Cargamos ranking al abrir la página

async function cargarRanking() {

    try {

        const respuesta = await fetch(
            "http://localhost:4000/Usuarios"
        );

        let usuarios = await respuesta.json();

        // Solo mostramos usuarios con puntaje
        usuarios = usuarios.filter(usuario => usuario.puntaje > 0);

        // Orden por puntaje de menor a meyor
        usuarios.sort((a, b) => b.puntaje - a.puntaje);

        const tabla =
            document.querySelector("#tablaRanking");

        tabla.innerHTML = "";

        // nuestro ranking NO va a mostrar jugadores sin puntaje. si no hay users con puntaje todavia...
        if (usuarios.length == 0) {

            tabla.innerHTML = `
                <tr>
                    <td colspan="5">
                        Aún no hay jugadores en el ranking.
                    </td>
                </tr>
            `;

            return;

        }

        usuarios.forEach((usuario, indice) => {

            let posicion;

            switch (indice) {

                case 0:
                    posicion = "🥇";
                    break;

                case 1:
                    posicion = "🥈";
                    break;

                case 2:
                    posicion = "🥉";
                    break;

                default:
                    posicion = indice + 1;
                    break;

            }

            tabla.innerHTML += `

                <tr>

                    <td>${posicion}</td>

                    <td>${usuario.usuario}</td>

                    <td>${usuario.puntaje}</td>

                    <td>${usuario.victorias}</td>

                    <td>${usuario.derrotas}</td>

                    <td>${usuario.partidas_jugadas}</td>

                </tr>

            `;

        });

    }

    catch (error) {

        console.error(error);

        alert("No se pudo cargar el ranking.");

    }

}
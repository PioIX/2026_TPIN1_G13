console.log("Ranking");

// Botón volver
document
    .querySelector("#btnVolver")
    .addEventListener("click", () => {

        window.location.href = "menu.html";

    });

// Cargar ranking al abrir la página
cargarRanking();

async function cargarRanking() {

    try {

        const respuesta = await fetch(
            "http://localhost:4000/Usuarios"
        );

        let usuarios = await respuesta.json();

        // Solo mostrar usuarios con puntaje
        usuarios = usuarios.filter(usuario => usuario.puntaje > 0);

        // Ordenar por puntaje (mayor a menor)
        usuarios.sort((a, b) => b.puntaje - a.puntaje);

        const tabla =
            document.querySelector("#tablaRanking");

        tabla.innerHTML = "";

        // Si no hay usuarios con puntaje
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
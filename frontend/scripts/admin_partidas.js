window.addEventListener(
    "DOMContentLoaded",
    cargarPartidas
);

async function cargarPartidas() {

    const respuesta =
        await fetch(
            "http://localhost:4000/Partidas"
        );

    const partidas =
        await respuesta.json();

    const tabla =
        document.querySelector("#tablaPartidas");

    tabla.innerHTML = "";

    partidas.forEach(partida => {

        tabla.innerHTML += `

        <tr>

            <td>${partida.id_partida}</td>

            <td>${partida.usuario}</td>

            <td>${partida.palabra}</td>

            <td>${partida.resultado}</td>

            <td>${partida.puntos_ganados}</td>

            <td>${partida.errores}</td>

            <td>${partida.uso_pista ? "SI" : "NO"}</td>

            <td>${formatearFecha(partida.fecha)}</td>

            <td>

                <button
                    class="btnEliminar"
                    onclick="eliminarPartida(${partida.id_partida})">

                    ELIMINAR

                </button>

            </td>

        </tr>

        `;

    });

}

async function eliminarPartida(id) {

    const confirmar =
        confirm("¿Desea eliminar esta partida?");

    if (!confirmar) {
        return;
    }

    const respuesta =
        await fetch(

            `http://localhost:4000/Partidas?id_partida=${id}`,

            {
                method: "DELETE"
            }

        );

    const datos =
        await respuesta.json();

    alert(datos.mensaje);

    cargarPartidas();

}

function formatearFecha(fecha) {

    return new Date(fecha).toLocaleString(
        "es-AR"
    );

}

document
    .querySelector("#btnVolver")
    .addEventListener("click", () => {

        window.location.href =
            "panel_admin.html";

    });
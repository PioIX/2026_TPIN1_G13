const parametros =
    new URLSearchParams(window.location.search);

const idCategoria =
    parametros.get("id_categoria");

const nombresCategorias = {

    1: "PERSONAJES",
    2: "VIDEOJUEGOS",
    3: "DEPORTES",
    4: "MÚSICA"

};

document.querySelector("#tituloCategoria").textContent =
    nombresCategorias[idCategoria];

window.addEventListener(
    "DOMContentLoaded",
    cargarPalabras
);

//carga de palabras segun categoria que el admin haya elegido (filtramos por id)
async function cargarPalabras() {

    const respuesta =
        await fetch(
            `http://localhost:4000/Palabras?id_categoria=${idCategoria}`
        );

    const palabras =
        await respuesta.json();

    const tabla =
        document.querySelector("#tablaPalabras");

    tabla.innerHTML = "";

    palabras.forEach(palabra => {

        tabla.innerHTML += `

        <tr>

            <td>${palabra.palabra}</td>

            <td>${palabra.dificultad}</td>

            <td>${palabra.pista}</td>

            <td>

                <button
                    onclick="editarPalabra(${palabra.id_palabra})">
                    ✏️
                </button>

                <button
                    onclick="eliminarPalabra(${palabra.id_palabra})">
                    🗑️
                </button>

            </td>

        </tr>

        `;

    });

}

document
    .querySelector("#btnVolver")
    .addEventListener("click", () => {

        window.location.href =
            "admin_palabras.html";

    });

document
    .querySelector("#btnAgregar")
    .addEventListener("click", () => {

        agregarPalabra();

    });

//agregar palabra
async function agregarPalabra() {

    const palabra =
        prompt("Ingrese la palabra:");

    if (!palabra) {
        return;
    }

    const pista =
        prompt("Ingrese la pista:");

    if (!pista) {
        return;
    }

    const dificultad =
        prompt("Ingrese la dificultad (1, 2 o 3):");

    if (!dificultad) {
        return;
    }

    const respuesta =
        await fetch(
            "http://localhost:4000/Palabras",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    id_categoria: idCategoria,
                    palabra: palabra.toUpperCase(),
                    pista: pista.toUpperCase(),
                    dificultad
                })
            }
        );

    const datos =
        await respuesta.json();

    alert(datos.mensaje);

    cargarPalabras();

}

function editarPalabra(id) {

    alert(
        "Próximamente: PUT /Palabras/" + id
    );

}

//eliminar palabra
async function eliminarPalabra(id) {

    const confirmar =
        confirm("¿Eliminar esta palabra?");

    if (!confirmar) {
        return;
    }

    await fetch(
        `http://localhost:4000/Palabras?id_palabra=${id}`,
        {
            method: "DELETE"
        }
    );

    cargarPalabras();//llamo a esta funcion para refrescar la tabla (vuelve a hacer el GET)

}


async function editarPalabra(id) {

    // Obtener los datos actuales de la palabra

    const respuesta = await fetch(
        `http://localhost:4000/Palabras?id_palabra=${id}`
    );

    const palabraActual = (await respuesta.json())[0];

    // Pedir los nuevos valores

    const palabra = prompt(
        "Palabra:",
        palabraActual.palabra
    );

    if (palabra == null) return;

    const pista = prompt(
        "Pista:",
        palabraActual.pista
    );

    if (pista == null) return;

    const dificultad = prompt(
        "Dificultad (1,2,3):",
        palabraActual.dificultad
    );

    if (dificultad == null) return;

    // Enviar actualización

    const respuestaPut = await fetch(

        `http://localhost:4000/Palabras/${id}`,

        {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                id_categoria: idCategoria,

                palabra: palabra.toUpperCase(),

                pista: pista.toUpperCase(),

                dificultad

            })

        }

    );

    const datos = await respuestaPut.json();

    alert(datos.mensaje);

    cargarPalabras();

}z
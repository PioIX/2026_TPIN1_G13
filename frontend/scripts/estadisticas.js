console.log("Estadísticas");
document
    .querySelector("#btnVolver")
    .addEventListener("click", () => {

        window.location.href = "menu.html";

    });


cargarEstadisticas();

async function cargarEstadisticas() {

    try {

        //usuario representa al usuario que inició sesión, porque previamente fue guardado en el localStorage. con JSON.parse lo que hacemos es transformarlo a un objeto.
        //esto es porque getItem devuelve un string en realidad, y nosotros necesitamos el objeto
        const usuario =
            JSON.parse(
                localStorage.getItem("usuario")             
            );
        

        const respuesta =
            await fetch(

                `http://localhost:4000/Usuarios?id_usuario=${usuario.id_usuario}`

            );

        const datos =
            await respuesta.json();

        const jugador = datos[0];

        document.querySelector("#victorias").textContent =
            jugador.victorias;

        document.querySelector("#derrotas").textContent =
            jugador.derrotas;

        document.querySelector("#puntaje").textContent =
            jugador.puntaje;

        document.querySelector("#partidas").textContent =
            jugador.partidas_jugadas;

    }

    catch (error) {

        console.error(error);

        alert("No se pudieron cargar las estadísticas.");

    }

}
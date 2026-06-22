window.addEventListener(
    "DOMContentLoaded",
    cargarPalabras
);

async function cargarPalabras() {

    const respuesta =
        await fetch(
            "http://localhost:4000/Palabras"
        );

    const palabras =
        await respuesta.json();

    const tabla =
        document.querySelector("#tablaPalabras");

    tabla.innerHTML = "";

    palabras.forEach(palabra => {      //usamos forEach para recorrer la lista automaticamente sin tener que hacer algun control de posicion manual                 
            //relleno la tabla
        tabla.innerHTML += `                    

        <tr>

            <td>${palabra.palabra}</td>

            <td>${palabra.id_categoria}</td>

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
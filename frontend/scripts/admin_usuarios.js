window.addEventListener(
    "DOMContentLoaded",
    cargarUsuarios
);

async function cargarUsuarios(){

    const respuesta = await fetch(
        "http://localhost:4000/Usuarios"
    );

    const usuarios =
        await respuesta.json();

    const tabla =
        document.querySelector("#tablaUsuarios");

    tabla.innerHTML = "";

    usuarios.forEach(usuario => {

        tabla.innerHTML += `

        <tr>

        <td>${usuario.id_usuario}</td>

        <td>${usuario.nombre}</td>

        <td>${usuario.apellido}</td>

        <td>${usuario.usuario}</td>

        <td>${usuario.email}</td>

        <td>${usuario.puntaje}</td>

        <td>
        <button onclick="eliminarUsuario(${usuario.id_usuario})">
        🗑️
        </button>

        </td>

        </tr>

        `;

    });



}

async function eliminarUsuario(id){



    const confirmar =
        confirm(
            "¿Eliminar usuario?"
        );



    if(!confirmar){

        return;

    }

    await fetch(

        `http://localhost:4000/Usuarios?id_usuario=${id}`,

        {
            method:"DELETE"
        }

    );

    cargarUsuarios();

}

document
.querySelector("#btnVolver")
.addEventListener(
"click",
()=>{

    window.location.href =
    "panel_admin.html";

});
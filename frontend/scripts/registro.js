document
    .querySelector("#btnRegistro")
    .addEventListener("click", registrarse);

async function registrarse() {

    const nombre = document.querySelector("#nombre").value;
    const apellido = document.querySelector("#apellido").value;
    const usuario = document.querySelector("#usuario").value;
    const email = document.querySelector("#email").value;
    const contrasena = document.querySelector("#contrasena").value;

    const respuesta = await fetch(
        "http://localhost:4000/Usuarios",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                nombre,
                apellido,
                usuario,
                email,
                contrasena
            })
        }
    );

    const datos = await respuesta.json();

    alert(datos.mensaje);

    window.location.href =
        "login.html";

}
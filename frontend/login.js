document
    .querySelector("#btnLogin")
    .addEventListener("click", iniciarSesion);

async function iniciarSesion() {

    const usuario = document.querySelector("#usuario").value;
    const contrasena = document.querySelector("#contrasena").value;

    const respuesta = await fetch(
        "http://localhost:4000/Login",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usuario,
                contrasena
            })
        }
    );

    const datos = await respuesta.json();

    if (datos.ok) {

        localStorage.setItem(
            "usuario",
            JSON.stringify(datos.usuario)
        );

        window.location.href = "menu.html";

    } else {

        alert(datos.mensaje);

    }

}


document.querySelector("#btnLoginaReg")
    .addEventListener("click", () => {

        window.location.href =
            "registro.html";

    });
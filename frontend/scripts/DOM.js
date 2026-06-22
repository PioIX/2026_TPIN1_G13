function crearFilaClub(club) {
    return `
        <tr>
            <td>${club.id_club}</td>
            <td>${club.nombre}</td>
            <td>${club.fecha_fundacion}</td>
            <td>${club.cant_socios}</td>
            <td>${club.cant_titulos}</td>
            <td>${club.tiene_futbol_femenino ? "Sí" : "No"}</td>
        </tr>
    `;
}

function cargarTabla(clubes) {
    const tabla = document.getElementById("tablaClubes");
    tabla.innerHTML = "";

    clubes.forEach(club => {
        tabla.innerHTML += crearFilaClub(club);
    });
}
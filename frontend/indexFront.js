async function cargarClubes() {
    try {
        const res = await fetch("http://localhost:4000/Clubes");
        const data = await res.json();

        cargarTabla(data);

    } catch (error) {
        console.error("Error cargando clubes:", error);
    }
}

cargarClubes();
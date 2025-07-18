document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.getElementById("tablaClientes");
    const mensajeVacio = document.getElementById("mensajeVacio");

    fetch("http://localhost:8080/api/clientes") // Asegúrate de tener este endpoint en el backend
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los clientes");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                mensajeVacio.textContent = "No hay clientes registrados.";
                return;
            }

            data.forEach(cliente => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
          <td>${cliente.id}</td>
          <td>${cliente.nombre}</td>
          <td>${cliente.correo}</td>
          <td>${new Date(cliente.fechaRegistro).toLocaleDateString()}</td>
        `;

                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            mensajeVacio.textContent = "No se pudo cargar la lista de clientes.";
            console.error(error);
        });
});

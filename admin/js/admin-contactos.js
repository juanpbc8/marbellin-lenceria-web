document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.getElementById("tablaContactos");
    const mensajeVacio = document.getElementById("mensajeVacio");

    fetch("http://localhost:8080/api/contactos")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los contactos");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                mensajeVacio.textContent = "No hay mensajes por mostrar.";
                return;
            }

            data.forEach(contacto => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
          <td>${contacto.nombreCompleto}</td>
          <td>${contacto.correoElectronico}</td>
          <td>${contacto.numeroTelefono}</td>
          <td>${contacto.asunto}</td>
          <td>${contacto.mensaje}</td>
          <td>${new Date(contacto.fechaRegistro).toLocaleString()}</td>
        `;

                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            mensajeVacio.textContent = "No se pudo cargar la lista de contactos.";
            console.error(error);
        });
});

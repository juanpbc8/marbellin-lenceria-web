document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.getElementById("tablaProductos");
    const mensajeVacio = document.getElementById("mensajeVacio");

    fetch("http://localhost:8080/api/productos/modelos/catalogo")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener el catálogo de productos.");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                mensajeVacio.textContent = "No hay productos registrados.";
                return;
            }

            const baseURL = "http://localhost:8080";

            data.forEach(modelo => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
          <td>${modelo.idModelo}</td>
          <td><img src="${baseURL}${modelo.imagen}" alt="${modelo.nombreModelo}" style="width:60px; border-radius:8px;"></td>
          <td>${modelo.nombreModelo}</td>
          <td>${modelo.categoria}</td>
          <td>S/ ${modelo.precio}</td>
        `;

                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            mensajeVacio.textContent = "Ocurrió un error al cargar los productos.";
            console.error(error);
        });
});

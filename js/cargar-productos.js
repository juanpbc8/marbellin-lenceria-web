import { productos } from "./productos.js";

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-productos");

    // Leer parámetro ?cat=
    const params = new URLSearchParams(window.location.search);
    const categoria = params.get("cat");

    // Filtrar si hay categoría, si no, mostrar todos
    const productosFiltrados = categoria
        ? productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase())
        : productos;

    // Mostrar mensaje si no hay resultados
    if (productosFiltrados.length === 0) {
        contenedor.innerHTML = `<p style="text-align: center; font-weight: bold;">No se encontraron productos para esta categoría.</p>`;
        return;
    }

    // Renderizar productos
    productosFiltrados.forEach(producto => {
        const a = document.createElement("a");
        a.href = `producto-detalle.html?id=${producto.id}`;
        a.classList.add("producto");

        a.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>S/${producto.precio.toFixed(2)}</p>
        `;

        contenedor.appendChild(a);
    });
});

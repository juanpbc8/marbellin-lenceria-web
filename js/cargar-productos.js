import { productos } from "./productos.js";

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-productos");

    productos.forEach(producto => {
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

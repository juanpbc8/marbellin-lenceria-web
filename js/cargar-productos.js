// import { productos } from "./productos.js";

// document.addEventListener("DOMContentLoaded", () => {
//     const contenedor = document.getElementById("lista-productos");

//     // Leer parámetro ?cat=
//     const params = new URLSearchParams(window.location.search);
//     const categoria = params.get("cat");

//     // Filtrar si hay categoría, si no, mostrar todos
//     const productosFiltrados = categoria
//         ? productos.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase())
//         : productos;

//     // Mostrar mensaje si no hay resultados
//     if (productosFiltrados.length === 0) {
//         contenedor.innerHTML = `<p style="text-align: center; font-weight: bold;">No se encontraron productos para esta categoría.</p>`;
//         return;
//     }

//     // Renderizar productos
//     productosFiltrados.forEach(producto => {
//         const a = document.createElement("a");
//         a.href = `producto-detalle.html?id=${producto.id}`;
//         a.classList.add("producto");

//         a.innerHTML = `
//             <img src="${producto.imagen}" alt="${producto.nombre}">
//             <h3>${producto.nombre}</h3>
//             <p>S/${producto.precio.toFixed(2)}</p>
//         `;

//         contenedor.appendChild(a);
//     });
// });
const API_URL = "http://localhost:8080/api/productos/modelos/catalogo";

document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-productos");
    const categoria = obtenerCategoriaDesdeURL();

    cargarModelos(categoria)
        .then(modelos => renderizarModelos(modelos, contenedor))
        .catch(error => mostrarError(error, contenedor));
});

/**
 * Obtiene el valor del parámetro "cat" desde la URL
 */
function obtenerCategoriaDesdeURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get("cat");
}

/**
 * Carga los modelos desde el backend y filtra por categoría si se proporciona
 */
async function cargarModelos(categoria) {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("No se pudo obtener los modelos del backend");
    }

    const modelos = await response.json();

    return categoria
        ? modelos.filter(m => m.categoria.toLowerCase() === categoria.toLowerCase())
        : modelos;
}

/**
 * Renderiza los modelos en el contenedor HTML
 */
function renderizarModelos(modelos, contenedor) {
    if (modelos.length === 0) {
        contenedor.innerHTML = `
            <p style="text-align: center; font-weight: bold;">
                No se encontraron productos para esta categoría.
            </p>`;
        return;
    }

    modelos.forEach(modelo => {
        const a = document.createElement("a");
        a.href = `producto-detalle.html?id=${modelo.idModelo}`;
        a.classList.add("producto");

        a.innerHTML = `
            <img src="http://localhost:8080${modelo.imagen}" alt="${modelo.nombreModelo}">
            <h3>${modelo.nombreModelo}</h3>
            <p>S/${modelo.precio.toFixed(2)}</p>
        `;

        contenedor.appendChild(a);
    });
}

/**
 * Muestra un mensaje de error en el contenedor
 */
function mostrarError(error, contenedor) {
    console.error("Error al cargar los productos:", error);
    contenedor.innerHTML = `
        <p style="text-align: center; font-weight: bold;">
            Error al cargar los productos. Intenta nuevamente más tarde.
        </p>`;
}
document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.getElementById("lista-productos");

    productos.forEach(producto => {
        const a = document.createElement("a");
        a.href = `producto-detalle.html?id=${producto.id}`;
        a.classList.add("producto");

        a.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h3>${producto.nombre}</h3>
            <p>${producto.precio}</p>
        `;

        contenedor.appendChild(a);
    });

});

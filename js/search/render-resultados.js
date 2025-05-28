export function renderResultados(resultados) {
    let contenedor = document.querySelector('.resultados-busqueda');

    // Si no existe, creamos el contenedor
    if (!contenedor) {
        contenedor = document.createElement('div');
        contenedor.classList.add('resultados-busqueda');
        document.querySelector('.buscador').appendChild(contenedor);
    }

    contenedor.innerHTML = '';

    if (resultados.length === 0) {
        const sinResultados = document.createElement('div');
        sinResultados.classList.add('mensaje-sin-resultados');
        sinResultados.textContent = 'No se encontraron productos con ese nombre.';
        contenedor.appendChild(sinResultados);
        contenedor.classList.remove('oculto');
        return;
    }

    resultados.forEach(producto => {
        const item = document.createElement('a');
        item.href = `pages/producto-detalle.html?id=${producto.id}`;
        item.classList.add('item-busqueda');
        item.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" />
            <div class="info-busqueda">
                <span class="nombre-producto">${producto.nombre}</span>
                <span class="precio-producto">S/ ${producto.precio.toFixed(2)}</span>
            </div>`;
        contenedor.appendChild(item);
    });

    contenedor.classList.remove('oculto');
}

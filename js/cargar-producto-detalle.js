document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    const producto = productos.find(p => p.id === id);

    const contenedor = document.getElementById("detalle-producto");

    if (producto) {
        contenedor.innerHTML = `
    <section class="detalle">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="info">
        <h2>${producto.nombre}</h2>
        <p class="precio">${producto.precio}</p>
        <p class="descripcion">Descripción detallada del producto. Aquí puedes personalizar por producto.</p>

        <label for="color">Color:</label>
        <select id="color">
          <option>Rosado</option>
          <option>Negro</option>
          <option>Rojo</option>
        </select>

        <label for="talla">Talla:</label>
        <select id="talla">
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>

        <button>Agregar al carrito</button>
      </div>
    </section>
  `;
    } else {
        contenedor.innerHTML = `<p>Producto no encontrado.</p>`;
    }
})


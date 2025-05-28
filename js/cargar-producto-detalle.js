import { agregarAlCarrito } from "./cart/carritoStorage.js";
import { productos } from "./productos.js";

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const producto = productos.find(p => p.id === id);
  const contenedor = document.getElementById("detalle-producto");

  if (!producto) {
    contenedor.innerHTML = `<p>Producto no encontrado.</p>`;
    return;
  }

  contenedor.innerHTML = `
    <section class="detalle">
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="info">
        <h2>${producto.nombre}</h2>
        <p class="precio">S/.${producto.precio.toFixed(2)}</p>
        <p class="descripcion">${producto.descripcion}</p>

        <label for="color">Color:</label>
        <select id="color">
          <option value="">Seleccionar</option>
          <option>Rosado</option>
          <option>Negro</option>
          <option>Rojo</option>
        </select>

        <label for="talla">Talla:</label>
        <select id="talla">
          <option value="">Seleccionar</option>
          <option>S</option>
          <option>M</option>
          <option>L</option>
          <option>XL</option>
        </select>

        <button id="btnAgregarCarrito">Agregar al carrito</button>

        <div class="tabla-tallas">
          <h3>Guía de Tallas</h3>
          <table>
            <thead>
              <tr>
                <th>Talla</th>
                <th>Busto (cm)</th>
                <th>Cintura (cm)</th>
                <th>Cadera (cm)</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>S</td><td>80-85</td><td>60-65</td><td>85-90</td></tr>
              <tr><td>M</td><td>86-91</td><td>66-71</td><td>91-96</td></tr>
              <tr><td>L</td><td>92-98</td><td>72-77</td><td>97-102</td></tr>
              <tr><td>XL</td><td>99-105</td><td>78-83</td><td>103-108</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  `;

  const btnAgregar = document.getElementById("btnAgregarCarrito");
  btnAgregar.addEventListener("click", () => {
    const color = document.getElementById("color").value;
    const talla = document.getElementById("talla").value;

    if (!color || !talla) {
      alert("Por favor selecciona el color y la talla antes de continuar.");
      return;
    }

    agregarAlCarrito({
      id: `${producto.id}-${color}-${talla}`,
      nombre: `${producto.nombre} (${color}, Talla ${talla})`,
      precio: producto.precio
    });

    alert("Producto añadido al carrito.");
  });
});
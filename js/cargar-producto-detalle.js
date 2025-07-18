import { agregarAlCarrito } from "./cart/carritoStorage.js";

document.addEventListener("DOMContentLoaded", async () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id"));
  const contenedor = document.getElementById("detalle-producto");

  try {
    const response = await fetch(`http://localhost:8080/api/productos/modelos/${id}`);
    if (!response.ok) throw new Error("No se pudo obtener el producto");

    const producto = await response.json();

    if (!producto) {
      contenedor.innerHTML = "<p>Producto no encontrado.</p>";
      return;
    }

    contenedor.innerHTML = `
      <section class="detalle">
        <img src="http://localhost:8080${producto.imagen}" alt="${producto.nombreModelo}">
        <div class="info">
          <h2>${producto.nombreModelo}</h2>
          <p class="precio">S/.${producto.precio.toFixed(2)}</p>
          <p class="descripcion">${producto.descripcion || "Sin descripción disponible."}</p>

          <div class="selector-color">
            <p><strong>Colores disponibles:</strong></p>
            <div class="colores-disponibles">
              <span class="color-box" data-color="Rosado" title="Rosado" style="background-color: #f8cdd5;"></span>
              <span class="color-box" data-color="Rojo" title="Rojo" style="background-color: #e53935;"></span>
              <span class="color-box" data-color="Negro" title="Negro" style="background-color: #000000;"></span>
            </div>
          </div>

          <label for="talla">Talla:</label>
          <select id="talla">
            <option value="">Seleccionar</option>
            <option>S</option>
            <option>M</option>
            <option>L</option>
            <option>XL</option>
          </select>

          <label for="cantidad">Cantidad:</label>
          <input type="number" id="cantidad" min="1" value="1" />

          <button id="btnAgregarCarrito">Agregar al carrito</button>

          <div class="tabla-tallas">
            <h3>Guía de Tallas</h3>
            <table>
              <thead>
                <tr>
                  <th>Talla</th><th>Busto (cm)</th><th>Cintura (cm)</th><th>Cadera (cm)</th>
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

    // Manejo de selección de color
    let colorSeleccionado = "";
    document.querySelectorAll(".color-box").forEach(box => {
      box.addEventListener("click", () => {
        document.querySelectorAll(".color-box").forEach(b => b.classList.remove("seleccionado"));
        box.classList.add("seleccionado");
        colorSeleccionado = box.dataset.color;
      });
    });

    // Evento del botón
    const btnAgregarAlCarrito = document.getElementById("btnAgregarCarrito");
    btnAgregarAlCarrito.addEventListener("click", () => {
      const talla = document.getElementById("talla").value;
      const cantidad = parseInt(document.getElementById("cantidad").value);

      if (!colorSeleccionado || !talla || cantidad < 1) {
        alert("Por favor selecciona color, talla y una cantidad válida.");
        return;
      }

      agregarAlCarrito({
        id: `${producto.idModelo}-${colorSeleccionado}-${talla}`,
        nombre: `${producto.nombreModelo} (${colorSeleccionado}, Talla ${talla})`,
        precio: producto.precio,
        cantidad: cantidad,
        imagen: `http://localhost:8080${producto.imagen}`
      });

      alert("Producto añadido al carrito.");
    });

  } catch (error) {
    console.error("Error al cargar el detalle del producto:", error);
    contenedor.innerHTML = "<p>Error al cargar el producto.</p>";
  }
});
// import { agregarAlCarrito } from "./cart/carritoStorage.js";
// import { productos } from "./productos.js";

// document.addEventListener("DOMContentLoaded", () => {
//   const params = new URLSearchParams(window.location.search);
//   const id = parseInt(params.get("id"));
//   const producto = productos.find(p => p.id === id);
//   const contenedor = document.getElementById("detalle-producto");

//   if (!producto) {
//     contenedor.innerHTML = `<p>Producto no encontrado.</p>`;
//     return;
//   }

//   contenedor.innerHTML = `
//     <section class="detalle">
//       <img src="${producto.imagen}" alt="${producto.nombre}">
//       <div class="info">
//         <h2>${producto.nombre}</h2>
//         <p class="precio">S/.${producto.precio.toFixed(2)}</p>
//         <p class="descripcion">${producto.descripcion}</p>

//         <div class="selector-color">
//           <p><strong>Colores disponibles:</strong></p>
//           <div class="colores-disponibles">
//             <span class="color-box" data-color="Rosado" title="Rosado" style="background-color: #f8cdd5;"></span>
//             <span class="color-box" data-color="Rojo" title="Rojo" style="background-color: #e53935;"></span>
//             <span class="color-box" data-color="Negro" title="Negro" style="background-color: #000000;"></span>
//           </div>
//         </div>

//         <label for="talla">Talla:</label>
//         <select id="talla">
//           <option value="">Seleccionar</option>
//           <option>S</option>
//           <option>M</option>
//           <option>L</option>
//           <option>XL</option>
//         </select>

//         <label for="cantidad">Cantidad:</label>
//         <input type="number" id="cantidad" min="1" value="1" />

//         <button id="btnAgregarCarrito">Agregar al carrito</button>

//         <div class="tabla-tallas">
//           <h3>Guía de Tallas</h3>
//           <table>
//             <thead>
//               <tr>
//                 <th>Talla</th><th>Busto (cm)</th><th>Cintura (cm)</th><th>Cadera (cm)</th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr><td>S</td><td>80-85</td><td>60-65</td><td>85-90</td></tr>
//               <tr><td>M</td><td>86-91</td><td>66-71</td><td>91-96</td></tr>
//               <tr><td>L</td><td>92-98</td><td>72-77</td><td>97-102</td></tr>
//               <tr><td>XL</td><td>99-105</td><td>78-83</td><td>103-108</td></tr>
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </section>
//   `;

//   // Manejo de selección de color
//   let colorSeleccionado = "";
//   document.querySelectorAll(".color-box").forEach(box => {
//     box.addEventListener("click", () => {
//       document.querySelectorAll(".color-box").forEach(b => b.classList.remove("seleccionado"));
//       box.classList.add("seleccionado");
//       colorSeleccionado = box.dataset.color;
//     });
//   });

//   // Evento del botón
//   const btnAgregarAlCarrito = document.getElementById("btnAgregarCarrito");
//   btnAgregarAlCarrito.addEventListener("click", () => {
//     const talla = document.getElementById("talla").value;
//     const cantidad = parseInt(document.getElementById("cantidad").value);

//     if (!colorSeleccionado || !talla || cantidad < 1) {
//       alert("Por favor selecciona color, talla y una cantidad válida.");
//       return;
//     }

//     agregarAlCarrito({
//       id: `${producto.id}-${colorSeleccionado}-${talla}`,
//       nombre: `${producto.nombre} (${colorSeleccionado}, Talla ${talla})`,
//       precio: producto.precio,
//       cantidad: cantidad,
//       imagen: producto.imagen
//     });

//     alert("Producto añadido al carrito.");
//   });
// });
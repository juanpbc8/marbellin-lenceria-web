import { obtenerCarrito, vaciarCarrito } from "./carritoStorage.js";

const tbody = document.getElementById("contenidoCheckout");
const totalElemento = document.getElementById("totalCheckout");
const botonPagar = document.getElementById("botonPagar");

function renderizarCheckout() {
    const carrito = obtenerCarrito();
    tbody.innerHTML = "";

    if (carrito.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">Tu carrito está vacío</td></tr>';
        botonPagar.disabled = true;
        return;
    }

    let total = 0;

    carrito.forEach((producto) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>${producto.cantidad}</td>
      <td>S/.${producto.precio.toFixed(2)}</td>
      <td>S/.${subtotal.toFixed(2)}</td>
    `;
        tbody.appendChild(fila);
    });

    totalElemento.textContent = `S/.${total.toFixed(2)}`;
    botonPagar.disabled = false;
}

botonPagar.addEventListener("click", () => {
    alert("¡Gracias por tu compra!");
    vaciarCarrito();
    window.location.href = "../index.html";
});

renderizarCheckout();

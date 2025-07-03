import { obtenerCarrito, vaciarCarrito } from "./carritoStorage.js";

const listaResumen = document.getElementById("listaResumen");
const totalResumen = document.getElementById("totalResumen");
const formulario = document.getElementById("formularioCliente");

function renderizarResumen() {
    const carrito = obtenerCarrito();
    let total = 0;

    if (carrito.length === 0) {
        listaResumen.innerHTML = "<p>Tu carrito está vacío.</p>";
        totalResumen.textContent = "S/.0.00";
        return;
    }

    carrito.forEach(producto => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const item = document.createElement("div");
        item.classList.add("item");
        item.innerHTML = `
      <img src="${producto.imagen}" alt="${producto.nombre}">
      <div class="item-info">
        <p><strong>${producto.nombre}</strong></p>
        <p>Cant: ${producto.cantidad}</p>
        <p>S/.${subtotal.toFixed(2)}</p>
      </div>
    `;
        listaResumen.appendChild(item);
    });

    totalResumen.textContent = `S/.${total.toFixed(2)}`;
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombres = formulario.nombres.value.trim();
    const apellidos = formulario.apellidos.value.trim();
    const correo = formulario.correo.value.trim();
    const direccion = formulario.direccion.value.trim();

    if (!nombres || !apellidos || !correo || !direccion) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Simular pedido
    alert(`¡Gracias por tu pedido, ${nombres}!\nSe enviará a: ${direccion}`);
    vaciarCarrito();
    window.location.href = "../index.html";
});

renderizarResumen();

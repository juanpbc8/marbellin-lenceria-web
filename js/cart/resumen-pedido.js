import { obtenerCarrito, vaciarCarrito, guardarCarrito } from "./carritoStorage.js";

const tbody = document.getElementById("contenidoCheckout");
const totalElemento = document.getElementById("totalCheckout");
const botonPagar = document.getElementById("botonPagar");
const botonSeguirComprando = document.getElementById("botonSeguirComprando")

function renderizarCheckout() {
    const carrito = obtenerCarrito();
    tbody.innerHTML = "";

    if (carrito.length === 0) {
        tbody.innerHTML = '<tr><td colspan="6">Tu carrito está vacío</td></tr>';
        totalElemento.textContent = "S/0.00"
        botonPagar.disabled = true;
        return;
    }

    let total = 0;

    carrito.forEach((producto, index) => {
        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="${producto.imagen}" alt="${producto.nombre}" /></td>
            <td>${producto.nombre}</td>
            <td>
            <input type="number" class="input-cantidad" data-index="${index}" min="1" value="${producto.cantidad}">
            </td>
            <td>S/.${producto.precio.toFixed(2)}</td>
            <td>S/.${subtotal.toFixed(2)}</td>
            <td>
            <button class="btn-eliminar" data-index="${index}" title="Eliminar">
                <i class="fas fa-trash"></i>
            </button>
            </td>
        `;
        tbody.appendChild(fila);
    });


    totalElemento.textContent = `S/.${total.toFixed(2)}`;
    botonPagar.disabled = false;
}

botonPagar.addEventListener("click", () => {
    window.location.href = "checkout.html";
});

botonSeguirComprando.addEventListener("click", () => {
    window.location.href = "productos.html"; 2
});

function actualizarEventosInteraccion() {
    document.querySelectorAll(".input-cantidad").forEach(input => {
        input.addEventListener("change", (e) => {
            const index = parseInt(e.target.dataset.index);
            let nuevaCantidad = parseInt(e.target.value);
            if (nuevaCantidad < 1 || isNaN(nuevaCantidad)) nuevaCantidad = 1;

            const carrito = obtenerCarrito();
            carrito[index].cantidad = nuevaCantidad;
            guardarCarrito(carrito);
            renderizarCheckout(); // Recarga vista
            actualizarEventosInteraccion(); // Reactiva eventos
        });
    });

    document.querySelectorAll(".btn-eliminar").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            const carrito = obtenerCarrito();
            carrito.splice(index, 1);
            guardarCarrito(carrito);
            renderizarCheckout();
            actualizarEventosInteraccion();
        });
    });
}

renderizarCheckout();
actualizarEventosInteraccion();

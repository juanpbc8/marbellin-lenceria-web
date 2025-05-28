import { obtenerCarrito } from "./carritoStorage.js";

export function mostrarCarritoMini() {
    const contenedorHover = document.querySelector(".contenedor-carrito-hover");
    const miniCarrito = document.querySelector(".mini-carrito");
    const listaCarrito = document.querySelector(".lista-carrito");
    const btnPagar = document.querySelector(".btn-ir-a-pagar");

    if (!contenedorHover || !miniCarrito || !listaCarrito || !btnPagar) return;

    contenedorHover.addEventListener("mouseenter", () => {
        const carrito = obtenerCarrito();
        listaCarrito.innerHTML = "";

        if (carrito.length === 0) {
            listaCarrito.innerHTML = "<li>Carrito vacío</li>";
        } else {
            carrito.forEach((producto) => {
                listaCarrito.innerHTML += `
          <li>
            ${producto.nombre} x${producto.cantidad} - S/.${(producto.precio * producto.cantidad).toFixed(2)}
          </li>
        `;
            });
        }

        miniCarrito.classList.add("mostrar");
    });

    contenedorHover.addEventListener("mouseleave", () => {
        miniCarrito.classList.remove("mostrar");
    });

    btnPagar.addEventListener("click", () => {
        window.location.href = "pages/checkout.html";
    });
}

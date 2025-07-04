import { obtenerCarrito } from './carritoStorage.js';
import { productos } from '../productos.js';
import { generarBoletaPDF } from './generarBoleta.js';

// Mostrar resumen de productos al cargar
function mostrarResumenPedido() {
    const carrito = obtenerCarrito();
    const contenedor = document.getElementById("listaResumen");
    const totalSpan = document.getElementById("totalResumen");

    contenedor.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        const producto = productos.find(p => p.id == item.id.split("-")[0]);
        if (!producto) return;

        const subtotal = producto.precio * item.cantidad;
        total += subtotal;

        const productoHTML = `
        <div class="item-resumen">
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div>
            <p>${item.nombre}</p>
            <p>Cantidad: ${item.cantidad}</p>
            <p>Subtotal: S/.${subtotal.toFixed(2)}</p>
            </div>
        </div>
        `;

        contenedor.innerHTML += productoHTML;
    });

    totalSpan.textContent = `S/.${total.toFixed(2)}`;
}

// Alternar entre delivery y tienda
function toggleEntrega(modo) {
    const btnDelivery = document.getElementById("btn-delivery");
    const btnTienda = document.getElementById("btn-tienda");

    if (modo === "delivery") {
        btnDelivery.classList.add("activo");
        btnTienda.classList.remove("activo");
        document.getElementById("delivery-fields").style.display = "block";
        document.getElementById("tienda-fields").style.display = "none";
    } else {
        btnTienda.classList.add("activo");
        btnDelivery.classList.remove("activo");
        document.getElementById("delivery-fields").style.display = "none";
        document.getElementById("tienda-fields").style.display = "block";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Mostrar carrito al cargar
    mostrarResumenPedido();

    // Botones visuales de método de entrega
    document.getElementById("btn-delivery").addEventListener("click", () => toggleEntrega("delivery"));
    document.getElementById("btn-tienda").addEventListener("click", () => toggleEntrega("tienda"));
    toggleEntrega("delivery"); // Estado inicial por defecto

    // Navegación de pasos
    let pasoActual = 1;
    const pasos = document.querySelectorAll('.formulario-paso');
    const indicadores = document.querySelectorAll('.barra-progreso .paso');

    window.siguientePaso = (paso) => {
        if (!validarPaso(paso)) return;

        pasos[paso - 1].classList.remove('activo');
        indicadores[paso - 1].classList.remove('activo');

        pasos[paso].classList.add('activo');
        indicadores[paso].classList.add('activo');

        pasoActual = paso + 1;
    };

    window.anteriorPaso = (paso) => {
        pasos[paso - 1].classList.remove('activo');
        indicadores[paso - 1].classList.remove('activo');

        pasos[paso - 2].classList.add('activo');
        indicadores[paso - 2].classList.add('activo');

        pasoActual = paso - 1;
    };

    // Validación por paso
    function validarPaso(paso) {
        let valid = true;

        if (paso === 1) {
            const campos = ['nombres', 'apellidos', 'correo', 'dni', 'telefono'];
            for (let id of campos) {
                const campo = document.getElementById(id);
                if (!campo.value.trim()) {
                    campo.classList.add('input-error');
                    campo.focus();
                    valid = false;
                    break;
                } else {
                    campo.classList.remove('input-error');
                }
            }
        }

        if (paso === 2) {
            const entrega = document.getElementById("btn-delivery").classList.contains("activo") ? "delivery" : "tienda";

            if (entrega === 'delivery') {
                const campos = ['departamento', 'provincia', 'distrito', 'direccion'];
                for (let id of campos) {
                    const campo = document.getElementById(id);
                    if (!campo.value.trim()) {
                        campo.classList.add('input-error');
                        campo.focus();
                        valid = false;
                        break;
                    } else {
                        campo.classList.remove('input-error');
                    }
                }
            }
        }

        return valid;
    }

    // Acción al finalizar pedido (paso 3)
    const paso3Form = document.getElementById("paso3");
    paso3Form.addEventListener("submit", (e) => {
        e.preventDefault();

        const checkbox = paso3Form.querySelector("input[type='checkbox']");
        if (!checkbox.checked) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        // Llama a la función para generar la boleta PDF
        generarBoletaPDF();

        // Limpia carrito si lo deseas
        // localStorage.removeItem("carrito");

        alert("¡Pedido finalizado! Se generó la boleta.");
    });
});
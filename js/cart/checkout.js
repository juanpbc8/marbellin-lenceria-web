import { obtenerCarrito } from './carritoStorage.js';
import { generarBoletaPDF } from './generarBoleta.js';

async function obtenerModelosDesdeAPI() {
    const url = "http://localhost:8080/api/productos/modelos/catalogo";
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("No se pudieron obtener los productos desde el backend.");
    }
    return await response.json();
}

async function mostrarResumenPedido() {
    const carrito = obtenerCarrito();
    const contenedor = document.getElementById("listaResumen");
    const totalSpan = document.getElementById("totalResumen");

    contenedor.innerHTML = "";
    let total = 0;

    try {
        const modelos = await obtenerModelosDesdeAPI();

        carrito.forEach(item => {
            const idModelo = parseInt(item.id.split("-")[0]);
            const producto = modelos.find(p => p.idModelo === idModelo);
            if (!producto) return;

            const subtotal = producto.precio * item.cantidad;
            total += subtotal;

            const productoHTML = `
            <div class="item-resumen">
                <img src="http://localhost:8080${producto.imagen}" alt="${producto.nombreModelo}">
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
    } catch (error) {
        console.error("Error al cargar productos para el resumen:", error);
        contenedor.innerHTML = `<p style="text-align:center; font-weight:bold;">Error al mostrar el resumen de productos.</p>`;
    }
}

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
    mostrarResumenPedido();

    document.getElementById("btn-delivery").addEventListener("click", () => toggleEntrega("delivery"));
    document.getElementById("btn-tienda").addEventListener("click", () => toggleEntrega("tienda"));
    toggleEntrega("delivery");

    // Toggle campos de factura
    const checkboxFactura = document.getElementById("checkbox-factura");
    const camposFactura = document.getElementById("campos-factura");

    checkboxFactura?.addEventListener("change", () => {
        camposFactura.style.display = checkboxFactura.checked ? "block" : "none";
    });

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

    const botonesPago = document.querySelectorAll(".boton-pago");
    const contenidoPago = document.getElementById("contenido-pago");

    botonesPago.forEach(boton => {
        boton.addEventListener("click", () => {
            botonesPago.forEach(b => b.classList.remove("activo"));
            boton.classList.add("activo");

            const metodo = boton.dataset.metodo;
            contenidoPago.style.display = "block";

            switch (metodo) {
                case "tarjeta":
                    contenidoPago.innerHTML = `
                        <label>Número de tarjeta:</label>
                        <input type="text" placeholder="XXXX-XXXX-XXXX-XXXX" required>
                        <label>Nombre en la tarjeta:</label>
                        <input type="text" required>
                        <div class="fila-tarjeta-triple">
                            <div>
                                <label>Mes:</label>
                                <select required>${Array.from({ length: 12 }, (_, i) => `<option value="${(i + 1).toString().padStart(2, '0')}">${(i + 1).toString().padStart(2, '0')}</option>`).join("")}</select>
                            </div>
                            <div>
                                <label>Año:</label>
                                <select required>${Array.from({ length: 10 }, (_, i) => `<option value="${new Date().getFullYear() + i}">${new Date().getFullYear() + i}</option>`).join("")}</select>
                            </div>
                            <div>
                                <label>CVC:</label>
                                <input type="text" placeholder="123" required>
                            </div>
                        </div>`;
                    break;

                case "yape":
                    contenidoPago.innerHTML = `
                        <div class="contenedor-yape">
                            <img src="../assets/img/yape.png" alt="QR Yape">
                            <p>Debes tomar captura del yapeo y enviarlo al número <strong><a href="https://wa.me/51922886724" target="_blank">+51 922 886 724</a></strong> por WhatsApp.</p>
                        </div>`;
                    break;

                case "contraentrega":
                    contenidoPago.innerHTML = `<p>Recuerda tener el monto exacto preparado. Solo se aceptará <strong>efectivo</strong> al momento de la entrega.</p>`;
                    break;
            }
        });
    });

    document.querySelector('.boton-pago[data-metodo="tarjeta"]').click();

    const paso3Form = document.getElementById("paso3");
    paso3Form.addEventListener("submit", (e) => {
        e.preventDefault();
        const checkbox = paso3Form.querySelector("input[type='checkbox']");
        if (!checkbox.checked) {
            alert("Debes aceptar los términos y condiciones.");
            return;
        }

        // Validación campos de factura si se marca
        if (checkboxFactura && checkboxFactura.checked) {
            const razonSocial = document.getElementById("razonSocial");
            const ruc = document.getElementById("ruc");
            if (!razonSocial.value.trim() || !ruc.value.trim()) {
                alert("Debe ingresar los datos de factura: razón social y RUC.");
                razonSocial.focus();
                return;
            }
        }

        generarBoletaPDF();

        // localStorage.removeItem("carrito");

        alert("¡Pedido finalizado! Se generó la boleta.");
    });
});
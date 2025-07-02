const hoy = new Date();
const fechaFormateada = hoy.toLocaleDateString('es-PE');
document.getElementById("fechaEmision").textContent = fechaFormateada;

// Generación de número de factura basado en el contador
let contador = parseInt(localStorage.getItem("contadorFactura")) || 1;
const numeroFactura = "F-" + String(contador).padStart(6, '0');
document.getElementById("facturaNumero").textContent = numeroFactura;

// Obtención de los datos del usuario activo
const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo")) || JSON.parse(sessionStorage.getItem("usuarioActivo"));

if (usuarioActivo) {
  document.getElementById("factura-nombre").textContent = usuarioActivo.nombre || "No especificado";
  document.getElementById("factura-direccion").textContent = usuarioActivo.direccion || "No especificada";
  document.getElementById("factura-telefono").textContent = usuarioActivo.telefono || "No especificado";
  document.getElementById("factura-email").textContent = usuarioActivo.email || "No especificado";
  document.getElementById("factura-dni").textContent = usuarioActivo.dni || "No especificado";
} else {
  alert("Debe iniciar sesión para continuar con la compra.");
}

// Carga del carrito desde el almacenamiento local
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Agregar código de producto al carrito
carrito = carrito.map(producto => ({
  ...producto,
  codigo: producto.id
}));

const tbody = document.getElementById("detalleProductos");
let subtotal = 0;

// Mostrar los productos en la tabla, incluyendo la talla
carrito.forEach(producto => {
  const sub = producto.cantidad * producto.precio;
  subtotal += sub;

  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${producto.codigo}</td>
    <td>${producto.nombre}</td>
    <td>${producto.talla || "—"}</td>
    <td>${producto.cantidad}</td>
    <td>${producto.precio.toFixed(2)}</td>
    <td>${sub.toFixed(2)}</td>
  `;
  tbody.appendChild(fila);
});

// IGV eliminado (valor fijo 0.00)
const igv = 0.00;
const total = subtotal + igv;

document.getElementById("subTotal").textContent = subtotal.toFixed(2);
document.getElementById("igv").textContent = igv.toFixed(2);
document.getElementById("total").textContent = total.toFixed(2);

// Función para imprimir la boleta
function imprimirBoleta() {
  html2pdf().from(document.getElementById("factura")).save();
}

// Función para finalizar la compra
function finalizarCompra() {
  localStorage.setItem("contadorFactura", contador + 1);
  const boleta = {
    numero: numeroFactura,
    fecha: fechaFormateada,
    cliente: usuarioActivo,
    productos: carrito,
    subtotal: subtotal.toFixed(2),
    igv: "0.00",
    total: total.toFixed(2)
  };

  let historial = JSON.parse(localStorage.getItem("historialCompras")) || [];
  historial.push(boleta);
  localStorage.setItem("historialCompras", JSON.stringify(historial));
  localStorage.removeItem("carrito"); // Vaciar carrito

  alert("¡Compra Finalizada con Éxito!\n\nGracias por su compra en Marbellin. Su boleta fue registrada correctamente.");
  window.location.href = "index.html"; // Redirigir a la página principal
}

// Función para cancelar la compra
function cancelarCompra() {
  if (confirm("¿Estás seguro de que deseas cancelar la compra?")) {
    localStorage.removeItem("carrito");
    window.location.href = "index.html";
  }
}

// Función para volver a la página anterior
function volverPagina() {
  window.history.back();
}
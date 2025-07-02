let historialCompras = JSON.parse(localStorage.getItem("historialCompras")) || [];
const contenedor = document.getElementById("historial");

function mostrarHistorial() {
  contenedor.innerHTML = "";

  if (historialCompras.length === 0) {
    contenedor.innerHTML = "<p style='text-align:center; color:#b35a76; font-style:italic;'>No hay compras registradas.</p>";
    return;
  }

  historialCompras.forEach((boleta, index) => {
    const estadoEntregado = boleta.estado?.toLowerCase() === 'entregado';
    const div = document.createElement("div");
    div.className = "compra";

    div.innerHTML = `
      <div class="titulo">Factura: ${boleta.numero}</div>
      <div class="info-row">
        <div><strong>Fecha:</strong> ${boleta.fecha}</div>
        <div><strong>Cliente:</strong> ${boleta.cliente.nombre}</div>
        <div><strong>DNI:</strong> ${boleta.cliente.dni || "—"}</div>
        <div><strong>Teléfono:</strong> ${boleta.cliente.telefono || "—"}</div>
        <div><strong>Correo:</strong> ${boleta.cliente.email || "—"}</div>
      </div>
      <div class="info-row" style="margin-top:8px;">
        <div><strong>Subtotal:</strong> S/ ${boleta.subtotal}</div>
        <div><strong>Total Pagado:</strong> S/ ${boleta.total}</div>
      </div>
      <div class="productos">
        <div><strong>Productos:</strong></div>
        <table>
          <thead>
            <tr>
              <th>Producto</th><th>Talla</th><th>Cantidad</th><th>Precio Total</th>
            </tr>
          </thead>
          <tbody>
            ${boleta.productos.map(p => `
              <tr>
                <td>${p.nombre}</td>
                <td>${p.talla || "—"}</td>
                <td>${p.cantidad}</td>
                <td>S/ ${(p.precio * p.cantidad).toFixed(2)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
      <div class="estado ${estadoEntregado ? 'entregado' : 'pendiente'}">
        Estado del Pedido: ${estadoEntregado ? 'Entregado ✔️' : 'Pendiente ❌'}
      </div>
      <div class="botones">
        <button class="btn-editar" onclick="editarEstado(${index})">Editar Estado</button>
        <button class="btn-eliminar" onclick="eliminarCompra(${index})">Eliminar Compra</button>
      </div>
    `;

    contenedor.appendChild(div);
  });
}

function editarEstado(index) {
  Swal.fire({
    title: 'Cambiar estado del pedido',
    input: 'select',
    inputOptions: {
      'pendiente': 'Pendiente',
      'entregado': 'Entregado'
    },
    inputValue: historialCompras[index].estado?.toLowerCase() || 'pendiente',
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    inputValidator: (value) => {
      if (!value) {
        return 'Por favor selecciona un estado';
      }
    }
  }).then((result) => {
    if (result.isConfirmed) {
      historialCompras[index].estado = result.value;
      localStorage.setItem("historialCompras", JSON.stringify(historialCompras));
      mostrarHistorial();
      Swal.fire('¡Listo!', 'Estado actualizado.', 'success');
    }
  });
}

function eliminarCompra(index) {
  Swal.fire({
    title: '¿Eliminar esta compra?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      historialCompras.splice(index, 1);
      localStorage.setItem("historialCompras", JSON.stringify(historialCompras));
      mostrarHistorial();
      Swal.fire('Eliminado', 'La compra fue eliminada.', 'success');
    }
  });
}

function eliminarHistorial() {
  Swal.fire({
    title: '¿Eliminar todo el historial y reiniciar facturación?',
    text: "Esta acción no se puede deshacer.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar todo',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      historialCompras = [];
      localStorage.setItem("historialCompras", JSON.stringify(historialCompras));
      localStorage.setItem("numeroFactura", "0");
      mostrarHistorial();
      Swal.fire('Historial eliminado', 'Se ha reiniciado la facturación.', 'success');
    }
  });
}

mostrarHistorial();
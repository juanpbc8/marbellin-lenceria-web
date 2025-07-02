// Mensajes con SweetAlert
function mostrarMensajeAgregado() {
  Swal.fire({
    icon: 'success',
    title: '¡Producto agregado!',
    text: 'Añadido al carrito correctamente.',
    timer: 2000,
    timerProgressBar: true,
    showConfirmButton: false,
    background: '#4caf50',
    color: '#fff',
    position: 'center',
  });
}

function mostrarMensajeError(texto) {
  Swal.fire({
    icon: 'error',
    title: '¡Error!',
    text: texto,
    timer: 2100,
    timerProgressBar: true,
    showConfirmButton: false,
    background: '#e53935',
    color: '#fff',
    position: 'center',
  });
}

// Obtener carrito desde localStorage
function obtenerCarrito() {
  return JSON.parse(localStorage.getItem('carrito')) || [];
}

// Guardar carrito en localStorage
function guardarCarrito(carrito) {
  localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Guardar cupón en localStorage
function guardarCupon(codigo, descuento, vencimiento) {
  const cupon = { codigo, descuento, vencimiento };
  localStorage.setItem('cuponActivo', JSON.stringify(cupon));
}

// Obtener cupón desde localStorage
function obtenerCupon() {
  return JSON.parse(localStorage.getItem('cuponActivo'));
}

// Eliminar cupón
function eliminarCupon() {
  localStorage.removeItem('cuponActivo');
}

// Renderizar productos del carrito en el modal
function renderizarCarrito() {
  const carrito = obtenerCarrito();
  const cupon = obtenerCupon();
  const contenedor = document.getElementById('contenidoCarrito');
  const mensaje = document.getElementById('mensajeCupon');
  contenedor.innerHTML = '';
  let subtotal = 0;

  carrito.forEach((producto, index) => {
    const item = document.createElement('div');
    item.className = 'item-carrito';
    item.innerHTML = `
      <div class="producto-carrito">
        <span class="eliminar-producto" onclick="eliminarProducto(${index})">&times;</span>
        <p><strong>Producto:</strong> ${producto.nombre}</p>
        <p><strong>Talla:</strong> ${producto.talla}</p>
        <p><strong>Color:</strong> ${producto.color}</p>
        <p><strong>Precio:</strong> S/ ${producto.precio.toFixed(2)}</p>
        <p><strong>Cantidad:</strong> ${producto.cantidad}</p>
        <p><strong>Subtotal:</strong> S/ ${(producto.precio * producto.cantidad).toFixed(2)}</p>
        <hr>
      </div>
    `;
    contenedor.appendChild(item);
    subtotal += producto.precio * producto.cantidad;
  });

  const totalElement = document.createElement('div');
  totalElement.className = 'total-carrito-contenedor';
  totalElement.innerHTML = `
    <div class="total-carrito-centro">
      <p><strong>Total productos:</strong> S/ ${subtotal.toFixed(2)}</p>
    </div>
  `;
  contenedor.appendChild(totalElement);

  let total = subtotal;
  if (cupon && cupon.codigo) {
    const fechaVencimiento = new Date(cupon.vencimiento);
    const fechaActual = new Date();
    fechaVencimiento.setHours(23, 59, 59, 999);

    if (fechaVencimiento < fechaActual) {
      mensaje.textContent = 'El cupón ha vencido.';
      mensaje.style.color = 'red';
      eliminarCupon();
      return;
    }

    let descuento = parseFloat(cupon.descuento);
    if (descuento < 1) {
      total = subtotal * (1 - descuento);
      mensaje.textContent = `Cupón aplicado: ${(descuento * 100).toFixed(2).replace(/\.?0+$/, '')}% de descuento`;
    } else {
      total = subtotal - descuento;
      if (total < 0) total = 0;
      mensaje.textContent = `Cupón aplicado: S/ ${descuento.toFixed(2)} de descuento`;
    }

    document.getElementById('cupon').value = cupon.codigo;
    mensaje.style.color = 'green';
  } else {
    mensaje.textContent = '';
  }

  document.getElementById('Subtotal').textContent = `Subtotal: S/ ${subtotal.toFixed(2)}`;
  document.getElementById('totalFinal').textContent = `Total: S/ ${total.toFixed(2)}`;
}

// Eliminar producto del carrito
function eliminarProducto(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  renderizarCarrito();
}

// Aplicar cupón
function aplicarCupon() {
  const cuponIngresado = document.getElementById('cupon').value.trim().toUpperCase();
  const mensaje = document.getElementById('mensajeCupon');
  const carrito = obtenerCarrito();
  const cuponesGuardados = JSON.parse(localStorage.getItem('cupones')) || [];
  const cuponValido = cuponesGuardados.find(c => c.codigo.toUpperCase() === cuponIngresado);
  const subtotal = carrito.reduce((sum, p) => sum + p.precio * p.cantidad, 0);
  let total = subtotal;

  if (cuponValido) {
    const fechaVencimiento = new Date(cuponValido.vencimiento);
    const fechaActual = new Date();
    fechaVencimiento.setHours(23, 59, 59, 999);

    if (fechaVencimiento < fechaActual) {
      mensaje.textContent = 'El cupón ha vencido.';
      mensaje.style.color = 'red';
      eliminarCupon();
      mostrarMensajeError('El cupón ha vencido');
      return;
    }

    let descuento = parseFloat(cuponValido.descuento);
    guardarCupon(cuponValido.codigo, descuento, cuponValido.vencimiento);

    if (descuento < 1) {
      total = subtotal * (1 - descuento);
      mensaje.textContent = `Cupón aplicado: ${(descuento * 100).toFixed(2).replace(/\.?0+$/, '')}% de descuento`;
    } else {
      total = subtotal - descuento;
      if (total < 0) total = 0;
      mensaje.textContent = `Cupón aplicado: S/ ${descuento.toFixed(2)} de descuento`;
    }

    mensaje.style.color = 'green';
    mostrarMensajeAgregado();
  } else if (cuponIngresado === '') {
    eliminarCupon();
    mensaje.textContent = '';
  } else {
    mensaje.textContent = 'Cupón inválido';
    mensaje.style.color = 'red';
    eliminarCupon();
    mostrarMensajeError('Cupón no válido');
  }

  renderizarCarrito();
}

// Actualizar carrito con mensaje
function actualizarCarrito() {
  renderizarCarrito();
  Swal.fire({
    icon: 'success',
    title: 'Carrito actualizado',
    text: 'Tu carrito se ha actualizado correctamente.',
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    background: '#f8cde0',
    color: 'black',
    position: 'center',
  });
}

// Finalizar compra
function finalizarCompra() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Carrito vacío',
      text: 'No tienes productos en el carrito.',
      timer: 2000,
      timerProgressBar: true,
      showConfirmButton: false,
      background: '#e53935',
      color: '#fff',
      position: 'center',
    });
    return;
  }

  localStorage.setItem('pedidoActual', JSON.stringify(carrito));
  window.location.href = 'pago.html';
}

// Mostrar modal del carrito
function mostrarModal() {
  document.getElementById('modalCarrito').style.display = 'block';
  renderizarCarrito();
}

// Cerrar modal del carrito
function cerrarModal() {
  document.getElementById('modalCarrito').style.display = 'none';
}

// Mostrar resumen en la página de pago
function mostrarResumenPago() {
  const pedido = JSON.parse(localStorage.getItem('pedidoActual')) || [];
  let total = 0;
  const contenedorResumen = document.getElementById('resumenPago');
  contenedorResumen.innerHTML = '';

  pedido.forEach(producto => {
    const item = document.createElement('div');
    item.className = 'item-resumen';
    item.innerHTML = `
      <p><strong>Producto:</strong> ${producto.nombre}</p>
      <p><strong>Precio:</strong> S/ ${producto.precio.toFixed(2)}</p>
      <p><strong>Cantidad:</strong> ${producto.cantidad}</p>
      <p><strong>Subtotal:</strong> S/ ${(producto.precio * producto.cantidad).toFixed(2)}</p>
      <hr>
    `;
    contenedorResumen.appendChild(item);
    total += producto.precio * producto.cantidad;
  });

  const totalFinal = document.getElementById('totalPago');
  totalFinal.textContent = `Total a pagar: S/ ${total.toFixed(2)}`;
}

// Cerrar sesión y limpiar datos
function cerrarSesion() {
  localStorage.removeItem('carrito');
  localStorage.removeItem('pedidoActual');
  Swal.fire({
    icon: 'success',
    title: 'Sesión cerrada',
    text: 'Tu sesión ha sido cerrada exitosamente.',
    timer: 1500,
    timerProgressBar: true,
    showConfirmButton: false,
    background: '#f8cde0',
    color: 'black',
    position: 'center',
  });
}
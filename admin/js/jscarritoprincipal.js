// Lista de productos
  const productos = [
    {
      id: 1025,
      nombre: "CACHETERO DIJE",
      precio: 57,
      imagen: "imagenes/CACHETERO DIJE.jpg",
      descripcion: "Cachetero delicado con detalle de dije decorativo. Tela suave y cómoda, ideal para el uso diario."
    },
    {
      id: 1052,
      nombre: "CACHETERO DIJE ESTAMPADO",
      precio: 64,
      imagen: "imagenes/CACHETERO DIJE ESTAMPADO.jpg",
      descripcion: "Cachetero con diseño estampado y dije decorativo. Combina estilo con comodidad."
    },
    {
      id: 1027,
      nombre: "CACHETERO CORAZON",
      precio: 65,
      imagen: "imagenes/CACHETEROCORAZON.jpg",
      descripcion: "Cachetero de encaje con detalle de corazón. Ideal para ocasiones especiales."
    }
  ];

  // Traducción de colores
  function traducirColor(color) {
    const mapaColores = {
      "red": "Rojo",
      "blue": "Azul",
      "black": "Negro",
      "white": "Blanco",
      "pink": "Rosa",
      "purple": "Morado",
      "yellow": "Amarillo",
      "green": "Verde",
      "orange": "Naranja",
      "gray": "Gris"
    };
    return mapaColores[color.toLowerCase()] || color;
  }

  // Obtener producto desde URL
  const params = new URLSearchParams(window.location.search);
  const idProducto = parseInt(params.get("id"));
  const producto = productos.find(p => p.id === idProducto);

  // Mostrar detalles
  if (producto) {
    document.getElementById("imagen-producto").src = producto.imagen;
    document.getElementById("imagen-producto").alt = producto.nombre;
    document.getElementById("nombre-producto").textContent = producto.nombre;
    document.getElementById("precio-producto").textContent = `S/ ${producto.precio.toFixed(2)}`;
    document.getElementById("descripcion-producto").textContent = producto.descripcion;
    document.getElementById("nombre-producto-breadcrumb").textContent = producto.nombre;
  } else {
    document.getElementById("producto-detalle").innerHTML = "<p>Producto no encontrado.</p>";
  }



  // Animación táctil en colores
  document.querySelectorAll('.color').forEach(color => {
    color.addEventListener('click', () => {
      color.classList.toggle('seleccionado');
    });
    color.addEventListener('touchstart', () => {
      if (!color.classList.contains('seleccionado')) {
        color.classList.add('tocado');
        setTimeout(() => color.classList.remove('tocado'), 1000);
      }
    });
  });

  // Limpiar campos
  function limpiarCampos() {
    document.getElementById("talla").value = "";
    document.getElementById("cantidad").value = 1;
    document.querySelectorAll(".color").forEach(color => color.classList.remove("seleccionado"));
  }



 // Mensaje de agregado (desaparece solo)
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

// Mensaje de error (desaparece solo)
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



  // Agregar producto al carrito
  document.getElementById("agregar-carrito").addEventListener("click", () => {
    const talla = document.getElementById("talla").value;
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const coloresSeleccionados = Array.from(document.querySelectorAll(".color.seleccionado"))
      .map(el => traducirColor(el.style.backgroundColor));

    if (!producto) return mostrarMensajeError("Producto no encontrado.");
    if (!talla) return mostrarMensajeError("Selecciona una talla:");
    if (coloresSeleccionados.length === 0) return mostrarMensajeError("Selecciona al menos un color:");
    if (!cantidad || cantidad < 1) return mostrarMensajeError("Cantidad inválida.");

    const item = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
      talla,
      color: coloresSeleccionados.join(", "),
      cantidad
    };
    
    

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const existente = carrito.find(p =>
      p.id === item.id && p.talla === item.talla && p.color === item.color
    );

    if (existente) {
      existente.cantidad += item.cantidad;
    } else {
      carrito.push(item);
    }

    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarMensajeAgregado();
    limpiarCampos();
    mostrarCarrito(); // actualización si ya está abierto
  });








  // MODAL DEL CARRITO
  function abrirModal() {
    document.getElementById('modalCarrito').style.display = 'block';
    mostrarCarrito();
  }

  function cerrarModal() {
    document.getElementById('modalCarrito').style.display = 'none';
  }

  // Cierre del modal al hacer clic fuera del contenido
  window.addEventListener('click', function (e) {
    const modal = document.getElementById('modalCarrito');
    if (e.target === modal) cerrarModal();
  });

  // Mostrar carrito
  function abrirModal() {
    document.getElementById('modalCarrito').style.display = 'block';
    mostrarCarrito();
  }

  function cerrarModal() {
    document.getElementById('modalCarrito').style.display = 'none';
  }

  // Mostrar productos del carrito
function mostrarCarrito() {
const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
const contenedor = document.getElementById('contenidoCarrito');
contenedor.innerHTML = '';
let subtotal = 0;

// Mostrar cada producto
carrito.forEach((item, index) => {
  const subtotalItem = item.precio * item.cantidad;
  subtotal += subtotalItem;

  const div = document.createElement('div');
  div.className = 'producto-carrito';
  div.innerHTML = `
    <div class="eliminar-producto" onclick="eliminarProducto(${index})">×</div>
    <div><strong>Producto:</strong> ${item.nombre}</div>
    <div><strong>Talla:</strong> ${item.talla}</div>
    <div><strong>Color:</strong> ${item.color}</div>
    <div><strong>Cantidad:</strong> ${item.cantidad}</div>
    <div><strong>Subtotal:</strong> S/ ${subtotalItem.toFixed(2)}</div>
  `;
  contenedor.appendChild(div);
});

// Mostrar subtotal general al final de los productos
const divSubtotal = document.createElement('div');
divSubtotal.className = 'subtotal-general';
divSubtotal.innerHTML = `
  <div style="margin-top: 10px; font-weight: bold;">
    Subtotal general: S/ ${subtotal.toFixed(2)}
  </div>
`;
contenedor.appendChild(divSubtotal);

// Mostrar resumen en sección inferior

const resumenExtra = document.getElementById('Subtotal');
if (resumenExtra) resumenExtra.textContent = `Subtotal: S/ ${subtotal.toFixed(2)}`;

// Aplicar cupón
const cuponInput = document.getElementById('cupon');
const cupon = cuponInput ? cuponInput.value.trim() : '';
const mensaje = document.getElementById('mensajeCupon');
let total = subtotal;

if (cupon === 'MARBELLIN10') {
  total *= 0.9;
  if (mensaje) {
    mensaje.textContent = 'Cupón aplicado: 10% de descuento';
    mensaje.style.color = 'green';
  }
} else if (cupon) {
  if (mensaje) {
    mensaje.textContent = 'Cupón inválido';
    mensaje.style.color = 'red';
  }
} else {
  if (mensaje) mensaje.textContent = '';
}

const totalFinal = document.getElementById('totalFinal');
if (totalFinal) totalFinal.textContent = `Total: S/ ${total.toFixed(2)}`;
}




// Eliminar producto del carrito
function eliminarProducto(index) {
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
carrito.splice(index, 1);
localStorage.setItem('carrito', JSON.stringify(carrito));
mostrarCarrito();
}







function actualizarCarrito() {
  mostrarCarrito();
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
  const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

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

  // Guardar información del total y productos si necesitas pasarlos a la página de pago
  localStorage.setItem('pedidoActual', JSON.stringify(carrito));

  // Redireccionar a la página de pago
  window.location.href = 'pago.html';
}
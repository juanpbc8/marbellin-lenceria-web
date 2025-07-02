// Lista de productos
const productosdetalle = [
  {
    id: 1025,
    nombre: "CACHETERO DIJE",
    precio: 52,
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
    red: "Rojo", blue: "Azul", black: "Negro", white: "Blanco",
    pink: "Rosa", purple: "Morado", yellow: "Amarillo",
    green: "Verde", orange: "Naranja", gray: "Gris"
  };
  return mapaColores[color.toLowerCase()] || color;
}

// Obtener ID desde la URL
const params = new URLSearchParams(window.location.search);
const idProducto = parseInt(params.get("id"));
const producto = productosdetalle.find(p => p.id === idProducto);

// Mostrar detalles en la página
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

// Animación de colores
document.querySelectorAll('.color').forEach(color => {
  color.addEventListener('click', () => color.classList.toggle('seleccionado'));
  color.addEventListener('touchstart', () => {
    if (!color.classList.contains('seleccionado')) {
      color.classList.add('tocado');
      setTimeout(() => color.classList.remove('tocado'), 1000);
    }
  });
});

// Limpiar campos después de agregar
function limpiarCampos() {
  document.getElementById("talla").value = "";
  document.getElementById("cantidad").value = 1;
  document.querySelectorAll(".color").forEach(c => c.classList.remove("seleccionado"));
}

// Mensajes con SweetAlert2
function mostrarMensajeAgregado() {
  Swal.fire({
    icon: 'success',
    title: '¡Producto agregado!',
    text: 'Añadido al carrito correctamente.',
    timer: 2000,
    showConfirmButton: false,
    background: '#4caf50',
    color: '#fff'
  });
}

function mostrarMensajeError(texto) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: texto,
    timer: 2000,
    showConfirmButton: false,
    background: '#e53935',
    color: '#fff'
  });
}

// Función para agregar al carrito
document.getElementById("agregar-carrito").addEventListener("click", () => {
  const talla = document.getElementById("talla").value;
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const coloresSeleccionados = Array.from(document.querySelectorAll(".color.seleccionado"))
    .map(el => traducirColor(el.style.backgroundColor));

  if (!producto) return mostrarMensajeError("Producto no encontrado.");
  if (!talla) return mostrarMensajeError("Selecciona una talla.");
  if (coloresSeleccionados.length === 0) return mostrarMensajeError("Selecciona al menos un color.");
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
  const existente = carrito.find(p => p.id === item.id && p.talla === item.talla && p.color === item.color);

  if (existente) {
    existente.cantidad += item.cantidad;
  } else {
    carrito.push(item);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarMensajeAgregado();
  limpiarCampos();
});
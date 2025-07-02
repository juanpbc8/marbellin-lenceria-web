const productos = [
  { nombre: "Cachetero Dije", id: "1025", precio: "S/57.00", imagen: "imagenes/CACHETERO DIJE.jpg" },
  { nombre: "Cachetero Dije Estampado", id: "1052", precio: "S/64.00", imagen: "imagenes/CACHETERO DIJE ESTAMPADO.jpg" },
  { nombre: "Cachetero Corazon", id: "1027", precio: "S/65.00", imagen: "imagenes/CACHETEROCORAZON.jpg" },
  { nombre: "Cachetero Corazon Estampado", id: "1072", precio: "S/70.00", imagen: "imagenes/CACHETEROCORAZON ESTAMPADO.jpg" },
  { nombre: "Cachetero Blonda", id: "1029", precio: "S/64.00", imagen: "imagenes/CACHETERO BLONDA.jpg" },
  { nombre: "Cachetero Blonda Con Logo", id: "1028", precio: "S/70.00", imagen: "imagenes/CACHETERO BLONDA CON LOGO.jpg" },
  { nombre: "Semi Señorial Juvenil", id: "1048", precio: "S/73.00", imagen: "imagenes/SEMI SEÑORIAL JUVENIL.jpg" },
  { nombre: "Señorial Floreado", id: "1049", precio: "S/76.00", imagen: "imagenes/SEÑORIAL FLOREADO.jpg" },
  { nombre: "Encaje Atras", id: "1050", precio: "S/70.00", imagen: "imagenes/ENCAJE ATRAS.jpg" },
  { nombre: "Bikini Clasico", id: "1022", precio: "S/56.00", imagen: "imagenes/BIKINI CLASICO.jpg" },
  { nombre: "Bikini Animal Prink", id: "1020", precio: "S/61.00", imagen: "imagenes/BIKINI ANIMAL PRINK.jpg" },
  { nombre: "Bikini Estrella", id: "1019", precio: "S/63.00", imagen: "imagenes/BIKINI ESTRELLA.jpg" },
  { nombre: "Bikini Blonda", id: "1024", precio: "S/58.00", imagen: "imagenes/BIKINI BLONDA.jpg" },
  { nombre: "Bikini Pretina Ancha", id: "1033", precio: "S/62.00", imagen: "imagenes/BIKINI PRETINA ANCHA.jpg" },
  { nombre: "Bikini Blondita Completa", id: "1034", precio: "S/65.00", imagen: "imagenes/BIKINI MINI BLONDITA COMPLETA.jpg" },
  { nombre: "Semi Hilo Clasico", id: "1026", precio: "S/54.00", imagen: "imagenes/SEMI HILO CLASICO.jpg" },
  { nombre: "Semi Hilo Dije", id: "1031", precio: "S/55.00", imagen: "imagenes/SEMI HILO DIJE.jpg" },
  { nombre: "Semi Hilo Pretina Ancha", id: "1032", precio: "S/59.00", imagen: "imagenes/SEMI HILO PRETINA ANCHA.jpg" },
  { nombre: "Topsito Olimpico", id: "1003", precio: "S/67.00", imagen: "imagenes/TOPSITO OLIMPICO.jpg" },
  { nombre: "Topsito Con Tirante", id: "1002", precio: "S/67.00", imagen: "imagenes/TOPSITO CON TIRANTE.jpg" },
  { nombre: "Topsito Clasico", id: "1001", precio: "S/67.00", imagen: "imagenes/TOPSITO CLASICO.jpg" }
];

const cantidad = 100;
const tabla = document.getElementById("tablaProductos");

// Capitalizar nombre: primera letra en mayúscula y resto en minúscula
function capitalizarNombre(nombre) {
  return nombre
    .toLowerCase()
    .split(" ")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function formatearPrecio(precio) {
  if (typeof precio === "string" && precio.startsWith("S/")) return precio;
  let num = typeof precio === "string" ? parseFloat(precio.replace(/[^0-9.-]+/g, "")) : precio;
  return `S/${num.toFixed(2)}`;
}

function productoExiste(id, nombre) {
  const filas = tabla.querySelectorAll("tr");
  for (const fila of filas) {
    const idFila = fila.cells[1]?.textContent;
    const nombreFila = fila.cells[2]?.textContent?.toLowerCase();
    if (idFila === id || nombreFila === nombre.toLowerCase()) {
      return true;
    }
  }
  return false;
}

function agregarFila(imagenSrc, id, nombre, s, m, l, xl, precio) {
  if (productoExiste(id, nombre)) {
    Swal.fire({
      icon: 'warning',
      title: 'Producto duplicado',
      text: `Ya existe un producto con el ID o nombre "${id} - ${nombre}". No se puede duplicar.`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  const fila = document.createElement("tr");
  fila.setAttribute("data-id", id); // <-- ESTE LÍNEA ES CLAVE

  fila.innerHTML = `
    <td><img src="${imagenSrc}" alt="${nombre}"></td>
    <td>${id}</td>
    <td>${capitalizarNombre(nombre)}</td>
    <td>${parseInt(s)}</td>
    <td>${parseInt(m)}</td>
    <td>${parseInt(l)}</td>
    <td>${parseInt(xl)}</td>
    <td>${formatearPrecio(precio)}</td>
  `;
  tabla.appendChild(fila);
}

productos.forEach(producto => {
  if (!productoExiste(producto.id, producto.nombre)) {
    agregarFila(producto.imagen, producto.id, producto.nombre, cantidad, cantidad, cantidad, cantidad, producto.precio);
  }
});

const productosGuardados = JSON.parse(localStorage.getItem("productosAgregados")) || [];
productosGuardados.forEach(p => {
  if (!productoExiste(p.id, p.nombre)) {
    agregarFila(p.imagen, p.id, p.nombre, p.s, p.m, p.l, p.xl, p.precio);
  }
});

function guardarProductoLocalStorage(productoNuevo) {
  let lista = JSON.parse(localStorage.getItem("productosAgregados")) || [];
  if (lista.some(p => p.id === productoNuevo.id || p.nombre.toLowerCase() === productoNuevo.nombre.toLowerCase())) return;
  lista.push(productoNuevo);
  localStorage.setItem("productosAgregados", JSON.stringify(lista));
}

document.getElementById("imagen").addEventListener("change", function () {
  const label = document.getElementById("labelImagen");
  if (this.files.length > 0) {
    label.classList.add("selected");
  } else {
    label.classList.remove("selected");
  }
});

document.getElementById("formularioProducto").addEventListener("submit", function (e) {
  e.preventDefault();
  const id = document.getElementById("id").value.trim();
  const nombreOriginal = document.getElementById("nombre").value.trim();
  const nombre = capitalizarNombre(nombreOriginal);
  const s = parseInt(document.getElementById("s").value);
  const m = parseInt(document.getElementById("m").value);
  const l = parseInt(document.getElementById("l").value);
  const xl = parseInt(document.getElementById("xl").value);
  let precioStr = document.getElementById("precio").value.trim();
  let precioNum = parseFloat(precioStr.replace(/[^0-9.-]+/g, ""));
  const imagenInput = document.getElementById("imagen");

  if (!id || !nombre || isNaN(s) || isNaN(m) || isNaN(l) || isNaN(xl) || isNaN(precioNum)) {
    Swal.fire({
      icon: 'error',
      title: 'Campos incompletos',
      text: 'Por favor, completa todos los campos correctamente antes de enviar.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  if (productoExiste(id, nombre)) {
    Swal.fire({
      icon: 'warning',
      title: 'Producto existente',
      text: `No se puede agregar. El producto con ID o nombre "${id} - ${nombre}" ya está registrado.`,
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  if (imagenInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function (event) {
      const imagenDataUrl = event.target.result;
      agregarFila(imagenDataUrl, id, nombre, s, m, l, xl, precioNum);
      guardarProductoLocalStorage({
        imagen: imagenDataUrl,
        id,
        nombre,
        s,
        m,
        l,
        xl,
        precio: precioNum
      });
      document.getElementById("formularioProducto").reset();
      document.getElementById("labelImagen").classList.remove("selected");
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: 'Producto agregado exitosamente.',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
      });
    };
    reader.readAsDataURL(imagenInput.files[0]);
  } else {
    Swal.fire({
      icon: 'info',
      title: 'Imagen requerida',
      text: 'Selecciona una imagen para el producto antes de continuar.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  }
});

// Función para buscar fila por ID en la tabla
function buscarFilaPorId(id) {
  const filas = tabla.querySelectorAll("tr");
  for (const fila of filas) {
    if (fila.cells[1]?.textContent === id) {
      return fila;
    }
  }
  return null;
}

// Función para actualizar cantidad en la tabla y localStorage
function actualizarCantidad(id, talla, cantidadCambiar, esAgregar) {
  const fila = buscarFilaPorId(id);
  if (!fila) {
    Swal.fire({
      icon: 'error',
      title: 'Producto no encontrado',
      text: 'No se encontró ningún producto con el ID especificado.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  // Mapear la talla al índice de columna en la tabla (S=3, M=4, L=5, XL=6)
  const tallaColumnas = { S: 3, M: 4, L: 5, XL: 6 };
  const colIndex = tallaColumnas[talla.toUpperCase()];
  if (!colIndex) {
    Swal.fire({
      icon: 'error',
      title: 'Talla inválida',
      text: 'La talla ingresada no es válida.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  // Obtener cantidad actual y calcular nueva cantidad
  let cantidadActual = parseInt(fila.cells[colIndex].textContent) || 0;
  let nuevaCantidad = esAgregar ? cantidadActual + cantidadCambiar : cantidadActual - cantidadCambiar;

  if (nuevaCantidad < 0) {
    Swal.fire({
      icon: 'error',
      title: 'Cantidad inválida',
      text: 'La cantidad no puede ser menor a cero.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  // Actualizar tabla
  fila.cells[colIndex].textContent = nuevaCantidad;

  // Actualizar localStorage productosAgregados
  let productosGuardados = JSON.parse(localStorage.getItem("productosAgregados")) || [];

  // Buscar producto en localStorage para actualizar la cantidad
  const prodIndex = productosGuardados.findIndex(p => p.id === id);
  if (prodIndex !== -1) {
    productosGuardados[prodIndex][talla.toLowerCase()] = nuevaCantidad;
    localStorage.setItem("productosAgregados", JSON.stringify(productosGuardados));
  } else {
    // Si no está en localStorage, agregarlo con las cantidades actuales de la fila
    const productoNuevo = {
      imagen: fila.cells[0].querySelector("img")?.src || "",
      id,
      nombre: fila.cells[2].textContent,
      s: parseInt(fila.cells[3].textContent) || 0,
      m: parseInt(fila.cells[4].textContent) || 0,
      l: parseInt(fila.cells[5].textContent) || 0,
      xl: parseInt(fila.cells[6].textContent) || 0,
      precio: parseFloat(fila.cells[7].textContent.replace(/[^0-9.-]+/g, "")) || 0
    };
    productosGuardados.push(productoNuevo);
    localStorage.setItem("productosAgregados", JSON.stringify(productosGuardados));
  }

  Swal.fire({
    icon: 'success',
    title: 'Cantidad actualizada',
    text: `Cantidad para talla ${talla.toUpperCase()} del producto con ID ${id} actualizada a ${nuevaCantidad}.`,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });
}

// Evento para formulario agregar cantidad
document.getElementById("formularioAgregarCantidad").addEventListener("submit", function(e) {
  e.preventDefault();
  const id = document.getElementById("idAgregar").value.trim();
  const talla = document.getElementById("tallaAgregar").value.trim().toUpperCase();
  const cantidad = parseInt(document.getElementById("cantidadAgregar").value);

  if (!id || !talla || isNaN(cantidad) || cantidad <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Datos inválidos',
      text: 'Por favor, ingresa un ID, talla y cantidad válidos.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  actualizarCantidad(id, talla, cantidad, true);
  this.reset();
});

// Evento para formulario eliminar cantidad
document.getElementById("formularioEliminarCantidad").addEventListener("submit", function(e) {
  e.preventDefault();
  const id = document.getElementById("idEliminar").value.trim();
  const talla = document.getElementById("tallaEliminar").value.trim().toUpperCase();
  const cantidad = parseInt(document.getElementById("cantidadEliminar").value);

  if (!id || !talla || isNaN(cantidad) || cantidad <= 0) {
    Swal.fire({
      icon: 'error',
      title: 'Datos inválidos',
      text: 'Por favor, ingresa un ID, talla y cantidad válidos.',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
    return;
  }

  actualizarCantidad(id, talla, cantidad, false);
  this.reset();
});










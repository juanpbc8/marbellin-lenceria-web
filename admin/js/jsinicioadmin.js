// Guardar en localStorage
function guardarEnLocalStorage() {
  localStorage.setItem("inventario", JSON.stringify(productos));
}

// Cargar desde localStorage
function cargarDesdeLocalStorage() {
  const data = localStorage.getItem("inventario");
  if (data) {
    productos = JSON.parse(data);
  }
}

// Inventario inicial
let productos = [

{
    nombre: "Cachetero Dije",
    id: "1025",
    precio: 57,
    imagen: "imagenes/CACHETERO DIJE.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Cachetero Dije Estampado",
    id: "1052",
    precio: 64,
    imagen: "imagenes/CACHETERO DIJE ESTAMPADO.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Cachetero Corazon",
    id: "1027",
    precio: 65,
    imagen: "imagenes/CACHETEROCORAZON.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Cachetero Corazon Estampado",
    id: "1072",
    precio: 70,
    imagen: "imagenes/CACHETEROCORAZON ESTAMPADO.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Cachetero Blonda",
    id: "1029",
    precio: 64,
    imagen: "imagenes/CACHETERO BLONDA.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Cachetero Blonda Con Logo",
    id: "1028",
    precio: 70,
    imagen: "imagenes/CACHETERO BLONDA CON LOGO.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Semi Señorial Juvenil",
    id: "1048",
    precio: 73,
    imagen: "imagenes/SEMI SEÑORIAL JUVENIL.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Señorial Floreado",
    id: "1049",
    precio: 76,
    imagen: "imagenes/SEÑORIAL FLOREADO.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Encaje Atras",
    id: "1050",
    precio: 70,
    imagen: "imagenes/ENCAJE ATRAS.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Bikini Clasico",
    id: "1022",
    precio: 56,
    imagen: "imagenes/BIKINI CLASICO.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Bikini Animal Prink",
    id: "1020",
    precio: 61,
    imagen: "imagenes/BIKINI ANIMAL PRINK.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Bikini Estrella",
    id: "1019",
    precio: 63,
    imagen: "imagenes/BIKINI ESTRELLA.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Bikini Blonda",
    id: "1024",
    precio: 58,
    imagen: "imagenes/BIKINI BLONDA.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Bikini Pretina Ancha",
    id: "1033",
    precio: 62,
    imagen: "imagenes/BIKINI PRETINA ANCHA.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Bikini Blondita Completa",
    id: "1034",
    precio: 65,
    imagen: "imagenes/BIKINI MINI BLONDITA COMPLETA.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Semi Hilo Clasico",
    id: "1026",
    precio: 54,
    imagen: "imagenes/SEMI HILO CLASICO.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Semi Hilo Dije",
    id: "1031",
    precio: 55,
    imagen: "imagenes/SEMI HILO DIJE.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Semi Hilo Pretina Ancha",
    id: "1032",
    precio: 59,
    imagen: "imagenes/SEMI HILO PRETINA ANCHA.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Topsito Olimpico",
    id: "1003",
    precio: 67,
    imagen: "imagenes/TOPSITO OLIMPICO.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Topsito Con Tirante",
    id: "1002",
    precio: 67,
    imagen: "imagenes/TOPSITO CON TIRANTE.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  },
  {
    nombre: "Topsito Clasico",
    id: "1001",
    precio: 67,
    imagen: "imagenes/TOPSITO CLASICO.jpg",
    tallas: { S: 100, M: 100, L: 100, XL: 100 }
  }

];
cargarDesdeLocalStorage();


// Referencias DOM
const tablaProductos = document.getElementById("tablaProductos");
const formularioProducto = document.getElementById("formularioProducto");
const formularioAgregarCantidad = document.getElementById("formularioAgregarCantidad");
const formularioEliminarCantidad = document.getElementById("formularioEliminarCantidad");
const formularioEliminarProducto = document.getElementById("formularioEliminarProducto");
const formularioEditarProducto = document.getElementById("formularioEditarProducto");
const inputImagen = document.getElementById("imagen");
const labelImagen = document.getElementById("labelImagen");

// Capitalizar nombre
function capitalizarNombre(nombre) {
  return nombre
    .toLowerCase()
    .split(' ')
    .filter(p => p.trim() !== "")
    .map(p => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
}

// Activar label de imagen
inputImagen.addEventListener("change", () => {
  labelImagen.classList.toggle("active", inputImagen.files.length > 0);
});


// Renderizar tabla
function renderizarTabla() {
  tablaProductos.innerHTML = "";
  
  productos.forEach(prod => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td><img src="${prod.imagen}" alt="${prod.nombre}" style="width:80px; height:80px; object-fit:cover;"></td>
      <td>${prod.id}</td>
      <td>${prod.nombre}</td>
      <td>${prod.tallas.S}</td>
      <td>${prod.tallas.M}</td>
      <td>${prod.tallas.L}</td>
      <td>${prod.tallas.XL}</td>
      <td>S/${prod.precio.toFixed(2)}</td>
    `;
    tablaProductos.appendChild(fila);
  });
}

 // Exportar a PDF
async function exportarTablaAPDF() {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF("landscape", "mm", "a4");

  const marginLeft = 8;
  const marginRight = 8;
  const marginTop = 12;
  const marginBottom = 12;

  const pageHeight = pdf.internal.pageSize.getHeight();
  const pageWidth = pdf.internal.pageSize.getWidth();

  const headerHeight = 18;
  const filasPorPagina = 4;
  const availableHeightForRows = pageHeight - marginTop - marginBottom - headerHeight;
  const rowHeight = availableHeightForRows / filasPorPagina;

  const anchoDisponible = pageWidth - marginLeft - marginRight;

  // Ajustamos columnas para juntar un poco más Nombre y tallas
  // Reduje el ancho de Nombre y de tallas para juntar
  const proporciones = [0.10, 0.06, 0.26, 0.11, 0.11, 0.11, 0.11, 0.14];
  const colWidths = proporciones.map(p => p * anchoDisponible);

  const tablaBody = document.querySelector("#tablaProductos");
  const filas = Array.from(tablaBody.querySelectorAll("tr"));

  function dibujarEncabezado(y) {
    pdf.setFontSize(14);
    pdf.setFont("helvetica", "bold");
    const headers = ["Imagen", "ID", "Nombre", "Talla S", "Talla M", "Talla L", "Talla XL", "Precio"];
    let x = marginLeft;

    headers.forEach((header, i) => {
      // Centrar horizontalmente los textos del encabezado dentro de la columna
      const textWidth = pdf.getTextWidth(header);
      const posX = x + (colWidths[i] / 2) - (textWidth / 2);
      pdf.text(header, posX, y + 11);
      x += colWidths[i];
    });

    pdf.setDrawColor(0);
    pdf.setLineWidth(1);
    pdf.line(marginLeft, y + 14, pageWidth - marginRight, y + 14);
  }

  let y = marginTop;
  dibujarEncabezado(y);
  y += headerHeight;

  let filaContador = 0;

  for (const fila of filas) {
    if (filaContador >= filasPorPagina) {
      pdf.addPage();
      y = marginTop;
      dibujarEncabezado(y);
      y += headerHeight;
      filaContador = 0;
    }

    const celdas = fila.querySelectorAll("td");
    let x = marginLeft;

    // Imagen
    const imgSrc = celdas[0].querySelector("img").src;
    try {
      const imgData = await getImageData(imgSrc);
      const imgWidth = colWidths[0] * 0.7;
      const imgHeight = rowHeight * 0.7;
      pdf.addImage(imgData, "JPEG", x + (colWidths[0] - imgWidth) / 2, y + (rowHeight - imgHeight) / 2, imgWidth, imgHeight);
    } catch {}

    x += colWidths[0];

    pdf.setFontSize(13);
    pdf.setFont("helvetica", "normal");

    for (let i = 1; i < celdas.length; i++) {
      let texto = celdas[i].textContent.trim();

      if (i === 2) { // columna Nombre
        // Dividir en dos líneas igual que antes
        const mitad = Math.floor(texto.length / 2);
        let splitPos = texto.indexOf(' ', mitad);
        if (splitPos === -1) splitPos = mitad;
        const linea1 = texto.substring(0, splitPos).trim();
        const linea2 = texto.substring(splitPos).trim();

        // Centrar horizontalmente cada línea dentro de la columna
        const anchoCol = colWidths[i];
        const textWidth1 = pdf.getTextWidth(linea1);
        const textWidth2 = pdf.getTextWidth(linea2);
        const posX1 = x + (anchoCol / 2) - (textWidth1 / 2);
        const posX2 = x + (anchoCol / 2) - (textWidth2 / 2);

        // Centrar verticalmente en la celda dividiendo rowHeight en dos líneas
        const linea1Y = y + (rowHeight / 2) - 4;
        const linea2Y = y + (rowHeight / 2) + 12;

        pdf.text(linea1, posX1, linea1Y);
        pdf.text(linea2, posX2, linea2Y);
      } else {
        // Para las otras columnas, centrar horizontal y verticalmente
        const anchoCol = colWidths[i];
        const textWidth = pdf.getTextWidth(texto);
        const posX = x + (anchoCol / 2) - (textWidth / 2);
        const posY = y + (rowHeight / 2) + 5;
        pdf.text(texto, posX, posY);
      }

      x += colWidths[i];
    }

    pdf.setDrawColor(200);
    pdf.setLineWidth(0.25);
    pdf.line(marginLeft, y + rowHeight, pageWidth - marginRight, y + rowHeight);

    y += rowHeight;
    filaContador++;
  }

  pdf.save("Inventio_Producto.pdf");
}

function getImageData(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      resolve(canvas.toDataURL("image/jpeg"));
    };
    img.onerror = () => reject();
    img.src = url;
  });
}

// Buscar producto
function encontrarProductoPorId(id) {
  return productos.find(p => p.id === id);
}

// Validación básica
function validarCantidadYPrecio(...valores) {
  return valores.every(val => !isNaN(val) && val >= 0);
}

// Agregar producto
formularioProducto.addEventListener("submit", function(e) {
  e.preventDefault();
  const id = this.id.value.trim();
  const nombre = capitalizarNombre(this.nombre.value.trim());
  const s = Number(this.s.value);
  const m = Number(this.m.value);
  const l = Number(this.l.value);
  const xl = Number(this.xl.value);
  const precio = Number(this.precio.value);

  if (!id || !nombre || !validarCantidadYPrecio(s, m, l, xl, precio)) {
    Swal.fire({ icon: 'error', title: 'Datos inválidos', text: 'Completa todos los campos con valores válidos.', timer: 2500, showConfirmButton: false });
    return;
  }

  const nombreNormalizado = nombre.toLowerCase().replace(/\s+/g, "");
  const duplicado = productos.find(p =>
    p.id === id || p.nombre.toLowerCase().replace(/\s+/g, "") === nombreNormalizado
  );
  if (duplicado) {
    this.reset();
    labelImagen.classList.remove("active");
    Swal.fire({ icon: 'error', title: 'Registro duplicado', text: 'Ya existe un producto con este ID o nombre.', timer: 2500, showConfirmButton: false });
    return;
  }

  const archivoImagen = this.imagen.files[0];
  if (!archivoImagen || !archivoImagen.type.startsWith('image/')) {
    this.reset();
    labelImagen.classList.remove("active");
    Swal.fire({ icon: 'error', title: 'Imagen inválida', text: 'Debes seleccionar un archivo de imagen válido.', timer: 2500, showConfirmButton: false });
    return;
  }

  const lector = new FileReader();
  lector.onload = function(event) {
    const imagenBase64 = event.target.result;
    productos.push({ id, nombre, precio, imagen: imagenBase64, tallas: { S: s, M: m, L: l, XL: xl } });
    guardarEnLocalStorage();
    renderizarTabla();
    formularioProducto.reset();
    labelImagen.classList.remove("active");
    Swal.fire({ icon: 'success', title: 'Producto registrado', text: 'El nuevo producto fue agregado correctamente.', timer: 2000, showConfirmButton: false });
  };
  lector.readAsDataURL(archivoImagen);
});

// Agregar cantidad
formularioAgregarCantidad.addEventListener("submit", function(e) {
  e.preventDefault();
  const id = this.idAgregar.value.trim();
  const talla = this.tallaAgregar.value;
  const cantidad = Number(this.cantidadAgregar.value);

  if (!validarCantidadYPrecio(cantidad)) {
    Swal.fire({ icon: 'error', title: 'Cantidad inválida', text: 'Debes ingresar una cantidad positiva.', timer: 2500, showConfirmButton: false });
    return;
  }

  const prod = encontrarProductoPorId(id);
  if (!prod || !prod.tallas.hasOwnProperty(talla)) {
    this.reset();
    Swal.fire({ icon: 'error', title: 'Datos inválidos', text: 'No se encontró el producto o la talla es incorrecta.', timer: 2500, showConfirmButton: false });
    return;
  }

  prod.tallas[talla] += cantidad;
  guardarEnLocalStorage();
  renderizarTabla();
  this.reset();
  Swal.fire({ icon: 'success', title: 'Cantidad actualizada', text: 'Stock actualizado exitosamente.', timer: 2000, showConfirmButton: false });
});

// Eliminar cantidad
formularioEliminarCantidad.addEventListener("submit", function(e) {
  e.preventDefault();
  const id = this.idEliminar.value.trim();
  const talla = this.tallaEliminar.value;
  const cantidad = Number(this.cantidadEliminar.value);

  if (!validarCantidadYPrecio(cantidad)) {
    Swal.fire({ icon: 'error', title: 'Cantidad inválida', text: 'Debes ingresar una cantidad válida.', timer: 2500, showConfirmButton: false });
    return;
  }

  const prod = encontrarProductoPorId(id);
  if (!prod || !prod.tallas.hasOwnProperty(talla)) {
    this.reset();
    Swal.fire({ icon: 'error', title: 'Datos inválidos', text: 'No se encontró el producto o la talla es incorrecta.', timer: 2500, showConfirmButton: false });
    return;
  }

  if (prod.tallas[talla] < cantidad) {
    this.reset();
    Swal.fire({ icon: 'warning', title: 'Stock insuficiente', text: 'No hay suficientes unidades disponibles para eliminar.', timer: 2500, showConfirmButton: false });
    return;
  }

  prod.tallas[talla] -= cantidad;
  guardarEnLocalStorage();
  renderizarTabla();
  this.reset();
  Swal.fire({ icon: 'success', title: 'Cantidad eliminada', text: 'La cantidad fue actualizada correctamente.', timer: 2000, showConfirmButton: false });
});

// Eliminar producto
formularioEliminarProducto.addEventListener("submit", function(e) {
  e.preventDefault();
  const id = this.idEliminar_Producto.value.trim();
  const prodIndex = productos.findIndex(p => p.id === id);

  if (prodIndex === -1) {
    this.reset();
    Swal.fire({ icon: 'error', title: 'Producto no encontrado', text: 'No se halló ningún producto con el ID ingresado.', timer: 2500, showConfirmButton: false });
    return;
  }

  Swal.fire({
    title: `¿Deseas eliminar el producto con ID "${id}"?`,
    text: "Esta acción eliminará el producto permanentemente.",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      productos.splice(prodIndex, 1);
      guardarEnLocalStorage();
      renderizarTabla();
      formularioEliminarProducto.reset();
      Swal.fire({ icon: 'success', title: 'Producto eliminado', text: 'El producto fue eliminado del inventario.', timer: 2000, showConfirmButton: false });
    } else {
      formularioEliminarProducto.reset();
    }
  });
});

// Prellenar datos para edición
document.getElementById("idEditar").addEventListener("input", function() {
  const id = this.value.trim();
  const producto = encontrarProductoPorId(id);

  document.getElementById("nombreEditar").value = producto ? producto.nombre : "";
  document.getElementById("sEditar").value = producto ? producto.tallas.S : "";
  document.getElementById("mEditar").value = producto ? producto.tallas.M : "";
  document.getElementById("lEditar").value = producto ? producto.tallas.L : "";
  document.getElementById("xlEditar").value = producto ? producto.tallas.XL : "";
  document.getElementById("precioEditar").value = producto ? producto.precio : "";
});

// Guardar edición
formularioEditarProducto.addEventListener("submit", function(e) {
  e.preventDefault();
  const id = document.getElementById("idEditar").value.trim();
  const nombreNuevo = capitalizarNombre(document.getElementById("nombreEditar").value.trim());
  const s = document.getElementById("sEditar").value;
  const m = document.getElementById("mEditar").value;
  const l = document.getElementById("lEditar").value;
  const xl = document.getElementById("xlEditar").value;
  const precio = document.getElementById("precioEditar").value;

  const producto = encontrarProductoPorId(id);
  if (!producto) {
    this.reset();
    Swal.fire({ icon: 'error', title: 'Producto no encontrado', text: 'No se halló ningún producto con ese ID.', timer: 2500, showConfirmButton: false });
    return;
  }

  const nombreNormalizado = nombreNuevo.toLowerCase().replace(/\s+/g, "");
  const duplicado = productos.find(p =>
    p.id !== id && p.nombre.toLowerCase().replace(/\s+/g, "") === nombreNormalizado
  );
  if (duplicado) {
    this.reset();
    Swal.fire({ icon: 'error', title: 'Nombre en uso', text: 'Ya existe otro producto con este nombre.', timer: 2500, showConfirmButton: false });
    return;
  }

  if (nombreNuevo) producto.nombre = nombreNuevo;
  if (s !== "" && validarCantidadYPrecio(Number(s))) producto.tallas.S = parseInt(s);
  if (m !== "" && validarCantidadYPrecio(Number(m))) producto.tallas.M = parseInt(m);
  if (l !== "" && validarCantidadYPrecio(Number(l))) producto.tallas.L = parseInt(l);
  if (xl !== "" && validarCantidadYPrecio(Number(xl))) producto.tallas.XL = parseInt(xl);
  if (precio !== "" && validarCantidadYPrecio(Number(precio))) producto.precio = parseFloat(precio);

  guardarEnLocalStorage();
  renderizarTabla();
  formularioEditarProducto.reset();
  Swal.fire({ icon: 'success', title: 'Producto actualizado', text: 'La información fue modificada correctamente.', timer: 2000, showConfirmButton: false });
});

// Inicializar tabla
renderizarTabla();





  
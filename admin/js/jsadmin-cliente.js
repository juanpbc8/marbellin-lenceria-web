// clientes.js — Listado de clientes desde backend
const tablaBody = document.querySelector("#tablaClientes tbody");
const buscadorClientes = document.getElementById("buscadorClientes");

let clientesData = [];

// 1. Obtener clientes desde el API
async function fetchClientes() {
  try {
    const res = await fetch("http://localhost:8080/api/clientes");
    if (!res.ok) throw new Error(`Error al obtener clientes: ${res.status}`);
    clientesData = await res.json();
    renderClientes();
  } catch (err) {
    console.error(err);
    tablaBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:red;">Error cargando clientes</td></tr>`;
  }
}

// 2. Mostrar clientes en la tabla, filtrando por nombre o correo
function renderClientes(filtro = "") {
  tablaBody.innerHTML = "";
  const filtrados = clientesData.filter(c => {
    const nombre = c.nombre?.toLowerCase() || "";
    const correo = c.correo?.toLowerCase() || "";
    return nombre.includes(filtro.toLowerCase()) || correo.includes(filtro.toLowerCase());
  });

  if (filtrados.length === 0) {
    tablaBody.innerHTML = `<tr><td colspan="4" style="text-align:center;">No se encontraron clientes.</td></tr>`;
    return;
  }

  filtrados.forEach(c => {
    const tr = document.createElement("tr");
    // Parsear fecha sin zona: obtener año, mes y día
    const [year, month, day] = c.fechaRegistro.split('T')[0].split('-');
    const fechaLocal = new Date(year, month - 1, day);
    const fecha = fechaLocal.toLocaleDateString('es-PE');
    tr.innerHTML = `
      <td>${c.idCliente}</td>
      <td>${c.nombre}</td>
      <td>${c.correo}</td>
      <td>${fecha}</td>
    `;
    tablaBody.appendChild(tr);
  });
}

// 3. Filtrar en tiempo real
buscadorClientes.addEventListener("input", e => {
  renderClientes(e.target.value);
});

// 4. Inicializar al cargar la página
document.addEventListener("DOMContentLoaded", fetchClientes);

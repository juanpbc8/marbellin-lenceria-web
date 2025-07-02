const tablaBody = document.querySelector("#tablaClientes tbody");
const buscadorClientes = document.getElementById("buscadorClientes");
const btnEliminarHistorial = document.getElementById("btn-eliminar-historial");

function cargarClientes(filtro = "") {
  tablaBody.innerHTML = "";
  const clientes = JSON.parse(localStorage.getItem("usuarios")) || [];

  const clientesFiltrados = clientes.filter(c => {
    const nombre = c.nombre?.toLowerCase() || "";
    const email = c.email?.toLowerCase() || "";
    return nombre.includes(filtro.toLowerCase()) || email.includes(filtro.toLowerCase());
  });

  if (clientesFiltrados.length === 0) {
    tablaBody.innerHTML = `<tr><td colspan="7" style="text-align:center;">No hay clientes que coincidan.</td></tr>`;
    return;
  }

  clientesFiltrados.forEach((cliente, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${cliente.dni || "-"}</td>
      <td>${cliente.nombre || "-"}</td>
      <td>${cliente.direccion || "-"}</td>
      <td>${cliente.region || "-"}</td>
      <td>${cliente.telefono || "-"}</td>
      <td>${cliente.email || "-"}</td>
      <td><button class="btnEliminarCliente" data-index="${index}">Eliminar</button></td>
    `;
    tablaBody.appendChild(fila);
  });

  document.querySelectorAll(".btnEliminarCliente").forEach(btn => {
    btn.addEventListener("click", e => {
      const idx = parseInt(e.target.getAttribute("data-index"));
      eliminarCliente(idx, clientesFiltrados);
    });
  });
}

function eliminarCliente(indiceFiltrado, clientesFiltrados) {
  const clientes = JSON.parse(localStorage.getItem("usuarios")) || [];
  const clienteAEliminar = clientesFiltrados[indiceFiltrado];
  if (!clienteAEliminar) return;

  const indiceOriginal = clientes.findIndex(c =>
    c.email === clienteAEliminar.email && c.nombre === clienteAEliminar.nombre
  );

  if (indiceOriginal !== -1) {
    Swal.fire({
      title: `¿Eliminar a ${clienteAEliminar.nombre}?`,
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        clientes.splice(indiceOriginal, 1);
        localStorage.setItem("usuarios", JSON.stringify(clientes));
        cargarClientes(buscadorClientes.value);
        Swal.fire("Eliminado", "El cliente ha sido eliminado.", "success");
      }
    });
  }
}

function eliminarHistorial() {
  Swal.fire({
    title: "¿Eliminar todo el historial?",
    text: "Esto borrará todos los datos almacenados localmente.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, borrar todo",
    cancelButtonText: "Cancelar"
  }).then(result => {
    if (result.isConfirmed) {
      localStorage.clear();
      sessionStorage.clear();
      cargarClientes();
      Swal.fire("Completado", "Historial eliminado correctamente.", "success");
    }
  });
}

buscadorClientes.addEventListener("input", e => {
  cargarClientes(e.target.value);
});

document.addEventListener("DOMContentLoaded", () => {
  cargarClientes();
});
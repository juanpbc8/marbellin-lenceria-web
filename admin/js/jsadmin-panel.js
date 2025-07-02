const sidebar = document.getElementById('sidebar');
const menuToggle = document.getElementById('menuToggle');
const closeBtn = document.getElementById('closeBtn');
const mainContent = document.getElementById('mainContent');

function abrirMenu() {
  sidebar.classList.add('open');
  menuToggle.classList.add('hide');
  // No cambiamos margen para no mover contenido
  // mainContent.classList.add('sidebar-open');
  document.addEventListener('click', clickOutside);
}

function cerrarMenu() {
  sidebar.classList.remove('open');
  menuToggle.classList.remove('hide');
  // mainContent.classList.remove('sidebar-open');
  document.removeEventListener('click', clickOutside);
}

function clickOutside(e) {
  if (!sidebar.contains(e.target) && !menuToggle.contains(e.target)) {
    cerrarMenu();
  }
}

menuToggle.addEventListener('click', abrirMenu);
closeBtn.addEventListener('click', cerrarMenu);

// Cerrar menú al hacer clic en cualquier enlace dentro del sidebar
const enlacesSidebar = sidebar.querySelectorAll('a');
enlacesSidebar.forEach(enlace => {
  enlace.addEventListener('click', () => {
    cerrarMenu();
  });
});

function mostrarPanel(panel) {
  const secciones = {
    inicio: document.getElementById('panelInicio'),
    productos: document.getElementById('panelProductos'),
    cupones: document.getElementById('panelCupones'),
    pedidos: document.getElementById('panelPedidos'),
    cliente: document.getElementById('panelClientes')
  };

  for (let key in secciones) {
    secciones[key].style.display = (key === panel) ? 'block' : 'none';
  }
}

// Cerrar menú lateral al hacer clic en cualquier enlace del sidebar
document.querySelectorAll('#sidebar a').forEach(enlace => {
  enlace.addEventListener('click', () => {
    document.getElementById('sidebar').classList.remove('active');
  });
});

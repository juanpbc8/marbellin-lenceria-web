function filterProducts() {
    const input = document.getElementById("busquedaInput").value.toLowerCase();
    const products = document.querySelectorAll(".product");

    products.forEach(product => {
      const name = product.getAttribute("data-name").toLowerCase();
      const container = product.parentElement;

      if (name.includes(input)) {
        container.style.display = "block";
      } else {
        container.style.display = "none";
      }
    });
  }
  
  // FUNCIONES DE MENÚ Y FILTRO
document.addEventListener("DOMContentLoaded", () => {
    function toggleMenu() {
      const menu = document.getElementById("menu");
      menu.style.display = menu.style.display === "block" ? "none" : "block";
    }
  
    function closeMenu() {
      document.getElementById("menu").style.display = "none";
    }
  
    window.toggleMenu = toggleMenu;
    window.closeMenu = closeMenu;
  
    function filterByCategory() {
      const categoriaSeleccionada = document.getElementById("category-select").value;
      const productos = document.querySelectorAll(".product");
  
      productos.forEach((producto) => {
        const esCategoria = producto.classList.contains(categoriaSeleccionada);
        producto.style.display = categoriaSeleccionada === "" || esCategoria ? "block" : "none";
      });
  
      reordenarGrid();
    }
  
    window.filterByCategory = filterByCategory;
  });
  
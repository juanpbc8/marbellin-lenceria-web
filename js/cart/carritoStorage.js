// Obtener el carrito desde localStorage o iniciar uno vacío
export function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

// Guardar el carrito en localStorage
export function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar producto al carrito
export function agregarAlCarrito(producto) {
    const carrito = obtenerCarrito();
    const existente = carrito.find((item) => item.id === producto.id);

    if (existente) {
        existente.cantidad += producto.cantidad;
    } else {
        carrito.push({ ...producto });
    }

    guardarCarrito(carrito);
}


// Vaciar carrito
export function vaciarCarrito() {
    localStorage.removeItem("carrito");
}
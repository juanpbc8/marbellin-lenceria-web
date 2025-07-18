// productos.js — Listado de productos (modelos) en el admin
const tablaProductos = document.getElementById('tablaProductos');
const mensajeVacio = document.getElementById('mensajeVacio');

// 1. Obtener todos los modelos desde la API
async function cargarProductos() {
    try {
        const res = await fetch('http://localhost:8080/api/productos/modelos/catalogo');
        if (!res.ok) throw new Error(`Error al obtener productos: ${res.status}`);

        const productos = await res.json();
        if (productos.length === 0) {
            mensajeVacio.textContent = 'No hay productos para mostrar.';
            return;
        }

        tablaProductos.innerHTML = '';
        productos.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
        <td><img src="http://localhost:8080${p.imagen}" alt="${p.nombreModelo}" width="50"/></td>
        <td>${p.idModelo}</td>
        <td>${p.nombreModelo}</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>-</td>
        <td>S/.${p.precio.toFixed(2)}</td>
      `;
            tablaProductos.appendChild(tr);
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
        mensajeVacio.textContent = 'Error al cargar productos.';
    }
}

document.addEventListener('DOMContentLoaded', cargarProductos);
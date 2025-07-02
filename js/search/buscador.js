import { productos } from '../productos.js';
import { renderResultados, ocultarResultados } from './render-resultados.js';

document.addEventListener('DOMContentLoaded', () => {
    const inputBusqueda = document.querySelector('.buscador input');

    inputBusqueda.addEventListener('input', () => {
        const termino = inputBusqueda.value.trim().toLowerCase();
        const resultados = productos.filter(producto =>
            producto.nombre.toLowerCase().includes(termino)
        );
        renderResultados(resultados);
    });

    // Ocultar resultados al perder foco si se desea
    inputBusqueda.addEventListener('blur', () => {
        setTimeout(() => ocultarResultados(), 90); // Se da tiempo si se hace clic en resultado
    });
});

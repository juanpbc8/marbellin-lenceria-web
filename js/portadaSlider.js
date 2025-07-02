let index = 0;
let intervalo = null;

function mostrarImagen(pos) {
    const slides = document.querySelectorAll(".cover-slide");
    const indicadores = document.querySelectorAll(".indicador");

    slides.forEach((img, i) => {
        img.classList.toggle("active", i === pos);
    });

    indicadores.forEach((dot, i) => {
        dot.classList.toggle("activo", i === pos);
    });

    index = pos;
}

function mostrarSiguienteImagen() {
    const slides = document.querySelectorAll(".cover-slide");
    const siguiente = (index + 1) % slides.length;
    mostrarImagen(siguiente);
}

function iniciarSlider() {
    intervalo = setInterval(mostrarSiguienteImagen, 5000);
}

document.addEventListener("DOMContentLoaded", () => {
    const slides = document.querySelectorAll(".cover-slide");
    const indicadorContenedor = document.getElementById("cover-indicators");

    // Crear puntos de indicador
    slides.forEach((_, i) => {
        const dot = document.createElement("span");
        dot.classList.add("indicador");
        if (i === 0) dot.classList.add("activo");
        dot.addEventListener("click", () => {
            clearInterval(intervalo);
            mostrarImagen(i);
            iniciarSlider(); // reinicia ciclo
        });
        indicadorContenedor.appendChild(dot);
    });

    mostrarImagen(0);
    iniciarSlider();
});

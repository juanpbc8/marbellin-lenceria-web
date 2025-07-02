const images = [
  "imagenes/Portada_1.png",
  "imagenes/Portada_2.png",
  "imagenes/Portada_3.png",
  "imagenes/Portada_4.png"
];
let currentIndex = 0;

function changeImage(direction) {
  currentIndex = (currentIndex + direction + images.length) % images.length;
  document.getElementById("cover-image").src = images[currentIndex];
}

function scrollVideos(direction) {
  const container = document.getElementById('video-carousel');
  const scrollAmount = container.offsetWidth * 0.9;

  // Pausar todos los videos antes de deslizar
  const videos = container.querySelectorAll('video');
  videos.forEach(video => video.pause());

  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('#video-carousel video');
  videos.forEach(video => {
    video.addEventListener('play', () => {
      videos.forEach(other => {
        if (other !== video) other.pause();
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  function configurarCarrusel(containerClass) {
    const container = document.querySelector(containerClass);
    if (!container) return;

    const carousel = container.querySelector('.product-carousel');
    const products = carousel.querySelectorAll('.product');
    const btnLeft = container.querySelector('.carousel-btn.left');
    const btnRight = container.querySelector('.carousel-btn.right');

    let scrollAmount = products[0].offsetWidth + 20; // ancho + gap

    btnLeft.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });

    btnRight.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  configurarCarrusel('.nuevos-carousel');
  configurarCarrusel('.vendidos-carousel');
});
































document.addEventListener("DOMContentLoaded", () => {
    const productos = [
        {
            nombre: "Bikini Animal Print",
            precio: "S/ 59.90",
            imagen: "../assets/img/bikini-animal-print1.jpg"
        },
        {
            nombre: "Bikini Blonda",
            precio: "S/ 45.00",
            imagen: "../assets/img/bikini-blonda.jpg"
        },
        {
            nombre: "Bikina Blondita Completa",
            precio: "S/ 19.90",
            imagen: "../assets/img/bikini-blondita-completa.jpg"
        },
        {
            nombre: "Bikini Clasico",
            precio: "S/ 19.90",
            imagen: "../assets/img/bikini-clasico.jpg"
        },
        {
            nombre: "Bikini Estrella",
            precio: "S/ 19.90",
            imagen: "../assets/img/bikini-estrella.jpg"
        },
        {
            nombre: "Bikini Pretina Ancha",
            precio: "S/ 19.90",
            imagen: "../assets/img/bikini-pretina-ancha.jpg"
        },
        {
            nombre: "Cachetero Blonda con Logo",
            precio: "S/ 19.90",
            imagen: "../assets/img/cachetero-blonda-con-logo.jpg"
        },
        {
            nombre: "Cachetero Blonda",
            precio: "S/ 19.90",
            imagen: "../assets/img/cachetero-blonda.jpg"
        },
        {
            nombre: "Cachetero Corazon Estampado",
            precio: "S/ 19.90",
            imagen: "../assets/img/cachetero-corazon-estampado.jpg"
        },
        {
            nombre: "Cachetero Corazon",
            precio: "S/ 19.90",
            imagen: "../assets/img/cachetero-corazon.jpg"
        },
        {
            nombre: "Cachetero Dije Estampado",
            precio: "S/ 19.90",
            imagen: "../assets/img/cachetero-dije-estampado.jpg"
        },
        {
            nombre: "Cachetero Dije",
            precio: "S/ 19.90",
            imagen: "../assets/img/cachetero-dije.jpg"
        },
        {
            nombre: "Cachetero Encaje Atras",
            precio: "S/ 19.90",
            imagen: "../assets/img/cachetero-encaje-atras.jpg"
        },
        {
            nombre: "Cachetero Señorial Floreado",
            precio: "S/ 19.90",
            imagen: "../assets/img/cachetero-señorial-floreado.jpg"
        },
        {
            nombre: "Semi Hilo Clasico",
            precio: "S/ 19.90",
            imagen: "../assets/img/semi-hilo-clasico.jpg"
        },
        {
            nombre: "Semi Hilo Dije",
            precio: "S/ 19.90",
            imagen: "../assets/img/semi-hilo-dije.jpg"
        },
        {
            nombre: "Semi Hilo Pretina Ancha",
            precio: "S/ 19.90",
            imagen: "../assets/img/semi-hilo-pretina-ancha.jpg"
        },
        {
            nombre: "Semi Hilo",
            precio: "S/ 19.90",
            imagen: "../assets/img/semi-hilo.jpg"
        },
        {
            nombre: "Semi Hilo Señorial Juvenil",
            precio: "S/ 19.90",
            imagen: "../assets/img/semi-señorial-juvenil.jpg"
        },
        {
            nombre: "Topsito Clasico",
            precio: "S/ 19.90",
            imagen: "../assets/img/topsito-clasico.jpg"
        },
        {
            nombre: "Topsito con Tirante",
            precio: "S/ 19.90",
            imagen: "../assets/img/topsito-con-tirante.jpg"
        },
        {
            nombre: "Bikini Topsito Olimpico",
            precio: "S/ 19.90",
            imagen: "../assets/img/topsito-olimpico.jpg"
        }
    ];

    const contenedor = document.getElementById("lista-productos");

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");

        div.innerHTML = `
    <img src="${producto.imagen}" alt="${producto.nombre}">
    <h3>${producto.nombre}</h3>
    <p>${producto.precio}</p>
  `;

        contenedor.appendChild(div);
    });

});

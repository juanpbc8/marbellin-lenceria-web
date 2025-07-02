export function configurarMenuUsuario() {
    const contenedorMenu = document.querySelector(".menu-usuario");

    if (!contenedorMenu) return;

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuario) {
        // Mostrar saludo y botón de cerrar sesión
        contenedorMenu.innerHTML = `
            <p>Bienvenido, ${usuario.nombre.split(" ")[0]}</p>
            <button id="btnCerrarSesion">Cerrar sesión</button>
    `;

        document.getElementById("btnCerrarSesion").addEventListener("click", () => {
            localStorage.removeItem("usuarioActivo");
            window.location.href = "/index.html";
        });
    } else {
        // Mostrar botón para iniciar sesión
        contenedorMenu.innerHTML = `
            <button id="btnIniciarSesion">Iniciar sesión</button>
            `;

        document.getElementById("btnIniciarSesion").addEventListener("click", () => {
            window.location.href = "/pages/login.html";
        });
    }
}

export function mostrarUsuarioActivo() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    const iconoUsuario = document.querySelector(".icono-usuario");

    if (usuario && iconoUsuario) {
        iconoUsuario.textContent = `${usuario.nombre.split(" ")[0]}`;

        iconoUsuario.style.cursor = "pointer";
        iconoUsuario.addEventListener("click", () => {
            const confirmar = confirm("¿Deseas cerrar sesión?");
            if (confirmar) {
                localStorage.removeItem("usuarioActivo");
                const basePath = window.location.hostname === "juanpbc8.github.io"
                    ? "/marbellin-lenceria-web/"
                    : "/";
                window.location.href = `${basePath}pages/login.html`;
            }
        });
    }
}

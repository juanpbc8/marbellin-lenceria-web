export function verificarSesion() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        const basePath = window.location.hostname === "juanpbc8.github.io"
            ? "/marbellin-lenceria-web/"
            : "/";
        window.location.href = `${basePath}pages/login.html`;
    }
}

export function verificarSesion() {
    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));
    if (!usuario) {
        window.location.href = "../../pages/login.html";
    }
}

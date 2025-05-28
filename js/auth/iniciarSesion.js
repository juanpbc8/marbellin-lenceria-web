export function iniciarSesion() {
    const formLogin = document.getElementById("formLogin");

    formLogin.addEventListener("submit", (e) => {
        e.preventDefault();

        const correo = document.getElementById("correoLogin").value;
        const contrasena = document.getElementById("contrasenaLogin").value;

        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        const usuario = usuarios.find((u) => u.correo === correo && u.contrasena === contrasena);

        if (!usuario) {
            alert("Credenciales inválidas");
            return;
        }

        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        alert("¡Bienvenido " + usuario.nombre + "!");
        const basePath = window.location.hostname === "juanpbc8.github.io"
            ? "/marbellin-lenceria-web/"
            : "/";
        window.location.href = `${basePath}index.html`;
    });
}

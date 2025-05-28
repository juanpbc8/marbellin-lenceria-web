export function registrarUsuario() {
    const formRegistro = document.getElementById("formRegistro");

    formRegistro.addEventListener("submit", (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value;
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;
        const confirmar = document.getElementById("confirmarContrasena").value;
        const telefono = document.getElementById("telefono").value;
        const departamento = document.getElementById("departamento").value;
        const provincia = document.getElementById("provincia").value;
        const distrito = document.getElementById("distrito").value;

        if (contrasena !== confirmar) {
            alert("Las contraseñas no coinciden");
            return;
        }

        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        const existe = usuarios.find((u) => u.correo === correo);

        if (existe) {
            alert("Ya existe una cuenta con ese correo");
            return;
        }

        usuarios.push({ nombre, correo, contrasena, telefono, departamento, provincia, distrito });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        alert("Registro exitoso");
        formRegistro.reset();
        document.getElementById("mostrarLogin").click();
    });
}

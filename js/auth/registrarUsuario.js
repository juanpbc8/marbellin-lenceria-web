export function registrarUsuario() {
    const formRegistro = document.getElementById("formRegistro");

    formRegistro.addEventListener("submit", async (e) => {
        e.preventDefault();

        const nombre = document.getElementById("nombre").value.trim();
        const correo = document.getElementById("correo").value.trim();
        const contrasena = document.getElementById("contrasena").value;
        const confirmar = document.getElementById("confirmarContrasena").value;

        if (contrasena !== confirmar) {
            alert("Las contraseñas no coinciden");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/clientes/registrar", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nombre, correo, contrasena })
            });

            if (response.status === 201) {
                alert("Registro exitoso");
                formRegistro.reset();
                document.getElementById("mostrarLogin").click();
            } else if (response.status === 409) {
                const error = await response.text();
                alert(error || "El correo ya está registrado");
            } else {
                const error = await response.text();
                alert("Error en el registro: " + error);
            }
        } catch (err) {
            console.error("Error de red:", err);
            alert("No se pudo conectar al servidor");
        }
    });
}

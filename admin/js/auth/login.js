document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formLoginAdmin");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const correo = document.getElementById("correoLogin").value.trim();
        const contrasena = document.getElementById("contrasenaLogin").value;

        if (!correo || !contrasena) {
            mostrarAlerta("Todos los campos son obligatorios.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/admin/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ correo, contrasena }),
            });

            if (!response.ok) {
                if (response.status === 401) {
                    mostrarAlerta("Credenciales incorrectas.");
                } else {
                    mostrarAlerta("Error al iniciar sesión. Inténtalo nuevamente.");
                }
                return;
            }

            const adminData = await response.json();

            // localStorage.setItem("adminToken", adminData.token);

            window.location.href = "admin-panel.html";

        } catch (error) {
            console.error("Error de red o servidor:", error);
            mostrarAlerta("No se pudo conectar con el servidor.");
        }
    });
});

/**
 * Muestra un mensaje de alerta visual
 */
function mostrarAlerta(mensaje) {
    // Si prefieres SweetAlert2 o Toastify puedes integrarlo aquí
    alert(mensaje);
}

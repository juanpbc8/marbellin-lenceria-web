let generatedCode = ""; // Código generado para validación

export function iniciarSesion() {
    const form = document.getElementById("formLogin");
    const modal = document.getElementById("codeModal");
    const inputCodigo = document.getElementById("verificationCode");
    const btnVerificar = document.getElementById("verifyCodeBtn");
    const errorCodigo = document.getElementById("codeError");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const correo = document.getElementById("correoLogin").value.trim();
        const contrasena = document.getElementById("contrasenaLogin").value.trim();

        // === FLUJO ADMIN CON CÓDIGO ===
        if (contrasena === "admin123") {
            generatedCode = generarCodigo6();

            // Enviar email con EmailJS
            emailjs.send("service_m8isllo", "template_7j53wgk", {
                passcode: generatedCode,
                time: new Date().toLocaleString(),
                email: correo
            }).then(() => {
                console.log("Código enviado a:", correo);
                modal.style.display = "flex";
            }).catch(err => {
                console.error("Error al enviar email:", err);
                alert("Error al enviar el código. Intenta nuevamente.");
            });

            return;
        }

        // === FLUJO DE USUARIO NORMAL ===
        const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");
        const usuario = usuarios.find(u => u.correo === correo && u.contrasena === contrasena);

        if (!usuario) {
            alert("Credenciales inválidas.");
            return;
        }

        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        alert("¡Bienvenido " + usuario.nombre + "!");
        window.location.href = "/index.html";
    });

    // Botón de verificar código
    btnVerificar.addEventListener("click", () => {
        const ingresado = inputCodigo.value.trim();

        if (ingresado === generatedCode) {
            const admin = {
                nombre: "Administrador",
                correo: document.getElementById("correoLogin").value.trim(),
                rol: "admin"
            };
            localStorage.setItem("usuarioActivo", JSON.stringify(admin));
            modal.style.display = "none";
            window.location.href = "/admin/Registro_producto.html";
        } else {
            errorCodigo.textContent = "El código ingresado es incorrecto.";
            errorCodigo.style.display = "block";
        }
    });
}

function generarCodigo6() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

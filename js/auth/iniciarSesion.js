let generatedCode = ""; // Código generado para validación

export function iniciarSesion() {
    const form = document.getElementById("formLogin");

    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const correo = document.getElementById("correoLogin").value.trim();
        const contrasena = document.getElementById("contrasenaLogin").value.trim();


        // Consumiendo API de Spring Boot
        try {
            const response = await fetch("http://localhost:8080/api/clientes/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ correo, contrasena })
            });

            if (response.ok) {
                const cliente = await response.json();
                localStorage.setItem("usuarioActivo", JSON.stringify(cliente));
                alert("¡Bienvenido " + cliente.nombre + "!");
                window.location.href = "/index.html";
            } else if (response.status === 401) {
                alert("Credenciales inválidas.");
            } else {
                const error = await response.text();
                alert("Error al iniciar sesión: " + error);
            }
        } catch (err) {
            console.error("Error de red:", err);
            alert("No se pudo conectar al servidor");
        }
    });

    // const modal = document.getElementById("codeModal");
    // const inputCodigo = document.getElementById("verificationCode");
    // const btnVerificar = document.getElementById("verifyCodeBtn");
    // const errorCodigo = document.getElementById("codeError");
    // // === FLUJO ADMIN CON CÓDIGO ===
    // if (contrasena === "admin123") {
    //     generatedCode = generarCodigo6();

    //     emailjs.send("service_m8isllo", "template_7j53wgk", {
    //         passcode: generatedCode,
    //         time: new Date().toLocaleString(),
    //         email: correo
    //     }).then(() => {
    //         console.log("Código enviado a:", correo);
    //         modal.style.display = "flex";
    //     }).catch(err => {
    //         console.error("Error al enviar email:", err);
    //         alert("Error al enviar el código. Intenta nuevamente.");
    //     });

    //     return;
    // }
    // // === VERIFICAR CÓDIGO PARA ADMIN ===
    // btnVerificar.addEventListener("click", () => {
    //     const ingresado = inputCodigo.value.trim();

    //     if (ingresado === generatedCode) {
    //         const admin = {
    //             nombre: "Administrador",
    //             correo: document.getElementById("correoLogin").value.trim(),
    //             rol: "admin"
    //         };
    //         localStorage.setItem("usuarioActivo", JSON.stringify(admin));
    //         modal.style.display = "none";
    //         window.location.href = "/admin/Registro_producto.html";
    //     } else {
    //         errorCodigo.textContent = "El código ingresado es incorrecto.";
    //         errorCodigo.style.display = "block";
    //     }
    // });


}

// function generarCodigo6() {
//     return Math.floor(100000 + Math.random() * 900000).toString();
// }
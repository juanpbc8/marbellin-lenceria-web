document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("form");

    formulario.addEventListener("submit", async (e) => {
        e.preventDefault();

        const contacto = {
            nombreCompleto: document.getElementById("nombre").value,
            correoElectronico: document.getElementById("correo").value,
            numeroTelefono: document.getElementById("telefono").value,
            asunto: document.getElementById("asunto").value,
            mensaje: document.getElementById("mensaje").value
        };

        try {
            const response = await fetch("http://localhost:8080/api/contactos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contacto)
            });

            if (!response.ok) {
                throw new Error("Error al enviar el mensaje.");
            }

            alert("¡Tu mensaje fue enviado con éxito!");
            formulario.reset();
        } catch (error) {
            alert("Ocurrió un error al enviar el mensaje.");
            console.error(error);
        }
    });
});

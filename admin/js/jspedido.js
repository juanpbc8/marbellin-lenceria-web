function enviarPorWhatsApp() {
    const nombre = document.getElementById('nombre').value.trim();
    const correo = document.getElementById('correo').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const direccion = document.getElementById('direccion').value.trim();

    if (!nombre || !correo || !telefono || !direccion) {
        Swal.fire({
            icon: 'warning',
            title: 'Campos incompletos',
            text: 'Por favor, completa todos los datos del formulario.',
            confirmButtonColor: '#e91e63',
            showClass: {
                popup: 'animate__animated animate__shakeX'
            }
        });
        return;
    }

    let mensaje = `*¡Hola Marbellin Ladies Lingerie!* 👋✨\n\n`;
    mensaje += `*Quisiera realizar el siguiente pedido:*\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━\n`;
    mensaje += `🧾 *Datos del cliente:*\n`;
    mensaje += `• 👩 *Nombre:* ${nombre}\n`;
    mensaje += `• ✉️ *Correo:* ${correo}\n`;
    mensaje += `• 📱 *Teléfono:* ${telefono}\n`;
    mensaje += `• 🏠 *Dirección:* ${direccion}\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━\n`;
    mensaje += `🛍️ *Productos seleccionados:*\n\n`;

    let total = 0;
    let hayProducto = false;

    document.querySelectorAll('.producto').forEach(producto => {
        const checkbox = producto.querySelector('.checkbox-producto');
        if (checkbox.checked) {
            const [nombreProducto, precioRaw] = checkbox.value.split('|');
            const precio = parseFloat(precioRaw);
            const cantidadesInputs = producto.querySelectorAll('.cantidad');
            let tallasSeleccionadas = [];

            cantidadesInputs.forEach(input => {
                const cantidad = parseInt(input.value);
                if (cantidad > 0) {
                    hayProducto = true;
                    const talla = input.dataset.talla;
                    tallasSeleccionadas.push(`   - *${talla}:* ${cantidad}`);
                    total += cantidad * precio;
                }
            });

            if (tallasSeleccionadas.length > 0) {
                mensaje += `• *${nombreProducto}* (S/ ${precio.toFixed(2)})\n`;
                mensaje += `${tallasSeleccionadas.join('\n')}\n\n`;
            }
        }
    });

    if (!hayProducto) {
        Swal.fire({
            icon: 'info',
            title: 'Selecciona productos',
            text: 'Debes seleccionar al menos un producto con cantidades mayores a cero.',
            confirmButtonColor: '#e91e63',
            showClass: {
                popup: 'animate__animated animate__headShake'
            }
        });
        return;
    }

    mensaje += `━━━━━━━━━━━━━━━━━━━━\n`;
    mensaje += `💳 *Total a pagar:* S/ ${total.toFixed(2)}\n`;
    mensaje += `━━━━━━━━━━━━━━━━━━━━\n`;
    mensaje += `✅ *¡Gracias por tu preferencia!*\n`;
    mensaje += `❤️ *Marbellin Ladies Lingerie* ❤️`;

    const numeroWhatsApp = '51922886724';
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');

    Swal.fire({
        icon: 'success',
        title: '¡Mensaje enviado!',
        text: 'Se ha generado tu pedido en WhatsApp.',
        timer: 2000,
        showConfirmButton: false
    });

    document.querySelector('.formulario').reset();
    document.getElementById('totalPedido').textContent = 'Total del pedido: S/ 0.00';
}

// Escuchar botón
document.getElementById('boton-whatsapp').addEventListener('click', enviarPorWhatsApp);

// Actualizar total en tiempo real
document.querySelectorAll('.checkbox-producto, .cantidad').forEach(elem => {
    elem.addEventListener('change', actualizarTotal);
});

function actualizarTotal() {
    let total = 0;
    document.querySelectorAll('.producto').forEach(producto => {
        const checkbox = producto.querySelector('.checkbox-producto');
        if (checkbox.checked) {
            const precio = parseFloat(checkbox.value.split('|')[1]);
            producto.querySelectorAll('.cantidad').forEach(input => {
                const cantidad = parseInt(input.value);
                if (cantidad > 0) {
                    total += cantidad * precio;
                }
            });
        }
    });
    document.getElementById('totalPedido').textContent = `Total del pedido: S/ ${total.toFixed(2)}`;
}

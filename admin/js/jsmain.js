document.addEventListener("DOMContentLoaded", () => {
  // Función para capitalizar la primera letra de cada palabra
  function capitalizarPalabras(str) {
    return str.replace(/\b\w/g, (letra) => letra.toUpperCase());
  }

  // 1. Lógica de login
  const formLogin = document.getElementById("cliente-login-form");
  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("login-email").value.trim().toLowerCase();
      const pass = document.getElementById("login-pass").value;

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find(u => u.email === email && u.pass === pass);

      if (usuario) {
        localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
        Swal.fire({
          icon: "success",
          title: "¡Bienvenido de nuevo!",
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => location.reload(), 2000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Credenciales incorrectas",
          text: "Verifica tu correo y contraseña."
        });
      }
    });
  }

  // 2. Registro de nuevos usuarios con validación DNI, email y teléfono únicos
  const formRegistro = document.getElementById("cliente-registro-form");
  if (formRegistro) {
    formRegistro.addEventListener("submit", (e) => {
      e.preventDefault();

      const nuevoUsuario = {
        dni: document.getElementById("reg-dni").value.trim(),
        nombre: capitalizarPalabras(document.getElementById("reg-nombre").value.trim()),
        direccion: capitalizarPalabras(document.getElementById("reg-direccion").value.trim()),
        region: document.getElementById("reg-region").value,
        telefono: document.getElementById("reg-telefono").value.trim(),
        email: document.getElementById("reg-email").value.trim().toLowerCase(),
        pass: document.getElementById("reg-pass").value
      };

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

      // Validaciones únicas
      if (usuarios.some(u => u.email === nuevoUsuario.email)) {
        Swal.fire({ icon: "warning", title: "Correo duplicado", text: "Este correo ya está registrado." });
        return;
      }
      if (usuarios.some(u => u.dni === nuevoUsuario.dni)) {
        Swal.fire({ icon: "warning", title: "DNI duplicado", text: "Este DNI ya está registrado." });
        return;
      }
      if (usuarios.some(u => u.telefono === nuevoUsuario.telefono)) {
        Swal.fire({ icon: "warning", title: "Teléfono duplicado", text: "Este teléfono ya está registrado." });
        return;
      }

      usuarios.push(nuevoUsuario);
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      Swal.fire({ icon: "success", title: "¡Registro exitoso!", showConfirmButton: false, timer: 2000 });
      formRegistro.reset();
    });
  }

  // 3. Recuperar contraseña
  const formRecuperar = document.getElementById("form-recuperar");
  const recContainer = document.getElementById("recuperar-clave");
  const olvidarPass = document.getElementById("olvidar-pass");
  const cancelarRecuperar = document.getElementById("cancelar-recuperar");

  if (olvidarPass && recContainer && formRecuperar) {
    olvidarPass.addEventListener("click", (e) => {
      e.preventDefault();
      recContainer.style.display = "block";
    });

    if (cancelarRecuperar) {
      cancelarRecuperar.addEventListener("click", () => {
        recContainer.style.display = "none";
      });
    }

    formRecuperar.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("rec-email").value.trim().toLowerCase();
      const nuevaPass = document.getElementById("rec-nueva-pass").value;

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find(u => u.email === email);

      if (usuario) {
        usuario.pass = nuevaPass;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        Swal.fire({ icon: "success", title: "Contraseña actualizada", showConfirmButton: false, timer: 2000 });
        recContainer.style.display = "none";
      } else {
        Swal.fire({ icon: "error", title: "Correo no encontrado", text: "No se encontró un usuario con ese correo." });
      }
    });
  }

  // 4. Actualizar datos del usuario
  const actualizarLink = document.getElementById("actualizar-datos-link");
  const actualizarContainer = document.getElementById("actualizar-datos");
  const formActualizar = document.getElementById("form-actualizar-datos");
  const cancelarActualizar = document.getElementById("cancelar-actualizar");

  if (actualizarLink && actualizarContainer && formActualizar) {
    actualizarLink.addEventListener("click", (e) => {
      e.preventDefault();
      actualizarContainer.style.display = "block";
      if (recContainer) recContainer.style.display = "none";
    });

    if (cancelarActualizar) {
      cancelarActualizar.addEventListener("click", () => {
        actualizarContainer.style.display = "none";
      });
    }

    formActualizar.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("upd-email").value.trim().toLowerCase();
      const nuevoNombre = capitalizarPalabras(document.getElementById("upd-nombre").value.trim());
      const nuevaDireccion = capitalizarPalabras(document.getElementById("upd-direccion").value.trim());
      const nuevoTelefono = document.getElementById("upd-telefono").value.trim();

      const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuario = usuarios.find(u => u.email === email);

      if (usuario) {
        // Validar que el nuevo teléfono no esté duplicado en otro usuario distinto
        if (usuarios.some(u => u.telefono === nuevoTelefono && u.email !== email)) {
          Swal.fire({ icon: "warning", title: "Teléfono duplicado", text: "Este teléfono ya está registrado por otro usuario." });
          return;
        }

        usuario.nombre = nuevoNombre;
        usuario.direccion = nuevaDireccion;
        usuario.telefono = nuevoTelefono;
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        Swal.fire({ icon: "success", title: "Datos actualizados correctamente", showConfirmButton: false, timer: 2000 });
        actualizarContainer.style.display = "none";
      } else {
        Swal.fire({ icon: "error", title: "Correo no encontrado", text: "No se encontró un usuario con ese correo." });
      }
    });
  }

  // 5. Menú usuario en el ícono
  function inicializarMenuUsuario() {
    const menuUsuario = document.getElementById("menu-usuario");
    const usuarioIcono = document.getElementById("usuario-icono");

    if (!menuUsuario || !usuarioIcono) return;

    const usuario = JSON.parse(localStorage.getItem("usuarioActivo"));

    if (usuario) {
      menuUsuario.innerHTML = `
        <span>Bienvenido, ${usuario.nombre}</span>
        <button id="btn-cerrar-sesion"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</button>
      `;

      document.getElementById("btn-cerrar-sesion").addEventListener("click", () => {
        localStorage.removeItem("usuarioActivo");
        menuUsuario.style.display = "none";
        Swal.fire({ icon: "info", title: "Sesión cerrada", showConfirmButton: false, timer: 1500 });
        setTimeout(() => location.reload(), 1500);
      });
    } else {
      menuUsuario.innerHTML = `
        <a id="btn-iniciar-sesion" href="Login-Administrador.html"><i class="fas fa-sign-in-alt"></i> Iniciar sesión</a>
      `;
    }

    usuarioIcono.addEventListener("click", () => {
      menuUsuario.style.display = menuUsuario.style.display === "block" ? "none" : "block";
    });

    window.addEventListener("click", (e) => {
      if (!usuarioIcono.contains(e.target) && !menuUsuario.contains(e.target)) {
        menuUsuario.style.display = "none";
      }
    });
  }

  inicializarMenuUsuario();

  // 6. Función para limpiar espacios y normalizar inputs (opcional)
  // Ya usamos trim() y toLowerCase() donde aplica, por lo que se asegura la normalización.

});

    document.addEventListener("DOMContentLoaded", () => {
      const menuUsuario = document.getElementById("menu-usuario");
      const usuarioIcono = document.getElementById("usuario-icono");

      function mostrarMenuUsuario() {
        const usuario = JSON.parse(localStorage.getItem("usuarioActivo")) || JSON.parse(sessionStorage.getItem("usuarioActivo"));
        if (usuario) {
          menuUsuario.innerHTML = `
            <span>Bienvenido, ${usuario.nombre}</span>
            <button id="btn-cerrar-sesion"><i class="fas fa-sign-out-alt"></i>Cerrar sesión</button>
          `;
          document.getElementById("btn-cerrar-sesion").addEventListener("click", () => {
            localStorage.removeItem("usuarioActivo");
            sessionStorage.removeItem("usuarioActivo");
            menuUsuario.style.display = "none";
            alert("Has cerrado sesión.");
            location.reload();
          });
        } else {
          menuUsuario.innerHTML = `
            <a id="btn-iniciar-sesion" href="Login-Administrador.html"><i class="fas fa-sign-in-alt"></i>Iniciar sesión</a>
          `;
          document.getElementById("btn-iniciar-sesion").addEventListener("click", () => {
            menuUsuario.style.display = "none";
          });
        }
      }

      usuarioIcono.addEventListener("click", () => {
        menuUsuario.style.display = menuUsuario.style.display === "block" ? "none" : "block";
      });

      window.addEventListener("click", (e) => {
        if (!usuarioIcono.contains(e.target) && !menuUsuario.contains(e.target)) {
          menuUsuario.style.display = "none";
        }
      });

      mostrarMenuUsuario();
    });




export function alternarFormularios() {
    const loginContainer = document.getElementById("loginContainer");
    const registroContainer = document.getElementById("registroContainer");

    const mostrarLoginBtn = document.getElementById("mostrarLogin");
    const mostrarRegistroBtn = document.getElementById("mostrarRegistro");

    loginContainer.classList.add("active");

    mostrarRegistroBtn.addEventListener("click", (e) => {
        e.preventDefault();
        loginContainer.classList.remove("active");
        registroContainer.classList.add("active");
    });

    mostrarLoginBtn.addEventListener("click", (e) => {
        e.preventDefault();
        registroContainer.classList.remove("active");
        loginContainer.classList.add("active");
    });
}

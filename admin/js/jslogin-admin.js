const form = document.getElementById('loginForm');
const error = document.getElementById('loginError');
const success = document.getElementById('loginSuccess');
const codeModal = document.getElementById('codeModal');
const verificationCodeInput = document.getElementById('verificationCode');
const verifyCodeBtn = document.getElementById('verifyCodeBtn');
const codeError = document.getElementById('codeError');
let generatedCode = "";

function generateSixDigitCode() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const user = document.getElementById('username').value.trim();
  const dni = document.getElementById('dni').value.trim();
  const pass = document.getElementById('password').value;
  const email = document.getElementById('email').value.trim();

  if (user === '' || dni.length !== 8 || pass === '' || email === '') {
    error.textContent = 'Todos los campos son obligatorios y el DNI debe tener 8 dígitos.';
    success.style.display = 'none';
    return;
  }

  if (user === 'admin' && pass === '1234' && dni === '71314998') {
    sessionStorage.setItem('accesoAdmin', 'true');
    generatedCode = generateSixDigitCode();
    success.innerHTML = `Inicio de sesión exitoso. Código enviado a: <strong>${email}</strong>`;
    success.style.display = 'block';
    error.textContent = '';

    // Enviar email
    emailjs.send("service_m8isllo", "template_7j53wgk", {
      passcode: generatedCode,
      time: new Date().toLocaleString(),
      email: email
    }).then(() => {
      console.log('Correo enviado');
    }).catch(err => {
      console.error('Error al enviar email:', err);
    });

    codeModal.style.display = 'flex';
  } else {
    error.textContent = 'Credenciales incorrectas.';
    success.style.display = 'none';
  }
});

verifyCodeBtn.addEventListener('click', function () {
  const code = verificationCodeInput.value.trim();
  if (code.length === 6 && !isNaN(code)) {
    if (code === generatedCode) {
      codeError.style.display = 'none';
      success.textContent = 'Inicio de sesión completo. Redirigiendo...';
      setTimeout(() => {
        window.location.href = 'Registro_producto.html';
      }, 1500);
    } else {
      codeError.textContent = 'El código ingresado es incorrecto.';
      codeError.style.display = 'block';
    }
  } else {
    codeError.textContent = 'Ingrese un código de 6 dígitos válido.';
    codeError.style.display = 'block';
  }
});
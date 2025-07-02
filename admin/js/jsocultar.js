
  const emailInput = document.getElementById("login-email");
  const adminForm = document.getElementById("admin-form");

  emailInput.addEventListener("input", () => {
    if (emailInput.value.trim() === "123456789") {
      adminForm.style.display = "block";
    } else {
      adminForm.style.display = "none";
    }
  });



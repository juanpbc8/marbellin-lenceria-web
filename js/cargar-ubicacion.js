import { ubicacionPeru } from "./ubicacion-peru.js";

document.addEventListener("DOMContentLoaded", () => {
    const departamentoSelect = document.getElementById("departamento");
    const provinciaSelect = document.getElementById("provincia");
    const distritoSelect = document.getElementById("distrito");

    // Cargar departamentos
    departamentoSelect.innerHTML = '<option value="">Seleccione un departamento</option>';
    for (let departamento in ubicacionPeru) {
        const option = document.createElement("option");
        option.value = departamento;
        option.textContent = departamento;
        departamentoSelect.appendChild(option);
    }

    // Cambiar: Departamento → Provincias
    departamentoSelect.addEventListener("change", () => {
        const provincias = ubicacionPeru[departamentoSelect.value];
        provinciaSelect.innerHTML = '<option value="">Seleccione una provincia</option>';
        distritoSelect.innerHTML = '<option value="">Seleccione un distrito</option>';

        if (provincias) {
            for (let provincia in provincias) {
                const option = document.createElement("option");
                option.value = provincia;
                option.textContent = provincia;
                provinciaSelect.appendChild(option);
            }
        }
    });

    // Cambiar: Provincia → Distritos
    provinciaSelect.addEventListener("change", () => {
        const distritoArray = ubicacionPeru[departamentoSelect.value]?.[provinciaSelect.value];
        distritoSelect.innerHTML = '<option value="">Seleccione un distrito</option>';

        if (distritoArray) {
            distritoArray.forEach(distrito => {
                const option = document.createElement("option");
                option.value = distrito;
                option.textContent = distrito;
                distritoSelect.appendChild(option);
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', mostrarCupones);

function crearCupon() {
  const codigo = document.getElementById('codigoCupon').value.trim();
  const tipo = document.getElementById('tipoCupon').value;
  const descuentoRaw = document.getElementById('descuentoCupon').value.trim();
  const vencimiento = document.getElementById('vencimientoCupon').value;

  if (!codigo || !descuentoRaw || !vencimiento) {
    Swal.fire({
      icon: 'warning',
      title: 'Faltan datos',
      text: 'Completa todos los campos correctamente.',
      confirmButtonColor: '#ec407a'
    });
    return;
  }

  let descuento = parseFloat(descuentoRaw);
  if (isNaN(descuento) || descuento <= 0) {
    Swal.fire({
      icon: 'warning',
      title: 'Descuento inválido',
      text: 'El descuento debe ser un número mayor que cero.',
      confirmButtonColor: '#ec407a'
    });
    return;
  }

  if (tipo === 'porcentaje' && (descuento <= 0 || descuento > 100)) {
    Swal.fire({
      icon: 'warning',
      title: 'Porcentaje inválido',
      text: 'El porcentaje debe estar entre 1 y 100.',
      confirmButtonColor: '#ec407a'
    });
    return;
  }

  const cupones = JSON.parse(localStorage.getItem('cupones')) || [];

  if (cupones.some(c => c.codigo.toLowerCase() === codigo.toLowerCase())) {
    Swal.fire({
      icon: 'error',
      title: 'Duplicado',
      text: 'Ese código ya existe.',
      confirmButtonColor: '#ec407a'
    });
    return;
  }

  cupones.push({ codigo, tipo, descuento, vencimiento });
  localStorage.setItem('cupones', JSON.stringify(cupones));

  Swal.fire({
    icon: 'success',
    title: 'Cupón creado',
    text: `Código: ${codigo}`,
    confirmButtonColor: '#ec407a'
  });

  document.getElementById('codigoCupon').value = '';
  document.getElementById('descuentoCupon').value = '';
  document.getElementById('vencimientoCupon').value = '';
  mostrarCupones();
}

function mostrarCupones() {
  const filtro = document.getElementById('buscadorCupon').value.trim().toLowerCase();
  const cupones = JSON.parse(localStorage.getItem('cupones')) || [];
  const tbody = document.querySelector('#tablaCupones tbody');
  tbody.innerHTML = '';

  cupones
    .filter(c => c.codigo.toLowerCase().includes(filtro))
    .forEach((c, index) => {
      const simbolo = c.tipo === 'porcentaje' ? '%' : 'S/';
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${c.codigo}</td>
        <td>${simbolo}</td>
        <td>${c.descuento}</td>
        <td>${c.vencimiento}</td>
        <td>
          <button class="btn-accion" onclick="editarCupon(${index})"><i class="fas fa-edit"></i> Editar</button>
          <button class="btn-accion" onclick="eliminarCupon(${index})"><i class="fas fa-trash"></i> Eliminar</button>
        </td>
      `;
      tbody.appendChild(row);
    });
}

function eliminarCupon(index) {
  const cupones = JSON.parse(localStorage.getItem('cupones')) || [];

  Swal.fire({
    title: '¿Eliminar cupón?',
    text: `Código: ${cupones[index].codigo}`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#e53935',
    cancelButtonColor: '#9e9e9e'
  }).then((result) => {
    if (result.isConfirmed) {
      cupones.splice(index, 1);
      localStorage.setItem('cupones', JSON.stringify(cupones));
      Swal.fire({
        icon: 'success',
        title: 'Eliminado',
        text: 'El cupón ha sido eliminado.',
        confirmButtonColor: '#ec407a'
      });
      mostrarCupones();
    }
  });
}

function editarCupon(index) {
  const cupones = JSON.parse(localStorage.getItem('cupones')) || [];
  const cupon = cupones[index];

  Swal.fire({
    title: `Editar: ${cupon.codigo}`,
    html: `
      <select id="nuevoTipo" class="swal2-input">
        <option value="porcentaje" ${cupon.tipo === 'porcentaje' ? 'selected' : ''}>% Descuento</option>
        <option value="soles" ${cupon.tipo === 'soles' ? 'selected' : ''}>S/ Descuento fijo</option>
      </select>
      <input type="number" id="nuevoValor" class="swal2-input" value="${cupon.descuento}" min="0.01" step="any">
      <input type="date" id="nuevoVencimiento" class="swal2-input" value="${cupon.vencimiento}">
    `,
    showCancelButton: true,
    confirmButtonText: 'Guardar',
    cancelButtonText: 'Cancelar',
    confirmButtonColor: '#43a047',
    cancelButtonColor: '#9e9e9e',
    preConfirm: () => {
      const tipo = document.getElementById('nuevoTipo').value;
      const descuento = parseFloat(document.getElementById('nuevoValor').value);
      const vencimiento = document.getElementById('nuevoVencimiento').value;

      if (!descuento || isNaN(descuento) || descuento <= 0 || !vencimiento) {
        Swal.showValidationMessage('Completa todos los campos correctamente.');
        return false;
      }

      if (tipo === 'porcentaje' && (descuento <= 0 || descuento > 100)) {
        Swal.showValidationMessage('El porcentaje debe estar entre 1 y 100.');
        return false;
      }

      return { tipo, descuento, vencimiento };
    }
  }).then(result => {
    if (result.isConfirmed) {
      const { tipo, descuento, vencimiento } = result.value;

      cupon.tipo = tipo;
      cupon.descuento = descuento;
      cupon.vencimiento = vencimiento;

      localStorage.setItem('cupones', JSON.stringify(cupones));
      Swal.fire({
        icon: 'success',
        title: 'Actualizado',
        text: 'El cupón fue modificado correctamente.',
        confirmButtonColor: '#ec407a'
      });
      mostrarCupones();
    }
  });
}
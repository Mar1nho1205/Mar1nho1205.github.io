const checkboxes = document.querySelector('.check-atividade');

checkboxes.forEach(box => {
  box.addEventListener('change', () => {
     const selecionados = document.querySelectorAll('.check-atividade:checked').length;

  if (selecionados > 3) {
    box.checked = false;
    alert('Você só pode selecionar 3 atividades extracurriculares.')
  }
  });
});

const dddsValidos = [
    11, 12, 13, 14, 15, 16, 17, 18, 19, // SP
    21, 22, 24, // RJ
    27, 28, // ES
    31, 32, 33, 34, 35, 37, 38, // MG
    41, 42, 43, 44, 45, 46, // PR
    47, 48, 49, // SC
    51, 53, 54, 55, // RS
    61, // DF
    62, 64, // GO
    63, // TO
    65, 66, // MT
    67, // MS
    68, // AC
    69, // RO
    71, 73, 74, 75, 77, // BA
    79, // SE
    81, 87, // PE
    82, // AL
    83, // PB
    84, // RN
    85, 88, // CE
    86, 89, // PI
    91, 93, 94, // PA
    92, 97, // AM
    95, // RR
    96, // AP
    98, 99 // MA
];

const formulario = document.querySelector('form');

formulario.addEventListener('submit', (evento) => {
  evento.preventDefault();
  let formularioValido = true;

  const email = document.querySelector('#campo-email');
  if (!email.value.includes('@') || !email.value.includes('.')) {
    email.classList.add('campo-erro');
    formularioValido = false;
  }

  const inputDDD = document.querySelector('input[placeholder='DDD']');
  const dddDigitado = parseInt(inputDDD,value);

  if (!dddsValidos.includes(dddDigitado)) {
    alert('Erro: O DDD ' + dddDigitado + ' não existe no Brasil.');
    formularioValido = false;
  }

  const dia = document.querySelector('input[placeholder='Dia']').value;
  const mes = document.querySelector('input[placeholder='Mês']').value;
  const ano = document.querySelector('input[placeholder='Ano']').value;

  if (!validaDataReal(dia, mes, ano)) {
    alert('Erro; Data de nascimento inválida (Ex. 30 de Fevereiro -> Não existe).');
    formularioValido = false;
  }

  if (formularioValido) {
    alert('Sucesso! Formulário enviado para a secretaria.');
    formulario.submit();
  }
});

function validaDataReal(d, m, a) {
  const dia = parseInt(d);
  const mes = parseInt(m);
  const ano = parseInt(a);

  const dataTeste = new Date(ano, mes - 1, dia);

  if (dataTeste.getDate() !== dia ||
      dataTeste.getMonth() !== mes ||
      dataTeste.getFullYear() !== ano) {
    return false;
}

if (ano < 1900 || ano > 2025) return false;

return true;  
}

const inputs = document.querySelectorAll('input');
inputs.forEach(input => {
  input.addEventListener('focus', () => input.classList.remove('campo-erro'));
});

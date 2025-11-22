const form = document.getElementById('form-matricula');
const checksAtividades = document.querySelectorAll('.check-atv');
const dddsValidos = [11,12,13,14,15,16,17,18,19,21,22,24,27,28,31,32,33,34,35,37,38,41,42,43,44,45,46,47,48,49,51,53,54,55,61,62,64,63,65,66,67,68,69,71,73,74,75,77,79,81,87,82,83,84,85,88,86,89,91,93,94,92,97,95,96,98,99];

checksAtividades.forEach(check => {
  check.addEventListener('change', function() {
    const quantosMarcados = document.querySelectorAll('.check-atv:checked').length;
    if (quantosMarcados > 3) {
      this.checked = false;
      alert('Atenção: O limite é de 3 atividades extracurriculares.');
    }
  });
});

function mostrarErro(idElemento, idMensagem, mostrar) {
  const elemento = document.getElementById(idElemento);
  const msg = document.getElementById(idMensagem);

  if (!elemento || !msg) {
    console.error('ERRO DE CÓDIGO: ID não encontrado ->', idInput, idMensagem);
    return true;
  }

  if (mostrar) {
    elemento.classList.add('input-erro');
    msg.classList.add('ativo');
    return false;
  } else {
    elemento.classList.remove('input-erro');
    msg.classList.remove('ativo');
    return true;
  }
} 

form.addEventListener('submit', function(e) {
  e.preventDefault();
  let formularioValido = true;

  const validaNome = (idInput, idMsg) => {
    const elemento = document.getElementById(idInput);
    if(!elemento) return false;
    
    const valor = document.getElementById(idInput).value.trim();
    const termos = valor.split(/\s+/).filter(t => t.length > 0);

    const temErroNoNome = termos.length < 2;
    
    return mostrarErro(idInput, idMsg, termos.length < 2);
  };

  if (!validaNome('nomeAluno', 'erro-nomeAluno')) formularioValido = false;
  if (!validaNome('nomeMae', 'erro-nomeMae')) formularioValido = false;
  if (!validaNome('nomePai', 'erro-nomePai')) formularioValido = false; 

  const emailValor = document.getElementById('email').value;
  const emailValido = emailValor.includes('@') && emailValor.includes('.');
  if (!mostrarErro('email', 'erro-email', !emailValido)) formularioValido = false;

  const dia = parseInt(document.getElementById('nascDia').value);
  const mes = parseInt(document.getElementById('nascMes').value);
  const ano = parseInt(document.getElementById('nascAno').value);
  const msgData = document.getElementById('erro-data');

  const dataObj = new Date(ano, mes - 1, dia);
  const dataReal = (dataObj.getFullYear() === ano && (dataObj.getMonth() + 1) === mes && dataObj.getDate() === dia);

  if (!dataReal || ano < 1900 || ano > 2025) {
    document.getElementById('nascDia').classList.add('input-erro');
    document.getElementById('nascMes').classList.add('input-erro');
    document.getElementById('nascAno').classList.add('input-erro');
    msgData.classList.add('ativo');
    formularioValido = false;
  } else {
    document.getElementById('nascDia').classList.remove('input-erro');
    document.getElementById('nascMes').classList.remove('input-erro');
    document.getElementById('nascAno').classList.remove('input-erro');
    msgData.classList.remove('ativo');
  }

    const ddd = parseInt(document.getElementById('telDDD').value);
    const tel = document.getElementById('telNumero').value;
    const dddValido = dddsValidos.includes(ddd);
    const telPreenchido = tel.length >= 8;

    if (!mostrarErro('telNumero', 'erro-telefone', (!dddValido || !telPreenchido))) {
      document.getElementById('telDDD').classList.add('input-erro');
      formularioValido = false;
  } else {
      document.getElementById('telDDD').classList.remove('input-erro');
  }

    if (document.getElementById('serie').value === '') {
      mostrarErro('serie', 'erro-serie', true);
      formularioValido = false;
  } else {
      mostrarErro('serie', 'erro-serie', false);
  }

    const turnoMarcado = document.querySelector('input[name="turno"]:checked');
    const msgTurno = document.getElementById('erro-turno');
    if (!turnoMarcado) {
      msgTurno.classList.add('ativo');
      formularioValido = false;
  } else {
      msgTurno.classList.remove('ativo');
  }

    if (formularioValido) {
      document.getElementById('tela-formulario').style.display = 'none';
      document.getElementById('tela-sucesso').style.display = 'block';
  } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  } 
});

let listaGastos = [];

function adicionarGasto() {

  const inputCategoria = document.getElementById('categoria');
  const inputValor = document.getElementById('valor');
  const inputData = document.getElementById('data');

  const categoria = inputCategoria.value;
  const valor = inputValor.value;
  const data = inputData.value;

  if (categoria === "" || valor === "" || data === "") {
    alert('Preencha todos os campos.')
    return;
  }

  const valorNumero = parseFloat(valor) {
    if (valorNumero <= 0) {
      alert('Erro: o valor deve ser maior que 0.');
      inputValor.classList.add('erro-input');
      inputValoe.focus();
      return;
    } else {
      inputValor.classList.remove('erro-input');
    }
  }

  if (!dataEhValida(data)) {
    alert('Erro: Data inválida ou fora do período permitido (2000 a 2100).');
    inputData.classList.add('erro-input');
    return;
  } else {
    inputData.classList.remove('erro-input');
  }

  const novoGasto = {
    categoria: categoria,
    valor: parseFloat(valor),
    data: data
  };

  listaGastos.push(novoGasto);

  atualizarTabela();
  limparCampos();
}

function dataEhValida() {
  const partes = dataString.split('-');
  const ano = parseInt(partes[0]);
  const mes = parseInt(partes[1]);
  const dia = parseInt(partes[2]);

  if (ano < 2000 || ano > 2100) return false;

  const dataObj = new Date(ano, mes - 1, dia);
  if (dataObj.getFullYear() !== ano ||
     (dataObj.getMonth() + 1) !== mes ||
      dataObj.getDate() !== dia) {
    return false;
      }
  return true;
}

function limparCampos() {
  document.getElementById('valor').value = ''
  document.getElementById('data').value = ''
  document.getElementById('categoria').focus();
}

function atualizarTabela() {
  const tbody = document.getElementById('tabela-corpo');
  tbody.innerHTML = '';

  listaGastos.forEach(gasto => {
    const valorFormatado = gasto.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const dataFormatada = gasto.data.split('-').reverse().join('/');
    const linha = ` 
    <tr>
      <td>${gasto.categoria}</td>
      <td>${dataFormatada}</td>
      <td>${valorFormatado}</td>
    </tr>
    `;

    tbody.innerHTML += linha;
  });
}

function calcularResumo() {
  const areaResumo = document.getElementById('area-resumo');

  if (listaGastos.length === 0) {
    areaResumo.innerHTML = '<p>Nenhum gasto lançado ainda.</p>';
    return;
  }
  
  let htmlResumo = '<h3>Resumo</h3>';

  const totalGeral = listaGastos.reduce((acumulador, item) => acumulador + item.valor, 0);
  htmlResumo += `<p>Total: ${formatarMoeda(totalGeral)}</p>`;

  let totaisPorMes = {};

  listaGastos.forEach(gasto => {
    if (!gasto.data.includes('-')) return;

    const partesData = gasto.data.split('-');
    const mes = gasto.data.split('-')[1];

    if (!mes) return;

    if (!totaisPorMes[mes]) {
      totaisPorMes[mes] = 0;
    }

    totaisPorMes[mes] += gasto.valor
  });

  for (let mes in totaisPorMes) {
    htmlResumo += `<p>Total no Mês ${mes}: ${formatarMoeda(totaisPorMes[mes])}</p>`;
  }

  htmlResumo += '<hr>';

  let totaisPorCategoria = {};

  listaGastos.forEach(gasto => {
    const cat = gasto.categoria;
    if (!totaisPorCategoria[cat]) {
      totaisPorCategoria[cat] = 0;
    }
  totaisPorCategoria[cat] += gasto.valor;
  });

  for (let cat in totaisPorCategoria) {
    htmlResumo += `<p>Total de gastos com ${cat}: ${formatarMoeda(totaisPorCategoria[cat])}</p>`;
  }

  areaResumo.innerHTML = htmlResumo;
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

window.addEventListener('load', () => {

  const btnAdd = document.getElementById('btn-adicionar');
  const btnCalc = document.getElementById('btn-calcular');

  btnAdd.addEventListener('click', adicionarGasto);

  btnCalc.addEventListener('click', calcularResumo);
});

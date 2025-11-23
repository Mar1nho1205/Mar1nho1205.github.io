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

  const valorNumero = parseFloat(valor);

  if (valorNumero <= 0) {
    alert('Erro: o valor deve ser maior que 0.');
    inputValor.classList.add('erro-input');
    inputValor.focus();
    return;
  } else {
    inputValor.classList.remove('erro-input');
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

function dataEhValida(dataString) {
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(dataString)) {
    console.log('Erro: Formato inválido. Use DD/MM/AAAA.');
    return false;
  }

  const partesData = dataString.split('/');
  const dia = parseInt(partesData[0]);
  const mes = parseInt(partesData[1]);
  const ano = parseInt(partesData[2]);

  if (ano < 2000 || ano > 2100) return false;

  const dataObj = new Date(ano, mes - 1, dia);

  if (dataObj.getFullYear() !== ano ||
      dataObj.getMonth() + 1 !== mes ||
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
    const dataParaMostrar = gasto.data;
    const valorFormatado = gasto.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
    const linha = ` 
    <tr>
      <td>${gasto.categoria}</td>
      <td>${dataParaMostrar}</td>
      <td>${valorFormatado}</td>
    </tr>
    `;

    tbody.innerHTML += linha;
  });
}

function calcularResumo() {
  const areaResumo = document.getElementById('area-resumo');

  if (listaGastos.length === 0) {
    alert('Nenhum gasto registrado para calcular o resumo.');
    return;
  }

  let htmlResumo = `
    <button onclick="fecharResumo()" class="btn-fechar">X</button>
    <h2 style="text-align: center; color: #2942e7;">Resumo Financeiro</h2>
    <hr>
  `;

  const totalGeral = listaGastos.reduce((acumulador, item) => acumulador + item.valor, 0);
  htmlResumo += `<p>Total: ${formatarMoeda(totalGeral)}</p>`;

  let totaisPorMes = {};

  listaGastos.forEach(gasto => {
    if (!gasto.data.includes('/')) return;

    const mes = gasto.data.split('/')[1];

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

    areaResumo.innerHTML = htmlResumo;

    areaResumo.style.display = 'block';
  });

  for (let cat in totaisPorCategoria) {
    htmlResumo += `<p>Total de gastos com ${cat}: ${formatarMoeda(totaisPorCategoria[cat])}</p>`;
  }

  areaResumo.innerHTML = htmlResumo;
}

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function fecharResumo() {
  const areaResumo = document.getElementById('area-resumo');
  areaResumo.style.display = 'none';

  listaGastos = [];
  atualizarTabela();

  document.getElementById('categoria').value = "";
}

window.addEventListener('load', () => {

  const btnAdd = document.getElementById('btn-adicionar');
  const btnCalc = document.getElementById('btn-calcular');

  btnAdd.addEventListener('click', adicionarGasto);

  btnCalc.addEventListener('click', calcularResumo);
});

let listaGastos = [];

function adicionarGasto() {

  const categoria = document.getElementById('categoria').value;
  const valor = document.getElementById('valor').value;
  const data = document.getElementById('data').value;

  if (categoria === "" || valor === "" || data === "") {
    alert('Preencha todos os campos')
    return;
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
  let htmlResumo = '<h3>Resumo</h3>';

  const totalGeral = listaGastos.reduce((acumulador, item) => acumulador + item.valor, 0);
  htmlResumo += `<p>Total: ${formatarMoeda(totalGeral)}</p>`;

  let totaisPorMes = {};

  listaGastos.forEach(gasto => {
    const mes = gasto.data.split('-')[1];

    if (!totaisPorMes[mes]) {
      totaisPorMes[mes] = 0;
    }

    totaisPorMes[mes] += gasto.valor
  });

  for (let mes in totaisPorMes) {
    htmlResumo += `<p>Total no Mês ${mes}: ${formatarMoeda(totaisPorMes[mes])}</p>`;
  }

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

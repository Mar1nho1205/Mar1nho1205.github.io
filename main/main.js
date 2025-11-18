const listaRobos = [
  "img/robotron-azul.png",
  "img/robotron-amarelo.png",
  "img/robotron-branco.png",
  "img/robotron-preto.png",
  "img/robotron-rosa.png",
  "img/robotron-vermelho.png"
];

const roboImg = document.querySelector(".robo")
const btnAnterior = document.querySelector("#robo-anterior");
const btnProximo = document.querySelector("#robo-proximo");

let roboAtual = 0;

function trocarRobo(direcao) {
  if (direcao === "proximo") {
    roboAtual++;

    if (direcao >= listaRobos.length) {
      roboAtual = 0;
    }
  
  } else if (direcao === "anterior") {
    roboAtual--;

    if (roboAtual < 0) {
      roboAtual = listaRobos.length - 1;
    }
  }

  roboImg.src = listaRobos[roboAtual];
}

btnProximo.addEventListener("click", () => {
  trocarRobo("proximo");
});

btnAnterior.addEventListener("click", () => {
  trocarRobo("anterior");
});                            

const controles = document.querySelectorAll("[data-controle]");
const estatisticas = document.querySelectorAll("[data-estatistica]");

const pecas = {
    "bracos": {
        "forca": 0,
        "poder": 0,
        "energia": 0,
        "velocidade": 0
    },
    "blindagem": {
        "forca": 0,
        "poder": 0,
        "energia": 0,
        "velocidade": 0
    },
    "nucleos": {
        "forca": 0,
        "poder": 0,
        "energia": 0,
        "velocidade": 0
    },
    "pernas": {
        "forca": 0,
        "poder": 0,
        "energia": 0,
        "velocidade": 0
    },
    "foguetes": {
        "forca": 0,
        "poder": 0,
        "energia": 0,
        "velocidade": 0
    }
}

controles.forEach( (elemento) => {
  elemento.addEventListener("click", (evento) => {

    const operacao = evento.target.dataset.controle;
    const controlePai = evento.target.parentNode;
    const peca = evento.target.dataset.peca;

    manipulaDados(operacao, controlePai, peca);
  })
})

function manipulaDados(operacao, controle, peca) {
  const pecaContador = controle.querySelector('[data-contador]');
  let valorAtual = parseInt(pecaContador.value);

if (operacao === '-') {
  
   if (valorAtual > 0) {
    valorAtual = valorAtual - 1;
    pecaContador.value = formatarValor(valorAtual)
    atualizaEstatisticas(peca, '-'); 
  }
} else {

  if (valorAtual < 10) {
    valorAtual = valorAtual + 1;
    pecaContador.value = formatarValor(valorAtual);
    atualizaEstatisticas(peca, '+');
  }
}
  
function atualizaEstatisticas (peca, operacao) {
  estatisticas.forEach( (elemento) => {
    const item = elemento.dataset.estatistica;
    const valorAtual = parseInt(elemento.textContent);
    const valorDaPeca = pecas[peca][item];

    if (operacao === '+') {
      elemenot.textContent = valorAtual + valorDaPeca;
    } else {
      elemento.textContent = valorAtual - valorDaPeca;
    }
  } )
}

function formatarValor(valor) {
  if (valor < 10) {
    return '0' + valor;
  }
  return valor;
}  
}




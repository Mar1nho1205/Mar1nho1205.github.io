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
      roboAtual = listaRobos.length - 1
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






let listaGastos = [];

function adicionarGasto() {

  const categoria = document.getElementById(categoria).value;
  const valor = document.getElementById('valor').value;
  const data = document.getElementById('data').value;

  if (categoria === "" || valor === "" || data === "") {
    alert('Preencha todos os campos')
    return;
  }
}

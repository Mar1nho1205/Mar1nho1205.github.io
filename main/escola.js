const inputEmail = document.querySelector('#campo-email');
cont msgErro = document.querySelector('#msg-email');

inputEmail.addEventListener('blur', function() {
  const valor = inputEmail.value;

  if (valor.includes('@') && valor.includes('.')) {
    inputEmail.classList.remove('campo-erro');
    msgErro.style.display = 'none';
  } else {
    if(valor.lenght > 0) {
      inputEmail.classList.add('campo-erro');
      msgErro.style.display = 'block';
    }
  }
});

inputEmail.addEventListener('focus', function () {
  inputEmail.classList.remove('campo-erro');
  msgErro.style.display = 'none'
});

if (obterToken() !== null) {
  direcionarTelaDeBusca();
}

const btnEntrar = document.querySelector("#btn-entrar");
const btnCadastrar = document.querySelector("#btn-cadastrar");
const email = document.querySelector("#email");
const labelEmail = document.querySelector("#labelEmail");
const fieldEmail = document.querySelector("#fieldEmail");

const senha = document.querySelector("#senha");
const labelSenha = document.querySelector("#labelSenha");
const fieldSenha = document.querySelector("#fieldSenha");

const msgError = document.querySelector("#msgError");
const msgSuccess = document.querySelector("#msgSuccess");

const verSenhaLogin = document.querySelector("#olhoLogin");

email.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnEntrar.setAttribute("style", "transform: scale(1.05); opacity: 0.9;");
    btnEntrar.click();
    setTimeout(() => {
      btnEntrar.setAttribute("style", "transform: none; opacity: none;");
    }, 100);
  }
});

senha.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnEntrar.setAttribute("style", "transform: scale(1.05); opacity: 0.9;");
    btnEntrar.click();
    setTimeout(() => {
      btnEntrar.setAttribute("style", "transform: none; opacity: none;");
    }, 100);
  }
});

btnEntrar.addEventListener("click", () => {
  let permissao = false;
  let listaUser = [];

  listaUser = JSON.parse(localStorage.getItem("listaUser"));

  if (listaUser != null) {
    listaUser.forEach((item) => {
      if (email.value == item.emailCad && senha.value == item.senhaCad) {
        permissao = true;
      }
    });
  }

  if (permissao) {
    msgError.setAttribute("style", "display: none");
    labelEmail.setAttribute("style", "color: green");
    fieldEmail.setAttribute("style", "border-color: green");
    labelSenha.setAttribute("style", "color: green");
    fieldSenha.setAttribute("style", "border-color: green");
    msgSuccess.setAttribute("style", "display: block");
    let token = "g6aagjnp";
    salvarToken(token);
    setTimeout(() => {
      direcionarTelaDeBusca();
    }, 1000);
  } else {
    msgSuccess.setAttribute("style", "display: none");
    labelEmail.setAttribute("style", "color: red");
    fieldEmail.setAttribute("style", "border-color: red");
    labelSenha.setAttribute("style", "color: red");
    fieldSenha.setAttribute("style", "border-color: red");
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "<h6>Email ou Senha inválidos</h6>";
    email.focus();
  }
});

btnCadastrar.addEventListener("click", () => {
  direcionarTelaDeCadastro();
});

verSenhaLogin.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");
  if (inputSenha.getAttribute("type") == "password") {
    verSenhaLogin.classList.remove("fa-eye-slash");
    verSenhaLogin.classList.add("fa-eye");
    inputSenha.setAttribute("type", "text");
  } else {
    verSenhaLogin.classList.remove("fa-eye");
    verSenhaLogin.classList.add("fa-eye-slash");
    inputSenha.setAttribute("type", "password");
  }
});

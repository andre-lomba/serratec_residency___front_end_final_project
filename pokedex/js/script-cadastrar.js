if (obterToken() !== null) {
  direcionarTelaDeBusca();
}

const btnCadastrar = document.querySelector("#btn-cadastrar");
const verSenhaConfirm = document.querySelector("#olhoConfirm");
const verSenhaCadastro = document.querySelector("#olhoCadastrar");

const nome = document.querySelector("#nome");
const labelNome = document.querySelector("#labelNome");
const fieldNome = document.querySelector("#fieldNome");
let validNome = false;

const email = document.querySelector("#email");
const labelEmail = document.querySelector("#labelEmail");
const fieldEmail = document.querySelector("#fieldEmail");
let validEmail = false;

const senha = document.querySelector("#senha");
const labelSenha = document.querySelector("#labelSenha");
const fieldSenha = document.querySelector("#fieldSenha");
let validSenha = false;

const confirmSenha = document.querySelector("#confirmSenha");
const labelConfirmSenha = document.querySelector("#labelConfirmSenha");
const fieldConfirmSenha = document.querySelector("#fieldConfirmSenha");
let validConfirmSenha = false;

const msgSuccess = document.querySelector("#msgSuccess");
const msgError = document.querySelector("#msgError");

const voltar = document.querySelector("#voltar");

voltar.addEventListener("click", () => {
  direcionarTelaDeLogin();
});

nome.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnCadastrar.setAttribute("style", "transform: scale(1.05); opacity: 0.9;");
    btnCadastrar.click();
    setTimeout(() => {
      btnCadastrar.setAttribute("style", "transform: none; opacity: none;");
    }, 100);
  }
});

email.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnCadastrar.setAttribute("style", "transform: scale(1.05); opacity: 0.9;");
    btnCadastrar.click();
    setTimeout(() => {
      btnCadastrar.setAttribute("style", "transform: none; opacity: none;");
    }, 100);
  }
});

senha.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnCadastrar.setAttribute("style", "transform: scale(1.05); opacity: 0.9;");
    btnCadastrar.click();
    setTimeout(() => {
      btnCadastrar.setAttribute("style", "transform: none; opacity: none;");
    }, 100);
  }
});

confirmSenha.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnCadastrar.setAttribute("style", "transform: scale(1.05); opacity: 0.9;");
    btnCadastrar.click();
    setTimeout(() => {
      btnCadastrar.setAttribute("style", "transform: none; opacity: none;");
    }, 100);
  }
});

nome.addEventListener("keyup", () => {
  if (nome.value.length <= 2) {
    labelNome.setAttribute("style", "color: red");
    labelNome.innerHTML = "Nome <h6>*No mínimo 3 caracteres.</h6>";
    fieldNome.setAttribute("style", "border-color: red");
    validNome = false;
  } else {
    labelNome.setAttribute("style", "color: green");
    labelNome.innerHTML = "Nome";
    fieldNome.setAttribute("style", "border-color: green");
    validNome = true;
  }
});

email.addEventListener("keyup", () => {
  if (email.value.length <= 5) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerHTML = "Email <h6>*No mínimo 6 caracteres.</h6>";
    fieldEmail.setAttribute("style", "border-color: red");
    validEmail = false;
  } else if (!email.value.includes("@")) {
    labelEmail.setAttribute("style", "color: red");
    labelEmail.innerHTML = "Email <h6>*Deve conter '@'</h6>";
    fieldEmail.setAttribute("style", "border-color: red");
    validEmail = false;
  } else {
    labelEmail.setAttribute("style", "color: green");
    labelEmail.innerHTML = "Email";
    fieldEmail.setAttribute("style", "border-color: green");
    validEmail = true;
  }
});

senha.addEventListener("keyup", () => {
  if (senha.value.length <= 5) {
    labelSenha.setAttribute("style", "color: red");
    labelSenha.innerHTML = "Senha <h6>*No mínimo 6 caracteres.</h6>";
    fieldSenha.setAttribute("style", "border-color: red");
    validSenha = false;
  } else {
    labelSenha.setAttribute("style", "color: green");
    labelSenha.innerHTML = "Senha";
    fieldSenha.setAttribute("style", "border-color: green");
    validSenha = true;
  }
});

confirmSenha.addEventListener("keyup", () => {
  if (senha.value != confirmSenha.value) {
    labelConfirmSenha.setAttribute("style", "color: red");
    labelConfirmSenha.innerHTML =
      "Confirmar Senha <h6>*Senhas diferentes.</h6>";
    fieldConfirmSenha.setAttribute("style", "border-color: red");
    validConfirmSenha = false;
  } else {
    labelConfirmSenha.setAttribute("style", "color: green");
    labelConfirmSenha.innerHTML = "Confirmar Senha";
    fieldConfirmSenha.setAttribute("style", "border-color: green");
    validConfirmSenha = true;
  }
});

btnCadastrar.addEventListener("click", () => {
  if (validNome && validEmail && validSenha && validConfirmSenha) {
    let listaCad = JSON.parse(localStorage.getItem("listaUser"));
    let listaUser = JSON.parse(localStorage.getItem("listaUser") || "[]");

    listaUser.push({
      nomeCad: nome.value,
      emailCad: email.value,
      senhaCad: senha.value,
    });

    let achou = false;

    if (listaCad != null) {
      listaCad.forEach((item) => {
        if (email.value == item.emailCad) {
          achou = true;
          msgSuccess.setAttribute("style", "display: none");
          msgError.setAttribute("style", "display: block");
          msgError.innerHTML = "<h6>Email já cadastrado!</h6>";
          labelEmail.setAttribute("style", "color: red");
          fieldEmail.setAttribute("style", "border-color: red");
        }
      });

      if (!achou) {
        localStorage.setItem("listaUser", JSON.stringify(listaUser));

        msgError.setAttribute("style", "display: none");
        msgSuccess.setAttribute("style", "display: block");

        setTimeout(() => {
          direcionarTelaDeLogin();
        }, 1000);
      }
    } else {
      localStorage.setItem("listaUser", JSON.stringify(listaUser));

      msgError.setAttribute("style", "display: none");
      msgSuccess.setAttribute("style", "display: block");
      setTimeout(() => {
        direcionarTelaDeLogin();
      }, 1000);
    }
  } else {
    msgSuccess.setAttribute("style", "display: none");
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "<h6>Verifique se os campos estão válidos!</h6>";
  }
});

verSenhaCadastro.addEventListener("click", () => {
  let inputSenha = document.querySelector("#senha");
  if (inputSenha.getAttribute("type") == "password") {
    verSenhaCadastro.classList.remove("fa-eye-slash");
    verSenhaCadastro.classList.add("fa-eye");
    inputSenha.setAttribute("type", "text");
  } else {
    verSenhaCadastro.classList.remove("fa-eye");
    verSenhaCadastro.classList.add("fa-eye-slash");
    inputSenha.setAttribute("type", "password");
  }
});

verSenhaConfirm.addEventListener("click", () => {
  let inputSenha = document.querySelector("#confirmSenha");
  if (inputSenha.getAttribute("type") == "password") {
    verSenhaConfirm.classList.remove("fa-eye-slash");
    verSenhaConfirm.classList.add("fa-eye");
    inputSenha.setAttribute("type", "text");
  } else {
    verSenhaConfirm.classList.remove("fa-eye");
    verSenhaConfirm.classList.add("fa-eye-slash");
    inputSenha.setAttribute("type", "password");
  }
});

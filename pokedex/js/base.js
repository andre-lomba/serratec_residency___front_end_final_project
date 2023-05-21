const URL_BASE = " https://pokeapi.co/api/v2/pokemon/";

function salvarToken(token) {
  localStorage.setItem("token", JSON.stringify(token));
}

function obterToken() {
  return localStorage.getItem("token");
}

function sair() {
  localStorage.removeItem("token");
  direcionarTelaDeLogin();
}

function direcionarTelaDeCadastro() {
  window.open("cadastrar.html", "_self");
}

function direcionarTelaDeLogin() {
  window.open("login.html", "_self");
}

function direcionarTelaDeBusca() {
  window.open("busca.html", "_self");
}

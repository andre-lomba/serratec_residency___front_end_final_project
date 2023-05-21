const mode = document.getElementById("mode_icon");
const body = document.getElementById("body");
const formLog = document.getElementsByName("login-form");
const formCad = document.getElementsByName("cadastro-form");
const formBus = document.getElementsByName("buscar-form");
let modo = JSON.parse(localStorage.getItem("modo") || "[]");

if (modo == "") {
  modo = "light";
  localStorage.setItem("modo", JSON.stringify(modo));
} else if (modo == "light") {
  modo = "light";
  localStorage.setItem("modo", JSON.stringify(modo));
} else {
  modo = "dark";
  localStorage.setItem("modo", JSON.stringify(modo));
  mudaModoDark();
}

mode.addEventListener("click", () => {
  if (modo == "light") {
    mudaModoDark();
  } else {
    mudaModoLight();
  }
});

function mudaModoDark() {
  body.classList.toggle("dark");
  formLog.forEach((element) => {
    element.classList.toggle("dark");
  });
  formCad.forEach((element) => {
    element.classList.toggle("dark");
  });
  formBus.forEach((element) => {
    element.classList.toggle("dark");
  });

  modo = "dark";
  localStorage.setItem("modo", JSON.stringify(modo));
}

function mudaModoLight() {
  body.classList.toggle("dark");
  formLog.forEach((element) => {
    element.classList.toggle("dark");
  });
  formCad.forEach((element) => {
    element.classList.toggle("dark");
  });
  formBus.forEach((element) => {
    element.classList.toggle("dark");
  });

  modo = "light";
  localStorage.setItem("modo", JSON.stringify(modo));
}

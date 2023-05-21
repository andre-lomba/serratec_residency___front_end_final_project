if (obterToken() == null) {
  direcionarTelaDeLogin();
}

const typeColors = {
  rock: "(182, 158,  49)",
  ghost: "(112,  85, 155)",
  steel: "(183, 185, 208)",
  water: "(100, 147, 235)",
  grass: "(116, 203,  72)",
  psychic: "(251,  85, 132)",
  ice: "(154, 214, 223)",
  dark: "(117,  87,  76)",
  fairy: "(230, 158, 172)",
  normal: "(170, 166, 127)",
  fighting: "(193,  34,  57)",
  flying: "(168, 145, 236)",
  poison: "(164,  62, 158)",
  ground: "(222, 193, 107)",
  bug: "(167, 183,  35)",
  fire: "(245, 125,  49)",
  electric: "(249, 207,  48)",
  dragon: "(112,  55, 255)",
};

let allPokemon = [];
let pokemon;
const btnAnterior = document.getElementById("btn-anterior");
const btnProximo = document.getElementById("btn-proximo");
const btnSair = document.querySelector("#btn-sair");
const btnProcurar = document.querySelector("#btn-procurar");
const input = document.querySelector("#input");
const inputPesquisar = document.querySelector(".input_pesquisar");
const msgError = document.querySelector("#msgError");
const msgSuccess = document.querySelector("#msgSuccess");
const atributos = document.querySelector("#atributos");
const imagem = document.querySelector("#imagem");
const id = document.querySelector("#id");
const nome = document.querySelector("#nome");
const tipo = document.querySelector("#tipo");
const altura = document.querySelector("#altura");
const peso = document.querySelector("#peso");

inputPesquisar.setAttribute("style", "display: none");
msgSuccess.setAttribute("style", "display: block");

for (let i = 1; i < 1011; i++) {
  fetch(URL_BASE + i)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let pokemon = data;
      allPokemon.push(pokemon);
    })
    .catch(function () {
      console.log("Falha na resposta da API.");
    });
}

setTimeout(() => {
  msgSuccess.setAttribute("style", "display: none");
  inputPesquisar.setAttribute("style", "display: flex");
  exibirNaTela(1);
}, 2000);

function exibirNaTela(index) {
  let achou = false;
  input.value = "";

  allPokemon.forEach((poke) => {
    if (poke.id == index || poke.name == index) {
      pokemon = poke;
      achou = true;
      return false;
    }
  });

  if (achou) {
    let pokemonObj = new Pokemon();

    pokemonObj.id = pokemon.id;
    pokemonObj.nome = pokemon.name;
    pokemonObj.altura = converterDc(pokemon.height);
    pokemonObj.peso = converterEg(pokemon.weight);
    pokemonObj.tipo = pokemon.types.map((item) => item.type.name).toString();
    pokemonObj.imagem = pokemon.sprites.front_default;

    pokemonObj.nome =
      pokemonObj.nome[0].toUpperCase() + pokemonObj.nome.substr(1);

    let tipoArray = pokemonObj.tipo.split(",");

    if (tipoArray.length < 2) {
      pokemonObj.tipo = tipoArray;
    } else {
      let arrayNovo = [];
      tipoArray.forEach((element) => {
        arrayNovo.push(element);
      });
      pokemonObj.tipo = arrayNovo;
    }
    let color;

    atributos.setAttribute("style", "display: flex");
    imagem.setAttribute("src", `${pokemonObj.imagem}`);
    setTimeout(() => {
      id.innerHTML = `<h5>#${pokemonObj.id}</h5>`;
      nome.innerHTML = `<h5>${pokemonObj.nome}</h5>`;
      if (Array.isArray(pokemonObj.tipo)) {
        tipo.innerHTML = "";
        pokemonObj.tipo.forEach((type) => {
          color = typeColors[type];
          tipo.innerHTML += `<h5 style="background-color: rgb${color}">${type}</h5>`;
        });
      } else {
        color = typeColors[pokemonObj.tipo];
        tipo.innerHTML = `<h5 style="background-color: rgb${color}">${pokemonObj.tipo}</h5>`;
      }
      altura.innerHTML = `<h5>Height: ${pokemonObj.altura}cm</h5>`;
      peso.innerHTML = `<h5>Weight: ${pokemonObj.peso}kg</h5>`;
    }, 150);

    if (pokemon.id == 1) {
      btnAnterior.disabled = true;
      btnProximo.disabled = false;
    } else if (pokemon.id == 1010){
      btnAnterior.disabled = false;
      btnProximo.disabled = true;
    } else {
      btnAnterior.disabled = false;
      btnProximo.disabled = false;
    }
  }
}

btnProcurar.addEventListener("click", () => {
  let achou = false;
  let pesquisa = input.value.trim();

  if (pesquisa != "") {
    let pesquisaFormat = pesquisa.substr(0).toLowerCase();

    allPokemon.forEach((poke) => {
      if (poke.id == pesquisaFormat || poke.name == pesquisaFormat) {
        console.log(poke.id + " " + poke.name);
        achou = true;
      }
    });

    if (achou) {
      exibirNaTela(pesquisaFormat);
    } else {
      msgError.setAttribute("style", "display: block");
      msgError.innerHTML = "<h6>Digite um Pokémon válido</h6>";
    }
  } else {
    msgError.setAttribute("style", "display: block");
    msgError.innerHTML = "<h6>Digite algum valor</h6>";
  }
});

document.onkeydown = function (evt) {
  evt = evt || window.event;
  if (evt.keyCode == 37) {
    if (pokemon.id > 0) {
      btnAnterior.click();
    }
  } else if (evt.keyCode == 39) {
    if (pokemon.id < 1011) {
      btnProximo.click();
    }
  }
};

input.addEventListener("focus", function () {
  btnProcurar.focus();
});

input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    btnProcurar.setAttribute(
      "style",
      "opacity: 0.5; transform: scale(1.1); border: 1px solid rgba(143, 143, 143, 0.432);"
    );
    btnProcurar.click();
    setTimeout(() => {
      btnProcurar.setAttribute(
        "style",
        "opacity: none; transform: none; border: none"
      );
    }, 100);
  }
});

btnSair.addEventListener("click", () => {
  sair();
});

btnAnterior.addEventListener("click", () => {
  let novoId = pokemon.id - 1;
  exibirNaTela(novoId);
});

btnProximo.addEventListener("click", () => {
  let novoId = pokemon.id + 1;
  exibirNaTela(novoId);
});

function converterEg(eg) {
  let kg = eg * 0.1;
  return Math.round(kg);
}

function converterDc(dc) {
  let cm = dc * 10;
  return cm;
}

function hasWhiteSpace(s) {
  return s.indexOf(" ") >= 0;
}

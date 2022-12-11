// ---------------------- função botão-sortear ----------------------//
function sortear() {
  console.log("sorteando...");
  hidden(); //esconde a mensagem de erro
  const error = document.querySelector(".msg-erro span"); //seleciona a div de erro

  removeList(); //remove os itens li da lista antes de inserir os novos

  const param = getParam(); //pega os parâmetro informados pelo usuário

  if (validation()) {
    const rnd = aleatorio(param.qtd, param.min, param.max); //executa a função de sorteio
    let i = 0;
    rnd.forEach(() => {
      const resultado = document.querySelector("ul"); //seleciono o elemento ul
      const li = document.createElement("li"); //cria o elemento de lista li
      li.textContent = rnd[i]; //atribui ao conteúdo de li o número sorteado
      resultado.appendChild(li); //insere o item li na ul
      i++;
    });
  } else {
    error.textContent = msg; //atribui o valor ao span da div
    show();
  }
}

// ---------------------- função que sorteia números sem repetição ----------------------//
function aleatorio(qtd, min, max) {
  let tempList = [];
  let groupList = [];

  // cria a lista com os possíveis números a serem sorteados [..., 3,4,5, ....]
  for (let i = min; i <= max; i++) {
    tempList.push(i);
  }
  for (let i = 0; i < qtd; i++) {
    let index = Math.floor(Math.random() * tempList.length); //sorteia um índice da lista
    groupList.push(tempList[index]);
    tempList.splice(index, 1); //remove um elemento começando na posição index
  }
  // console.log(groupList);
  return groupList;
}

// ---------------------- função para pegar parâmetros do form ----------------------//
function getParam() {
  const param = {
    qtd: parseInt(document.querySelector("#quantidade").value),
    min: parseInt(document.querySelector("#min").value),
    max: parseInt(document.querySelector("#max").value),
  };
  return param;
}

// ---------------------- remove lista de números sorteados do DOM ----------------------//
function removeList() {
  elementos = document.querySelectorAll(".resultado li");
  elementos.forEach((element) => {
    element.remove();
  });
}
// ---------------------- aplica a classe hidden/esconder elemento ----------------------//
function hidden() {
  elemento = document.querySelector(".msg-erro");
  console.log(elemento);
  elemento.classList.add("hidden");
}

function show() {
  elemento = document.querySelector(".msg-erro");
  elemento.classList.remove("hidden");
}

// ---------------------- função de validação ----------------------//

function validation() {
  console.log("validando....");
  const param = getParam();
  // console.log(param);
  msg = "";
  if (!param.qtd || !param.min || !param.max) {
    msg = "Preencha todos os campos.";
    return false;
  }
  if (param.min < 0 || param.max < 0) {
    msg = "Os valores devem ser maiores que zero.";
    return false;
  }
  if (param.min >= param.max) {
    msg = "Escolha um intervalo válido.";
    return false;
  }
  if (param.qtd > param.max - param.min) {
    msg =
      "A quantidade de números sorteados não pode ser maior que o intervalo escolhido.";
    return false;
  }

  return true;
}

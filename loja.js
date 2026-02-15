let total = 0;
let carrinho = {};

// ADICIONAR
function adicionar(nome, preco, botao) {

  if (!carrinho[nome]) {
    carrinho[nome] = { preco: preco, quantidade: 0 };
  }

  carrinho[nome].quantidade++;
  total += preco;

  tocarSom();
  animarCard(botao);
  animarTotal();

  atualizarCarrinho();
}

// REMOVER
function remover(nome, preco) {

  if (carrinho[nome] && carrinho[nome].quantidade > 0) {

    carrinho[nome].quantidade--;
    total -= preco;

    tocarSomRemover();
    animarTotal();

    if (carrinho[nome].quantidade === 0) {
      delete carrinho[nome];
    }

    atualizarCarrinho();
  }
}


// ATUALIZAR CARRINHO
function atualizarCarrinho() {
  const lista = document.getElementById("lista");
  const totalEl = document.getElementById("total");

  lista.innerHTML = "";

  for (let nome in carrinho) {
    const item = carrinho[nome];

    const li = document.createElement("li");
    li.innerText = `${nome} (x${item.quantidade}) - R$ ${item.preco * item.quantidade}`;
    lista.appendChild(li);
  }

  totalEl.innerText = total;
}

// ANIMAÇÃO CARD
function animarCard(botao) {
  if (!botao) return;

  const card = botao.closest(".card");
  if (!card) return;

  card.classList.add("animar");

  setTimeout(() => {
    card.classList.remove("animar");
  }, 300);
}

// ANIMAÇÃO TOTAL
function animarTotal() {
  const totalEl = document.getElementById("total");

  totalEl.classList.add("animar-total");

  setTimeout(() => {
    totalEl.classList.remove("animar-total");
  }, 300);
}

// SOM
function tocarSom() {
  const som = document.getElementById("somAdd");
  if (!som) return;

  som.currentTime = 0;
  som.play().catch(() => {});
}

function tocarSomRemover() {
  const som = document.getElementById("somRemove");
  if (!som) return;

  som.currentTime = 0;
  som.play().catch(() => {});
}

function tocarSomVoltar() {
  const som = document.getElementById("somVoltar");
  if (!som) return;

  som.currentTime = 0;
  som.play().catch(() => {});
}


function voltar() {
  tocarSomVoltar();

  setTimeout(() => {
    window.location.href = "Inicio.html";
  }, 200); // pequeno delay para o som tocar
}
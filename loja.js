let total = 0;
let carrinho = {};

function adicionar(nome, preco, botao) {

  if (!carrinho[nome]) {
    carrinho[nome] = { preco: preco, quantidade: 0 };
  }

  carrinho[nome].quantidade++;
  total += preco;

  animarCard(botao);
  animarTotal();

  atualizarCarrinho();
}


function remover(nome, preco) {

  if (carrinho[nome] && carrinho[nome].quantidade > 0) {
    carrinho[nome].quantidade--;
    total -= preco;

    if (carrinho[nome].quantidade === 0) {
      delete carrinho[nome];
    }

    atualizarCarrinho();
  }
}

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

function enviarPedido() {
  if (Object.keys(carrinho).length === 0) {
    alert("Adicione produtos primeiro!");
    return;
  }

  let mensagem = "Pedido DX3:%0A";

  for (let nome in carrinho) {
    const item = carrinho[nome];
    mensagem += `- ${nome} x${item.quantidade} R$${item.preco * item.quantidade}%0A`;
  }

  mensagem += `%0ATotal: R$ ${total}`;

  window.open("https://wa.me/5564974008793?text=" + mensagem);
}

function animarCard(botao) {
  const card = botao.closest(".card");
  card.classList.add("animar");

  setTimeout(() => {
    card.classList.remove("animar");
  }, 300);
}

function animarTotal() {
  const totalEl = document.getElementById("total");
  totalEl.classList.add("animar-total");

  setTimeout(() => {
    totalEl.classList.remove("animar-total");
  }, 300);
}


/* Botão Sair da Loja  */
function voltar() {
  window.location.href = "Inicio.html";

}


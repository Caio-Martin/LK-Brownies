// Link de pedido no WhatsApp, no formato oficial wa.me/<número>, que
// garante o preenchimento automático da mensagem do pedido.
const CART_WHATSAPP_LINK = 'https://wa.me/5511966349004';

const CART_STORAGE_KEY = 'lkBrowniesCarrinho';

let carrinho = carregarCarrinho();

function carregarCarrinho() {
  try {
    const salvo = JSON.parse(localStorage.getItem(CART_STORAGE_KEY));
    return Array.isArray(salvo) ? salvo : [];
  } catch {
    return [];
  }
}

function salvarCarrinho() {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(carrinho));
}

function adicionarAoCarrinho(nome, quantidade) {
  const item = carrinho.find(i => i.nome === nome);
  if (item) {
    item.quantidade += quantidade;
  } else {
    carrinho.push({ nome, quantidade });
  }
  salvarCarrinho();
  renderizarCarrinho();
}

function alterarQuantidade(nome, delta) {
  const item = carrinho.find(i => i.nome === nome);
  if (!item) return;
  item.quantidade += delta;
  if (item.quantidade <= 0) {
    carrinho = carrinho.filter(i => i.nome !== nome);
  }
  salvarCarrinho();
  renderizarCarrinho();
}

function removerItem(nome) {
  carrinho = carrinho.filter(i => i.nome !== nome);
  salvarCarrinho();
  renderizarCarrinho();
}

function totalItens() {
  return carrinho.reduce((total, i) => total + i.quantidade, 0);
}

function renderizarCarrinho() {
  const lista = document.getElementById('cartItems');
  const vazio = document.getElementById('cartEmpty');
  const contador = document.getElementById('cartCount');
  const botaoEnviar = document.getElementById('cartSend');

  lista.querySelectorAll('.cart-item').forEach(el => el.remove());

  if (carrinho.length === 0) {
    vazio.hidden = false;
  } else {
    vazio.hidden = true;
    carrinho.forEach(item => {
      const linha = document.createElement('div');
      linha.className = 'cart-item';
      linha.dataset.nome = item.nome;
      linha.innerHTML = `
        <span class="cart-item-nome">${item.nome}</span>
        <div class="cart-item-actions">
          <button type="button" class="qty-btn" data-cart-dec aria-label="Diminuir quantidade">&minus;</button>
          <span class="qty-value">${item.quantidade}</span>
          <button type="button" class="qty-btn" data-cart-inc aria-label="Aumentar quantidade">+</button>
          <button type="button" class="cart-item-remove" data-cart-remove aria-label="Remover item">🗑</button>
        </div>
      `;
      lista.appendChild(linha);
    });
  }

  const total = totalItens();
  contador.textContent = total;
  contador.hidden = total === 0;
  botaoEnviar.disabled = total === 0;
}

function montarMensagem() {
  const linhas = carrinho.map(i => `• ${i.quantidade}x ${i.nome}`);
  const obs = document.getElementById('cartObs').value.trim();

  let mensagem = 'Olá! Gostaria de fazer o seguinte pedido:\n\n' + linhas.join('\n');
  if (obs) {
    mensagem += `\n\nObservações: ${obs}`;
  }
  mensagem += '\n\nAguardo retorno, obrigado(a)!';
  return mensagem;
}

function avisarItemAdicionado() {
  const botao = document.getElementById('cartToggle');
  botao.classList.remove('cart-btn-bump');
  void botao.offsetWidth;
  botao.classList.add('cart-btn-bump');
}

function abrirCarrinho() {
  document.getElementById('cartDrawer').classList.add('is-open');
  document.getElementById('cartOverlay').hidden = false;
  requestAnimationFrame(() => document.getElementById('cartOverlay').classList.add('is-open'));
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'false');
}

function fecharCarrinho() {
  document.getElementById('cartDrawer').classList.remove('is-open');
  document.getElementById('cartOverlay').classList.remove('is-open');
  document.getElementById('cartDrawer').setAttribute('aria-hidden', 'true');
  setTimeout(() => {
    if (!document.getElementById('cartOverlay').classList.contains('is-open')) {
      document.getElementById('cartOverlay').hidden = true;
    }
  }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
  renderizarCarrinho();

  document.querySelectorAll('.product-card').forEach(card => {
    const nome = card.dataset.produto;
    const valorQtd = card.querySelector('[data-qty-value]');
    let quantidade = 1;

    card.querySelector('[data-qty-inc]').addEventListener('click', () => {
      quantidade += 1;
      valorQtd.textContent = quantidade;
    });

    card.querySelector('[data-qty-dec]').addEventListener('click', () => {
      if (quantidade > 1) {
        quantidade -= 1;
        valorQtd.textContent = quantidade;
      }
    });

    card.querySelector('[data-add-cart]').addEventListener('click', () => {
      adicionarAoCarrinho(nome, quantidade);
      quantidade = 1;
      valorQtd.textContent = quantidade;
      avisarItemAdicionado();
    });
  });

  document.getElementById('cartToggle').addEventListener('click', abrirCarrinho);
  document.getElementById('cartClose').addEventListener('click', fecharCarrinho);
  document.getElementById('cartOverlay').addEventListener('click', fecharCarrinho);

  document.getElementById('cartItems').addEventListener('click', (e) => {
    const linha = e.target.closest('.cart-item');
    if (!linha) return;
    const nome = linha.dataset.nome;

    if (e.target.closest('[data-cart-inc]')) alterarQuantidade(nome, 1);
    if (e.target.closest('[data-cart-dec]')) alterarQuantidade(nome, -1);
    if (e.target.closest('[data-cart-remove]')) removerItem(nome);
  });

  document.getElementById('cartSend').addEventListener('click', () => {
    if (carrinho.length === 0) return;
    const mensagem = montarMensagem();
    const link = `${CART_WHATSAPP_LINK}?text=${encodeURIComponent(mensagem)}`;
    window.open(link, '_blank', 'noopener');
  });
});

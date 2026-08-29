<p align="center">
  <img src="img/logo.png" alt="Logo LK Brownies" width="120">
</p>

<h1 align="center">LK Brownies — Site institucional</h1>

<p align="center">
  <a href="https://lkbrownies.com.br">lkbrownies.com.br</a> ·
  <a href="https://www.instagram.com/_lkbrownies/">@_lkbrownies</a> ·
  Jundiaí/SP
</p>

Site comercial de página única (one-page) para a **LK Brownies**, marca de brownies artesanais de Jundiaí/SP ([@_lkbrownies](https://www.instagram.com/_lkbrownies/)). O objetivo do site é apresentar a marca, exibir os sabores disponíveis e converter visitantes em pedidos via WhatsApp — inclusive com um carrinho de pedido embutido que monta a mensagem automaticamente.

É um site 100% estático (HTML, CSS e JavaScript puro, sem frameworks e sem etapa de build), pensado para ser hospedado gratuitamente no **GitHub Pages**, com deploy automático via GitHub Actions a cada push, e já preparado para SEO/compartilhamento (Open Graph, Twitter Card, dados estruturados, sitemap e robots.txt).

## Estrutura de pastas

```
.
├── index.html              # Página única com todas as seções do site
├── css/
│   └── style.css           # Estilos, paleta de cores, responsividade
├── js/
│   ├── main.js              # Menu mobile, header no scroll, ano do rodapé, animação de scroll-reveal
│   └── cart.js              # Carrinho de pedido (adicionar/remover sabores, gaveta lateral, montagem da mensagem do WhatsApp)
├── img/                     # Fotos otimizadas usadas no site (já comprimidas para web)
├── lib/                     # Fotos originais em alta resolução (NÃO versionadas, ver .gitignore)
├── site.webmanifest         # Manifesto PWA (nome, ícone, cores) usado por navegadores/celulares
├── robots.txt               # Libera indexação para buscadores e aponta o sitemap
├── sitemap.xml              # Sitemap para SEO
├── CNAME                    # Domínio próprio usado pelo GitHub Pages (lkbrownies.com.br)
└── .github/
    └── workflows/
        └── deploy.yml       # Workflow do GitHub Actions que publica o site no GitHub Pages
```

> A pasta `lib/` guarda as fotos originais (tiradas em alta resolução) usadas como fonte para gerar as imagens otimizadas em `img/`. Ela está no `.gitignore` de propósito, para não deixar o repositório pesado — só as versões já redimensionadas/comprimidas em `img/` vão para o site.

## Seções do site

1. **Header fixo** — logo, menu, botão "Peça agora" (WhatsApp) e ícone do carrinho com contador de itens.
2. **Hero** — chamada principal com foto de destaque e CTAs (WhatsApp e "Ver sabores").
3. **Diferenciais** (`#sobre`) — por que escolher a LK Brownies (artesanal, recheio, sabores, embalagem).
4. **Sabores** (`#sabores`) — cardápio em cards (Brownie Trufado, Chocolate Branco, Mesclado, Bites LK), cada um com seletor de quantidade e botão "Adicionar ao carrinho".
5. **Nossa história / produção** — texto institucional + foto do processo (recortada em proporção fixa para não distorcer).
6. **Galeria** — fotos extras dos produtos.
7. **Como pedir** (`#como-pedir`) — passo a passo (escolher sabor → chamar no WhatsApp → retirar/receber) + banner de CTA final.
8. **Rodapé** (`#contato`) — dados de contato com ícones de WhatsApp e Instagram, navegação e copyright.
9. **Botão flutuante de WhatsApp** — fixo no canto da tela em todas as seções.
10. **Carrinho de pedido** — gaveta lateral (`#cartDrawer`) que lista os sabores escolhidos, permite ajustar quantidade/remover itens, aceita uma observação livre e monta a mensagem final que abre no WhatsApp já pronta para envio. O carrinho é mantido no `localStorage` do navegador, então sobrevive a um recarregamento de página.

## Como rodar localmente

Por ser um site estático, basta servir a pasta com qualquer servidor HTTP simples. Exemplos:

```bash
# Com Python já instalado
python -m http.server 8080

# Ou com Node.js (npx)
npx serve .
```

Depois acesse `http://localhost:8080` no navegador. Não é necessário `npm install` nem qualquer etapa de build.

## Personalização

Praticamente todo o conteúdo fica direto no `index.html`, sem dados externos ou CMS. Os pontos mais comuns de edição:

| O que mudar | Onde |
|---|---|
| Link do WhatsApp (botões do site) | Buscar por `wa.me/message/PKRIFNOA3X3FO1` em `index.html` (aparece no header, hero, CTA final, rodapé e botão flutuante) |
| Número do WhatsApp usado no envio do carrinho | Constante `CART_WHATSAPP_LINK` no topo de `js/cart.js` (formato `wa.me/<código do país + DDD + número>`, sem símbolos) |
| Link do Instagram | Buscar por `instagram.com/_lkbrownies` em `index.html` |
| Sabores do cardápio | Cards `<article class="product-card" data-produto="...">` na seção `#sabores` em `index.html` — o valor de `data-produto` é o nome que aparece na mensagem do WhatsApp |
| Textos (títulos, descrições) | Diretamente nas tags `<h1>`, `<h2>`, `<h3>` e `<p>` de cada `<section>` em `index.html` |
| Fotos dos produtos | Trocar os arquivos em `img/` (mantendo os mesmos nomes) ou os `src` das tags `<img>` |
| Cores da marca | Variáveis CSS no topo de `css/style.css` (bloco `:root`), ex.: `--cacau-escuro`, `--rosa`, `--creme` |
| Fontes | Import do Google Fonts no `<head>` de `index.html` (`Fredoka`, `Poppins`, `Caveat`) |
| Metadados de SEO/compartilhamento | Tags `<meta>` (`description`, Open Graph, Twitter Card) e o bloco `<script type="application/ld+json">` no `<head>` de `index.html` |

### Imagens

As fotos em `img/` já estão redimensionadas (largura máxima entre 900px e 1920px conforme o uso) e comprimidas em JPEG qualidade ~78%, para manter o site leve e rápido de carregar. Ao trocar uma foto, recomenda-se manter esse mesmo cuidado de otimização antes de subir o arquivo (evita fotos de celular de vários MB direto no site). Imagens fora do hero usam `loading="lazy"` e atributos `width`/`height` para evitar deslocamento de layout (CLS) enquanto carregam.

## Carrinho de pedido

O botão de carrinho no header abre uma gaveta lateral onde o cliente:

1. Adiciona sabores da seção **Sabores**, ajustando a quantidade antes de confirmar;
2. Revisa os itens, altera quantidades ou remove algum direto na gaveta;
3. Opcionalmente escreve uma observação (data de retirada, ponto do doce, etc.);
4. Clica em **Enviar pedido no WhatsApp**, o que monta uma mensagem formatada (com todos os itens e a observação) e abre o WhatsApp com o texto preenchido, pronto para envio.

Toda a lógica está em `js/cart.js`, sem backend nem banco de dados — o estado do carrinho fica salvo no `localStorage` do navegador do visitante.

## SEO e compartilhamento

O `index.html` já inclui:

- `<meta name="description">`, `canonical` e `robots` para indexação em buscadores;
- Open Graph e Twitter Card, para pré-visualização ao compartilhar o link (WhatsApp, Facebook, Twitter/X);
- Dados estruturados (`schema.org/Bakery`) em JSON-LD, com nome, endereço, telefone e link do Instagram;
- `site.webmanifest`, permitindo "adicionar à tela inicial" no celular;
- `robots.txt` e `sitemap.xml`, apontando o site para indexação.

Ao alterar textos de título/descrição do site ou o domínio, atualize também essas tags para manter tudo consistente.

## Deploy no GitHub Pages (automático)

O workflow em `.github/workflows/deploy.yml` publica o conteúdo do repositório no GitHub Pages automaticamente a cada `push` nas branches `master` ou `main` (também pode ser disparado manualmente pela aba **Actions** do GitHub, usando "Run workflow").

Para ativar, só é preciso configurar o GitHub Pages **uma única vez** no repositório:

1. No GitHub, acesse **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Faça um `git push` para a branch `master` — o workflow "Deploy site to GitHub Pages" vai rodar automaticamente (acompanhe em **Actions**).
4. Ao final, a URL pública do site aparece em **Settings → Pages** (formato `https://<usuario>.github.io/<repositorio>/`).

Não é necessário nenhum passo de build: o workflow simplesmente empacota os arquivos do repositório e publica como estão.

## Tecnologias

- HTML5 e CSS3 (Flexbox/Grid, variáveis CSS, media queries, `aspect-ratio`)
- JavaScript puro (sem dependências/bibliotecas), com `localStorage` para persistir o carrinho
- Google Fonts (Fredoka, Poppins, Caveat)
- GitHub Actions + GitHub Pages para hospedagem e deploy contínuo

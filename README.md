# LK Brownies — Site institucional

Site comercial de página única (one-page) para a **LK Brownies**, marca de brownies artesanais de Jundiaí/SP ([@_lkbrownies](https://www.instagram.com/_lkbrownies/)). O objetivo do site é apresentar a marca, exibir os sabores disponíveis e converter visitantes em pedidos via WhatsApp.

É um site 100% estático (HTML, CSS e JavaScript puro, sem frameworks e sem etapa de build), pensado para ser hospedado gratuitamente no **GitHub Pages**, com deploy automático via GitHub Actions a cada push.

## Estrutura de pastas

```
.
├── index.html              # Página única com todas as seções do site
├── css/
│   └── style.css           # Estilos, paleta de cores, responsividade
├── js/
│   └── main.js             # Menu mobile, ano do rodapé, animação de scroll-reveal
├── img/                    # Fotos otimizadas usadas no site (já comprimidas para web)
├── lib/                    # Fotos originais em alta resolução (NÃO versionadas, ver .gitignore)
└── .github/
    └── workflows/
        └── deploy.yml      # Workflow do GitHub Actions que publica o site no GitHub Pages
```

> A pasta `lib/` guarda as fotos originais (tiradas em alta resolução) usadas como fonte para gerar as imagens otimizadas em `img/`. Ela está no `.gitignore` de propósito, para não deixar o repositório pesado — só as versões já redimensionadas/comprimidas em `img/` vão para o site.

## Seções do site

1. **Header fixo** — logo, menu e botão "Peça agora" (WhatsApp).
2. **Hero** — chamada principal com foto de destaque e CTAs.
3. **Diferenciais** — por que escolher a LK Brownies (artesanal, recheio, sabores, embalagem).
4. **Sabores** — cardápio em cards (Brownie Trufado, Chocolate Branco, Mesclado, Bites LK), cada um com botão direto para pedido no WhatsApp.
5. **Nossa história / produção** — texto institucional + foto do processo.
6. **Galeria** — fotos extras dos produtos.
7. **Como pedir** — passo a passo (escolher sabor → chamar no WhatsApp → retirar/receber) + banner de CTA final.
8. **Rodapé** — contato, Instagram, navegação e botão flutuante de WhatsApp.

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
| Link do WhatsApp | Buscar por `wa.me/message/PKRIFNOA3X3FO1` em `index.html` (aparece em vários botões e no botão flutuante) |
| Link do Instagram | Buscar por `instagram.com/_lkbrownies` em `index.html` |
| Textos (títulos, descrições, sabores) | Diretamente nas tags `<h1>`, `<h2>`, `<h3>` e `<p>` de cada `<section>` em `index.html` |
| Fotos dos produtos | Trocar os arquivos em `img/` (mantendo os mesmos nomes) ou os `src` das tags `<img>` |
| Cores da marca | Variáveis CSS no topo de `css/style.css` (bloco `:root`), ex.: `--cacau-escuro`, `--rosa`, `--creme` |
| Fontes | Import do Google Fonts no `<head>` de `index.html` (`Fredoka`, `Poppins`, `Caveat`) |

### Imagens

As fotos em `img/` já estão redimensionadas (largura máxima entre 900px e 1920px conforme o uso) e comprimidas em JPEG qualidade ~78%, para manter o site leve e rápido de carregar. Ao trocar uma foto, recomenda-se manter esse mesmo cuidado de otimização antes de subir o arquivo (evita fotos de celular de vários MB direto no site).

## Deploy no GitHub Pages (automático)

O workflow em `.github/workflows/deploy.yml` publica o conteúdo do repositório no GitHub Pages automaticamente a cada `push` nas branches `master` ou `main` (também pode ser disparado manualmente pela aba **Actions** do GitHub, usando "Run workflow").

Para ativar, só é preciso configurar o GitHub Pages **uma única vez** no repositório:

1. No GitHub, acesse **Settings → Pages**.
2. Em **Build and deployment → Source**, selecione **GitHub Actions**.
3. Faça um `git push` para a branch `master` — o workflow "Deploy site to GitHub Pages" vai rodar automaticamente (acompanhe em **Actions**).
4. Ao final, a URL pública do site aparece em **Settings → Pages** (formato `https://<usuario>.github.io/<repositorio>/`).

Não é necessário nenhum passo de build: o workflow simplesmente empacota os arquivos do repositório e publica como estão.

### Domínio próprio (lkbrownies.com.br)

O site está configurado para usar o domínio próprio **lkbrownies.com.br** via arquivo [`CNAME`](CNAME) na raiz do repositório (o workflow do GitHub Pages já publica esse arquivo automaticamente).

Passos para deixar o domínio ativo:

1. **No registrador do domínio (ex.: registro.br), configure o DNS:**
   - Registro tipo `A` para `@` (domínio raiz) apontando para os 4 IPs do GitHub Pages:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - (Opcional, IPv6) Registro tipo `AAAA` para `@` apontando para:
     ```
     2606:50c0:8000::153
     2606:50c0:8001::153
     2606:50c0:8002::153
     2606:50c0:8003::153
     ```
   - Registro tipo `CNAME` para `www` apontando para `caio-martin.github.io.`
2. **No GitHub**, em **Settings → Pages → Custom domain**, informe `lkbrownies.com.br` e salve (o GitHub confirma a propriedade do domínio a partir do DNS configurado). Marque **Enforce HTTPS** assim que o certificado for emitido (pode levar até algumas horas).
3. Aguarde a propagação do DNS (pode levar de minutos a até 48h). Depois disso, o site responde em `https://lkbrownies.com.br`.

> Se o arquivo `CNAME` for removido manualmente pelo GitHub (isso acontece se o campo "Custom domain" for limpo em Settings → Pages), lembre de restaurá-lo no próximo deploy.

## Tecnologias

- HTML5 e CSS3 (Flexbox/Grid, variáveis CSS, media queries)
- JavaScript puro (sem dependências/bibliotecas)
- Google Fonts (Fredoka, Poppins, Caveat)
- GitHub Actions + GitHub Pages para hospedagem e deploy contínuo
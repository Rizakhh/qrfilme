# QR FILME

Landing page institucional do QR FILME — o podcast que te ensina a dominar todas as telas.

## Sobre

O QR FILME é um curso gratuito de audiovisual distribuído pela cidade através de QR Codes. Este site apresenta o projeto, seus públicos, objetivos, formatos acessíveis e o caminho para ouvir os episódios no Linktree.

## Tecnologias

- HTML5 semântico;
- CSS3 responsivo, sem framework;
- JavaScript puro, sem dependências de execução;
- SVG e PNG fornecidos pelo projeto;
- compatível com GitHub Pages.

## Estrutura

```text
/
├── index.html
├── styles.css
├── script.js
├── 404.html
├── robots.txt
├── sitemap.xml
├── AGENTS.md
└── img/
    ├── logo.png
    ├── logospnab.PNG
    └── qrfilme-qrcode.svg
```

## Como visualizar localmente

É possível abrir `index.html` diretamente no navegador. Para reproduzir melhor o comportamento de hospedagem, use um servidor estático simples:

```bash
python -m http.server 8000
```

Depois, acesse `http://localhost:8000`. Também é possível usar a extensão Live Server do editor.

## Publicação no GitHub Pages

1. Crie ou utilize um repositório no GitHub.
2. Envie os arquivos deste projeto para a branch `main`.
3. Abra **Settings** no repositório.
4. Acesse **Pages**.
5. Selecione **Deploy from a branch**.
6. Selecione a branch `main` e a pasta raiz `/`.
7. Clique em **Save** e aguarde a publicação.
8. Se publicar em outro endereço, atualize os metadados de URL descritos abaixo.

## URLs e SEO

O endereço configurado para o GitHub Pages é `https://rizakhh.github.io/qrfilme/`.

- `index.html` usa esse endereço em `canonical`, `og:url` e JSON-LD;
- `robots.txt` aponta para o sitemap, que lista o endereço da landing;
- `og:image` aponta para `https://rizakhh.github.io/qrfilme/img/logo.png`;
- `https://linktr.ee/qrfilme`: Linktree institucional usado nos botões e no compartilhamento;
- `https://instagram.com/canalrespirarte`: Instagram institucional usado no rodapé.

## Assets utilizados

| Asset | Uso |
| --- | --- |
| `img/logo.png` | Cabeçalho, bloco editorial, rodapé e metadado social |
| `img/qrfilme-qrcode.svg` | QR Code principal e chamada final |
| `img/logospnab.PNG` | Créditos institucionais do rodapé |
| `img/lai1.jpg` | Primeira foto do carrossel de Lai Costa |
| `img/lai2.jpg` | Segunda foto do carrossel de Lai Costa |
| `img/lai3.jpg` | Terceira foto do carrossel de Lai Costa |

As três fotografias de Lai Costa encontradas na pasta `img` foram aproveitadas no carrossel da seção “Por trás do projeto”. O QR Code e o logotipo continuam sendo usados como elementos editoriais. Nenhum arquivo existente foi removido.

## Funcionalidades

- menu responsivo com `aria-expanded`, fechamento por Escape e teclado;
- link de salto para o conteúdo;
- navegação por âncoras;
- compartilhamento com Web Share API e fallback para cópia;
- carrossel manual e acessível com as fotos de Lai Costa, sem reprodução automática;
- seletor acessível com 20 opções de fonte para os títulos, salvo localmente no dispositivo;
- confirmação acessível em `aria-live`;
- botão flutuante de ouvir no mobile;
- animações discretas via `IntersectionObserver`, respeitando movimento reduzido;
- links externos com `target="_blank"` e `rel="noopener noreferrer"`.

## Analytics opcional

Nenhum analytics é carregado por padrão. Para ativar Google Analytics ou Plausible, adicione manualmente o script e um identificador real em `index.html`, documentando a alteração. Não use identificadores fictícios.

## Validação recomendada

- navegar pelo site apenas com teclado e confirmar foco visível;
- testar o menu em 320 px, 375 px, 768 px e 1440 px;
- verificar o QR Code com mais de um celular;
- revisar o contraste com Lighthouse, axe ou WAVE;
- executar o Lighthouse com um servidor local;
- validar HTML e links após substituir a URL final;
- conferir o console do navegador sem bloqueadores ativos.

## Checklist antes de publicar

- [ ] substituir todas as URLs placeholder;
- [ ] verificar se o QR Code abre o destino correto;
- [ ] testar o compartilhamento em celular e desktop;
- [ ] confirmar links do Linktree e Instagram;
- [ ] revisar alt texts e navegação por teclado;
- [ ] testar sem JavaScript para garantir conteúdo básico;
- [ ] rodar Lighthouse e validar o HTML;
- [ ] confirmar que nenhum asset está quebrado.

## Créditos

O projeto é uma realização da Respirar-te e integra ações viabilizadas através da Política Nacional Aldir Blanc — PNAB. A identidade e os assets presentes nesta pasta foram preservados como base da implementação.

## Limitações conhecidas

- não há mapa, geolocalização ou player incorporado, conforme o escopo;
- o site não coleta dados, não possui login, formulário ou backend.

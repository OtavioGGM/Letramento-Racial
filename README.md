# Letramento Racial na Escola

Site institucional e acervo digital do projeto de Letramento Racial da E. E. Profª Carolina Cintra da Silveira (Ensino Médio). O site apresenta o projeto, o livro de referência, a autora e as produções de turmas e educadores.

Este documento descreve a arquitetura, as regras e o estado atual do projeto. Ele foi escrito para ser lido por desenvolvedores e por assistentes de IA que precisem entender o repositório antes de alterá-lo.

## Resumo técnico

| Item | Definição |
|---|---|
| Framework | Astro, em modo estático (Static Site Generation) |
| Linguagens | HTML, CSS e JavaScript simples. TypeScript em modo relaxed |
| Renderização | Somente estática. Sem SSR, sem funções serverless, sem backend |
| Banco de dados | Nenhum. Os conteúdos ficam em arquivos JSON versionados no Git |
| Hospedagem | Vercel (plano gratuito), com deploy automático a partir da branch `main` do GitHub |
| Endereço de produção | https://letramento-racial.vercel.app |
| Fontes | Fraunces Variable (títulos) e Source Sans 3 Variable (texto), instaladas via npm (`@fontsource-variable`), sem depender do Google Fonts |
| Abordagem de layout | Mobile-first |
| Idioma do site | Português do Brasil (`lang="pt-BR"`) |

## Regras obrigatórias

Qualquer alteração deve respeitar estas regras:

1. O site deve continuar 100% estático. Não adicionar SSR, adapters de servidor, APIs próprias ou serviços pagos.
2. Não adicionar banco de dados nem painel administrativo na primeira versão.
3. Todo conteúdo de projetos vem dos arquivos em `src/data/`. Não criar páginas manuais para turmas ou projetos.
4. Conteúdo de demonstração deve ter o campo `demonstracao: true` e exibir um aviso visível. Nunca apresentar exemplo como projeto real.
5. Não inventar conteúdo institucional, citações, dados históricos, estatísticas ou referências bibliográficas.
6. Não publicar nomes completos de estudantes menores de idade. Não publicar fotos sem autorização adequada (LGPD) e sem os rostos de estudantes cobertos (ver seção Privacidade).
7. Não armazenar vídeos no repositório. Vídeos são incorporados do YouTube, carregados somente sob demanda (clique do usuário).
8. Não comprometer a experiência mobile em favor de elementos visuais. Poucas animações. Respeitar `prefers-reduced-motion`.
9. Não deixar botões ou links sem funcionalidade.
10. Não usar emojis em textos do site nem em documentação.

## Estrutura de pastas

A raiz do repositório é a pasta que contém o `package.json`.

```text
Letramento-Racial/
├── src/
│   ├── components/     Componentes reutilizáveis (.astro)
│   ├── layouts/        Layouts de página (Base.astro)
│   ├── lib/            Funções auxiliares (dados.js)
│   ├── pages/          Cada arquivo vira uma rota
│   ├── styles/         CSS global (global.css)
│   └── data/           Dados em JSON (turmas, temas, projetos)
├── public/
│   ├── images/
│   │   ├── identidade/   Logo da escola (logo.png)
│   │   ├── autora/       Fotografia autorizada da autora
│   │   ├── livro/        Capa do livro (somente de fonte autorizada)
│   │   └── projetos/
│   │       ├── turmas/
│   │       └── educadores/
│   ├── icons/
│   └── fonts/
├── astro.config.mjs
├── package.json
└── README.md
```

Os dados ficam em `src/data/` (e não em uma pasta `data/` na raiz) para que o Astro os importe diretamente, sem configuração adicional.

Fotografias originais, sem censura, nunca entram no repositório. Se forem mantidas dentro da pasta do projeto, ficam em `originais/`, listada no `.gitignore`.

## Rotas

| Arquivo | URL | Função |
|---|---|---|
| `src/pages/index.astro` | `/` | Início: banner, sobre, livro, autora, projetos em destaque |
| `src/pages/projetos/index.astro` | `/projetos/` | Acervo com filtros e busca (hoje, página provisória) |
| `src/pages/projetos/[slug].astro` | `/projetos/<slug>/` | Página individual, gerada a partir dos dados (versão provisória) |
| `src/pages/sobre.astro` | `/sobre/` | Apresentação ampliada do projeto (provisória) |
| `src/pages/referencias.astro` | `/referencias/` | Referências bibliográficas e legais (provisória) |
| `src/pages/privacidade.astro` | `/privacidade/` | Privacidade e canal para correção ou retirada de materiais (provisória) |
| `src/pages/404.astro` | página de erro | Erro amigável (a criar) |

O menu principal tem quatro itens: Início, Projetos, Sobre o projeto, Referências. A página de privacidade aparece apenas no rodapé.

## Modelo de dados

### `src/data/turmas.json`

Estrutura com quatro chaves: `etapas`, `series`, `cursos`, `turmas`.

```json
{
  "etapas": ["Ensino Médio"],
  "series": ["1ª série", "2ª série", "3ª série"],
  "cursos": [
    { "sigla": "REG", "nome": "Ensino Médio regular" },
    { "sigla": "ADM", "nome": "CONFIRMAR NOME POR EXTENSO" },
    { "sigla": "DS",  "nome": "CONFIRMAR NOME POR EXTENSO" }
  ],
  "turmas": [
    { "id": "2c-adm", "rotulo": "2º C ADM", "serie": "2ª série", "curso": "ADM" }
  ]
}
```

Regras:

- `id` é único, em minúsculas, sem espaços (exemplos: `1a`, `2c-adm`, `3b-ds`). Turmas de curso técnico levam o sufixo do curso.
- `serie` deve existir em `series`. `curso` deve existir em `cursos[].sigla`.
- O filtro de etapa de ensino fica oculto enquanto houver apenas uma etapa.

Fatos confirmados pela escola sobre a 2ª série:

- Os 2º A e 2º E são do curso DS (`2a-ds`, `2e-ds`).
- Os 2º C e 2º D são do curso ADM (`2c-adm`, `2d-adm`).
- Não existem 2º A, 2º C, 2º D e 2º E do ensino regular. Não criar essas turmas.
- A 2ª série tem seis turmas, uma letra por sala, independente do curso: 2º A DS, 2º B, 2º C ADM, 2º D ADM, 2º E DS e 2º F. Os 2º B e 2º F são do ensino regular.
- Na 3ª série, a mesma letra pode repetir entre regular e um curso (sendo as salar 3º A regular e 3º A ADM, 3º B regular e 3º B DS).

### `src/data/temas.json`

Lista de temas, cada um atribuído a uma turma. Há 18 temas oficiais, numerados de 1 a 18, e itens reservados a partir do 19, com nome `(INSERIR TEMA)`.

```json
{
  "id": "cinema-negro",
  "nome": "Cinema negro",
  "turmaId": "2c-adm",
  "numero": 18
}
```

Regras:

- `turmaId` deve existir em `turmas.json`. Não usar texto livre.
- O campo numérico se chama `numero`. Todos os itens devem usar o mesmo nome de campo.
- Itens com `nome` iniciado por `(INSERIR` são reservas e não são exibidos no site publicado.
- Nos filtros e nos cartões, o rótulo é o nome do tema. O campo numero serve só para ordenação.
- DS significa Desenvolvimento de Sistemas
- ADM significa Administração

Atribuição dos temas oficiais às turmas, conforme informado pela escola:

| Tema | Turma | Tema | Turma |
|---|---|---|---|
| 1 | 2º E DS | 10 | 1º B |
| 2 | 2º A DS | 11 | 3º A |
| 3 | 3º B | 12 | 3º B DS |
| 4 | 3º C | 13 | 1º F |
| 5 | 2º D ADM | 14 | 1º G |
| 6 | 1º E | 15 | 1º C |
| 7 | 3º A ADM | 16 | 1º D |
| 8 | 1º A | 17 | 2º F |
| 9 | 2º B | 18 | 2º C ADM |

### `src/data/projetos.json`

Cada projeto é um objeto com os campos abaixo. Campos não aplicáveis a uma categoria aceitam valor vazio. O arquivo hoje contém dois projetos de demonstração.

```json
{
  "id": "projeto-001",
  "slug": "titulo-do-projeto",
  "titulo": "",
  "descricao": "",
  "objetivoPedagogico": "",
  "categoria": "turma",
  "turmaId": "",
  "ano": 2026,
  "professorResponsavel": "",
  "disciplinas": [],
  "temas": [],
  "imagemCapa": "",
  "imagemCapaAlt": "",
  "imagens": [],
  "videos": [],
  "creditos": "",
  "dataPublicacao": "2026-10-30",
  "destaque": false,
  "publicado": true,
  "demonstracao": false
}
```

Regras:

- `categoria` aceita `turma` ou `educador`.
- `turmaId` referencia `turmas.json`. Série e curso são derivados da turma.
- `temas` é uma lista de `id` de `temas.json`.
- Registros com `publicado: false` não aparecem no site.
- `destaque: true` faz o projeto aparecer na página inicial (de três a seis projetos).
- Toda imagem precisa de texto alternativo (`imagemCapaAlt` para a capa).
- O build deve falhar, com mensagem clara, se houver turma inexistente, tema fora da lista ou imagem sem texto alternativo (validação planejada).

### `src/lib/dados.js`

Único ponto de leitura dos JSON. Páginas e componentes devem importar daqui, e não diretamente dos arquivos de dados.

| Exportação | Função |
|---|---|
| `turmas` | Lista de turmas |
| `temasValidos` | Temas sem os itens reservados `(INSERIR` |
| `getTurma(id)` | Busca turma por `id` |
| `getTema(id)` | Busca tema válido por `id` |
| `projetosPublicados` | Projetos com `publicado: true`, mais recentes primeiro |
| `projetosDestaque` | Até seis projetos publicados com `destaque: true` |

## Filtros e busca (planejado)

- Ficam em `/projetos/` e funcionam em conjunto: categoria, série, curso, turma, tema, tipo de mídia e busca por título, descrição ou palavra-chave.
- O estado dos filtros é guardado em parâmetros da URL (exemplo: `?serie=3&tema=12`), para que links filtrados possam ser compartilhados.
- Implementação em JavaScript no navegador, lendo um índice gerado no build. Sem servidor.
- Ordenação padrão: data de publicação, mais recentes primeiro.
- Contador de resultados, mensagem para busca sem resultado e painel de filtros recolhível no celular.

## Componentes

Existentes:

| Componente | Função |
|---|---|
| `layouts/Base.astro` | Estrutura HTML, metadados (título, descrição, Open Graph), fontes, CSS global, link "Pular para o conteúdo" |
| `Cabecalho.astro` | Logo, menu principal, menu recolhível no celular (botão com `aria-expanded`, fecha com Esc) |
| `Rodape.astro` | Identificação da escola, navegação rápida, créditos, ano de atualização |
| `CartaoProjeto.astro` | Cartão de projeto: capa, categoria, responsável, ano, temas, tipos de mídia, selo de demonstração |
| `AvisoDemonstracao.astro` | Selo "Conteúdo de demonstração" |

Os blocos de banner e demais seções da página inicial estão escritos diretamente em `pages/index.astro`.

Planejados: `Filtros`, `GaleriaFotos`, `VideoYoutube` (carrega sob demanda).

## Identidade visual

Variáveis CSS definidas em `src/styles/global.css`:

| Variável | Valor | Uso |
|---|---|---|
| `--terracota` | `#a44732` | Destaques, botões, links |
| `--ocre` | `#d3a64b` | Detalhes, faixas e fundo de botão com texto escuro. Não usar como cor de texto sobre fundo claro nem sobre `--verde` (contraste de cerca de 3:1, abaixo do mínimo AA) |
| `--verde` | `#6c5740` | Elementos institucionais (cabeçalho, banner). O nome da variável é histórico: o valor atual é um marrom terroso, e não verde |
| `--marrom` | `#332821` | Texto, títulos, rodapé |
| `--bege` | `#f5f0e6` | Fundo geral |
| `--branco` | `#ffffff` | Superfícies e cartões |

Diretrizes:

- Meta de acessibilidade: WCAG 2.2 nível AA.
- No cabeçalho, o link da página ativa usa texto branco com barra ocre. Não usar texto ocre ali.
- Grafismos geométricos abstratos e discretos. Evitar estereótipos e uso indiscriminado de símbolos culturais.
- Fotografias autênticas dos projetos, apenas com autorização.

## Convenções de código

- Nomes de arquivos de dados, rotas e `id` em minúsculas, sem acentos, com hífen.
- Textos da interface em português do Brasil, com acentuação correta.
- Componentes Astro com estilos escopados no próprio arquivo. Estilos globais apenas em `global.css`.
- HTML semântico, hierarquia de títulos correta, um `h1` por página.
- Elementos interativos com área de toque mínima de 2,75rem e foco visível.
- Sem dependências desnecessárias. Cada nova dependência deve ser justificada.
- Imports relativos dependem da profundidade do arquivo. Em `src/pages/` use `../layouts/Base.astro`. Em `src/pages/projetos/` use `../../layouts/Base.astro`. Em `src/components/` use `../lib/dados.js`.

## Acessibilidade e SEO

- Contraste adequado, texto alternativo em imagens, navegação por teclado, foco visível, compatibilidade com leitores de tela.
- Título e descrição individuais por página, URLs legíveis, Open Graph, imagem de compartilhamento, sitemap e favicon.
- Pendente: configurar `site: "https://letramento-racial.vercel.app"` em `astro.config.mjs`, necessário para sitemap e URLs absolutas de Open Graph.

## Privacidade (LGPD)

- Sem cadastro de visitantes e sem coleta de dados pessoais. Não ativar Web Analytics nem Speed Insights da Vercel sem atualizar a página de privacidade.
- Sem comentários públicos.
- Não divulgar nomes completos de menores de idade, localização ou rotina de estudantes.
- Verificar autorização antes de publicar fotografias identificáveis ou vídeos.
- Rostos de estudantes devem ser cobertos antes de a foto entrar no repositório. Usar tarja sólida opaca ou recorte. Evitar desfoque leve e pixelização.
- Cobrir também crachás, nomes em uniformes ou cadernos e qualquer texto que identifique alguém.
- Remover metadados (EXIF) das imagens antes de publicar.
- Textos alternativos não devem identificar estudantes.
- Fotos originais e materiais recebidos ficam fora do repositório, em espaço privado.
- Arquivos enviados ao GitHub permanecem no histórico do Git mesmo depois de apagados. Nunca commitar foto sem censura.
- A página `/privacidade/` informa um canal institucional para pedidos de correção ou retirada.

## Fonte de conteúdo pedagógico

A fundamentação pedagógica, histórica e legal do projeto vem do documento "Contexto Geral do Projeto: Letramento Racial na Escola". Textos do site (Sobre o projeto, referências) devem ser aproveitados desse documento, sem criar fundamentação paralela. Livro de referência: Pequeno Manual Antirracista, de Djamila Ribeiro.

## Comandos

```bash
npm install        # instalar dependências
npm run dev        # servidor local em http://localhost:4321
npm run build      # gerar o site estático em dist/
npm run preview    # visualizar o build localmente
```

## Fluxo de trabalho com Git

- `main` é a branch estável. Cada push em `main` dispara deploy na Vercel.
- Cada integrante trabalha em sua própria branch e envia alterações por pull request, revisado por outro integrante.
- Pull requests geram link de pré-visualização na Vercel.
- Sequência de commit: `git status`, `git add .`, `git commit -m "mensagem descritiva"`, `git push origin main`.
- Antes de commitar alterações em JSON, validar a sintaxe:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/data/turmas.json','utf8')); console.log('OK')"
```

## Estado atual

Concluído:

- Projeto Astro base (template Empty) e estrutura de pastas.
- `turmas.json`, `temas.json` e `projetos.json` com os dados oficiais.
- CSS global, layout base, cabeçalho com menu mobile e rodapé.
- Página inicial completa (banner, sobre, livro, autora, projetos em destaque).
- Módulo `src/lib/dados.js` e componentes `CartaoProjeto`, `AvisoDemonstracao` e `GaleriaFotos`.
- Página individual completa (capa, objetivo, disciplinas, temas, galeria com ampliação, créditos).
- Três projetos de educadores cadastrados (Felipe Rodrigues, Anderson Santiago, Felipe Johnny), com rostos borrados e em demonstração até receberem conteúdo real.
- Guia de cadastro de projetos em `docs/preencher-projetos.md`.
- Deploy na Vercel funcionando em https://letramento-racial.vercel.app.

Pendente:

- Acervo `/projetos/` com listagem dos cartões, filtros combináveis e busca.
- Componente `VideoYoutube` (sob demanda) e vídeos na página individual.
- Páginas Sobre e Referências com conteúdo real.
- Página de privacidade com canal de contato.
- Página 404, sitemap, `site` no `astro.config.mjs` e metadados de compartilhamento.
- Script de validação dos dados no build.
- Otimização de imagens (WebP) e testes de acessibilidade.
- Trocar os textos alternativos provisórios das galerias por descrições reais, sem identificar estudantes.


## Informações úteis para IAs que ajudam no projeto

### Contexto e pessoas

- O projeto é conduzido por uma equipe de três pessoas. Uma é a programadora, que conversa com a IA. As outras duas dão suporte, coletando imagens e desenvolvendo textos.
- A pessoa que conversa com a IA é iniciante em Astro e Git. Explique o motivo de cada comando e diga exatamente em qual pasta ele deve ser executado.
- A programadora também cuida do envio de logos e fotos. A IA deve focar no desenvolvimento e apontar o que a pessoa precisa fazer.

### Ambiente

- Sistema operacional: Windows. Terminal: Git Bash, que usa comandos estilo Linux (`ls`, `mv`, `grep`, `sed`, `find`). Não fornecer comandos de PowerShell.
- Editor: VS Code, aberto na pasta que contém o `package.json`. Abrir a pasta errada gera erros falsos de import.
- Node.js LTS instalado. Gerenciador de pacotes: npm.

### Forma de trabalhar

- Entregar passo a passo e aguardar a confirmação da pessoa (s/n) antes de avançar de etapa.
- Comunicar em português do Brasil, de forma direta. Não usar emojis.
- Nunca inventar dados da escola. Quando faltar informação, perguntar ou usar campo configurável com texto provisório claramente marcado.
- Informar ao final de cada etapa o que atualizar neste README.

## Carrossel de imagens nos projetos

- Criado o componente `src/components/CarrosselCapa.astro`.
- O componente permite alternar imagens automaticamente a cada 4 segundos.
- Possui controles manuais opcionais (setas).
- Respeita a preferência de acessibilidade `prefers-reduced-motion`.
- Na página individual, o projeto `educador-003` utiliza imagens da banda e do Felipe Johnny.
- A galeria original do projeto permanece independente do carrossel.
- A integração do carrossel no cartão da página de projetos ainda está pendente.

### Etapas do desenvolvimento

1. Planejamento técnico e visual (concluída).
2. Interface mobile-first: layout, menu, cartões (concluída).
3. Funcionalidades: página inicial, acervo, filtros, busca, páginas individuais, mídias (em andamento).
4. Integração de conteúdo: dados demonstrativos e projetos reais (em andamento).
5. Testes: responsividade, acessibilidade, desempenho, filtros.
6. Publicação e verificação em produção.
7. Documentação de manutenção para pessoas sem experiência técnica.

### Decisões que divergem dos documentos originais

- A especificação original previa hospedagem na InfinityFree, com envio da pasta `dist` por FTP. Foi substituída pela Vercel, porque a InfinityFree foi sinalizada como insegura para as fotografias. Ignorar as instruções de FTP, `htdocs` e limites de arquivo da InfinityFree.
- O filtro de temas usa os 18 temas reais da escola (um por turma), e não os nove temas genéricos da especificação.
- A etapa de ensino é única (Ensino Médio), então esse filtro fica oculto.
- Os dados ficam em `src/data/`, e não em `data/` na raiz.

### Armadilhas já encontradas

- Imports relativos errados quando o conteúdo de `pages/index.astro` foi colado em `pages/projetos/index.astro`. Conferir sempre a profundidade do arquivo.
- Pasta do projeto aninhada (`Letramento-Racial/Letramento-Racial`). A raiz de trabalho é a pasta interna, onde está o `package.json`. Mover pastas no Windows falha com "Device or resource busy" se o VS Code, um terminal ou o `npm run dev` estiver usando a pasta.
- Mudar o `id` de uma turma exige atualizar `turmaId` em `temas.json` e `projetos.json`. Validar o JSON depois.
- Texto ocre sobre fundo claro ou sobre `--verde` reprova no contraste.
- Dois campos com o mesmo nome em arquivos diferentes confundem. Em `temas.json` o número é `numero`, e não `tema`.
- Um arquivo `public/index.html` vazio sobrescreveu `src/pages/index.astro` na Vercel e deixou a página inicial em branco. No `npm run dev` funcionava, e o aviso `Skipping src/pages/index.astro` aparecia só no log de build. Nunca criar `index.html` dentro de `public/`.
- Terminal do VS Code abre em PowerShell. Comandos do projeto são para Git Bash. Conferir a raiz com `ls package.json` antes de rodar caminhos relativos.

### Pontos em aberto que exigem decisão humana

- Lista completa de turmas da 2ª série.
- Conteúdo dos temas 19 em diante.
- Autorização de imagem das fotografias e dados das duas apresentações (título, turma, ano, tema, orientador).
- Biografia da autora, capa do livro e fotografia da autora, todas de fonte autorizada.
- Se o repositório no GitHub é público ou privado. Em repositório público, tudo em `public/` é visível.
- Termos do plano gratuito (Hobby) da Vercel para projeto escolar e limite de colaboradores.

### Checklist antes de propor uma alteração

1. Ler este README e os arquivos de `src/data/`.
2. Confirmar em qual pasta cada arquivo será criado e qual é o caminho relativo correto.
3. Verificar se a alteração mantém o site estático e mobile-first.
4. Verificar contraste, texto alternativo e foco visível.
5. Verificar que nenhum dado inventado ou foto sem autorização entra no código.
6. Indicar como testar (`npm run dev`) e o que a pessoa deve ver.
7. Atualizar as seções "Estado atual" e "Pendente" deste README.

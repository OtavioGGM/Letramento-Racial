# Letramento Racial na Escola

Site institucional e acervo digital do projeto de Letramento Racial da E. E. Profª Carolina Cintra da Silveira (Ensino Médio). O site apresenta o projeto, o livro de referência, a autora e as produções de turmas e educadores.

Este documento descreve a arquitetura e as regras do projeto. Ele foi escrito para ser lido por desenvolvedores e por assistentes de IA que precisem entender o repositório antes de alterá-lo.

## Resumo técnico

| Item | Definição |
|---|---|
| Framework | Astro, em modo estático (Static Site Generation) |
| Linguagens | HTML, CSS e JavaScript simples. TypeScript em modo relaxed |
| Renderização | Somente estática. Sem SSR, sem funções serverless, sem backend |
| Banco de dados | Nenhum. Os conteúdos ficam em arquivos JSON versionados no Git |
| Hospedagem | Vercel (plano gratuito), com deploy automático a partir da branch `main` do GitHub |
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
6. Não publicar nomes completos de estudantes menores de idade nem fotos sem autorização adequada (LGPD).
7. Não armazenar vídeos no repositório. Vídeos são incorporados do YouTube, carregados somente sob demanda (clique do usuário).
8. Não comprometer a experiência mobile em favor de elementos visuais. Poucas animações. Respeitar `prefers-reduced-motion`.
9. Não deixar botões ou links sem funcionalidade.
10. Não usar emojis em textos do site nem em documentação.

## Estrutura de pastas

```text
Letramento-Racial/
├── src/
│   ├── components/     Componentes reutilizáveis (.astro)
│   ├── layouts/        Layouts de página (Base.astro)
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

## Rotas

| Arquivo | URL | Função |
|---|---|---|
| `src/pages/index.astro` | `/` | Início: banner, pilares, livro, autora, projetos em destaque |
| `src/pages/projetos/index.astro` | `/projetos/` | Acervo com filtros e busca |
| `src/pages/projetos/[slug].astro` | `/projetos/<slug>/` | Página individual, gerada a partir dos dados |
| `src/pages/sobre.astro` | `/sobre/` | Apresentação ampliada do projeto |
| `src/pages/referencias.astro` | `/referencias/` | Referências bibliográficas e legais |
| `src/pages/privacidade.astro` | `/privacidade/` | Privacidade e canal para correção ou retirada de materiais |
| `src/pages/404.astro` | página de erro | Erro amigável |

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
    { "id": "2a-adm", "rotulo": "2º A ADM", "serie": "2ª série", "curso": "ADM" }
  ]
}
```

Regras:

- `id` é único, em minúsculas, sem espaços (exemplos: `1a`, `2a-adm`, `3b-ds`).
- `serie` deve existir em `series`. `curso` deve existir em `cursos[].sigla`.
- O filtro de etapa de ensino fica oculto enquanto houver apenas uma etapa.

### `src/data/temas.json`

Lista de 18 temas oficiais do projeto (mais itens reservados), cada um atribuído a uma turma.

```json
{
  "id": "cinema-negro",
  "nome": "Cinema negro",
  "turmaId": "2c",
  "numero": 18
}
```

Regras:

- `turmaId` deve existir em `turmas.json`. Não usar texto livre.
- O campo numérico se chama `numero`. Todos os itens devem usar o mesmo nome de campo.
- Itens com `nome` iniciado por `(INSERIR` são reservas e não devem ser exibidos no site publicado.
- Nos filtros do celular, o rótulo curto é "Tema N" (valor de `numero`). O nome completo aparece na página do projeto.

### `src/data/projetos.json` (a criar)

Cada projeto é um objeto com os campos abaixo. Campos não aplicáveis a uma categoria aceitam valor vazio.

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
- Toda imagem precisa de texto alternativo.
- O build deve falhar, com mensagem clara, se houver turma inexistente, tema fora da lista ou imagem sem texto alternativo (validação planejada).

## Filtros e busca (planejado)

- Ficam em `/projetos/` e funcionam em conjunto: categoria, série, curso, turma, tema, tipo de mídia e busca por título, descrição ou palavra-chave.
- O estado dos filtros é guardado em parâmetros da URL (exemplo: `?serie=3&tema=12`), para que links filtrados possam ser compartilhados.
- Implementação em JavaScript no navegador, lendo um índice gerado no build. Sem servidor.
- Ordenação padrão: data de publicação, mais recentes primeiro.

## Componentes

Existentes:

| Componente | Função |
|---|---|
| `Base.astro` (layout) | Estrutura HTML, metadados (título, descrição, Open Graph), fontes, CSS global, link "Pular para o conteúdo" |
| `Cabecalho.astro` | Logo, menu principal, menu recolhível no celular (botão com `aria-expanded`, fecha com Esc) |
| `Rodape.astro` | Identificação da escola, navegação rápida, créditos, ano de atualização |

Planejados: `Banner`, `CartaoPilar`, `CartaoProjeto`, `Filtros`, `GaleriaFotos`, `VideoYoutube` (carrega sob demanda), `AvisoDemonstracao`.

## Identidade visual

Variáveis CSS definidas em `src/styles/global.css`:

| Variável | Valor | Uso |
|---|---|---|
| `--terracota` | `#a44732` | Destaques, botões, links |
| `--ocre` | `#d3a64b` | Detalhes e faixas. Não usar como cor de texto sobre fundo claro (contraste insuficiente) |
| `--verde` | `#6c5740` | Elementos institucionais (cabeçalho) (Não necessariamente verde de fato)|
| `--marrom` | `#332821` | Texto, títulos, rodapé |
| `--bege` | `#f5f0e6` | Fundo geral |
| `--branco` | `#ffffff` | Superfícies e cartões |

Diretrizes:

- Meta de acessibilidade: WCAG 2.2 nível AA.
- Grafismos geométricos abstratos e discretos. Evitar estereótipos e uso indiscriminado de símbolos culturais.
- Fotografias autênticas dos projetos, apenas com autorização.

## Convenções de código

- Nomes de arquivos de dados, rotas e `id` em minúsculas, sem acentos, com hífen.
- Textos da interface em português do Brasil, com acentuação correta.
- Componentes Astro com estilos escopados no próprio arquivo. Estilos globais apenas em `global.css`.
- HTML semântico, hierarquia de títulos correta, um `h1` por página.
- Elementos interativos com área de toque mínima de 2,75rem e foco visível.
- Sem dependências desnecessárias. Cada nova dependência deve ser justificada.

## Acessibilidade e SEO

- Contraste adequado, texto alternativo em imagens, navegação por teclado, foco visível, compatibilidade com leitores de tela.
- Título e descrição individuais por página, URLs legíveis, Open Graph, imagem de compartilhamento, sitemap e favicon.

## Privacidade (LGPD)

- Sem cadastro de visitantes e sem coleta de dados pessoais.
- Sem comentários públicos.
- Não divulgar nomes completos de menores de idade, localização ou rotina de estudantes.
- Verificar autorização antes de publicar fotografias identificáveis ou vídeos.
- Materiais recebidos para publicação ficam em espaço privado, fora do repositório público.
- A página `/privacidade/` informa um canal institucional para pedidos de correção ou retirada.

## Fonte de conteúdo pedagógico

A fundamentação pedagógica, histórica e legal do projeto vem do documento "Contexto Geral do Projeto: Letramento Racial na Escola". Textos do site (Sobre o projeto, pilares, referências) devem ser aproveitados desse documento, sem criar fundamentação paralela. Livro de referência: Pequeno Manual Antirracista, de Djamila Ribeiro.

Os quatro pilares exibidos na página inicial são: Conhecer, Compreender, Reconhecer, Transformar.

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
- Antes de commitar alterações em JSON, validar a sintaxe:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/data/turmas.json','utf8')); console.log('OK')"
```

## Estado atual

Concluído:

- Projeto Astro base (template Empty).
- Estrutura de pastas.
- `turmas.json` e `temas.json`.
- CSS global, layout base, cabeçalho com menu mobile e rodapé.
- Páginas provisórias: início, projetos, sobre, referências, privacidade.
- Página inicial completa (banner, sobre, quatro pilares, livro, autora, projetos em destaque).
- Módulo `src/lib/dados.js` (leitura e filtragem dos JSON, ignora temas reservados e projetos não publicados).
- Componentes `CartaoProjeto` e `AvisoDemonstracao`.
- `src/data/projetos.json` com dois projetos de demonstração (`demonstracao: true`).
- Página individual provisória `src/pages/projetos/[slug].astro`.

Pendente:

- Página individual de projeto completa (galeria de fotos, vídeos, créditos).
- Acervo `/projetos/` com listagem dos cartões.
- Capa do livro e fotografia da autora (fonte autorizada) e biografia da autora com fontes confiáveis.
- Filtros combináveis e busca.
- Componentes de galeria de fotos e vídeo sob demanda.
- Páginas Sobre e Referências com conteúdo real.
- Página de privacidade com canal de contato.
- Página 404, sitemap e metadados de compartilhamento.
- Script de validação dos dados no build.
- Otimização de imagens (WebP) e testes de acessibilidade.
- Confirmação do nome por extenso dos cursos ADM e DS e preenchimento dos temas reservados.
- Confirmação de autorização de imagem das fotografias disponíveis.

## Cuidados para IAs que editam este repositório

- Leia este README e os arquivos em `src/data/` antes de propor mudanças.
- Não invente dados institucionais, turmas, temas, citações ou referências. Em caso de falta de informação, use campo configurável ou texto provisório claramente identificado.
- Não altere a estrutura dos arquivos JSON sem atualizar este documento.
- Mantenha o site estático e compatível com hospedagem sem servidor.
- Preserve nomes de campos existentes (`turmaId`, `numero`, `demonstracao`).
- Ao criar páginas ou componentes, siga as variáveis de cor e as convenções acima.

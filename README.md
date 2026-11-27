# Letramento Racial na Escola

Site institucional e acervo digital do projeto de Letramento Racial da E. E. Profª Carolina Cintra da Silveira (Ensino Médio).

O site apresenta o projeto pedagógico, seu livro de referência, a autora e as produções desenvolvidas por estudantes, turmas e educadores.

## 1. Resumo técnico

| Item | Definição |
|---|---|
| Framework | Astro |
| Renderização | Estática (SSG) |
| Linguagens | HTML, CSS e JavaScript; TypeScript relaxed |
| Backend | Não possui |
| Banco de dados | Não possui |
| Conteúdo | Arquivos JSON versionados no Git |
| Hospedagem | Vercel (plano gratuito) |
| Repositório | GitHub |
| Deploy | Automático pela branch `main` |
| Produção | https://letramento-racial.vercel.app |
| Fontes | Fraunces Variable e Source Sans 3 Variable |
| Idioma | Português do Brasil (`pt-BR`) |
| Layout | Mobile-first |

## 2. Regras obrigatórias

1. Manter o site 100% estático. Não adicionar SSR, APIs próprias, backend ou serviços pagos.
2. Não adicionar banco de dados nem painel administrativo na primeira versão.
3. Todo conteúdo de projetos deve vir de `src/data/`.
4. Não criar páginas manuais para turmas ou projetos.
5. Conteúdos de demonstração devem ter `demonstracao: true` e aviso visível.
6. Nunca inventar informações institucionais, pedagógicas, históricas, estatísticas ou bibliográficas.
7. Não publicar nomes completos de estudantes menores de idade.
8. Não publicar fotografias sem autorização adequada e sem aplicar os procedimentos de proteção de imagem.
9. Vídeos devem ser incorporados do YouTube e carregados somente após interação do usuário.
10. Não armazenar vídeos no repositório.
11. Priorizar acessibilidade, responsividade e desempenho mobile.
12. Respeitar `prefers-reduced-motion`.
13. Não deixar botões ou links sem funcionalidade.
14. Não utilizar emojis nos textos do site ou na documentação.

## 3. Estrutura do projeto

A raiz do repositório é a pasta que contém o `package.json`.

```text
Letramento-Racial/
├── src/
│   ├── components/
│   ├── layouts/
│   ├── lib/
│   ├── pages/
│   ├── styles/
│   └── data/
├── public/
│   ├── images/
│   │   ├── identidade/
│   │   ├── autora/
│   │   ├── livro/
│   │   └── projetos/
│   ├── icons/
│   └── fonts/
├── docs/
├── astro.config.mjs
├── package.json
├── README.md
└── AGENTS.md
```

Os arquivos JSON ficam em `src/data/`. O módulo `src/lib/dados.js` centraliza a leitura e disponibilização dos dados.

Fotografias originais, sem censura, não podem entrar no repositório. Arquivos originais mantidos localmente devem ficar em pastas excluídas pelo `.gitignore`.

## 4. Rotas e páginas

| Arquivo | URL | Função |
|---|---|---|
| `pages/index.astro` | `/` | Página inicial |
| `pages/projetos/index.astro` | `/projetos/` | Acervo, filtros e busca |
| `pages/projetos/[slug].astro` | `/projetos/slug/` | Página individual do projeto |
| `pages/sobre.astro` | `/sobre/` | Apresentação do projeto |
| `pages/referencias.astro` | `/referencias/` | Referências bibliográficas e legais |
| `pages/privacidade.astro` | `/privacidade/` | Privacidade e contato institucional |
| `pages/404.astro` | — | Página de erro |

O menu principal contém Início, Projetos, Sobre o projeto e Referências. Privacidade aparece no rodapé.

## 5. Modelo de dados

Os dados são organizados em três arquivos:

- `src/data/turmas.json`: etapas, séries, cursos e turmas.
- `src/data/temas.json`: temas oficiais e itens reservados.
- `src/data/projetos.json`: produções de estudantes, turmas e educadores.
- Os campos `temas`, `imagens` e `videos` são opcionais. Quando ausentes, os componentes os tratam como lista vazia.

Regras fundamentais:

- Identificadores em minúsculas, sem espaços e com hífen quando necessário.
- Projetos referenciam turmas por `turmaId` e temas por seus identificadores.
- Série e curso são derivados da turma.
- Temas reservados, iniciados por `(INSERIR`, não aparecem no site.
- Projetos com `publicado: false` não são exibidos.
- Projetos com `destaque: true` podem aparecer na página inicial.
- Toda imagem precisa de texto alternativo.
- O build deverá validar referências inexistentes e imagens sem descrição alternativa.

O módulo `src/lib/dados.js` é o único ponto de acesso aos JSON. Páginas e componentes devem importar os dados desse módulo.

A documentação completa dos campos, relacionamentos e regras de cadastro ficará em `docs/modelo-de-dados.md`.

## 6. Componentes

Componentes existentes:

- `Base.astro`: estrutura HTML, metadados, fontes e CSS global.
- `Cabecalho.astro`: logo e navegação responsiva.
- `Rodape.astro`: identificação institucional e navegação complementar.
- `CartaoProjeto.astro`: apresentação dos projetos.
- `AvisoDemonstracao.astro`: identificação de conteúdo demonstrativo.
- `GaleriaFotos.astro`: galeria com ampliação de imagens.
- `CarrosselCapa.astro`: carrossel automático de fotos, com controles manuais e suporte a `prefers-reduced-motion`.
- `CarrosselProjetos.astro`: carrossel automático de projetos em destaque, com rotação a cada cinco segundos, controles manuais, indicadores e pausa ao passar o mouse ou focar.
- `VideoYoutube.astro`: vídeos do YouTube carregados somente após o clique (domínio `youtube-nocookie.com`), com link alternativo para o YouTube. Lê o campo `videos` do projeto e é usado em `pages/projetos/[slug].astro`, depois da galeria de fotos.

Não há componentes pendentes no momento.

## 7. Identidade visual e acessibilidade

As cores principais estão definidas em `src/styles/global.css`:

| Variável | Valor |
|---|---|
| `--terracota` | `#a44732` |
| `--ocre` | `#d3a64b` |
| `--verde` | `#6c5740` |
| `--marrom` | `#332821` |
| `--bege` | `#f5f0e6` |
| `--branco` | `#ffffff` |

Observação: `--verde` é o nome histórico de uma variável cujo valor atual corresponde a um marrom terroso.

Meta de acessibilidade: WCAG 2.2 nível AA.

Diretrizes:
- Contraste adequado em todos os elementos.
- Foco visível e navegação por teclado.
- HTML semântico e hierarquia correta de títulos.
- Um único `h1` por página.
- Textos alternativos em imagens.
- Elementos interativos com área de toque mínima de 2,75rem.
- Evitar animações desnecessárias.
- Não utilizar texto ocre em fundos claros ou sobre `--verde`.

## 8. Privacidade e LGPD

O site não possui cadastro de visitantes nem coleta intencional de dados pessoais.

Regras essenciais:
- Não divulgar nomes completos de menores, localização ou rotina de estudantes.
- Verificar autorização antes de publicar fotografias identificáveis ou vídeos.
- Cobrir rostos, crachás, nomes em uniformes e demais elementos identificadores antes de inserir imagens no repositório.
- Utilizar tarja sólida opaca ou recorte, nunca desfoque leve ou pixelização.
- Remover metadados EXIF das imagens.
- Não identificar estudantes nos textos alternativos.
- Manter fotografias originais e materiais recebidos em espaço privado.
- Não ativar Web Analytics ou Speed Insights sem atualizar a política de privacidade.
- Não utilizar comentários públicos.

A página `/privacidade/` deverá informar um canal institucional para solicitações de correção ou retirada de materiais.

Os procedimentos completos estão previstos em `docs/privacidade-e-imagens.md`.

## 9. Conteúdo pedagógico e referências

A fundamentação pedagógica, histórica e legal deve utilizar exclusivamente o documento institucional:

**Contexto Geral do Projeto: Letramento Racial na Escola.**

Não criar fundamentação paralela nem inserir referências não confirmadas.

Livro de referência: *Pequeno Manual Antirracista*, de Djamila Ribeiro.

Textos institucionais, biografia da autora, referências e demais informações devem utilizar fontes autorizadas.

## 10. Ambiente e comandos

Ambiente de desenvolvimento:
- Sistema operacional: Windows.
- Terminal: Git Bash.
- Editor: VS Code.
- Node.js LTS.
- Gerenciador de pacotes: npm.

O VS Code deve estar aberto na pasta que contém o `package.json`.

Comandos executados nessa pasta:

```bash
npm install
npm run dev
npm run build
npm run preview
```

Função dos comandos:
- `npm install`: instala as dependências.
- `npm run dev`: inicia o servidor local em `http://localhost:4321`.
- `npm run build`: gera o site estático em `dist/`.
- `npm run preview`: permite visualizar o build localmente.

Não fornecer comandos de PowerShell. Utilizar comandos compatíveis com Git Bash.

## 11. Fluxo de trabalho com Git

- `main` é a branch estável.
- Cada integrante deve trabalhar em sua própria branch.
- Alterações devem ser revisadas por pull request.
- Pull requests geram pré-visualizações na Vercel.
- Push na branch `main` dispara o deploy de produção.

Antes de alterações, conferir:

```bash
git status
```

Após revisar as alterações:

```bash
git add .
git commit -m "mensagem descritiva"
git push origin main
```

Validar os arquivos JSON antes de realizar commits.

## 12. Estado atual

### Concluído

- Projeto Astro e estrutura de pastas.
- Arquivos JSON com dados oficiais.
- CSS global, layout base, cabeçalho e rodapé.
- Página inicial completa com hero/banner compatível com imagem de fundo e contraste WCAG AA.
- Aprimoramentos mobile-first na página inicial (dimensões proporcionais de imagens, botões ergonômicos e redução suave no scroll com respeito a `prefers-reduced-motion`).
- Página de Acervo `/projetos/` completa: listagem de projetos, busca instantânea por palavras-chave, filtros combináveis por categoria e tema oficial, contador de resultados e aviso sobre apresentações estudantis em desenvolvimento.
- Páginas institucionais estruturadas com conteúdo oficial: Sobre o projeto (`/sobre/`), Referências bibliográficas e legais (`/referencias/`) e Privacidade/LGPD com canal institucional de contato (`/privacidade/`).
- Página personalizada de erro 404 (`src/pages/404.astro`).
- Configuração de `site` no `astro.config.mjs` para URLs canônicas em produção.
- Metadados completos de compartilhamento social e mensageiros (Open Graph e Twitter Cards com suporte a imagem de capa customizada por página).
- Módulo `dados.js`.
- Componentes de cartão e demonstração.
- Galeria de imagens.
- Página individual dos projetos.
- Três projetos de educadores cadastrados em demonstração: Felipe Johnny, Felipe Rodrigues e Anderson Santiago.
- Componente Carrossel de capas (`CarrosselCapa.astro`).
- Componente de vídeo do YouTube sob demanda (`VideoYoutube.astro`), integrado à página individual do projeto.
- Guia `docs/preencher-projetos.md`.
- Deploy na Vercel funcionando.
- `CartaoProjeto.astro` tolera projetos sem `temas`, `imagens` ou `videos` (campos ausentes são tratados como lista vazia).
- Pastas e imagens provisórias para projetos de turmas ainda não cadastradas.

### Pendente

- Integração do carrossel em todos os cartões que possuem múltiplas fotos.
- Cadastro das produções e pesquisas dos estudantes conforme as apresentações ocorrerem.
- Script de validação dos dados durante o build.
- Otimização e revisão contínua dos textos alternativos das imagens.

## 13. Decisões técnicas importantes

1. A hospedagem foi transferida da InfinityFree para a Vercel. Não utilizar FTP, `htdocs` ou instruções da hospedagem anterior.
2. Os dados ficam em `src/data/`, e não em uma pasta `data/` na raiz.
3. O filtro de temas utiliza os 18 temas oficiais da escola, não os nove temas genéricos da especificação original.
4. A etapa de ensino é única (Ensino Médio), portanto seu filtro permanece oculto.
5. A estrutura de turmas deve respeitar as informações oficiais fornecidas pela escola.
6. Não criar `public/index.html`, pois ele pode sobrescrever a página inicial gerada pelo Astro na publicação.

O histórico detalhado de decisões, problemas e soluções ficará em `docs/historico-de-decisoes.md`.

## 14. Orientações para continuidade

O projeto é desenvolvido por uma equipe de três pessoas. A pessoa responsável pela programação é iniciante em Astro e Git; as demais colaboram com textos e coleta de imagens.

Toda assistência técnica deve:

1. Trabalhar por etapas e aguardar confirmação antes de avançar.
2. Explicar a finalidade de cada comando.
3. Informar exatamente em qual pasta executar cada comando.
4. Conferir os caminhos relativos dos imports conforme a profundidade do arquivo.
5. Não inventar informações da escola ou dos projetos.
6. Indicar claramente quando uma informação precisa ser confirmada.
7. Priorizar soluções simples, sem dependências desnecessárias.
8. Verificar responsividade, acessibilidade e privacidade antes de propor alterações.
9. Indicar como testar cada implementação e o resultado esperado.
10. Informar quais documentos precisam ser atualizados ao final de cada etapa.

Antes de propor alterações, verificar:
- Estrutura e arquivos existentes.
- Dados em `src/data/`.
- Compatibilidade com a arquitetura estática.
- Integridade dos relacionamentos entre turmas, temas e projetos.
- Privacidade das imagens.
- Acessibilidade e funcionamento mobile.

As instruções permanentes para assistentes de IA serão detalhadas em `AGENTS.md`.
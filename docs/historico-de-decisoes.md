# Histórico de decisões

Este documento registra decisões importantes sobre arquitetura, organização, publicação e desenvolvimento do site Letramento Racial na Escola.

As decisões aqui registradas devem ser consideradas ao propor mudanças no projeto. Uma decisão só deve ser alterada quando houver justificativa clara e avaliação dos impactos.

## 1. Arquitetura e publicação

### 1.1. Site estático com Astro

**Decisão:** utilizar Astro com geração de páginas estáticas (SSG).

**Motivo:** manter o site simples, rápido, econômico e adequado a um projeto escolar.

**Consequências:**
- Não utilizar SSR.
- Não implementar backend.
- Não criar APIs próprias.
- Não adicionar banco de dados.
- Não depender de serviços pagos para o funcionamento essencial.

### 1.2. Hospedagem na Vercel

**Decisão:** utilizar a Vercel para publicação do site.

**Motivo:** facilitar a integração com o repositório Git e a publicação automática das alterações.

**Endereço de produção:** https://letramento-racial.vercel.app

### 1.3. Conteúdo versionado em arquivos

**Decisão:** armazenar os dados do projeto em arquivos JSON dentro de `src/data/`.

**Motivo:** permitir que o conteúdo seja mantido junto ao código, com histórico de alterações e sem necessidade de banco de dados ou painel administrativo.

## 2. Organização dos dados

### 2.1. Centralização dos dados

**Decisão:** utilizar `src/lib/dados.js` como módulo central de leitura, organização e consulta dos dados.

**Consequência:** páginas e componentes devem reutilizar as funções desse módulo, evitando duplicação de regras de relacionamento.

### 2.2. Temas oficiais

**Decisão:** manter os 18 temas oficiais do projeto como referência para a organização das produções.

**Consequência:** não criar, renomear ou atribuir temas por conta própria. Alterações devem ser confirmadas com a equipe responsável.

### 2.3. Turmas e etapas

**Decisão:** manter a estrutura de etapas, séries, cursos e turmas definida em `turmas.json`.

**Consequência:** não presumir que letras de turmas sejam únicas entre séries ou cursos. Utilizar os identificadores definidos nos dados.

### 2.4. Projetos de demonstração

**Decisão:** identificar conteúdos fictícios ou provisórios com `demonstracao: true`.

**Consequência:** projetos de demonstração devem exibir aviso claro ao visitante e não podem ser apresentados como produções reais de estudantes.

## 3. Privacidade e segurança

**Decisão:** priorizar a proteção de estudantes em todas as etapas de produção e publicação.

**Consequências:**
- Não publicar dados pessoais desnecessários.
- Não divulgar nomes completos de menores.
- Verificar autorizações antes de publicar imagens identificáveis.
- Proteger rostos e outros elementos identificadores quando necessário.
- Não colocar imagens originais ou materiais privados no repositório.
- Não inventar autorizações, créditos ou informações.

Os procedimentos completos estão em `privacidade-e-imagens.md`.

## 4. Interface e identidade visual

**Decisão:** manter uma identidade visual editorial, acolhedora e legível, com foco em leitura e acessibilidade.

**Consequências:**
- Utilizar as fontes Fraunces Variable e Source Sans 3 Variable.
- Preservar a paleta de cores definida no projeto.
- Desenvolver prioritariamente para dispositivos móveis.
- Observar os critérios WCAG 2.2 nível AA.
- Evitar elementos decorativos que prejudiquem a leitura ou a navegação.

## 5. Organização de componentes

**Decisão:** reutilizar componentes para estruturas compartilhadas entre páginas.

Componentes já identificados no projeto:

- `Base`
- `Cabeçalho`
- `Rodapé`
- `CartaoProjeto`
- `AvisoDemonstracao`
- `GaleriaFotos`
- `CarrosselCapa`

Antes de criar um novo componente, verificar se algum dos existentes pode ser reutilizado ou adaptado sem comprometer sua função.

## 6. Decisões de implementação

### 6.1. Não criar uma página inicial HTML independente

**Decisão:** não criar `public/index.html`.

**Motivo:** a página inicial deve ser gerada pelo Astro, mantendo a organização das rotas e dos layouts do projeto.

### 6.2. Vídeos externos

**Decisão:** carregar incorporações do YouTube sob demanda, evitando carregamento desnecessário de conteúdo externo.

### 6.3. Links e elementos interativos

**Decisão:** todo link e controle interativo deve ter uma função real e compreensível.

Não manter botões sem ação ou links sem destino funcional.

## 7. Processo de desenvolvimento

- Fazer alterações pequenas e verificáveis.
- Preservar a estrutura existente sempre que possível.
- Conferir imports e caminhos antes de concluir uma alteração.
- Executar os testes ou comandos de validação disponíveis.
- Conferir o resultado no navegador, incluindo a versão móvel.
- Atualizar a documentação quando uma decisão estrutural mudar.
- Não remover conteúdo ou funcionalidades sem verificar seu impacto.

## 8. Registro de novas decisões

### 8.1. Imagem de fundo e contraste no banner da página inicial (22/11/2026)

- **Contexto:** o banner principal da página inicial utilizava um padrão gráfico repetido de listras marrons diagonais (`repeating-linear-gradient`), que conferia um aspecto visual estático e pouco fotográfico.
- **Decisão adotada:** remover o padrão listrado e configurar a seção `.banner` para receber uma imagem de fundo (`/images/banner.webp`), combinada a uma camada de sobreposição escura (`rgba(51, 40, 33, 0.78)` baseada na variável `--marrom`).
- **Justificativa:** modernizar a apresentação visual do topo da página inicial e assegurar conformidade com os critérios WCAG 2.2 AA de contraste entre o texto em `--bege` e a fotografia de fundo.
- **Impactos:** a seção agora aceita imagens de fundo responsivas com corte centralizado (`cover`) e mantém fallback sólido seguro caso o arquivo de imagem não seja encontrado.

### 8.2. Abordagem Mobile-First e redução de imagens em destaque no scroll (23/11/2026)

- **Contexto:** em smartphones e telas estreitas, fotografias verticais (como o retrato da autora e a capa do livro) expandiam para 100% da largura, ocupando a altura vertical inteira da tela e empurrando o texto para baixo.
- **Decisão adotada:**
  1. Definir proporção controlada para imagens no mobile (`max-width: 17.5rem` / ~280px centralizadas), expandindo para 100% da coluna apenas a partir de telas médias (`min-width: 48em`).
  2. Implementar redução suave da imagem conforme o scroll da página avança (escala de 1 para 0.85), utilizando CSS nativo (`animation-timeline: view()`) com fallback leve em JavaScript para navegadores sem suporte.
  3. Desativar qualquer efeito de escala quando `prefers-reduced-motion: reduce` estiver ativo.
  4. Adaptar a largura dos botões de ação no mobile (`width: 100%; max-width: 22rem;`) para ergonomia de toque com o polegar.
- **Justificativa:** priorizar a experiência em dispositivos móveis, melhorar a hierarquia visual e a leitura do conteúdo sem prejudicar a acessibilidade.
- **Impactos:** navegação mais equilibrada e fluida em dispositivos móveis, com conformidade total às diretrizes de movimento reduzido.

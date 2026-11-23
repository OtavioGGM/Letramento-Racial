# Instruções para assistentes de IA

Estas instruções se aplicam a qualquer assistente de IA que analise, edite ou desenvolva o projeto Letramento Racial na Escola.

Leia este arquivo e o `README.md` antes de realizar alterações. Consulte também os documentos específicos em `docs/` quando necessário.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## 1. Contexto do projeto

O projeto é um site institucional e acervo digital de Letramento Racial da E. E. Profª Carolina Cintra da Silveira, voltado ao Ensino Médio.

O site apresenta:
- O projeto pedagógico.
- O livro de referência.
- A autora.
- Os temas trabalhados.
- As produções de estudantes e educadores.

O conteúdo deve respeitar o contexto escolar, valorizar a educação antirracista e preservar a identidade e a privacidade dos estudantes.

## 2. Regras técnicas obrigatórias

- O projeto utiliza Astro com geração estática (SSG).
- Manter o site 100% estático.
- Não implementar SSR, backend, APIs próprias ou banco de dados.
- Não criar painel administrativo.
- Não introduzir dependências pagas para funcionalidades essenciais.
- Manter os dados em arquivos JSON dentro de `src/data/`.
- Respeitar a estrutura e os padrões já existentes.
- Não criar `public/index.html`.
- Não alterar a hospedagem ou a arquitetura sem autorização.

## 3. Antes de alterar o código

1. Ler o `README.md`.
2. Consultar os documentos relevantes em `docs/`.
3. Inspecionar os arquivos existentes antes de propor substituições.
4. Identificar dependências, imports e componentes relacionados.
5. Entender como a funcionalidade atual funciona.
6. Fazer a menor alteração que resolva o problema.

Nunca presumir que um arquivo, componente, função ou campo existe sem verificar.

## 4. Dados e conteúdo

Os arquivos de dados ficam em `src/data/`.

O módulo `src/lib/dados.js` centraliza a leitura e a organização dos dados.

Regras:
- Não duplicar dados que já existem nos arquivos JSON.
- Não inventar nomes, turmas, temas, projetos, datas, créditos ou informações institucionais.
- Não modificar identificadores sem avaliar as relações que dependem deles.
- Não criar temas além dos 18 temas oficiais sem confirmação.
- Não presumir que letras de turmas sejam únicas entre séries ou cursos.
- Não apresentar conteúdo fictício como produção real.
- Projetos de demonstração devem utilizar `demonstracao: true` e exibir o aviso correspondente.
- Não publicar projetos que ainda não tenham sido aprovados.

Consulte `docs/modelo-de-dados.md` antes de modificar a estrutura dos dados.

## 5. Privacidade e imagens

A proteção de estudantes tem prioridade sobre qualquer decisão de design ou divulgação.

Nunca:
- Expor nomes completos de estudantes menores.
- Inventar autorizações para uso de imagens.
- Publicar fotografias identificáveis sem autorização adequada.
- Colocar imagens originais ou materiais privados no repositório.
- Expor crachás, documentos, endereços ou informações de rotina.

Verificar imagens, textos alternativos, nomes de arquivos e metadados antes da publicação.

Consulte obrigatoriamente `docs/privacidade-e-imagens.md` ao trabalhar com fotografias, vídeos ou informações pessoais.

## 6. Interface e acessibilidade

- Preservar a identidade visual do projeto.
- Manter a abordagem mobile-first.
- Utilizar as fontes e cores já definidas.
- Respeitar os critérios WCAG 2.2 nível AA.
- Manter contraste adequado.
- Utilizar HTML semântico.
- Garantir navegação por teclado.
- Utilizar textos alternativos apropriados nas imagens.
- Não adicionar emojis à interface.
- Evitar animações e efeitos que prejudiquem a leitura.
- Não criar links ou botões sem função real.

## 7. Componentes e organização

Antes de criar componentes novos, verificar os existentes.

Reutilizar estruturas compartilhadas quando apropriado, sem concentrar responsabilidades diferentes em um único componente.

Respeitar os padrões de nomenclatura e organização já utilizados no projeto.

Não mover arquivos ou reorganizar diretórios sem necessidade concreta.

## 8. Forma de trabalhar

O responsável pelo projeto está aprendendo desenvolvimento web e utiliza Windows, VS Code e Git Bash.

Por isso:
- Trabalhar em etapas pequenas.
- Explicar o objetivo de cada alteração.
- Informar o caminho exato dos arquivos envolvidos.
- Explicar comandos de terminal e indicar em qual pasta devem ser executados.
- Preferir instruções pelo Explorador de Arquivos e VS Code quando forem suficientes.
- Não presumir conhecimento avançado de Git, Astro ou JavaScript.
- Aguardar confirmação antes de avançar para uma etapa diferente.
- Não executar várias mudanças independentes de uma só vez.

Ao apresentar código:
- Informar o nome e o caminho do arquivo.
- Indicar se o conteúdo deve ser substituído integralmente ou se é apenas um trecho.
- Preservar partes existentes que não precisam ser alteradas.
- Explicar alterações relevantes e possíveis impactos.

## 9. Verificação obrigatória

Depois de alterações no código:

1. Verificar se os arquivos estão sintaticamente corretos.
2. Conferir imports e caminhos.
3. Verificar se os dados JSON continuam válidos.
4. Executar os comandos de validação disponíveis.
5. Executar `npm run build` quando a alteração justificar.
6. Verificar as páginas afetadas no navegador.
7. Conferir a apresentação em dispositivos móveis.
8. Verificar acessibilidade e privacidade quando aplicável.

Não afirmar que algo foi testado se o teste não foi executado.

Não afirmar que o build foi concluído com sucesso sem verificar o resultado.

## 10. Git e publicação

Antes de sugerir comandos Git:
- Explicar o que cada comando faz.
- Informar a pasta em que deve ser executado.
- Alertar sobre operações que possam apagar ou sobrescrever alterações.

Não executar nem recomendar operações destrutivas sem explicar seus efeitos.

Não publicar alterações automaticamente sem autorização do responsável.

## 11. Documentação

Consultar os documentos conforme o assunto:

- `README.md`: visão geral, arquitetura, rotas e estado do projeto.
- `docs/modelo-de-dados.md`: estrutura e relações dos dados.
- `docs/preencher-projetos.md`: orientações para cadastrar projetos.
- `docs/privacidade-e-imagens.md`: proteção de dados e uso de imagens.
- `docs/historico-de-decisoes.md`: decisões técnicas e estruturais.

Quando uma mudança alterar uma regra ou decisão documentada, atualizar o documento correspondente.

## 12. Prioridades

Em caso de conflito, seguir esta ordem:

1. Segurança e privacidade dos estudantes.
2. Integridade das informações pedagógicas.
3. Requisitos técnicos e arquitetura estabelecida.
4. Acessibilidade e usabilidade.
5. Identidade visual.
6. Conveniência de implementação.

Não sacrificar as prioridades anteriores para facilitar o desenvolvimento.
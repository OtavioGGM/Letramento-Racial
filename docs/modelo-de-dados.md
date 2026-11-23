# Modelo de Dados — Letramento Racial na Escola

Este documento descreve a estrutura dos arquivos JSON utilizados pelo site, suas relações e as regras para cadastro e manutenção dos dados.

Todos os arquivos ficam em `src/data/`. O acesso aos dados deve ser centralizado em `src/lib/dados.js`.

## 1. Arquivo `turmas.json`

Contém as etapas de ensino, séries, cursos e turmas cadastradas pela escola.

Estrutura:

```json
{
  "etapas": [
    "Ensino Médio"
  ],
  "series": [
    "1ª série",
    "2ª série",
    "3ª série"
  ],
  "cursos": [
    {
      "sigla": "REG",
      "nome": "Ensino Médio regular"
    },
    {
      "sigla": "ADM",
      "nome": "Administração"
    },
    {
      "sigla": "DS",
      "nome": "Desenvolvimento de Sistemas"
    }
  ],
  "turmas": [
    {
      "id": "2c-adm",
      "rotulo": "2º C ADM",
      "serie": "2ª série",
      "curso": "ADM"
    }
  ]
}
```

### Regras

- `id` deve ser único, em minúsculas, sem espaços e sem acentos.
- Turmas de cursos técnicos devem ter o sufixo correspondente.
- `serie` deve corresponder a um item de `series`.
- `curso` deve corresponder a uma sigla cadastrada em `cursos`.
- `REG` identifica o Ensino Médio regular.
- `ADM` significa Administração.
- `DS` significa Desenvolvimento de Sistemas.
- Não criar turmas sem confirmação da escola.
- O filtro de etapa de ensino permanece oculto enquanto houver apenas uma etapa.

### Turmas da 2ª série

A escola confirmou seis turmas:

| Identificador | Rótulo | Curso |
|---|---|---|
| `2a-ds` | 2º A DS | DS |
| `2b` | 2º B | REG |
| `2c-adm` | 2º C ADM | ADM |
| `2d-adm` | 2º D ADM | ADM |
| `2e-ds` | 2º E DS | DS |
| `2f` | 2º F | REG |

Não existem turmas 2º A, 2º C, 2º D ou 2º E do Ensino Médio regular.

Na 3ª série, uma mesma letra pode existir em cursos diferentes. Por exemplo, 3º A regular e 3º A ADM; 3º B regular e 3º B DS.

A lista completa das demais turmas deve ser conferida com a escola.

## 2. Arquivo `temas.json`

Contém os temas oficiais do projeto e os itens reservados para futuras inclusões.

Estrutura de um item:

```json
{
  "id": "cinema-negro",
  "nome": "Cinema negro",
  "turmaId": "2c-adm",
  "numero": 18
}
```

### Regras

- `id` é único e segue o padrão de nomes em minúsculas, sem acentos e com hífen.
- `nome` contém o título do tema.
- `turmaId` deve corresponder a um identificador existente em `turmas.json`.
- `numero` é numérico e serve para ordenar os temas.
- Todos os registros devem utilizar o campo `numero`.
- Itens cujo nome começa com `(INSERIR` são reservas e não aparecem no site.
- O nome do tema é utilizado nos filtros e cartões.
- O número não deve ser utilizado como rótulo de exibição.

### Temas oficiais e suas turmas

| Número | Tema atribuído à turma |
|---|---|
| 1 | 2º E DS |
| 2 | 2º A DS |
| 3 | 3º B |
| 4 | 3º C |
| 5 | 2º D ADM |
| 6 | 1º E |
| 7 | 3º A ADM |
| 8 | 1º A |
| 9 | 2º B |
| 10 | 1º B |
| 11 | 3º A |
| 12 | 3º B DS |
| 13 | 1º F |
| 14 | 1º G |
| 15 | 1º C |
| 16 | 1º D |
| 17 | 2º F |
| 18 | 2º C ADM |

Existem 18 temas oficiais. Os itens a partir do número 19 são reservas até que a escola forneça os conteúdos correspondentes.

## 3. Arquivo `projetos.json`

Armazena os projetos pedagógicos produzidos por turmas e educadores.

Cada projeto é um objeto com a seguinte estrutura:

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

### Descrição dos campos

| Campo | Função |
|---|---|
| `id` | Identificador único do projeto |
| `slug` | Nome utilizado na URL |
| `titulo` | Título do projeto |
| `descricao` | Apresentação do trabalho |
| `objetivoPedagogico` | Objetivo pedagógico |
| `categoria` | `turma` ou `educador` |
| `turmaId` | Identificador da turma, quando aplicável |
| `ano` | Ano de realização |
| `professorResponsavel` | Responsável pelo projeto |
| `disciplinas` | Lista de disciplinas envolvidas |
| `temas` | Lista de identificadores dos temas |
| `imagemCapa` | Caminho da imagem de capa |
| `imagemCapaAlt` | Texto alternativo da capa |
| `imagens` | Lista de imagens da galeria |
| `videos` | Lista de vídeos incorporados |
| `creditos` | Créditos dos materiais |
| `dataPublicacao` | Data de publicação |
| `destaque` | Define se aparece na página inicial |
| `publicado` | Define se o projeto pode ser exibido |
| `demonstracao` | Identifica conteúdo demonstrativo |

### Regras

- `categoria` aceita somente `turma` ou `educador`.
- Projetos de turma devem referenciar uma turma existente em `turmaId`.
- Série e curso são derivados dos dados da turma.
- Projetos de educadores não devem receber turma inventada.
- `temas` deve conter identificadores existentes em `temas.json`.
- `disciplinas`, `temas`, `imagens` e `videos` são listas.
- `publicado: false` impede a exibição do projeto.
- `destaque: true` permite sua exibição na página inicial.
- A página inicial deve apresentar entre três e seis projetos em destaque, quando houver quantidade suficiente de projetos publicados.
- Projetos de demonstração devem ter `demonstracao: true` e aviso visível.
- Toda imagem deve possuir texto alternativo adequado.
- Os caminhos das imagens devem corresponder aos arquivos existentes em `public/`.
- Vídeos devem ser incorporados do YouTube, sem armazenar arquivos de vídeo no repositório.

O arquivo atualmente possui projetos de demonstração. Não transformar exemplos em projetos reais sem receber e confirmar o conteúdo correspondente.

## 4. Relações entre os arquivos

Os arquivos possuem relações que precisam ser preservadas.

```text
turmas.json
    │
    ├── Define séries
    ├── Define cursos
    └── Define turmas
             │
             └── temas.json
                    │
                    └── projetos.json
                           │
                           ├── Turma responsável
                           ├── Temas relacionados
                           └── Imagens e vídeos
```

Regras de integridade:

1. Cada `turmaId` em `temas.json` deve existir em `turmas.json`.
2. Cada `turmaId` de projeto da categoria `turma` deve existir em `turmas.json`.
3. Cada identificador dentro de `temas` deve existir em `temas.json` e corresponder a um tema válido.
4. Os identificadores de turmas e projetos devem ser únicos em seus respectivos arquivos.
5. As imagens cadastradas devem existir e possuir texto alternativo.
6. Itens reservados de temas não devem ser exibidos como conteúdo oficial.

## 5. Módulo `src/lib/dados.js`

Este módulo centraliza a leitura, filtragem e disponibilização dos arquivos JSON.

Páginas e componentes devem importar os dados exclusivamente desse módulo, evitando imports diretos dos arquivos JSON.

Exportações previstas:

| Exportação | Função |
|---|---|
| `turmas` | Lista de turmas |
| `temasValidos` | Temas sem os itens reservados |
| `getTurma(id)` | Busca turma pelo identificador |
| `getTema(id)` | Busca tema válido pelo identificador |
| `projetosPublicados` | Projetos publicados, ordenados do mais recente para o mais antigo |
| `projetosDestaque` | Até seis projetos publicados marcados como destaque |

## 6. Validação dos dados

Está prevista a criação de um script de validação executado durante o build.

O objetivo é impedir a publicação quando houver:

- JSON com sintaxe inválida.
- Identificadores duplicados.
- Turmas inexistentes.
- Temas inexistentes ou inválidos.
- Referências incorretas entre arquivos.
- Imagens inexistentes.
- Imagens sem texto alternativo.
- Valores inválidos para campos com opções limitadas.

A mensagem de erro deverá indicar o arquivo e o registro que precisam ser corrigidos.

Até a implementação dessa validação automática, os arquivos devem ser conferidos manualmente antes de cada commit.

## 7. Cuidados ao alterar os dados

- Alterar um `id` de turma exige atualizar todas as referências em `temas.json` e `projetos.json`.
- Não substituir `numero` por outro nome de campo em `temas.json`.
- Não cadastrar cursos, turmas ou temas sem confirmação da escola.
- Não preencher campos institucionais com informações presumidas.
- Não remover projetos sem verificar suas referências e imagens.
- Validar a sintaxe JSON antes de realizar commits.

Para validar manualmente um arquivo, pode-se utilizar o comando:

```bash
node -e "JSON.parse(require('fs').readFileSync('src/data/turmas.json','utf8')); console.log('OK')"
```

Executar na raiz do projeto, onde está o `package.json`.

## 8. Documentos relacionados

- `README.md`: visão geral e estado do projeto.
- `AGENTS.md`: instruções para assistentes de IA.
- `docs/preencher-projetos.md`: orientações para cadastrar projetos.
- `docs/privacidade-e-imagens.md`: regras de proteção de imagens e dados.
- `docs/historico-de-decisoes.md`: decisões técnicas e problemas encontrados.
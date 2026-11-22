# Guia: como cadastrar e preencher projetos

Este guia é para quem for editar `src/data/projetos.json`. Ele explica cada campo, onde colocar as imagens, como validar e como publicar. Leia também o `README.md` da raiz, principalmente as seções de privacidade e regras obrigatórias.

## Visão geral

O site não tem páginas manuais para projetos. Tudo vem do arquivo `src/data/projetos.json`:

- Cada objeto do arquivo vira um cartão na página inicial (se `destaque: true`), no acervo `/projetos/` (quando o acervo estiver pronto) e uma página própria em `/projetos/<slug>/`.
- Para criar um projeto, copie um bloco existente, troque os valores e salve. Para tirar do site, mude `publicado` para `false`.
- O site é estático. Depois de editar, o deploy na Vercel acontece quando a alteração chega à branch `main`.

## Fluxo de trabalho

1. Crie ou atualize sua branch (`git pull origin main`).
2. Prepare as imagens (seção "Preparar as imagens").
3. Copie as imagens para a pasta correta em `public/images/projetos/`.
4. Edite `src/data/projetos.json`.
5. Valide o JSON (seção "Validar").
6. Rode `npm run dev` e confira cartão e página individual no navegador.
7. Faça commit e abra pull request, ou envie à `main` se combinado com a equipe.

## Campos do projeto

| Campo | Tipo | Obrigatório | Descrição |
|---|---|---|---|
| `id` | texto | sim | Identificador único. Sugestão: `educador-004`, `turma-001`. Nunca repetir |
| `slug` | texto | sim | Parte final da URL. Minúsculas, sem acento, sem espaço, com hífen. Único. Não mudar depois de publicado, pois o link muda |
| `titulo` | texto | sim | Título do projeto |
| `descricao` | texto | sim | Resumo curto, de uma a três frases. Aparece no cartão e na página |
| `objetivoPedagogico` | texto | não | Objetivo do trabalho. Pode ficar vazio |
| `categoria` | texto | sim | `turma` ou `educador` |
| `turmaId` | texto | só se `categoria` for `turma` | `id` existente em `src/data/turmas.json`. Para `educador`, deixar `""` |
| `ano` | número | sim | Ano de realização, sem aspas (exemplo: `2026`) |
| `professorResponsavel` | texto | só se `categoria` for `educador` | Nome do professor ou da equipe. Em projeto de turma, pode ser o orientador, se a escola autorizar divulgar | 
| `disciplinas` | lista de textos | não | Exemplo: `["História", "Arte"]` |
| `temas` | lista de `id` | não | `id` existentes em `src/data/temas.json`. Projetos de educadores podem deixar `[]` |
| `imagemCapa` | texto | recomendado | Caminho da capa, começando por `/images/` |
| `imagemCapaAlt` | texto | obrigatório se houver capa | Texto alternativo da capa |
| `imagens` | lista de objetos | não | Galeria de fotos (formato abaixo) |
| `videos` | lista de objetos | não | Vídeos do YouTube (formato abaixo) |
| `creditos` | texto | não | Autoria de fotos e materiais |
| `dataPublicacao` | texto | sim | Formato `AAAA-MM-DD`. Define a ordem: mais recentes primeiro |
| `destaque` | verdadeiro/falso | sim | `true` mostra o projeto na página inicial. Manter de três a seis destaques |
| `publicado` | verdadeiro/falso | sim | `false` esconde o projeto de todo o site |
| `demonstracao` | verdadeiro/falso | sim | `true` exibe o selo "Conteúdo de demonstração". Trocar para `false` só quando o conteúdo for real e autorizado |

## Formato de `imagens` e `videos`

O formato de `imagens` é definitivo e já é lido pelo componente `GaleriaFotos`. O formato de `videos` é proposto e será usado pelo componente `VideoYoutube`, ainda não criado. Se a equipe mudar o formato de vídeos, atualize este guia e o README junto com o componente.

Cada item de `imagens` deve ser um objeto. Texto puro funciona na galeria, mas gera texto alternativo provisório.

```json
"imagens": [
  {
    "src": "/images/projetos/educadores/nome-do-projeto/foto-01.webp",
    "alt": "Descrição objetiva da cena, sem identificar estudantes",
    "legenda": ""
  }
],
"videos": [
  {
    "url": "https://www.youtube.com/watch?v=CODIGO_DO_VIDEO",
    "titulo": "Título do vídeo",
    "descricao": ""
  }
]
```

Regras:

- Toda imagem precisa de `alt`. O build deverá falhar sem ele (validação planejada).
- Vídeos não ficam no repositório. Só links do YouTube, carregados quando a pessoa clica.
- Antes de usar um vídeo, confirme a configuração de privacidade dele e a autorização de divulgação.

## Onde colocar as imagens

Crie uma subpasta por projeto, com o `slug` como nome:

```text
public/images/projetos/
├── educadores/
│   └── <slug-do-projeto>/
│       ├── capa.webp
│       ├── foto-01.webp
│       └── foto-02.webp
└── turmas/
    └── <slug-do-projeto>/
```

O caminho no JSON começa em `/images/`, sem `public`. Exemplo: o arquivo `public/images/projetos/educadores/blues-como-protesto/capa.webp` vira `"/images/projetos/educadores/blues-como-protesto/capa.webp"`.

Nomes de arquivo: minúsculas, sem acento, sem espaço, com hífen. Maiúsculas e minúsculas importam na Vercel, então o nome no JSON precisa ser idêntico ao do arquivo.

## Preparar as imagens

Faça tudo isto antes de copiar a imagem para o repositório. Arquivos enviados ao GitHub permanecem no histórico, mesmo depois de apagados.

1. **Confirme a autorização de uso de imagem.** Sem autorização, a foto não entra.
2. **Cubra os rostos de estudantes** com tarja sólida opaca ou recorte. Evite desfoque leve e pixelização.
3. **Cubra crachás, nomes em uniformes ou cadernos** e qualquer texto que identifique alguém.
4. **Use programa local** (Paint, Fotos do Windows, GIMP). Evite editores online, porque a imagem de menores seria enviada a terceiros.
5. **Remova os metadados (EXIF).** No Windows: botão direito na imagem, Propriedades, aba Detalhes, "Remover Propriedades e Informações Pessoais".
6. **Reduza o tamanho.** Recomendação: largura máxima de 1600 px para fotos da galeria e cerca de 1200 px para a capa, em WebP ou JPG comprimido. Arquivos menores deixam o site mais rápido no celular.
7. **Guarde os originais fora do repositório**, ou em uma pasta `originais/` listada no `.gitignore`.

Texto alternativo: descreva a cena, sem nomes. Exemplo bom: "Estudantes apresentando cartazes em sala de aula, com os rostos cobertos". Exemplo ruim: "Maria e João apresentando o trabalho".

## Exemplo de projeto de educador preenchido

Os valores abaixo são fictícios e servem só de modelo. Não copie o texto para o site.

```json
{
  "id": "educador-004",
  "slug": "exemplo-de-projeto",
  "titulo": "Título do projeto",
  "descricao": "Resumo curto do que foi feito e com qual finalidade.",
  "objetivoPedagogico": "O que os estudantes deveriam aprender ou refletir.",
  "categoria": "educador",
  "turmaId": "",
  "ano": 2026,
  "professorResponsavel": "Nome do professor",
  "disciplinas": ["Disciplina"],
  "temas": [],
  "imagemCapa": "/images/projetos/educadores/exemplo-de-projeto/capa.webp",
  "imagemCapaAlt": "Descrição da capa, sem identificar estudantes",
  "imagens": [
    {
      "src": "/images/projetos/educadores/exemplo-de-projeto/foto-01.webp",
      "alt": "Descrição da foto, sem identificar estudantes",
      "legenda": ""
    }
  ],
  "videos": [],
  "creditos": "Fotografias: equipe do projeto",
  "dataPublicacao": "2026-11-18",
  "destaque": false,
  "publicado": true,
  "demonstracao": false
}
```

## Exemplo de projeto de turma

Mude `categoria` para `turma`, informe `turmaId` e deixe `professorResponsavel` (Em projetos de turma o site mostra o rótulo da turma, e não este campo.) conforme a política da escola:

```json
{
  "categoria": "turma",
  "turmaId": "3b-ds",
  "temas": ["racismo-estrutural-bases-historicas"]
}
```

Estes são apenas os campos que mudam. O objeto completo continua com todos os campos da tabela. O `turmaId` precisa existir em `src/data/turmas.json` e cada item de `temas` precisa existir em `src/data/temas.json`. Temas com nome iniciado por `(INSERIR` são reservas e não aparecem no site.

## Substituir projeto de demonstração por projeto real

1. Preencha `descricao`, `objetivoPedagogico`, `disciplinas`, `imagemCapa`, `imagemCapaAlt`, `imagens` e `creditos`.
2. Confirme autorização e rostos cobertos.
3. Troque `"demonstracao": true` por `"demonstracao": false`.
4. Não altere `slug` se o link já foi divulgado.

## Regras de sintaxe do JSON

- Aspas duplas em todas as chaves e textos. Aspas simples não funcionam.
- Sem vírgula depois do último item de um objeto ou de uma lista.
- Entre um objeto e o próximo, uma vírgula.
- Sem comentários dentro do arquivo.
- Números (`ano`) e valores verdadeiro/falso (`true`, `false`) ficam sem aspas.
- Acentos são permitidos nos textos. O arquivo deve ser salvo em UTF-8.
- Se um texto precisar de aspas duplas, escreva `\"` dentro dele.

## Validar antes de enviar

Rode na raiz do projeto (pasta do `package.json`), no Git Bash. O script confere sintaxe, `id` e `slug` repetidos, `turmaId` e temas inexistentes, imagens sem texto alternativo e arquivos de imagem que não existem.
Use o Git Bash, na pasta do package.json. No PowerShell o heredoc e o grep não funcionam.

```bash
node <<'EOF'
const fs = require('fs');
const projetos = JSON.parse(fs.readFileSync('src/data/projetos.json', 'utf8'));
const turmas = new Set(JSON.parse(fs.readFileSync('src/data/turmas.json', 'utf8')).turmas.map(t => t.id));
const temas = new Set(JSON.parse(fs.readFileSync('src/data/temas.json', 'utf8')).map(t => t.id));
const ids = new Set(), slugs = new Set();
let erros = 0;
const erro = (p, msg) => { console.log(p.id + ': ' + msg); erros++; };
const existe = (caminho) => fs.existsSync('public' + caminho);

projetos.forEach(p => {
  if (ids.has(p.id)) erro(p, 'id repetido');
  if (slugs.has(p.slug)) erro(p, 'slug repetido');
  ids.add(p.id); slugs.add(p.slug);
  if (!['turma', 'educador'].includes(p.categoria)) erro(p, 'categoria invalida');
  if (p.categoria === 'turma' && !turmas.has(p.turmaId)) erro(p, 'turmaId inexistente: ' + p.turmaId);
  if (p.categoria === 'educador' && !p.professorResponsavel) erro(p, 'professorResponsavel vazio');
  (p.temas || []).forEach(t => { if (!temas.has(t)) erro(p, 'tema inexistente: ' + t); });
  if (p.imagemCapa && !p.imagemCapaAlt) erro(p, 'capa sem texto alternativo');
  if (p.imagemCapa && !existe(p.imagemCapa)) erro(p, 'arquivo da capa nao encontrado: ' + p.imagemCapa);
  (p.imagens || []).forEach(i => {
    if (typeof i === 'string') { erro(p, 'imagem deve ser objeto com src e alt: ' + i); return; }
    if (!i.alt) erro(p, 'imagem sem alt: ' + i.src);
    else if (/^Fotografia \d+ do projeto/.test(i.alt)) console.log(p.id + ': AVISO alt provisorio: ' + i.src);
    if (!existe(i.src)) erro(p, 'arquivo nao encontrado: ' + i.src);
  });
});
console.log(erros ? erros + ' erro(s)' : 'projetos.json OK (' + projetos.length + ' projetos)');
EOF
```

Resultado esperado: `projetos.json OK`. Se aparecer erro de sintaxe com posição, procure vírgula faltando ou sobrando perto dessa posição.

## Conferir no navegador

```bash
npm run dev
```

Abra `http://localhost:4321` e verifique:

1. O cartão do projeto aparece na página inicial (se `destaque: true`).
2. Categoria, responsável, ano e imagem de capa estão corretos.
3. O selo "Conteúdo de demonstração" aparece só em projetos com `demonstracao: true`.
4. O link do cartão abre `/projetos/<slug>/` sem erro 404.
5. Nenhuma foto mostra rosto, crachá ou nome legível.

## Publicar

```bash
git status
git add .
git commit -m "Cadastra projeto <nome do projeto>"
git push origin main
```

Antes do `git add .`, confira em `git status` que nenhuma foto sem censura está na lista.

## Problemas comuns

| Sintoma | Causa provável |
|---|---|
| Página não abre após `npm run dev` | Erro de sintaxe no JSON (vírgula, aspas) |
| Imagem não aparece no cartão | Caminho errado, nome com maiúscula diferente do arquivo ou `public` incluído no caminho |
| Cartão não aparece na página inicial | `publicado` ou `destaque` está `false` |
| Página individual dá 404 | `slug` mudou, ou o projeto está com `publicado: false` |
| Dois projetos sobrescrevem um ao outro | `slug` repetido |
| Erro em `turmaId` | `id` da turma não existe em `turmas.json` (exemplo: `2c` em vez de `2c-adm`) |
| Página inicial em branco só no site publicado | Existe `public/index.html`, que sobrescreve `src/pages/index.astro`. Apagar o arquivo |

## Regras que não podem ser quebradas

- Publicar foto somente com autorização e somente com rostos cobertos.
- Não inventar descrição, objetivo ou créditos. Se faltar informação, deixe o campo vazio ou com texto provisório claramente marcado e mantenha `demonstracao: true`.
- Usar somente caracteres e simbolos. Nunca usar emojis em textos do site.
- Não pode armazenar vídeos no repositório.

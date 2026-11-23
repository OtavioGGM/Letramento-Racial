# Privacidade e uso de imagens

Este documento estabelece os cuidados obrigatórios para publicar conteúdos no site Letramento Racial na Escola, especialmente materiais que envolvam estudantes menores de idade.

## 1. Princípios gerais

- O site não deve cadastrar visitantes nem coletar dados pessoais.
- Não deve oferecer comentários públicos ou áreas de interação que exponham estudantes.
- Não divulgar nomes completos de estudantes menores de idade.
- Não publicar informações que revelem endereço, localização precisa, horários, rotinas ou outros dados que possam identificar ou localizar estudantes.
- Não inventar autorizações, créditos, nomes ou informações institucionais.
- Em caso de dúvida sobre a possibilidade de publicação, não publicar até obter orientação da escola.

## 2. Autorização para uso de imagens

Antes de publicar fotografias ou vídeos em que estudantes possam ser identificados, deve existir autorização adequada, conforme os procedimentos institucionais da escola.

A existência de uma fotografia em atividade escolar não significa autorização automática para divulgação na internet.

Quando não houver confirmação da autorização, o material não deve ser publicado de forma identificável.

## 3. Preparação das imagens

Toda imagem deve ser revisada antes de entrar no repositório do projeto.

Quando não houver autorização para identificação, aplicar uma destas medidas:

- Cobrir completamente o rosto com uma tarja sólida e opaca.
- Recortar a imagem para remover a pessoa identificável.

Não utilizar desfoque leve ou pixelização como única proteção. Essas técnicas podem permitir a identificação ou recuperação parcial de características.

Também devem ser ocultados:

- Crachás e cartões de identificação.
- Nomes em uniformes.
- Nomes escritos em cadernos, trabalhos ou cartazes.
- Telas, documentos e outros elementos que revelem informações pessoais.
- Placas, endereços ou referências de localização que possam expor estudantes.

Remover os metadados EXIF das imagens antes da publicação, especialmente informações de localização, data e dispositivo.

Os textos alternativos (`alt`) devem descrever o conteúdo visual de forma objetiva, sem identificar estudantes.

## 4. Armazenamento e versionamento

- Fotografias originais e materiais recebidos devem permanecer em espaço privado e autorizado.
- Arquivos originais não devem ser colocados no repositório Git.
- Somente versões revisadas e aprovadas podem entrar na pasta pública do projeto.
- Não utilizar nomes de arquivos que exponham nomes completos ou outros dados pessoais.
- Conferir o conteúdo antes de executar `git add` e `git commit`.

**Atenção:** apagar um arquivo do projeto não significa removê-lo do histórico do Git. Um arquivo publicado por engano pode continuar acessível em versões anteriores do repositório.

Por isso, nunca realizar commit de uma fotografia sem a proteção necessária.

## 5. Procedimento antes de publicar

Para cada imagem ou vídeo, verificar:

1. Existe autorização adequada para a publicação?
2. A imagem permite identificar algum estudante?
3. Os rostos estão protegidos quando necessário?
4. Crachás, uniformes, cadernos e documentos não revelam informações pessoais?
5. Os metadados EXIF foram removidos?
6. O texto alternativo não identifica estudantes?
7. O arquivo não contém informações pessoais no nome?
8. A versão publicada foi revisada e aprovada?

Se alguma resposta indicar risco ou dúvida, não publicar o material.

## 6. Página de privacidade

A rota `/privacidade/` deve explicar, em linguagem clara:

- Quais informações o site publica.
- Que o site não possui cadastro de visitantes nem comentários públicos.
- Como são tratados fotografias e vídeos.
- Como solicitar correção ou retirada de conteúdo.
- Qual é o canal institucional responsável por receber essas solicitações.

O canal de contato deve ser definido e confirmado pela escola. Não inventar endereço de e-mail, telefone ou responsável.

Enquanto essa informação não estiver definida, registrar a pendência e não publicar dados de contato fictícios.

## 7. Ferramentas de análise

Não ativar Vercel Web Analytics, Speed Insights ou ferramentas semelhantes sem avaliar a coleta de dados e atualizar previamente a página de privacidade com as informações necessárias.

A ausência de cadastro no site não significa, por si só, que ferramentas externas não coletem dados técnicos de navegação.

## 8. Se um arquivo inadequado for publicado

Se uma imagem ou documento com informações pessoais for enviado ao repositório por engano:

1. Interromper a divulgação do conteúdo e remover o arquivo da versão publicada.
2. Informar a equipe responsável pelo projeto e seguir a orientação institucional da escola.
3. Avaliar a necessidade de remoção do arquivo do histórico Git, pois um commit posterior que apenas apaga o arquivo não elimina as versões anteriores.
4. Verificar se o conteúdo foi replicado em outros locais ou disponibilizado por serviços externos.
5. Registrar o ocorrido e as medidas adotadas, sem reproduzir desnecessariamente os dados expostos.

Se houver exposição de credenciais ou senhas, elas devem ser revogadas e substituídas imediatamente.

## 9. Regra para desenvolvimento

Nenhuma necessidade de design, divulgação ou conveniência técnica justifica expor dados pessoais de estudantes.

Em caso de conflito entre a apresentação visual do site e a proteção das pessoas retratadas, a proteção das pessoas tem prioridade.
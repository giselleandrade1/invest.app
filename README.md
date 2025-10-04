# Invest App

Instruções para executar o projeto localmente. Observação: este projeto utiliza uma API fake de teste (mock) por padrão — veja a seção "API fake" abaixo.

## Requisitos

- Node.js 18 ou superior (recomendado)
- npm (ou yarn/pnpm)

## Scripts úteis (do `package.json`)

- `npm run dev` - inicia o servidor de desenvolvimento (Next.js com Turbopack)
- `npm run build` - compila a aplicação para produção
- `npm run start` - executa a versão de produção
- `npm run lint` - executa o ESLint

## Instalação e execução (passo a passo)

1. Clone o repositório (se necessário):

   git clone <repo-url>
   cd <repo-folder>

2. Instale as dependências:

   npm install

3. (Opcional) Configure variáveis de ambiente locais

   Crie um arquivo `.env.local` na raiz do projeto se precisar sobrescrever a URL da API ou outras variáveis. Exemplo mínimo:

   NEXT_PUBLIC_API_URL=https://fake-api.example.com

   Observação: este projeto **usa uma API fake de teste** por padrão — veja a seção seguinte.

4. Rodar em modo desenvolvimento:

   npm run dev

   Por padrão a aplicação será acessível em http://localhost:3000

5. Build e execução em produção (opcional):

   npm run build
   npm run start

## API fake de teste (mock)

Este projeto está configurado para consumir uma API fake de teste durante desenvolvimento. Isso facilita desenvolvimento sem depender de um backend real. Existem duas abordagens comuns para usar/fornecer a API fake:

1. Usar um serviço público de mock/placeholder (ex.: `https://jsonplaceholder.typicode.com`) — atualize `NEXT_PUBLIC_API_URL` no `.env.local` para apontar para o endpoint desejado.

2. Rodar um mock local (ex.: `json-server`) usando um arquivo `db.json` local. Exemplo:

   npm install -g json-server
   json-server --watch db.json --port 3001

   Em seguida, ajuste `.env.local`:

   NEXT_PUBLIC_API_URL=http://localhost:3001

Se você tiver um script ou serviço de mock específico no projeto, substitua as instruções acima conforme necessário.

## Observações / solução de problemas

- Se o comando `npm run dev` falhar por causa do `--turbopack`, você pode editar o `package.json` e remover o `--turbopack` das entradas de script (usar apenas `next dev`) ou atualizar sua versão do Node/Next conforme a documentação.
- Conflito de portas: se a porta 3000 já estiver em uso, você pode iniciá-la em outra porta com `PORT=3001 npm run dev`.
- Variáveis de ambiente: lembre-se de reiniciar o servidor após alterar `.env.local`.

## Lint

Para rodar o lint:

npm run lint

## Como contribuir

- Abra uma issue descrevendo o problema ou feature desejada.
- Faça um fork e envie um pull request com mudanças pequenas e documentadas.

## Contato

Se precisar de ajuda, adicione instruções aqui com seu e-mail ou Slack/Teams.

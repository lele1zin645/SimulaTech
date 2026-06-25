# SimulaTech — Back-end

API REST do SimulaTech, o simulador inteligente de entrevistas. Gera perguntas
de entrevista e avalia respostas usando um modelo LLM via OpenRouter, com a
chave de API protegida no servidor.

## Arquitetura

O projeto segue uma arquitetura em camadas, onde cada camada tem uma única
responsabilidade e depende apenas da camada abaixo dela.

```
Requisição HTTP
      │
      ▼
┌─────────────┐   define os endpoints e aplica o asyncHandler
│   routes    │
└─────┬───────┘
      ▼
┌─────────────┐   valida a entrada e orquestra a resposta
│ controllers │
└─────┬───────┘
      ▼
┌─────────────┐   regras de negócio: prompts, geração e avaliação
│  services   │
└─────┬───────┘
      ▼
┌─────────────┐   integração externa (OpenRouter) e utilitários
│ openrouter  │
└─────────────┘
```

### Estrutura de pastas

```
backend/
├── server.js                       bootstrap: valida config e sobe o servidor
├── .env.example                    modelo das variáveis de ambiente
└── src/
    ├── app.js                      monta o Express (segurança, rotas, erros)
    ├── config/
    │   └── env.js                  carrega e valida variáveis de ambiente
    ├── middleware/
    │   ├── asyncHandler.js         encaminha erros de funções async
    │   ├── rateLimiter.js          limita requisições por IP
    │   ├── notFound.js             resposta 404 padronizada
    │   └── errorHandler.js         tratamento central de erros
    ├── routes/
    │   └── interview.routes.js     POST /api/pergunta e /api/avaliar
    ├── controllers/
    │   └── interview.controller.js valida entrada e chama o serviço
    ├── services/
    │   ├── interview.service.js    prompts e lógica de negócio
    │   └── openrouter.service.js   única chamada HTTP à OpenRouter
    ├── validators/
    │   └── interview.validator.js  validação e sanitização de entrada
    └── utils/
        ├── AppError.js             erro com status e flag de exposição
        └── json.js                 parser tolerante de JSON da IA
```

## Segurança

- **Chave protegida**: a `OPENROUTER_API_KEY` vive apenas no servidor, lida do
  `.env` e usada somente em `openrouter.service.js`. Nunca chega ao cliente.
- **Helmet**: adiciona cabeçalhos de segurança (HSTS, X-Frame-Options,
  X-Content-Type-Options) e remove o `X-Powered-By`.
- **CORS restrito**: apenas a origem definida em `CORS_ORIGIN` pode consumir a API.
- **Rate limiting**: máximo de 20 requisições por minuto por IP.
- **Validação e allowlist**: todas as entradas são validadas, com limites de
  tamanho e lista fechada de valores aceitos para `tipo`.
- **Limite de payload**: o corpo JSON é limitado a 16 KB.
- **Erros sem vazamento**: detalhes internos ficam no log do servidor; o cliente
  recebe apenas mensagens seguras.
- **Timeout**: chamadas à OpenRouter têm tempo limite, evitando requisições presas.
- **Fail fast**: o servidor não sobe se a configuração obrigatória estiver ausente.

## Requisitos

- Node.js 18 ou superior
- Uma chave da OpenRouter: https://openrouter.ai/keys

## Instalação

```bash
cd backend
npm install
cp .env.example .env
```

Edite o `.env` e informe sua `OPENROUTER_API_KEY`.

## Execução

```bash
npm run dev    # desenvolvimento, com auto-reload
npm start      # produção
```

A API sobe em `http://localhost:3001`.

## Endpoints

### `GET /`
Verificação de saúde. Retorna `{ "status": "ok", "service": "SimulaTech API" }`.

### `POST /api/pergunta`
Gera uma pergunta de entrevista.

Requisição:
```json
{ "cargo": "Desenvolvedor Front-end React", "tipo": "tecnica" }
```
`tipo` aceita `"tecnica"` ou `"rh"`.

Resposta:
```json
{ "pergunta": "Explique a diferença entre useMemo e useCallback." }
```

### `POST /api/avaliar`
Avalia a resposta do candidato.

Requisição:
```json
{ "pergunta": "O que é o Virtual DOM?", "respostaUsuario": "É uma representação em memória do DOM." }
```

Resposta:
```json
{ "nota": 7.5, "feedback": "...", "resposta_ideal": "..." }
```

## Variáveis de ambiente

| Variável                | Padrão                          | Descrição                              |
| ----------------------- | ------------------------------- | -------------------------------------- |
| `PORT`                  | `3001`                          | Porta do servidor                      |
| `NODE_ENV`              | `development`                   | Ambiente de execução                   |
| `CORS_ORIGIN`           | `http://localhost:5173`         | Origem autorizada a consumir a API     |
| `OPENROUTER_API_KEY`    | —                               | Chave da OpenRouter (obrigatória)      |
| `OPENROUTER_MODEL`      | `openai/gpt-oss-120b:free`      | Modelo LLM utilizado                   |
| `OPENROUTER_TIMEOUT_MS` | `30000`                         | Tempo limite das chamadas à IA (ms)    |

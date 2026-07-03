# SimulaTech — Simulador Inteligente de Entrevistas

Aplicação Full Stack que simula entrevistas de emprego para desenvolvedores. O
usuário escolhe a vaga e o tipo de entrevista (técnica ou comportamental), e uma
IA gera as perguntas e avalia as respostas em tempo real — devolvendo uma nota,
um feedback construtivo e uma sugestão de resposta ideal com exemplos de código.

**Acesse online:** https://simulatech.vercel.app

---

## Índice

- [Visão geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar localmente](#como-rodar-localmente)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Endpoints da API](#endpoints-da-api)
- [Deploy](#deploy)
- [Segurança](#segurança)

---

## Visão geral

Preparar-se para entrevistas técnicas costuma ser genérico e sem feedback
personalizado. O SimulaTech resolve isso com um simulador que gera perguntas sob
medida para a vaga desejada e avalia as respostas do candidato de forma objetiva,
com nota e feedback acionável. A chave da API de IA fica protegida no back-end, e
a interface recebe apenas dados já processados e estruturados (JSON).

O fluxo do usuário passa por três telas:

1. **Setup** — escolha da vaga e do tipo de entrevista.
2. **Questionário** — pergunta gerada pela IA e área para responder.
3. **Feedback** — nota com cor condicional, feedback detalhado e resposta ideal.

---

## Funcionalidades

- Geração dinâmica de perguntas técnicas ou comportamentais via IA.
- Avaliação automática da resposta com nota de 0 a 10.
- Feedback construtivo destacando pontos fortes e a melhorar.
- Sugestão de resposta ideal com blocos de código destacados.
- Interface responsiva com tema escuro no estilo de ambiente de desenvolvimento.
- Retorno de dados estruturados e tipados (JSON) do back-end para o front.

---

## Tecnologias

**Front-end**

- React + Vite
- Tailwind CSS
- react-markdown + rehype-highlight (renderização e destaque de código)
- lucide-react (ícones)

**Back-end**

- Node.js + Express (ES Modules)
- OpenRouter (integração com modelo LLM)
- Helmet, express-rate-limit, CORS (segurança)
- dotenv (configuração)

**Infraestrutura**

- Vercel (hospedagem do front-end)
- Render (hospedagem do back-end)
- Git / GitHub (versionamento e deploy contínuo)

---

## Arquitetura

O projeto é um monorepo com front-end e back-end desacoplados, comunicando-se por
uma API REST. Em produção, o navegador carrega o app pela Vercel e chama a API no
Render, que por sua vez consulta a OpenRouter.

```
GitHub ──(deploy)──> Vercel (front-end)
   └────(deploy)──> Render (back-end)

Navegador ──carrega app──> Vercel
Navegador ──chama /api───> Render ──consulta──> OpenRouter (LLM)
```

O back-end segue uma arquitetura em camadas, cada uma com responsabilidade única:

```
routes → controllers → services → openrouter.service → OpenRouter
```

- **routes** define os endpoints.
- **controllers** validam a entrada e orquestram a resposta.
- **services** concentram as regras de negócio (prompts, geração, avaliação).
- **openrouter.service** é o único ponto que toca na chave e chama a IA.

---

## Estrutura do projeto

```
simulaTech/
├── backend/
│   ├── server.js                       bootstrap do servidor
│   ├── .env.example
│   └── src/
│       ├── app.js                      configuração do Express
│       ├── config/env.js               variáveis de ambiente
│       ├── middleware/                 rate limit, erros, 404, async
│       ├── routes/                     /api/pergunta e /api/avaliar
│       ├── controllers/                validação e orquestração
│       ├── services/                   regras de negócio e integração
│       ├── validators/                 validação de entrada
│       └── utils/                      AppError e parser de JSON
└── frontend/
    ├── index.html
    ├── vite.config.js                  proxy /api -> localhost:3001
    ├── tailwind.config.js
    └── src/
        ├── main.jsx
        ├── App.jsx                     estado global e fluxo de telas
        ├── api.js                      chamadas ao back-end
        └── components/                 Header, Stepper e as três telas
```

---

## Como rodar localmente

### Pré-requisitos

- Node.js 18 ou superior
- Uma chave gratuita da OpenRouter: https://openrouter.ai/keys

### 1. Clonar o repositório

```bash
git clone https://github.com/lele1zin645/SimulaTech.git
cd SimulaTech
```

### 2. Back-end

```bash
cd backend
npm install
cp .env.example .env        # no Windows (cmd): copy .env.example .env
```

Abra o `.env` e informe sua `OPENROUTER_API_KEY`. Depois:

```bash
npm run dev
```

A API sobe em `http://localhost:3001`.

### 3. Front-end

Em outro terminal, a partir da raiz do projeto:

```bash
cd frontend
npm install
npm run dev
```

O app abre em `http://localhost:5173`. O proxy do Vite encaminha as chamadas
`/api` para o back-end na porta 3001, então basta ter o back-end rodando.

> Para apontar o front local diretamente para o back-end em produção, crie um
> arquivo `.env` na pasta `frontend` com
> `VITE_API_URL=https://simulatech.onrender.com`.

---

## Variáveis de ambiente

### Back-end (`backend/.env`)

| Variável                | Padrão                     | Descrição                            |
| ----------------------- | -------------------------- | ------------------------------------ |
| `PORT`                  | `3001`                     | Porta do servidor                    |
| `NODE_ENV`              | `development`              | Ambiente de execução                 |
| `CORS_ORIGIN`           | `http://localhost:5173`    | Origem autorizada a consumir a API   |
| `OPENROUTER_API_KEY`    | —                          | Chave da OpenRouter (obrigatória)    |
| `OPENROUTER_MODEL`      | `openai/gpt-oss-120b:free` | Modelo LLM utilizado                 |
| `OPENROUTER_TIMEOUT_MS` | `30000`                    | Tempo limite das chamadas à IA (ms)  |

### Front-end (`frontend/.env`)

| Variável       | Descrição                                                          |
| -------------- | ----------------------------------------------------------------- |
| `VITE_API_URL` | URL base da API. Vazio em dev (usa o proxy); a URL do back em prod |

---

## Endpoints da API

### `GET /`

Verificação de saúde.

```json
{ "status": "ok", "service": "SimulaTech API" }
```

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
{
  "pergunta": "O que é o Virtual DOM?",
  "respostaUsuario": "É uma representação em memória do DOM."
}
```

Resposta:

```json
{
  "nota": 7.5,
  "feedback": "Você acertou o conceito central, mas faltou mencionar...",
  "resposta_ideal": "O Virtual DOM é... ```js\n// exemplo\n```"
}
```

---

## Deploy

O deploy é contínuo: cada `git push` na branch `main` dispara uma nova
publicação nas duas plataformas.

### Back-end (Render)

- Tipo: Web Service
- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`
- Variáveis de ambiente: `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `NODE_ENV`,
  e `CORS_ORIGIN` com a URL da Vercel.

### Front-end (Vercel)

- Framework: Vite
- Root Directory: `frontend`
- Variável de ambiente: `VITE_API_URL` com a URL do back-end no Render.

> A conexão entre os dois depende de duas variáveis: `VITE_API_URL` (front → back)
> e `CORS_ORIGIN` (back autoriza a origem do front). Sem elas configuradas, o app
> em produção não consegue se comunicar.

---

## Segurança

- Chave da API isolada no back-end, nunca exposta ao cliente.
- Cabeçalhos de segurança com Helmet e remoção do `X-Powered-By`.
- CORS restrito à origem configurada.
- Rate limiting por IP (20 requisições por minuto).
- Validação e allowlist das entradas, com limites de tamanho.
- Limite de payload no corpo JSON.
- Tratamento de erros central que não vaza detalhes internos.
- Validação de configuração no boot (fail-fast).

---

## Autor

Desenvolvido por [lele1zin645](https://github.com/lele1zin645).

# SimulaTech — Front-end

Interface React + Tailwind do SimulaTech. Consome a API do back-end para gerar
perguntas de entrevista e exibir a avaliação da IA (nota, feedback e resposta
ideal com código formatado).

## Requisitos

- Node.js 18 ou superior
- O back-end do SimulaTech rodando em `http://localhost:3001`

## Instalação

```bash
cd frontend
npm install
```

## Execução

```bash
npm run dev
```

Abre em `http://localhost:5173`.

> O front fala com o back via proxy do Vite: qualquer chamada a `/api/...` é
> encaminhada para `http://localhost:3001` (ver `vite.config.js`). Por isso,
> suba o back-end antes de usar a aplicação.

## Build de produção

```bash
npm run build      # gera a pasta dist/
npm run preview    # serve o build localmente
```

## Telas

1. **Setup** — escolha da vaga e do tipo de entrevista (técnica ou RH).
2. **Questionário** — pergunta gerada, área de resposta e cronômetro.
3. **Feedback** — nota com cor condicional (verde/amarelo/vermelho), feedback
   detalhado e resposta ideal com blocos de código destacados.

## Estrutura

```
frontend/
├── index.html
├── vite.config.js              proxy /api -> localhost:3001
├── tailwind.config.js          tokens de design (cores, fontes, sombras)
├── postcss.config.js
└── src/
    ├── main.jsx                ponto de entrada do React
    ├── App.jsx                 estado global e fluxo entre telas
    ├── api.js                  chamadas ao back-end
    ├── index.css               Tailwind + tema do código
    └── components/
        ├── Header.jsx
        ├── Stepper.jsx
        ├── SetupScreen.jsx
        ├── QuestionScreen.jsx
        └── FeedbackScreen.jsx
```

## Tecnologias

- React 18 + Vite
- Tailwind CSS
- lucide-react (ícones)
- react-markdown + rehype-highlight (renderização de feedback e código)

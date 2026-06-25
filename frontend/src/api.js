const BASE_URL = import.meta.env.VITE_API_URL ?? "";

async function postJSON(path, body) {
  let resposta;
  try {
    resposta = await fetch(`${BASE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error(
      "Não foi possível falar com o servidor. Verifique se o back-end está disponível."
    );
  }

  let dados = {};
  try {
    dados = await resposta.json();
  } catch {
    /* resposta sem corpo JSON */
  }

  if (!resposta.ok) {
    throw new Error(dados.erro || `Erro ${resposta.status} no servidor.`);
  }

  return dados;
}

export function gerarPergunta(cargo, tipo) {
  return postJSON("/api/pergunta", { cargo, tipo });
}

export function avaliarResposta(pergunta, respostaUsuario) {
  return postJSON("/api/avaliar", { pergunta, respostaUsuario });
}

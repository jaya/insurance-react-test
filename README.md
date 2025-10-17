# Insurance React Live Coding Test

Este repositório contém um pequeno app em React (Vite + TypeScript) preparado para um exercício de live-coding.

Objetivo do teste:
- Apresentar uma página de login (credenciais: `admin` / `admin`).
- Exibir uma dashboard com a listagem de seguradoras consumindo o endpoint GET mocado em Beeceptor.
- Mostrar um formulário para criação de uma policy; o método de POST está propositalmente não implementado — o candidato deverá implementar a função `createPolicy` em `src/lib/api.ts`.

O que eu já implementei:
- Login simples em `src/pages/Login.tsx` (usuário/senha: `admin`/`admin`).
- Dashboard em `src/pages/Dashboard.tsx` que busca a listagem de insurers via `src/lib/api.ts` -> `getInsurers()`.
- Componente `InsurerList` para renderizar os insurers (`src/components/InsurerList.tsx`).
- Formulário `PolicyForm` em `src/components/PolicyForm.tsx` com UI em Tailwind (CDN) — ao submeter, ele chama `createPolicy` em `src/lib/api.ts`.
- Tipos em `src/types.ts`.

Ponto que o candidato deve implementar (requisito do exercício):
- Implementar a função `createPolicy(payload: PolicyPayload)` em `src/lib/api.ts` para realizar o POST para:

  `POST https://jaya-insurance.free.beeceptor.com/policies/`

  A implementação esperada (exemplo): realizar um `fetch` com `Content-Type: application/json`, retornar `await res.json()` e tratar erros HTTP.

Critérios de aceitação do exercício (o que o avaliador deve pedir ao candidato):
- Ao submeter o formulário, a função `createPolicy` deve enviar o JSON correto e retornar a resposta do servidor (o token `policy_id` e o `status`).
- Tratar e mostrar erros HTTP no UI.
- Código limpo e com tipos TypeScript (usar `PolicyPayload` em `src/types.ts`).

Como rodar localmente

1. Instale dependências:

```bash
npm install
```

2. Rode em modo dev (Vite):

```bash
npm run dev
```

3. Acesse o app em `http://localhost:5173` (ou a porta mostrada pelo Vite).

Credenciais para login

- Usuário: `admin`
- Senha: `admin`

Arquivos importantes

- `src/lib/api.ts` — implementar `createPolicy` aqui.
- `src/pages/Login.tsx` — página de login.
- `src/pages/Dashboard.tsx` — dashboard que consome o GET e exibe a `PolicyForm`.
- `src/components/PolicyForm.tsx` — formulário que constrói o payload e chama `createPolicy`.
- `src/types.ts` — tipos do domínio (`Insurer`, `PolicyPayload`, `Plan`, ...)

Sugestão de implementação para o candidato (exemplo, coloque na `createPolicy`):

- Fazer POST simples com fetch:

```js
const res = await fetch(`${BASE}/policies/`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
})
if (!res.ok) throw new Error(`Create policy failed: ${res.status}`)
return res.json()
```

Notas e observações

- Para manter o projeto leve, o Tailwind é incluído via CDN no `index.html` para que você possa usar utilitários Tailwind sem modificar o build.
- O endpoint GET já está sendo consumido de: `https://jaya-insurance.free.beeceptor.com/insurances`.
- O POST esperado (a ser implementado) é `https://jaya-insurance.free.beeceptor.com/policies/`.

Qualidade / Checklist (o que eu verifiquei):
- [x] Login e navegação interna funcionando (estado local).
- [x] GET de insurers implementado e tipado.
- [x] Componentes da UI criados com Tailwind utilities (via CDN).
- [x] `createPolicy` intencionalmente não implementado — instruções claras para o candidato.
- [x] Tipos TypeScript adicionados (`src/types.ts`).

Se quiser, eu posso também:
- Implementar o `createPolicy` completo (testando a chamada ao Beeceptor) — diga se quer que eu implemente e eu faço a mudança e testo.
- Adicionar testes unitários simples (Jest/Testing Library) para as funções que não dependem de rede.

Boa sorte com o live coding!

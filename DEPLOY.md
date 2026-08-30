# Long page Nicole — deploy na Vercel

## Arquitetura

| Caminho | Onde roda |
|---------|-----------|
| `/`, `/melasma/`, `/estrias/`, etc. | Vercel (este repositório) |
| `/app/*` | Proxy → VPS `2.25.120.153` (Node + PostgreSQL) |
| `/api/*` | Proxy → VPS `2.25.120.153` (Node API) |

Configuração em `vercel.json` (rewrites). A pasta `app/` local **não** é publicada (`.vercelignore`) — o app vive no VPS.

## Botão "Área do paciente"

O `index.html` aponta para `/app/`, que a Vercel encaminha ao frontend Node no VPS.

## Deploy

```bash
cd "Long page Nicole"
npx vercel --prod
```

Ou push na branch `main` se o projeto Vercel estiver ligado ao GitHub.

## Atualizar frontend do app

O build é feito no repositório **App - Melasma** e publicado no VPS:

```bash
cd frontend && npm run build:production
cd ../infra/vps && VPS_PASS=... node etapa8-cutover.mjs
```

**Não** copiar `dist/` para `app/` neste repositório.

## Rollback do proxy

Remover ou comentar os rewrites em `vercel.json` e republicar; restaurar pasta `app/` no deploy removendo entrada do `.vercelignore`.

# Long page Nicole — deploy na Vercel (projeto `melancode`)

## Arquitetura (fluxo A)

| Caminho | Onde roda |
|---------|-----------|
| `/`, `/melasma/`, `/estrias/`, etc. | Vercel — arquivos deste repositório |
| `/app/*` | Vercel — pasta `app/` (build estático React) |
| `/api/*` | Proxy Vercel → VPS `2.25.120.153` (Node + PostgreSQL) |

O frontend em `app/` usa `VITE_API_BASE_URL=/api` (mesmo domínio, HTTPS).

## Atualizar o app

No repositório **App - Melasma**:

```bash
cd frontend
npm run build:production
cd ..
node infra/vps/sync-official-app-dist.mjs
```

Depois, neste repositório:

```bash
git add app/
git commit -m "chore: atualiza build do app"
npx vercel --prod
```

(O projeto Vercel deve estar ligado a **`melancode`**, não `long-page-nicole`.)

## Deploy

```bash
cd "Long page Nicole"
npx vercel link --project melancode   # só na primeira vez
npx vercel --prod
```

## Rollback

Restaurar pasta `app/` de um `app-backup-pre-node-*` local e redeploy.

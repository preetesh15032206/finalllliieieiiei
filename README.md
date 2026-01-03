# Project: rest-express (Local dev & testing)

Quick notes to run and test this project locally and via CI.

## Requirements ✅
- Node.js v18+ (LTS) or v20
- npm (bundled with Node)

## Install dependencies 🔧
```bash
npm install
```

## Run the app (development)
```bash
# start server + vite middleware
npm run dev
# start only the client dev server
npm run dev:client
```

The server serves API endpoints on http://localhost:5000 by default.

## Tests (Vitest) 🧪
- Single-run (CI / local):
```bash
npm test
```
- Watch mode during development:
```bash
npm run test:watch
```

Notes:
- Integration tests live under `tests/` and run in the Node environment.
- If `vitest` does not run, ensure you ran `npm install` and that Node is available on your PATH.

## Admin helpers and CSV export 📄
- Default admin credentials (dev only): `username: admin`, `password: admin_password`
- Admin endpoints (require login via session cookie):
  - `GET /api/admin/violations` — list violations
  - `GET /api/admin/violations/export` — download CSV export (optional query params: `type`, `severity`, `since`, `until`)

## Anti-cheat
- Client-side anti-cheat batches events and sends them to `POST /api/violations`.
- Severity mapping is applied on the client (`info`, `warning`, `high`).

## CI
- A GitHub Actions workflow was added: `.github/workflows/ci.yml` — pushes/PRs to `main` run the test suite.

---
If you'd like, I can add more docs (API contract, examples, or sample cURL/PowerShell commands) — tell me which part you'd prefer next.
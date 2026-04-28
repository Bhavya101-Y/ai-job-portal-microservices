# Backend Fix Plan (Frontend Runs, Backends Don't)

## Steps:
- [ ] 1. Rename & fix imports:
  - services/auth/src/templete.ts → template.ts
  - services/job/src/tempelete.ts → template.ts
  - frontend/src/components/carrer-guide.tsx → career-guide.tsx
  - Update page.tsx import
- [ ] 2. Code cleanups:
  - AppContext.tsx: remove console.log, redundant exports
  - career-guide.tsx: fix typos (Carrer → Career, guidence → guidance, etc.)
- [ ] 3. services/user/package.json: add missing deps (neon, kafkajs, redis?)
- [ ] 4. Create .env.example
- [ ] 5. Build & test services: cd job-portal/services/{auth,job,user} && npm i && npm run build && npm run dev
- [ ] 6. Run root: cd job-portal && npm run dev
- [ ] 7. Test login /me
- [x] Prior fixes complete.

Run to test after each: cd job-portal/services/auth && npm run dev


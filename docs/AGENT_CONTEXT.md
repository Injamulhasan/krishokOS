# 🤖 Agent Context & Execution Instructions

This file serves as the master instructions document for future AI coding agents or developers onboarding onto the KrishokOS repository. 

---

## 🚦 MANDATORY FIRST STEP: Read the Docs

Before editing any code, adding new features, or running terminal commands, the agent **MUST**:
1. Read the contents of the `/docs` directory (including `PRODUCT_VISION.md`, `USER_FLOW.md`, `AUTHENTICATION.md`, `DATABASE_SCHEMA.md`, and `MVP_SCOPE.md`).
2. Verify that any proposed feature is explicitly within the **MVP Scope** and doesn't violate database isolation principles.

---

## ⏸️ Stop & Wait for Human Approval

AI agents must **STOP** and request explicit approval from the user before executing any of the following tasks:

1. **Schema Migrations**: Running `npx prisma db push` or generating migrations if it alters existing database models.
2. **Dependency Changes**: Installing new NPM packages or upgrading core dependencies (e.g. changing Next.js or Tailwind versions).
3. **Database Deletions**: Running commands or queries that delete user data or reset Supabase database tables.

---

## 🔍 Verification Checklist

After performing any code changes, the agent must execute the following validation pipeline before completing their turn:

- [ ] **TypeScript Compilation**: Run `npx tsc --noEmit` and fix any type errors.
- [ ] **Next.js Production Build**: Run `npm run build` and ensure all static/dynamic routes build successfully.
- [ ] **Clean Build Cache**: If moving route handlers or files around, delete the `.next` directory to clear stale compiler caches.
- [ ] **Client Sessions**: Verify that pages wrapped in `SessionProvider` do not lose context during routing.

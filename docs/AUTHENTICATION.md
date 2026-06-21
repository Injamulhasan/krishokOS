# 🔐 NextAuth.js Authentication & Data Isolation

This document details the authentication and authorization architecture implemented in KrishokOS using NextAuth.js and Prisma, including strict security rules to prevent cross-tenant data leaks.

---

## ⚙️ NextAuth.js Integration

KrishokOS uses **NextAuth.js v4** with a custom **Credentials Provider** backed by **Prisma** and **Supabase PostgreSQL**. This setup handles user registration, credentials matching, and session token generation.

### Public vs. Protected Routes

| Route Pattern | Access Level | Description |
|---------------|--------------|-------------|
| `/` | Public | Marketing landing page |
| `/auth/signin` | Public | Credentials sign-in form |
| `/auth/signup` | Public | Account registration form |
| `/auth/verify-email` | Public | Automatic redirect utility |
| `/dashboard` | Protected | User dashboard |
| `/wizard` | Protected | Onboarding farm setup wizard |
| `/farm-overview` | Protected | Crop management and stages checklist |
| `/api/auth/*` | Mixed | NextAuth callbacks and signup |
| `/api/wizard/*` | Protected | Setup wizard state endpoints |
| `/api/farm/*` | Protected | Farm modification and deletion endpoints |

---

## 🛡️ Getting the Authenticated User

Authentication states are evaluated on the server side using NextAuth's `getServerSession`.

### Server-Side Helper: `requireUser()`
We expose a centralized helper in [lib/auth.ts](file:///f:/personal-projects/krishokos/lib/auth.ts) to verify sessions and return typed user objects:
```typescript
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function requireUser() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null;
  }
  
  return {
    id: (session.user as any).id,
    name: session.user.name,
    email: session.user.email,
  };
}
```

Usage in Server Components / API Routes:
```typescript
const user = await requireUser();
if (!user) {
  redirect("/auth/signin"); // or return 401 Unauthorized
}
```

---

## 🚧 Strict Security Rule: Tenant Data Isolation

To prevent **Cross-Tenant Data Leaks** (where one user accesses another user's farms, budgets, or checklist states), all database queries must follow a strict isolation pattern.

> [!CAUTION]
> **Mandatory Query Filtering Constraint**
> Future agents and developers must **NEVER** query farms or wizard sessions using only resource IDs (e.g. `farmId`). Queries must *always* join or filter by the authenticated user's `userId`.

### Correct Query Pattern (Prisma Example)
```typescript
// Fetching a farm safely
const farm = await prisma.farm.findFirst({
  where: {
    id: farmId,
    farmer: {
      userId: user.id // Strictly isolated to the active session user
    }
  }
});
```

### Incorrect Query Pattern (Vulnerable to Leakage)
```typescript
// DANGEROUS: Any authenticated user could access this farm by guessing the ID
const farm = await prisma.farm.findUnique({
  where: { id: farmId }
});
```

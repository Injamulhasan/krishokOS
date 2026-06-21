# 🎨 KrishokOS - UI & Frontend Guidelines

This document outlines the code style, component design, layout tokens, and TypeScript/error-handling standards enforced in KrishokOS.

---

## 🎨 Visual Design System (Tokens)

All custom components must follow the established Tailwind green-and-emerald design tokens to match the modern agricultural theme:

- **Primary Green**: `#00963E` (Text/Buttons)
- **Glassmorphic Gradients**: `from-green-600 via-emerald-600 to-teal-700` (Cards/Callouts)
- **Light Theme Background**: `#F8F8F4` (Vanilla off-white clay tone)
- **Dark Theme Background**: `#081009` (Deep swamp forest charcoal)
- **Border Grays**: `#D9DFC8` (Light theme) / `emerald-900/40` (Dark theme border)

---

## 🏗️ Component Modularity

1. **Client vs. Server Components**:
   - Layouts, pages fetching database records, and data parsing must be **Server Components** (`app/**/page.tsx`).
   - Dynamic form interactions (e.g. wizard step validation, selection buttons, modals) must be separated into a client file (e.g. `FarmOverviewClient.tsx` marked with `"use client";`).
2. **Icons**:
   - Avoid installing extra icon packs. Use raw, optimized SVG inline elements or standard `lucide-react` icons.

---

## 🛡️ TypeScript & Coding Constraints

### 1. Strict `no-any` Rule
Avoid using `any` types. All form data, Prisma models, and state variables must be strictly typed.
* **Incorrect**:
  ```typescript
  const handleFarmUpdate = (data: any) => { ... }
  ```
* **Correct**:
  ```typescript
  import { Farm } from "@prisma/client";
  const handleFarmUpdate = (data: Partial<Farm>) => { ... }
  ```

### 2. API Route Error Handling
All Next.js API route handlers must wrap database interactions in `try/catch` blocks and return JSON error payloads with correct HTTP status codes.

* **API Route Template**:
  ```typescript
  import { NextResponse } from "next/server";
  import prisma from "@/lib/prisma";

  export async function POST(request: Request) {
    try {
      const data = await request.json();
      // Logic ...
      return NextResponse.json({ success: true }, { status: 200 });
    } catch (error: any) {
      console.error("API Error occurred:", error);
      return NextResponse.json(
        { error: "An unexpected error occurred." },
        { status: 500 }
      );
    }
  }
  ```

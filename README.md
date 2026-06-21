# 🌱 KrishokOS

> Smart Agriculture Operating System for Bangladesh

KrishokOS is a modern agricultural ERP and farm intelligence platform designed to help farmers, agribusinesses, and exporters manage the complete crop lifecycle — from planning and cultivation to harvest, traceability, and export readiness. Built with a Bengali-first user experience, it supports language switching between Bengali and English throughout the entire platform.

---

## 🚀 Vision

Empowering Bangladesh's agriculture sector through technology-driven, sustainable, safe, and export-ready farming practices.

Our mission is to create the digital infrastructure that enables farmers to improve productivity, maintain food safety standards, and access international markets.

---

## ✨ Features & Architecture

### 🌐 Bilingual User Interface
A fully localized client dashboard and onboarding wizard supporting Bengali ↔ English language switching:
- Sticky navigation header with mobile menu and dynamic dark mode toggles.
- All translations driven from a structured language state — no DOM manipulation needed.

### 🔐 Authentication System (NextAuth.js)
Complete account management with secure session persistence across client-side route transitions:
- **NextAuth.js Session Management**: Wired with Credentials Provider for credentials-based sign-in.
- **Auto-Login on Registration**: Upon filling out the signup form, users are automatically authenticated and redirected directly to their dashboard.
- **Bypassed Email Verification**: Bypasses the email verification step in the signup pipeline (since SMTP servers are unconfigured in dev) to enable a seamless onboarding flow.
- **Session Context Provider**: Wrapped root layout with `<SessionProvider>` to persist sessions on client-side routing.
- **Protected Pages & API Routes**: Implemented `getServerSession` checks on the server side to redirect unauthenticated users to `/auth/signin`.

### 🗄️ Database & ORM (Prisma & Supabase PostgreSQL)
Transitioned the database architecture from local flat JSON files to a production-ready cloud database:
- **Supabase PostgreSQL**: Primary cloud database provider hosting users, farmers, farms, and setup sessions.
- **Prisma ORM**: Utilized for clean, typesafe database queries, migrations, and model definitions.
- **Connection Pooling**: Configured transaction pooling through Supabase Pooler (`DATABASE_URL` via port `6543`) for application requests, and direct connection (`DIRECT_URL` via port `5432`) for schema migrations and pushes.

#### Database Models:
- `User` / `Account` / `Session` / `VerificationToken`: Standard NextAuth-managed models for login sessions.
- `Farmer`: Represents a farmer profile associated with a `User`.
- `Farm`: Represents a cultivated crop field (soil type, water source, district, Upazila, Union, size, crop, farming method).
- `WizardProgress`: Tracks the current step, completed steps, and JSON step data of active onboarding setup sessions.

### 🧙 11-Step Farm Setup Wizard
A guided onboarding wizard at `/wizard` for authenticated users to create their first farm profile. Features cascading location dropdowns, unit conversion, step validation, and database storage.
- **Cascading Dropdowns**: Dynamic District → Upazila → Union data hierarchy.
- **Unit Converter**: Converts between Bigha, Decimal, and Katha.
- **Wizard Data Persistence**: Wizard progress (current step, JSON form data) is saved directly in the database (`WizardProgress`), enabling users to resume on any device.

### 📊 Adaptable Dashboard & Crop Overviews
The dashboard at `/dashboard` fetches farmer and farm data via Prisma and adapts:
- **Before Setup**: Prompts the user to complete the 11-step wizard and displays blank states.
- **After Setup**: Displays personalized analytics, NPK advice, ROI forecasting, and a crop stage calendar.
- **Stage checklists**: checklist states (cultivation calendar stages) are isolated per crop (`krishokos-stage-[id]-[cropName]`) using client local storage to prevent progress crossover between Papaya and Banana.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Runtime**: React 19 / TypeScript
- **Styling**: Tailwind CSS / ShadCN UI / Lucide Icons
- **Auth**: NextAuth.js
- **ORM**: Prisma ORM v5.21.0
- **Database**: Supabase (PostgreSQL)

---

## 📂 Project Structure

```
krishokOS/
│
├── app/
│   ├── api/
│   │   ├── auth/               # NextAuth endpoints & profiles
│   │   │   ├── [...nextauth]/  # Catch-all NextAuth API route
│   │   │   ├── signup/         # Hashing & User creation route
│   │   │   └── profile/        # Farmer profile updates
│   │   │
│   │   ├── farm/               # Farm management routes (PATCH, DELETE)
│   │   └── wizard/             # Wizard API endpoints (start, steps, complete)
│   │
│   ├── auth/                   # Authentication UI pages
│   │   ├── signin/             # NextAuth credentials sign-in page
│   │   ├── signup/             # Account registration page
│   │   └── verify-email/       # Verification redirect helper
│   │
│   ├── dashboard/              # Protected dashboard page
│   ├── farm-overview/          # Multi-crop cultivation workspace
│   ├── plant-management/       # Pre-wizard crop & method selector
│   ├── wizard/                 # Onboarding wizard container
│   ├── layout.tsx              # Fonts, theme context, SessionProvider wrapper
│   └── page.tsx                # Marketing landing page
│
├── components/
│   ├── dashboard/              # Stats widgets, advisories, action buttons
│   ├── providers/              # AuthProvider Session Context
│   └── wizard/                 # Onboarding step components (Step1 - Step11)
│
├── lib/
│   ├── auth.ts                 # NextAuth authOptions & requireUser helpers
│   ├── prisma.ts               # Shared PrismaClient initialization
│   ├── wizardDb.ts             # Prisma-driven onboarding query adapters
│   ├── unitConverter.ts        # Bigha ↔ decimal ↔ katha utilities
│   └── validation.ts           # Onboarding validation rules
│
├── prisma/
│   └── schema.prisma           # Prisma database schema definition
│
├── data/
│   ├── crops.json              # Static crop lookups
│   └── locations.json          # Static Bangladesh location lookups
│
├── tsconfig.json
├── package.json
└── next.config.mjs
```

---

## 🚦 Developer Getting Started

### Prerequisites
- Node.js v20 or later
- Supabase account (Postgres Database)

### 1. Environment Setup
Create a `.env` file in the root of the project:

```env
# Supabase PostgreSQL Connection Strings
# URL-encode special characters in the password (e.g. '#' to '%23')
DATABASE_URL="postgresql://postgres.YOUR-PROJECT-ID:YOUR-PASSWORD@aws-1-ap-northeast-2.pooler.supabase.com:6543/postgres?pgbouncer=true"
DIRECT_URL="postgresql://postgres.YOUR-PROJECT-ID:YOUR-PASSWORD@aws-1-ap-northeast-2.pooler.supabase.com:5432/postgres"

# NextAuth Settings
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-generate-32-char-random-secret-key"
```

### 2. Install & Generate
Install dependencies and generate the Prisma Client:

```bash
# Install dependencies
npm install

# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## ☁️ Production Deployment (Vercel)

KrishokOS is configured to deploy seamlessly to **Vercel**.

### Vercel Build Command Configuration
Vercel caches dependencies during deployments, which can result in an outdated Prisma Client. To prevent this, the build script in `package.json` has been updated to automatically generate the Client before compilation:
```json
"build": "prisma generate && next build"
```

### Required Vercel Environment Variables
You must add the following environment variables in your **Vercel Project Settings**:

| Key | Value | Example |
|-----|-------|---------|
| `DATABASE_URL` | Supabase Pooler URI | `postgresql://postgres.mjf...:6543/postgres?pgbouncer=true` |
| `DIRECT_URL` | Supabase Direct Port URI | `postgresql://postgres.mjf...:5432/postgres` |
| `NEXTAUTH_SECRET` | 32-character random key | `your-secret-key` |
| `NEXTAUTH_URL` | Deployed Production URL | `https://krishok-os.vercel.app` |

*Note: Do not wrap variable values in double quotes (`"`) when pasting them into the Vercel dashboard fields, as Vercel will read the quotes literally and trigger database connection crashes.*
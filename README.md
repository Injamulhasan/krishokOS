# 🌱 KrishokOS

> Smart Agriculture Operating System for Bangladesh

KrishokOS is a modern agricultural ERP and farm intelligence platform designed to help farmers, agribusinesses, and exporters manage the complete crop lifecycle — from planning and cultivation to harvest, traceability, and export readiness. Built with a Bengali-first user experience, it supports language switching between Bengali and English throughout the entire platform.

---

## 🚀 Vision

Empowering Bangladesh's agriculture sector through technology-driven, sustainable, safe, and export-ready farming practices.

Our mission is to create the digital infrastructure that enables farmers to improve productivity, maintain food safety standards, and access international markets.

---

## ✨ Current Features

### 🌐 Bilingual Landing Page

A fully localized marketing landing page supporting Bengali ↔ English language switching:

- Sticky navigation header with mobile menu
- Hero section with CTA buttons, platform stats, and crop showcase
- Module cards, cultivation methods, farm setup grid
- Journey timeline and platform feature overview
- AI assistant panel and footer
- All content driven from a translations object — no DOM toggling

### 🔐 Authentication System

Complete account management with session persistence:

- **Signup** — name, email, phone, and password registration
- **Email Verification** — token-based email confirmation flow
- **Sign In** — email or phone + password login
- **Forgot Password / Reset Password** — secure token-based password recovery
- **Session Persistence** — HTTP-only cookie with JWT-style session token
- **Protected Routes** — unauthenticated users redirected to sign-in

User data is stored in `data/users.json` with PBKDF2 password hashing. Verification and reset tokens are cleared after use.

Auth pages live at `/auth/signup`, `/auth/signin`, `/auth/verify-email`, `/auth/forgot-password`, `/auth/resetpassword`.

Auth API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new account |
| POST | `/api/auth/signin` | Sign in with credentials |
| POST | `/api/auth/verify-email` | Verify email with token |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/resetpassword` | Set new password |
| GET | `/api/auth/me` | Get current session user |
| GET | `/api/dashboard` | Protected dashboard route |

### 🌿 Plant Management & Crop/Method Selection

A pre-wizard selection screen at `/plant-management` where authenticated users choose:

- **Crop** — Banana Farming or Papaya Farming (selection cards with hover animations and green glow borders)
- **Farming Method** — Residue-Free, Organic, or Chemical (with badges and check indicators)

Selections are posted to the backend and pre-populate the farm setup wizard before it opens.

### 🧙 11-Step Farm Setup Wizard

A guided onboarding wizard at `/wizard` for authenticated users to create their first farm profile. Features save/resume, cascading location dropdowns, unit conversion, step validation, and redirect to dashboard on completion.

| Step | Content |
|------|---------|
| 1 | Farmer Identity (name, phone, email, national ID) |
| 2 | Farm Name & Type (pre-populated from plant-management) |
| 3 | Soil & Water (soil type, water source) |
| 4–6 | Location cascade (District → Upazila → Union) |
| 7 | Land Size with unit converter (decimal ↔ bigha ↔ katha) |
| 8 | Primary Crop (pre-populated from plant-management) |
| 9 | Secondary Crops (multi-select) |
| 10 | Annual Budget |
| 11 | Review & Confirm (read-only summary before submission) |

Wizard state is tracked in `data/wizardprogress.json`. On completion, FARMER and FARM records are created in `data/farmers.json` and `data/farms.json`.

Wizard API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/wizard/start` | Initialize or reset wizard with crop/method |
| PUT | `/api/wizard/step/[stepNumber]` | Save individual step data |
| GET | `/api/wizard/progress` | Fetch current wizard state |
| GET | `/api/wizard/locations` | Cascading district → upazila → union data |
| POST | `/api/wizard/complete` | Finalize wizard and create farm records |

### 📊 Personalized Dashboard

The dashboard at `/dashboard` adapts based on whether the user has completed farm setup:

**Before setup:** Renders original mock statistics (Farms: 2, Crops: 2, Alerts: 3) and a default advisory calendar.

**After setup:** Dynamically renders personalized analytics based on actual farm data:

- **Quick Stats** — actual active farm count, exact land area with units, crop list, alerts
- **Personalized Farm Insights & Analytics Panel:**
  - Farm Profile Overview (crop, location, farming method)
  - Soil & Irrigation Diagnostics (custom guidance based on soil type and water source)
  - Farming Method Compliance & Strategy (target market, GAP protocols, NPK guidelines)
  - Financial Forecast & ROI (projected yield, 75/25 input cost model, revenue estimates)
  - Custom Daily Advisory Calendar (crop and method-specific schedules)
- Full ERP module grid (Production, Inventory, Scheduling, etc.) always visible below

---

## 🛠 Tech Stack

### Frontend

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- ShadCN UI
- Lucide React
- `next/image` for optimized image rendering

### Backend

- Next.js API Routes (App Router)
- JSON file-based data storage (`data/*.json`)
- PBKDF2 password hashing
- HTTP-only cookie sessions

### Development Tools

- Git / GitHub
- Vercel (deployment)

---

## 📂 Project Structure

```
krishokOS/
│
├── app/
│   ├── api/
│   │   ├── auth/               # Auth API endpoints
│   │   │   ├── signup/
│   │   │   ├── signin/
│   │   │   ├── verify-email/
│   │   │   ├── forgot-password/
│   │   │   ├── resetpassword/
│   │   │   ├── me/
│   │   │   └── dashboard/
│   │   └── wizard/             # Wizard API endpoints
│   │       ├── start/
│   │       ├── step/[stepNumber]/
│   │       ├── progress/
│   │       ├── locations/
│   │       └── complete/
│   ├── auth/                   # Auth UI pages
│   │   ├── signup/
│   │   ├── signin/
│   │   ├── verify-email/
│   │   ├── forgot-password/
│   │   └── resetpassword/
│   ├── dashboard/              # Protected dashboard page
│   ├── plant-management/       # Crop & method selector
│   ├── wizard/                 # 11-step farm setup wizard
│   ├── layout.tsx              # Bengali/Latin fonts, metadata
│   ├── page.tsx                # Entry point → LandingPage
│   └── globals.css
│
├── components/
│   ├── wizard/
│   │   ├── WizardLayout.tsx
│   │   ├── ProgressTracker.tsx
│   │   ├── SuccessModal.tsx
│   │   ├── useWizardProgress.ts
│   │   └── steps/              # Step1.tsx through Step11.tsx
│   ├── LandingPage.tsx         # Language state owner; composes all sections
│   ├── Header.tsx              # Nav with language toggle and mobile menu
│   ├── HeroSection.tsx
│   ├── ModuleCards.tsx
│   ├── CropsShowcase.tsx
│   ├── Hero.tsx                # Thin wrapper → LandingPage
│   ├── button.tsx
│   └── PlantManagementClient.tsx
│
├── lib/
│   ├── auth.ts                 # Password hash, JWT tokens, session cookies
│   ├── wizardDb.ts             # Wizard, farmer, and farm data helpers
│   ├── validation.ts           # Step validators (all 11 steps)
│   ├── unitConverter.ts        # Bigha ↔ decimal ↔ katha conversions
│   └── utils.ts                # cn() Tailwind class helper
│
├── data/
│   ├── users.json              # User accounts (hashed passwords)
│   ├── farmers.json            # Farmer profiles
│   ├── farms.json              # Farm records (incl. farmingMethod)
│   ├── wizardprogress.json     # Wizard state per user
│   ├── locations.json          # Bangladesh districts → upazilas → unions
│   └── crops.json              # Static crop list
│
├── public/                     # Static assets
├── next.config.mjs             # Unsplash remote image pattern, allowedDevOrigins
├── components.json
├── tsconfig.json
├── eslint.config.mjs
└── package.json
```

---

## 🎨 Design Principles

- **Bengali-first** — default language is Bengali; all UI copy is fully translated
- **Clean and modern** — agriculture-inspired visual language with green tones
- **Accessible and responsive** — mobile menu, fluid layouts, readable typography
- **Component-driven** — each page section is an isolated, reusable component
- **Data-driven text** — navigation links, stats, cards, and steps all render from structured arrays

---

## 🚦 Getting Started

### Prerequisites

- Node.js v20 or later
- Git
- npm

### Installation

```bash
git clone https://github.com/Injamulhasan/krishokOS.git
cd krishokOS
npm install
npm run dev
```

Open your browser at:

```
http://localhost:3000
```

For network access (e.g. from another device on your LAN), the dev server is configured with `allowedDevOrigins` so HMR works at your local network address as well.

### Build for Production

```bash
npm run build
npm start
```

---

## ☁️ Deployment

KrishokOS is deployed on **Vercel**.

Live URL: [krishok-os.vercel.app](https://krishok-os.vercel.app)

Every push to `main` triggers a new production deployment. Feature branches generate preview deployments automatically.

---

## 🌿 Git Workflow

```bash
# Create a feature branch
git checkout -b feature/feature-name

# Commit and push
git add .
git commit -m "Describe your changes"
git push origin feature/feature-name

# Open a Pull Request on GitHub and merge after review
```

---

## 🛣 Roadmap

### Phase 1 — Marketing Website ✅

- [x] Bilingual landing page (Bengali / English)
- [x] Responsive header, hero, modules, crops showcase
- [x] Vercel deployment

### Phase 2 — Authentication ✅

- [x] Signup, sign-in, email verification
- [x] Password reset flow
- [x] Session persistence (HTTP-only cookie)
- [x] Protected dashboard route

### Phase 3 — Farm Setup ✅

- [x] Plant management & crop/method selection screen
- [x] 11-step onboarding wizard with save/resume
- [x] Cascading location dropdowns (District → Upazila → Union)
- [x] Land unit converter (bigha ↔ decimal ↔ katha)
- [x] FARMER and FARM record creation on wizard completion

### Phase 4 — Personalized Dashboard ✅

- [x] Dynamic stats based on actual farm data
- [x] Soil & irrigation advisory panel
- [x] Farming method compliance & strategy guidance
- [x] Financial forecast & ROI estimations (75/25 model)
- [x] Custom daily advisory calendar

### Phase 5 — AI Assistant *(Planned)*

- [ ] Disease detection from images
- [ ] Smart irrigation recommendations
- [ ] Fertilizer optimization
- [ ] Weather-based advisory
- [ ] Predictive yield analytics

### Phase 6 — Export Platform *(Planned)*

- [ ] GAP compliance tracking
- [ ] Traceability records
- [ ] Residue-free production workflows
- [ ] Harvest documentation
- [ ] Export readiness scoring

---

## 🤝 Contributing

Contributions, ideas, and feedback are welcome.

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push the branch
5. Open a Pull Request

---

## 📄 License

This project is currently under active development. A formal open-source license will be added in a future release.

---

## 👨‍💻 Author

**Injamul Hasan Akash**

Building digital solutions for the future of agriculture in Bangladesh.

---

> 🌱 Building the future of Bangladeshi agriculture through technology.
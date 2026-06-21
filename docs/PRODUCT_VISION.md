# 🌱 KrishokOS - Product Vision

KrishokOS is a smart agriculture operating system designed to elevate Bangladeshi farming standards, enable residue-free production, and ensure export readiness. This document details the core mission, target audience behavioral patterns, and the "Simplicity First" product philosophy that guides our Minimum Viable Product (MVP) design.

---

## 🎯 Core Mission

The mission of KrishokOS is to bridge the gap between rural farming practices in Bangladesh and global compliance standards (like Good Agricultural Practices - GAP). The platform serves as the digital infrastructure to help individual farmers and agricultural cooperatives record cultivation inputs, monitor crop cycles, comply with residue-free export constraints, and secure higher market margins.

---

## 👥 Target Audience & Behavioral Patterns

Our primary users are Bangladeshi farmers, field supervisors, and crop coordinators. When designing user interactions, developers and agents must adhere to the following user behavioral profiles:

| User Persona | Technical Literacy | Core Device | Key Behavioral Pattern |
|--------------|-------------------|-------------|------------------------|
| **Individual Farmer** | Low to Medium | Android Smartphone | Prefers voice inputs, large tap targets, and native Bengali terminology. Often gets stuck on multi-step forms. |
| **Field Coordinator / Supervisor** | Medium to High | Smartphone / Tablet | Manages multiple farm plots, inputs data on the go, requires offline-first sync, and needs English-to-Bengali reporting. |
| **Exporter / Compliance Auditor** | High | Desktop Web | Reviews audit trails, compliance scores, residue testing certs, and logs exports in BDT. |

### Localization Principles
To serve this audience, the interface must be **Bengali-First**:
- All UI actions must support seamless toggling between Bengali (বাংলা) and English.
- Use explicit, localized call-to-actions (e.g., **"শুরু করুন"** for "Get Started", **"পরবর্তী ধাপ"** for "Next Step").
- Support local measurement systems, particularly **Bigha (বিঘা)**, **Katha (কাঠা)**, and **Decimal (শতাংশ)** alongside standard Acres.
- Display currencies in **BDT (৳)** by default.

---

## 💡 "Simplicity First" MVP Philosophy

To ensure high adoption rates among rural farmers, the MVP phase strictly follows a "Simplicity First" paradigm:
1. **Linear Progression**: Avoid complex, branched wizard workflows. Setup processes must follow a strict, logical sequence.
2. **Zero Jargon**: Replace complex agronomic terminology with simple, everyday language (e.g., use "Water Source / সেচের উৎস" instead of "Hydrological Intake Vectors").
3. **Optimized Input Density**: Never show more than 2-3 inputs per viewport on mobile screens.
4. **Immediate Value**: Give immediate actionable advice (e.g., NPK fertilizer ratios, watering calendar) as soon as the user completes onboarding.

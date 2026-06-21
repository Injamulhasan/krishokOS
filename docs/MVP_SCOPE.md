# 🚧 KrishokOS - MVP Scope & Guardrails

This document establishes strict product boundaries and engineering guardrails for the Minimum Viable Product (MVP) phase of KrishokOS.

---

## 🚫 Out of Scope (Forbidden Features)

Future agents and developers are **explicitly forbidden** from building or integrating any of the following features during the MVP phase. Any requests asking to implement them must be politely rejected or deferred.

| Feature Area | Description | MVP Alternative / Mock |
|--------------|-------------|-------------------------|
| **AI Crop Disease Vision** | Uploading images for real-time leaf disease identification via TensorFlow/Vertex AI. | Render a static landing card indicating *"Coming in Phase 5"*. |
| **IoT Soil Sensors** | Direct telemetry integration (soil moisture, pH, temperature) via MQTT/LoRaWAN. | Allow farmers to manually select their Soil Type (e.g. Clay/Sandy) during the setup wizard. |
| **Automated Inventory Forecasting** | Advanced predictive ML models estimating market yield and fertilizer storage consumption. | Static financial forecast calculator based on standard inputs and BDT budgets. |
| **Multi-Tenant Corporate Accounts** | Complex access-control hierarchies (e.g., agribusiness managers controlling sub-accounts for hundreds of contract farmers). | Single User $\leftrightarrow$ Single Farmer profile structure. |
| **Real-time SMS Alert Broadcasts** | Integrating Twilio/Bulksms gateways to broadcast disease outbreaks to geographic regions. | Local alert notice widget reading community-contributed reports in the client dashboard. |

---

## 🛠️ Codebase Guardrails

1. **No External API Integrations**: Do not add external weather API keys, map integrations, or SMS providers. Keep all features self-contained.
2. **Mocking External Data**: If a dashboard widget requires dynamic external data (e.g., weather intelligence, outbreak maps), mock the values cleanly on the client or server side using realistic local mock data.
3. **Restricted Package Installations**: Do not add new NPM packages unless absolutely necessary and approved. NextAuth, Prisma Client, and Lucide React are the only major non-core libraries allowed.

# Small Business BR Plugin

Brazil-adapted small business workflows for [Cowork](https://claude.com/product/cowork) and Claude Code. This fork is based on Anthropic's open-source `small-business` plugin, but rewired for the operating reality of Brazilian SMBs: **Pix, boleto, Mercado Pago, WhatsApp, Instagram, Simples Nacional, eSocial, LGPD, local ERPs, and accountant handoff workflows**.

This is a **localization draft**, not a finished production plugin. The goal is to keep Anthropic's workflow model while replacing US-only assumptions and adding graceful fallbacks when a Brazilian tool has no MCP connector.

> **Important**: This plugin helps organize workflows, summaries, drafts, and accountant handoff materials. It does **not** provide accounting, legal, payroll, tax, or labor-law advice. All outputs should be reviewed by the owner and, when appropriate, a Brazilian accountant or lawyer.

## What changed from the original plugin

The original Anthropic plugin assumes a stack centered on:
- QuickBooks
- PayPal
- HubSpot
- Stripe / Square

This Brazil fork treats those as **optional**, not default.

### Brazil-first operating model

**Finance & operations**
- Pix
- boleto
- Mercado Pago
- Conta Azul / Omie / Bling / Nibo
- bank statement CSVs
- NF-e / NFS-e exports
- accountant handoff packets

**Leads & marketing**
- WhatsApp
- Instagram DM
- web forms
- RD Station
- simple CRM or spreadsheet pipelines
- Canva

**Compliance context**
- Simples Nacional / MEI / ME / EPP awareness
- eSocial / payroll document organization
- LGPD-safe handling of customer data

## Installation

### Cowork
Install as a local/custom plugin or via a Git-based fork once published.

### Claude Code
If you publish this fork to a Git repo or local marketplace, install it there. For local development, test the plugin folder directly in your Claude Code environment.

## Connector strategy

This fork uses **two operating modes**.

### 1) Connected mode
Use real connectors when available. The draft keeps these MCP definitions because they are valid and useful when the business uses them:
- Canva
- Gmail
- Google Calendar
- Google Drive
- Microsoft 365
- Slack
- DocuSign
- QuickBooks / PayPal / HubSpot / Stripe / Square (optional when a Brazil-based business actually uses them)

### 2) Upload/manual mode
For many Brazilian SMB stacks, the practical first version is file-based:
- CSV exports from ERP or bank
- pasted WhatsApp/Instagram lead logs
- NFS-e / invoice spreadsheets
- copied complaint threads
- accountant-provided templates

**Design rule:** if a connector is missing, the workflow should degrade gracefully to upload/manual mode instead of failing hard.

## Best-fit businesses

This plugin is most useful for:
- service businesses
- local retail
- ecommerce
- agencies
- clinics
- consultancies
- founder-led companies with 1–30 employees

## Recommended onboarding questions

This fork should capture:
- industry / business model
- MEI / ME / EPP / Simples / Lucro Presumido context
- where money comes in: Pix, boleto, card, Mercado Pago, transfer
- where leads come from: WhatsApp, Instagram, web, indicação, RD Station
- ERP / finance stack: Conta Azul, Omie, Bling, Nibo, spreadsheet
- who closes the books: owner or accountant
- biggest headaches: cash flow, collections, marketing, complaints, admin chaos

## Core commands in the Brazil draft

### Money & finance
- `/plan-payroll` — forecast short-term cash, payroll pressure, and collections before payroll / pró-labore
- `/month-heads-up` — 30-day cash and risk outlook
- `/close-month` — month-end prep, reconciliation, and accountant handoff packet
- `/price-check` — margin check with Brazilian SMB-friendly pricing scenarios
- `/tax-prep` — prep material for accountant handoff (Simples / documents / obligations), not tax advice

### Leads & marketing
- `/call-list` — prioritized leads from WhatsApp, Instagram, RD Station, CRM, or spreadsheet
- `/run-campaign` — campaign brief + Canva + channel plan for Instagram / WhatsApp / email
- `/sales-brief` — what is selling, what is slowing down, what to push this month

### Customers & operations
- `/customer-pulse-check` — complaint and sentiment themes from WhatsApp, Instagram, Mercado Pago disputes, tickets, email, and pasted reviews
- `/handle-complaint` — draft a response, propose next steps, stage refund/recovery actions with explicit approval
- `/crm-cleanup` — CRM hygiene where a real CRM exists; otherwise can work from exported spreadsheets
- `/review-contract` — plain-language contract review with red flags for owner review

### Business rhythm
- `/monday-brief`
- `/friday-brief`
- `/quarterly-review`

## Localization principles

1. **Brazilian workflow logic first**
   - cash, collections, Pix, boleto, WhatsApp, accountant handoff
2. **Connectors second**
   - use them where available, never assume they exist
3. **No silent failure**
   - if data is partial, say exactly what's missing
4. **Manual fallback everywhere necessary**
   - CSV, spreadsheet, pasted text, PDFs
5. **Compliance-aware language**
   - never pretend to replace legal/accounting review

## Current status of this fork

This draft already adapts the high-level positioning, router, onboarding, and several core workflow skill instructions for Brazil.

Still needed for a production-ready version:
- actual MCP integrations for Brazilian tools where available
- stronger examples in Portuguese
- connector-specific query docs for local ERPs and payment providers
- live testing in a configured Claude Code environment with authenticated connectors

## Suggested go-to-market use

This fork pairs well with a productized offer such as:
- a mini-course
- a setup workshop
- a done-with-you implementation sprint

The strong positioning is:

> Anthropic created the workflow model. This fork adapts it to how Brazilian small businesses actually run.

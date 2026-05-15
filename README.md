# Claude Small Business BR

Brazil-first small business workflows for [Cowork](https://claude.com/product/cowork) and Claude Code.

This fork started from Anthropic's open-source `small-business` plugin, but this repo is now intentionally narrowed to the workflows already adapted for Brazilian SMB reality: **Pix, boleto, Mercado Pago, WhatsApp, Instagram, Simples Nacional, eSocial, LGPD, local ERP exports, and accountant handoff workflows**.

> **Important**: this plugin helps with workflow organization, summaries, drafts, collections follow-up, and accountant handoff preparation. It does **not** replace accounting, payroll, legal, tax, or labor-law review.

## What this repo now optimizes for

- founder-led Brazilian SMBs
- service businesses, ecommerce, agencies, clinics, and local retail
- teams that run on WhatsApp, Instagram, email, spreadsheets, and lightweight ERPs
- businesses that often need **manual fallback** instead of perfect live integrations

## Active scope in this repo

Only the **localized skills** stay active in `skills/`.

### Active skills
- `smb-router`
- `smb-onboard`
- `cash-flow-snapshot`
- `plan-payroll`
- `invoice-chase`
- `month-end-prep`
- `tax-season-organizer`
- `lead-triage`
- `content-strategy`
- `run-campaign`
- `customer-pulse`
- `ticket-deflector`

Untouched original skills with US-centric assumptions were moved to `archive/nonlocalized-skills/` so the public plugin stops implying that PayPal / QuickBooks / HubSpot are the default operating stack.

## Connector strategy

### 1) Bundled by default
These are broad, still-useful connectors that many Brazilian teams actually use regardless of local ERP/payment stack:
- Canva
- Gmail
- Google Calendar
- Google Drive
- Microsoft 365
- Slack
- DocuSign

### 2) Brazil-first integrations to implement next
These are better fits than talking about PayPal as a default:
- **Mercado Pago** — payments, Pix, boleto, card status, refunds
- **Asaas** — cobrança, Pix, boleto, subscription/receivables operations
- **Conta Azul / Omie / Bling** — finance and ERP data
- **RD Station** — lead and funnel visibility
- **WhatsApp** — lead intake, complaints, follow-ups
- **Nuvemshop** — ecommerce orders and customer events
- **bank / ERP exports** — CSV, OFX, CNAB, NF-e / NFS-e spreadsheets

See `docs/BRAZIL-INTEGRATION-OPTIONS.md` for the implementation shortlist and the official docs checked.

### 3) Manual-first fallback
For many Brazilian SMBs, this is still the most practical version 1:
- CSV exports from ERP or bank
- pasted WhatsApp lead logs
- Instagram DM summaries
- invoice spreadsheets
- complaint threads
- accountant-provided templates

**Rule:** when no safe connector exists, degrade to upload/manual mode instead of hallucinating a live integration.

## Recommended onboarding questions

Capture:
- industry / business model
- MEI / ME / EPP / Simples / Lucro Presumido context
- where money comes in: Pix, boleto, card, Mercado Pago, transfer
- where leads come from: WhatsApp, Instagram, web, indicação, RD Station
- ERP / finance stack: Conta Azul, Omie, Bling, Nibo, spreadsheet
- who closes the books: owner or accountant
- biggest headaches: cash flow, collections, marketing, complaints, admin chaos

## Localization principles

1. **Brazilian workflow logic first**
2. **Real implementation paths over generic US examples**
3. **Manual fallback everywhere necessary**
4. **No silent failure when data is partial**
5. **Compliance-aware language**

## Status

This repo is now deliberately scoped to the localized subset instead of pretending the whole original plugin is already adapted.

Still needed:
- implement Brazil-first adapters / MCP servers for the highest-value tools
- add more Portuguese examples
- test with real connected accounts for Mercado Pago / ERP workflows
- document import formats for WhatsApp, Pix, boleto, and accountant handoff packets

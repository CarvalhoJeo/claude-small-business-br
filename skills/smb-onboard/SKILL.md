---
name: smb-onboard
description: >
  Brazil-first onboarding for SMB owners. Helps the owner map their real tool
  stack, choose one or two useful data sources, run a quick win workflow, and
  store business context for later skills. Built for businesses that may use
  WhatsApp, Instagram, Pix, boleto, Mercado Pago, Conta Azul, Omie, Bling,
  Nibo, RD Station, or spreadsheets instead of a fully connected foreign SaaS stack.
---

# SMB Onboard (Brazil)

## Goal

In 15–20 minutes, do four things:
1. understand how the business actually runs
2. identify the first usable data sources
3. run one quick win
4. store business context for future workflows

## Workflow

### Step 1 — Welcome and assess

If a `## Business context` block already exists, show it and ask what changed.
Only update changed fields.

If there is no context yet, start with this question:

> "What is hurting most right now: cash, leads, complaints, admin chaos, or something else?"

### Step 2 — Map the real stack

Ask one question at a time.

1. **Business type**
   - service business, retail, ecommerce, clinic, agency, consultancy, other
2. **Tax/size context**
   - MEI, ME, EPP, Simples, Lucro Presumido, or "I don't know"
3. **How money comes in**
   - Pix, boleto, card machine, Mercado Pago, bank transfer, subscription, cash
4. **Where leads come from**
   - WhatsApp, Instagram DM, website form, indicação, RD Station, CRM, spreadsheet
5. **Finance stack**
   - Conta Azul, Omie, Bling, Nibo, spreadsheet, accountant-only
6. **Who closes the books**
   - owner, finance person, external accountant
7. **Top three recurring headaches**

### Step 3 — Pick the first usable sources

Do **not** force the owner into a specific SaaS tool.
Instead choose the easiest first data source, such as:
- ERP export
- bank CSV
- overdue receivables spreadsheet
- WhatsApp lead sheet
- Instagram campaign notes
- Gmail inbox
- calendar

Explain what Claude will unlock with each source in one short sentence.

Examples:
- "With your receivables export, I can rank who to charge first."
- "With WhatsApp leads, I can tell you who deserves a reply today."
- "With your bank/ERP export, I can build a short-term cash view."

### Step 4 — Run one quick win

Pick the most obvious workflow from the owner's biggest pain.
Examples:
- cash pain → `/plan-payroll`
- messy month-end → `/month-end-prep`
- weak pipeline → `/lead-triage`
- sales drop → `/run-campaign`
- angry customers → `/ticket-deflector`

The first run should be small and concrete, not comprehensive.

### Step 5 — Draft and store business context

Show the owner the profile before saving.
Wait for approval.

Use this format:

```md
## Business context
- Business type:
- Tax / size context:
- Main channels for money in:
- Main channels for leads in:
- Finance stack:
- Who closes the books:
- Top 3 headaches:
- Preferred weekly check-in day/phrase:
- Notes:
```

### Step 6 — Set the weekly rhythm

Propose a simple cadence:
> "Each week, say 'weekly check-in' and I'll summarize cash, leads, complaints, and what needs attention first."

If the owner prefers another phrase or day, store it.

## Guardrails

- Never assume the business uses foreign default SaaS tools.
- Never shame the owner for using spreadsheets.
- Never connect tools on the owner's behalf.
- Prefer the easiest data source that gets a real result today.
- Frame every setup suggestion around what Claude will do, not what the software sells.

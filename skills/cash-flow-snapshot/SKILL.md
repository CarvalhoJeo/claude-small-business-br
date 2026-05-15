---
name: cash-flow-snapshot
description: >
  Builds a 30/60/90-day cash flow view for a Brazilian small business using any
  mix of ERP exports, bank CSVs, receivables spreadsheets, QuickBooks, PayPal,
  Stripe, Square, Mercado Pago exports, or pasted fixed-cost data. Use when the
  owner asks about cash pressure, payroll risk, runway, next month's cash, or
  whether receivables will cover obligations.
compatibility: "Works best with structured exports. Prefer live connectors when available; otherwise use CSV/spreadsheet fallback."
---

# Cash Flow Snapshot (Brazil)

## Goal

Produce a short-term cash forecast the owner can actually use.

This should reflect Brazilian operating reality:
- Pix and boleto collections
- card settlement timing
- payroll / pró-labore / rent / recurring bills
- overdue receivables
- accountant handoff when needed

## Workflow

### Step 1 — Identify usable sources

Use any combination of:
1. ERP export (Conta Azul, Omie, Bling, Nibo, QuickBooks)
2. bank statement CSV
3. receivables spreadsheet
4. payment exports (PayPal, Stripe, Square, Mercado Pago if uploaded)
5. pasted fixed-cost list

If the owner has no live connector, switch immediately to upload/manual mode.
Do not treat that as failure.

### Step 2 — Pull the minimum viable inputs

You need, at minimum:
- current cash on hand or latest bank balance
- expected inflows by date or expected week
- fixed outflows by date
- major one-off obligations

Useful examples of inflows:
- open invoices
- Pix receivables
- boleto due dates
- card receivables
- subscription renewals

Useful examples of outflows:
- payroll / folha
- pró-labore
- rent
- taxes / DAS
- recurring vendors
- loan installments

### Step 3 — Build the 30/60/90-day view

For each window, show:
- expected inflows
- expected outflows
- net position
- main uncertainty drivers

Confidence should be described plainly:
- **high confidence** — dates and amounts are mostly known
- **medium confidence** — some receivables are uncertain
- **low confidence** — too much depends on late customers or incomplete data

### Step 4 — Flag named risks

Flag the top 5 risks by practical importance, for example:
- payroll may fall before expected customer receipts
- too much dependence on one late customer
- DAS / tax deadline collides with payroll week
- bank balance covers routine expenses but not one-off obligations
- data gap: card or Pix settlements missing from source files

### Step 5 — Deliver output

Provide:
1. a short chat summary
2. a table for 30 / 60 / 90 days
3. a bullet list of named risks
4. the single most useful next action

If structured data is strong enough, also produce an XLSX workbook.

## Guardrails

- Do not present the forecast as accounting advice.
- Be explicit about what data is missing.
- Prefer practical ranges over fake precision.
- If the owner has an accountant, frame the result as a management forecast plus accountant handoff material.

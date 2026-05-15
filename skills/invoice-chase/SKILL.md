---
name: invoice-chase
version: 0.2.1-br
description: >
  Drafts overdue receivable follow-ups for Brazilian SMBs using ERP exports,
  receivables spreadsheets, billing platform exports, Mercado Pago / Asaas
  exports, or pasted collections data. Supports email-first and WhatsApp-ready
  follow-up drafts. Use when the owner asks who owes them money, wants to
  charge late customers, or needs a collections priority list.
---

# Invoice Chase (Brazil)

## Workflow

1. Pull overdue receivables from the best available source:
   - Conta Azul / Omie / Bling / Nibo export
   - receivables spreadsheet
   - billing platform export
   - Mercado Pago / Asaas / boleto / Pix support export
2. Exclude anything marked as recently paid, under negotiation, or already promised for a near date.
3. Rank each customer by:
   - amount due
   - days late
   - payment history
   - urgency relative to payroll / fixed obligations
4. Draft one follow-up per customer in the right tone:
   - gentle for reliable customers
   - direct for repeat late payers
5. Offer the draft in the best channel available:
   - email draft
   - WhatsApp-ready text
   - billing-platform reminder copy
6. Present the ranked list and drafts. Wait for approval before sending or staging anything.

## Guardrails

- Never send without approval.
- Never assume Pix/boleto/card status if the export is unclear.
- If data is incomplete, mark customers as "verify manually" instead of bluffing.

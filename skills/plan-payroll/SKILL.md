---
name: plan-payroll
description: Forecasts short-term cash, payroll pressure, and collections risk before payroll or pró-labore. Accepts CSV/manual fallback when no live finance connector exists.
allowed-tools: Read, WebFetch, Bash
---

Run the payroll-confidence workflow in two steps. The owner approves each handoff.

Parse arguments:
- `--horizon` (default `30`)
- `--payroll-date` (optional)

## Step 1 — Cash forecast

Trigger `cash-flow-snapshot`.

Use whatever data is available:
- ERP exports
- bank CSV
- receivables spreadsheets
- QuickBooks / PayPal / Stripe / Square if connected
- pasted fixed-cost list

Focus on:
- payroll / folha
- pró-labore
- rent
- taxes close to payroll date
- overdue customers that could close the gap

Present the result and wait for approval before the next step.

## Step 2 — Overdue collection

Trigger `invoice-chase`.

Rank overdue receivables by:
- amount
- days late
- importance to near-term cash survival
- likelihood of paying soon

Draft reminders in tone matched to the customer relationship.
Where possible, stage via the owner's preferred channel:
- email draft
- WhatsApp draft/copy block
- billing platform reminder

Nothing sends automatically.

## Output

End with a one-paragraph recap:
- payroll verdict: covered / tight / at risk
- biggest risks
- who should be charged first
- projected impact if top reminders convert

## Guardrails

- Never pretend this replaces payroll/accounting advice.
- Never send reminders without approval.
- If the data quality is weak, say so clearly.

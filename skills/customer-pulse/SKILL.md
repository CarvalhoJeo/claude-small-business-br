---
name: customer-pulse
version: 0.2.1-br
description: >
  Aggregates customer complaints, disputes, tickets, WhatsApp excerpts,
  Instagram messages/comments, email threads, and pasted reviews into a themes
  report with verbatim evidence and a short action list. Built for Brazilian
  SMBs where customer signals may live outside a formal support desk.
---

# Customer Pulse (Brazil)

## Workflow

1. Set the date window. Default: last 30 days.
2. Pull the best available customer-signal sources:
   - email threads
   - ticket system / CRM if present
   - Mercado Pago or marketplace dispute exports if available
   - pasted WhatsApp messages

   If a Mercado Pago CSV export is provided, normalize it with `node scripts/mercado-pago-normalize.js <export.csv>` and treat refund/chargeback rows as evidence, not as a complete support history.
   - pasted Instagram DMs/comments
   - review text copied from Google / iFood / marketplace / social comments
3. Group evidence into 3–5 themes.
4. For each theme, include:
   - a plain-language label
   - 2–3 verbatim quotes
   - source tags
   - approximate signal count
5. Finish with "do these 3 things this week".

## Guardrails

- Verbatim evidence matters — do not replace everything with summaries.
- If a source is missing or rate-limited, mention it.
- Do not pretend WhatsApp/Instagram are directly connected if the owner pasted text manually.
- Keep the final actions operational, not fluffy.

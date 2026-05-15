---
name: month-end-prep
description: >
  Walks a Brazilian SMB owner through month-end prep: reconcile ERP and bank
  exports, compare Pix/boleto/card settlements, flag uncategorized or doubtful
  items, and build an accountant handoff packet. Use when the owner asks to
  close the month, reconcile transactions, understand the month's result, or
  prepare documents for their accountant.
---

# Month End Prep (Brazil)

## Goal

Help the owner get from admin chaos to a clean month-end package.
This is not a formal accounting close. It is a pragmatic owner + accountant prep workflow.

## Workflow

### Step 1 — Confirm target month
Default to the previous calendar month unless the owner says otherwise.

### Step 2 — Pull source data
Use the best available source mix:
- ERP export (Conta Azul, Omie, Bling, Nibo, spreadsheet)
- bank statement CSV / OFX
- payment exports (Pix, boleto, card/acquirer, Mercado Pago, Asaas)
- invoice / NFS-e / NF-e summary when available

### Step 3 — Reconcile the basics
Flag:
- uncategorized or unclear transactions
- settlement mismatches
- duplicated-looking transactions
- missing support documents or notes
- inflows that appear in bank but not in ERP, or vice versa

### Step 4 — Focus on Brazilian realities
Look specifically for:
- Pix receipts not reflected clearly in ERP
- boleto receipts or write-offs not reconciled
- card settlements arriving net of fees
- taxes / DAS / labor obligations near month-end
- gaps that will matter to the accountant handoff

### Step 5 — Owner gate
Before generating outputs, show:
- items resolved
- items still open
- items intentionally skipped for accountant review

Ask if they want to continue.

### Step 6 — Write the narrative
Create a plain-language month summary:
- revenue trend
- margin trend
- key expense changes
- cash pressure points
- what needs attention next month

### Step 7 — Export close packet
Produce:
- XLSX summary / reconciliation workbook
- one-page summary for owner or accountant
- outstanding action list

## Guardrails

- Never pretend this is a legal/accounting filing.
- Never modify accounting records directly.
- When in doubt, route unresolved items into an accountant handoff list.

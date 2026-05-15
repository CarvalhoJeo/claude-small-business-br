# Mercado Pago import path

This repo now includes a **tested normalization script** for Mercado Pago CSV exports:

```bash
node scripts/mercado-pago-normalize.js tests/fixtures/mercado-pago-sample.csv --include-records
```

## Why this exists

A real Mercado Pago MCP connector may come later, but Brazilian SMB owners need useful workflows **now**.

A normalized export already unlocks practical value for:
- `cash-flow-snapshot`
- `plan-payroll`
- `invoice-chase`
- `customer-pulse`
- `month-end-prep`
- `ticket-deflector`

## Current support

The script currently handles CSV exports with common Portuguese/English column variants for:
- transaction/payment ID
- date
- description
- type
- status
- gross amount
- net amount
- fee
- payment method
- buyer/customer
- external reference / order reference

## Output shape

The script produces:
- normalized records
- payment method breakdown
- settled net inflow
- pending inflow
- refunds outflow
- disputes outflow
- fee totals
- collection follow-up candidates
- customer-signal events (refunds / chargebacks)

## Intended use in skills

### cash-flow-snapshot
Use `summary.cashFlowSnapshot` to bring Mercado Pago settlement/pending/refund data into the 30/60/90-day view.

### invoice-chase
Use `summary.collectionFollowUps` to identify pending boleto/Pix/card cases that still need owner verification or follow-up.

### customer-pulse / ticket-deflector
Use `summary.customerSignals` to surface dispute/refund pressure and to avoid hallucinating refund status.

### month-end-prep
Use approved net totals and fee totals to reconcile processor activity against bank / ERP records.

## Limits

- This is an **import path**, not a live connector.
- Export schemas can vary; more aliases will likely be needed after testing with real accounts.
- The script does not authenticate to Mercado Pago.
- Refund/dispute classification is rule-based and should be verified against real export samples.

## Next implementation steps

1. test against a real Mercado Pago export
2. extend aliases for real-world column names
3. add date-window filtering
4. add a JSON-to-skill handoff example
5. decide whether to build a real MCP wrapper or keep import-first as the default path

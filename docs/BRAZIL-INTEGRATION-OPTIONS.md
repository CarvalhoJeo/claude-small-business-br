# Brazil Integration Options

This file keeps the plugin grounded in **real implementation paths** instead of defaulting to US tools.

## Recommendation

Treat the integration stack in three tiers:

### Tier 1 — high-value, Brazil-first targets
Implement these first.

1. **Mercado Pago**
   - Why: common for Pix, boleto, card payments, refunds, and disputes
   - Official docs checked: https://www.mercadopago.com.br/developers/pt/docs
   - Good fit for: `cash-flow-snapshot`, `invoice-chase`, `customer-pulse`

2. **Asaas**
   - Why: cobrança stack already used by many Brazilian SMBs
   - Official docs checked: https://docs.asaas.com/docs
   - Good fit for: `cash-flow-snapshot`, `invoice-chase`, `plan-payroll`

3. **Omie / Conta Azul / Bling**
   - Why: local ERP/finance systems are more relevant than QuickBooks for this repo
   - Official docs checked:
     - Omie: https://developer.omie.com.br/
     - Conta Azul: https://developers.contaazul.com/
     - Bling: https://developer.bling.com.br/
   - Good fit for: `cash-flow-snapshot`, `month-end-prep`, `tax-season-organizer`

4. **WhatsApp**
   - Why: many Brazilian small businesses run sales and support through WhatsApp first
   - Official docs checked: https://developers.facebook.com/docs/whatsapp
   - Good fit for: `lead-triage`, `customer-pulse`, `ticket-deflector`, `invoice-chase`

### Tier 2 — growth stack
5. **RD Station**
   - Why: stronger local fit than assuming HubSpot everywhere
   - Developer portal checked: https://developers.rdstation.com/
   - Good fit for: `lead-triage`, `content-strategy`, `run-campaign`

6. **Nuvemshop**
   - Why: useful for Brazilian ecommerce flows
   - Developer portal checked: https://developers.nuvemshop.com.br/
   - Good fit for: `cash-flow-snapshot`, `customer-pulse`, `run-campaign`

### Tier 3 — fallback data imports
Implement reliable ingest for:
- CSV
- OFX
- CNAB extracts
- NF-e / NFS-e spreadsheets
- pasted WhatsApp logs
- copied Instagram leads/complaints

This tier matters because many SMBs do not have stable API access even when they do have real operational data.

## MCP reality check

There are community MCP projects for several Brazil-relevant tools, but they should be treated as **implementation leads**, not trusted defaults.

Examples discovered during repo cleanup:
- Mercado Pago: `hdbookie/mercado-pago-mcp`
- Asaas: `suissa/mcp-asaas-server`
- Omie: `geraldoaax/mcp-server-omie`
- Conta Azul: `zaratine/conta-azul-mcp-server`
- Bling: `peptina/mcp-bling`
- WhatsApp: `delltrak/wamcp`

These may be useful accelerators, but each one needs review for:
- auth model
- maintained status
- tool coverage
- write-safety
- privacy / LGPD implications

## Repo policy

This plugin should not market **PayPal / QuickBooks / HubSpot / Square / Stripe** as the default stack.

If a Brazilian business genuinely uses one of those tools, add it as an **optional private extension** — not as the center of the repo.

## Suggested implementation order

1. add import schemas for CSV / OFX / Pix / boleto exports
2. add Mercado Pago support
3. add one ERP integration: Omie *or* Conta Azul *or* Bling
4. add WhatsApp ingestion / sync path
5. add RD Station support
6. add ecommerce support like Nuvemshop if the target audience needs it

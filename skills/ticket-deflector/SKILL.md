---
name: ticket-deflector
description: >
  Reads a customer complaint or refund request, gathers whatever context is
  available, and drafts a response in the owner's voice. Designed for Brazilian
  SMBs where complaints may arrive by WhatsApp, Instagram DM, email, ticketing
  tool, or payment dispute. Refunds or credits always require explicit owner
  approval.
compatibility: "Works with pasted text, email, CRM history, and payment/dispute exports."
---

# Ticket Deflector (Brazil)

## Workflow

1. Read the customer message.
   Accept:
   - pasted WhatsApp text
   - Instagram DM/comment transcript
   - email thread
   - support ticket
2. Extract:
   - customer name/contact
   - issue type
   - order/payment reference if present
   - emotional tone
3. Pull supporting context if available:
   - CRM/contact history
   - payment/dispute record
   - prior complaint notes
4. Draft a reply in the owner's voice.
   Match tone to issue:
   - refund request
   - delivery/status issue
   - service complaint
   - general frustration
5. If money action may be needed, stage it for approval only:
   - refund
   - discount/credit
   - escalation
6. After approval, either send or save as draft using the owner's chosen channel/workflow.

## Guardrails

- Never issue a refund or compensation without explicit approval.
- Never fake order/payment status if the evidence is incomplete.
- If multiple transactions/orders could match, surface the ambiguity.
- Keep Brazilian customer communication human and direct, not robotic.

---
name: lead-triage
version: 0.2.0-br
description: >
  Prioritizes inbound leads for Brazilian SMBs using any mix of HubSpot, RD
  Station, spreadsheets, WhatsApp lead logs, Instagram DMs transcribed into a
  sheet, or pasted sales notes. Produces a ranked follow-up list with talking
  points and draft messages. Use when the owner asks who to prioritize, who to
  contact today, or which leads are hottest.
---

# Lead Triage (Brazil)

## Workflow

1. Pull the best available source:
   - HubSpot
   - RD Station export
   - CRM/spreadsheet export
   - WhatsApp lead sheet
   - pasted lead list
2. Normalize the fields you have:
   - name
   - company (if relevant)
   - source
   - last interaction
   - deal value or buying signal
   - urgency notes
3. Score each lead using:
   - engagement
   - fit
   - urgency
   - recency / whether they were already touched today
4. Return a ranked list with:
   - who to contact first
   - why they rank high
   - one suggested angle for the message or call
5. Offer draft follow-ups in the channel that fits the business:
   - WhatsApp-ready message
   - email draft
   - call talking points
6. Offer two possible call slots if calendar access exists.

## Guardrails

- Never require HubSpot if other workable lead data exists.
- Never send messages automatically.
- If the source data is weak, say the ranking is directional, not definitive.
- For WhatsApp-heavy businesses, keep copy shorter and more conversational.

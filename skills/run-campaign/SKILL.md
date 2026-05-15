---
name: run-campaign
description: >
  Runs a Brazil-first campaign workflow covering sales analysis, offer brief,
  Canva assets, and a channel plan for Instagram, WhatsApp, email, or mixed
  execution.
allowed-tools: Read, WebFetch, Bash
---

Run the campaign workflow in three steps. Stop at every owner approval gate.

Parse arguments:
- `--lookback` (default `90d`)
- `--channel` (default `mixed`)

## Step 1 — Build the brief

Trigger `content-strategy`.

Use the best available revenue and offer data to identify:
- what is slowing down
- what should be promoted now
- what offer angle has the best chance of working

Present the brief and wait for approval.

## Step 2 — Build assets

Trigger `canva-creator`.

Turn the approved brief into:
- post ideas
- Canva asset list
- caption drafts
- story/reel/static recommendations when relevant

If the owner is WhatsApp-heavy, also prepare short message variants for broadcast or one-to-one follow-up.

Present assets and drafts. Wait for approval.

## Step 3 — Build the target list

Trigger `lead-triage`.

Produce:
- segment or audience list
- top leads to contact personally
- talking points / short scripts
- optional call slots if calendar exists

## Guardrails

- Never assume HubSpot is the send engine.
- Never send automatically.
- Prefer Instagram + WhatsApp + email mixes when the owner is not running a full CRM stack.
- If a connector is missing, switch to export/manual mode instead of aborting immediately.

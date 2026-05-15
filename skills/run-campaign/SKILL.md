---
name: run-campaign
description: >
  Runs a Brazil-first campaign workflow covering sales analysis, offer brief,
  content angles, asset checklist, and a channel plan for Instagram, WhatsApp,
  email, or mixed execution.
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

## Step 2 — Build the campaign pack

Using the approved brief, produce:
- post/message ideas
- asset checklist for Canva or the owner's design workflow
- caption drafts
- story/reel/static recommendations when relevant
- short WhatsApp message variants if the business sells there
- email angle if email is part of the mix

Present assets and drafts. Wait for approval.

## Step 3 — Build the target list

Trigger `lead-triage`.

Produce:
- segment or audience list
- top leads to contact personally
- talking points / short scripts
- optional call slots if calendar exists

## Guardrails

- Never assume a specific CRM or send engine.
- Never send automatically.
- Prefer Instagram + WhatsApp + email mixes when the owner is not running a full CRM stack.
- If a connector is missing, switch to export/manual mode instead of aborting immediately.

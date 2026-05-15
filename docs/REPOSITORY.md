# Repository Guide

## What this repo is

`small-business-br` is a standalone derivative of Anthropic's open-source `small-business` plugin, localized for Brazilian SMB workflows.

## Current status

- standalone plugin directory: yes
- Apache 2.0 license included: yes
- derivative notice included: yes
- git repo initialized: yes
- Claude Code plugin validation: `npm run validate:plugin`
- first Brazil-first implementation artifact added: tested Mercado Pago CSV normalizer
- active skill surface narrowed to localized skills only

## Main folders

- `.claude-plugin/` — plugin manifest
- `skills/` — active localized workflow skills
- `docs/` — localization notes, integration plans, import docs
- `scripts/` — helper scripts like Mercado Pago normalization
- `tests/` — import/tool tests and fixtures
- `archive/` — nonlocalized original material kept out of the active plugin

## Publish checklist

1. validate plugin
2. review README and NOTICE
3. confirm localization wording
4. add Portuguese examples where needed
5. publish repo or zip plugin directory

# Repository Guide

## What this repo is

`small-business-br` is a standalone derivative of Anthropic's open-source `small-business` plugin, localized for Brazilian SMB workflows.

## Current status

- standalone plugin directory: yes
- Apache 2.0 license included: yes
- derivative notice included: yes
- git repo initialized: yes
- Claude Code plugin validation: expected via `npm run validate:plugin`
- course/tutorial automation scaffolding: included in `scripts/`, `templates/`, and `docs/AUTOMATION-COURSE.md`

## Main folders

- `.claude-plugin/` — plugin manifest
- `skills/` — workflow skills
- `docs/` — repo notes and automation docs
- `templates/course/` — reusable lesson / launch templates
- `scripts/` — scaffolding scripts
- `config/` — example course config

## Publish checklist

1. validate plugin
2. review README and NOTICE
3. confirm localization wording
4. add Portuguese examples where needed
5. publish repo or zip plugin directory

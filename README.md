# MATTHEWS CORP — AI-Native Product Workflow Demo

## Overview

This repository demonstrates how structured product context can be combined with reusable AI workflows to support AI-native product management.

The repo uses a fictional financial services company called **MATTHEWS CORP** and focuses on a push notification preferences feature within a mobile app.

It demonstrates how:

- Product context can be stored in Markdown
- Behavioural expectations can be captured using BDD
- Reusable Claude Code workflows can operate over structured context
- Product intent can be transformed into executable prototypes
- Current-state and future-state experiences can be compared side-by-side

This repository intentionally separates:

- **Feature/system truth** (how the product works today)
- **Initiatives/change efforts** (what we want to improve)
- **Reusable workflows** (how AI reasons over the context)

---

# Purpose

The goal of this repository is to demonstrate a practical AI-native product workflow for product managers.

Specifically, it shows:

- How product managers can use Claude Code beyond chatbot-style prompting
- How GitHub + Markdown can act as a persistent product context layer
- How reusable AI workflows can generate:
  - feature analysis
  - PRDs
  - BDD
  - working local prototypes
- How product and engineering workflows may converge in a future AI-native delivery model

This repository is intended as:
- a learning resource
- a demo environment
- a reference implementation for experimentation

It is **not** intended to represent production-ready architecture or engineering implementation.

---

# Standardisation Layer

This repository uses reusable agents and skills from:

https://github.com/Alex-862/claude-pm-playbook

The playbook acts as the **standardisation layer** and provides:

- Shared workflows
- Shared behavioural instructions
- Shared prompting standards
- Reusable agents and skills
- Consistent operating patterns

Examples include:
- `analyse_feature`
- `draft_prd`
- `generate_bdd`
- `spec_review`

This repository then layers **feature-specific context** on top of those standardised workflows.

The principle is:

```text
Reusable workflows + structured context = high-quality AI outputs
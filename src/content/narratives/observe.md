---
title: Observe your agents and shadow AI
phase: observe
heroQuestion: Which agents do I have, and what are they doing?
intro: >-
  Observe is the first of the three Agent 365 phases — and the entry point
  for shadow AI too. Once an agent ships (whether from Copilot Studio,
  Foundry, a partner or M365 Copilot), or once employees start pasting
  work into an unsanctioned chatbot, you need an inventory entry, a stable
  identity and a stream of audit events. Without that, none of the later
  phases work.
keyOutcomes:
  - Every sanctioned agent appears in a single inventory.
  - Every shadow GenAI app and third-party agent in the tenant is surfaced.
  - Each agent has its own identity, not a borrowed user account.
  - Audit logs capture interactions, tool calls and data access.
  - Usage analytics show who uses which agent, how often and for what.
status: published
---

Agent 365 introduces the missing primitives. **Entra Agent ID** gives
each agent a first-class identity in the directory — no more service
principals juggling on behalf of a user. The Agent 365 inventory then
becomes the canonical list of what's deployed, who owns it and what
license it consumes.

On top of that identity, audit logs in Microsoft Purview record every
agent interaction, tool invocation and data access in the same unified
audit pipeline used for users. Usage analytics turn that into adoption
and risk signals: which agents are heavily used, which ones go silent,
which ones reach unusual data.

Shadow AI is the other half of the picture. Browser-based chatbots, free
productivity copilots, AI-enabled SaaS features and unmanaged agents
installed by enthusiastic teams all carry data out of your control
before any policy has a chance to apply. Microsoft Defender for Cloud
Apps catalogs the GenAI app landscape, scores each one for risk, and
tells you which users are sending data to which app. Microsoft Purview's
AI Hub surfaces the actual sensitive content that's been pasted into
those prompts. Entra Workload ID inventories the third-party agents that
have already been granted access to your tenant.

Observe is intentionally about **visibility, not enforcement**. It feeds
the **Govern** phase with the data needed to write meaningful policy,
and the **Secure** phase with the telemetry needed to detect attacks.

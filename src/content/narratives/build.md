---
title: Build secure agents
phase: build
heroQuestion: How do I ship a safe agent?
intro: >-
  "Build" covers everything that happens inside the **maker tools** —
  Microsoft Copilot Studio and Azure AI Foundry — before an agent is ever
  exposed to a real user.
keyOutcomes:
  - Harmful content is blocked or filtered before it reaches the user.
  - Prompt injection and jailbreak attempts are detected at the model layer.
  - The agent is grounded in the knowledge you choose, with no quiet fallback.
  - "Makers themselves are governed: who can build, where, with what data."
  - Each agent ships with a managed identity, not a shared key.
status: published
---

The maker tools are where security stops being a runtime problem and starts
being a design problem. Decisions made here — which model, which grounding
sources, which content filters, which environment, whose identity — define
the blast radius of every conversation the agent will ever have.

The Build phase is about defaulting to the safer choice and making the
unsafe one impossible. Content filters and prompt shields are on by
default. Knowledge grounding boundaries are explicit. Builders authenticate
with their corporate identity, sit inside an environment governed by data
policies, and ship agents that carry their own managed identity rather
than impersonating the user that triggered them.

Get this phase right and the **Observe**, **Govern** and **Secure** phases
have far less work to do. Get it wrong and no amount of runtime monitoring
will catch up.

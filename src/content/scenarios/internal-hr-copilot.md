---
title: Build a safe internal HR copilot in Copilot Studio
persona: ai-builder
question: My team is building an internal HR copilot in Copilot Studio. What do I need to do before, during and after launch?
summary: >-
  A maker-led walkthrough for shipping a sanctioned, low-code agent against
  HR data — content filters at build time, identity and DLP at govern time,
  detections at runtime.
status: published
steps:
  - phase: build
    heading: Lock down the maker environment
    rationale: >-
      Decisions made in Copilot Studio define everything that follows.
      Isolate the environment, turn on content filters, prevent the agent
      from leaking sensitive data, and pin tool execution to the calling
      user so authorization is never bypassed.
    capabilities:
      - copilot-studio-environment-isolation
      - copilot-studio-content-filters
      - copilot-studio-dlp-policies
      - copilot-studio-run-tools-with-user-credentials
  - phase: observe
    heading: Get the agent into the inventory the moment it ships
    rationale: >-
      Once published, the agent needs to appear in Agent 365 with a stable
      identity and a stream of audit events. Without this, none of the
      governance and security controls below can target it.
    capabilities:
      - agent-365-inventory
      - agent-365-usage-analytics
      - purview-audit-agent-interactions
  - phase: govern
    heading: Give the agent its own identity and policy envelope
    rationale: >-
      Provision an Entra Agent ID instead of a shared key, gate it with
      Conditional Access, and constrain what HR data it can use through
      sensitivity labels and DLP — so the agent inherits the same data
      boundaries as a human HR employee.
    capabilities:
      - entra-agent-id
      - entra-conditional-access-agents
      - purview-sensitivity-labels-agents
      - purview-dlp-for-agents
  - phase: secure
    heading: Detect prompt injection and abuse in production
    rationale: >-
      Defender XDR surfaces agent-specific signals including prompt
      injection attempts so the SOC can triage them alongside the rest of
      the estate.
    capabilities:
      - defender-xdr-agent-detections
      - defender-xdr-prompt-injection-alerts
sources:
  - title: Microsoft Copilot Studio security and governance
    url: https://learn.microsoft.com/en-us/microsoft-copilot-studio/guidance/security-and-governance
  - title: Microsoft Agent 365
    url: https://learn.microsoft.com/en-us/microsoft-365/agents/
---

The HR copilot is the most common "first agent" inside a Microsoft tenant —
employees asking about leave balances, policies, benefits, or where to file
a complaint. It also touches some of the most sensitive data in the
organisation, which makes it the right place to learn the full lifecycle.

The trick is to **do the boring work at build time**. Content filters,
environment isolation and run-as-user are five-minute settings in Copilot
Studio that prevent classes of incident that take weeks to clean up later.

Everything from Observe onward then runs on autopilot: the agent shows up
in Agent 365 the moment it publishes, Entra and Purview enforce the same
boundaries you'd expect for a human HR clerk, and the SOC sees agent
incidents in the same queue as everything else.

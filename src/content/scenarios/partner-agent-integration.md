---
title: Let a partner agent call your Microsoft 365 data
persona: security-architect
question: A partner is shipping an agent that needs to call our Microsoft 365 data. How do I give it just enough access without minting a long-lived secret?
summary: >-
  The cross-tenant agent-to-agent story. Stand the partner agent up as a
  first-class workload identity, sponsor it, scope it, monitor it — and
  retire it cleanly when the engagement ends.
status: published
steps:
  - phase: build
    heading: Insist on a managed identity and a private network path
    rationale: >-
      Before the partner agent ever touches your tenant, require that it
      runs in Azure AI Foundry behind a managed identity and reaches your
      data over a private endpoint. No shared keys, no public egress.
    capabilities:
      - azure-ai-foundry-managed-identity
      - azure-ai-foundry-private-networking
  - phase: observe
    heading: Put the partner agent in the inventory
    rationale: >-
      Treat the partner agent the same as an internal one — it gets an
      entry in Agent 365 and shows up in the Entra workload identity
      inventory. If it isn't visible, it isn't governable.
    capabilities:
      - agent-365-inventory
      - entra-workload-id-inventory
  - phase: govern
    heading: Sponsor it, scope it, and time-box it
    rationale: >-
      Give the agent its own Entra Agent ID with a human sponsor, gate it
      with Conditional Access (compliant network, allowed tenant), label
      the data it may reach, and have Purview DLP block exfiltration into
      categories the engagement doesn't cover.
    capabilities:
      - entra-agent-id
      - entra-conditional-access-agents
      - entra-id-governance-agent-sponsors
      - purview-dlp-for-agents
  - phase: secure
    heading: Watch it like you watch any third-party
    rationale: >-
      Defender XDR will raise agent-specific incidents and Sentinel
      analytics rules can correlate the partner agent's activity with the
      rest of the cross-tenant signal.
    capabilities:
      - defender-xdr-agent-detections
      - sentinel-ai-detection-content
sources:
  - title: Microsoft Entra Agent ID
    url: https://learn.microsoft.com/en-us/entra/identity/agent-id/
  - title: Azure AI Foundry security baseline
    url: https://learn.microsoft.com/en-us/security/benchmark/azure/baselines/azure-ai-foundry-security-baseline
---

Cross-tenant agents are the new third-party integration — except they
talk in natural language, change behaviour between calls, and tend to
arrive without a contract from procurement.

Treat them like any other supplier identity, but with two extra moves:
**managed identity instead of a key**, and **a human sponsor in Entra ID
Governance** who is responsible for the agent's access review. That sponsor
makes the agent retire-able. Without a sponsor, third-party agent
identities become tomorrow's orphaned service principals.

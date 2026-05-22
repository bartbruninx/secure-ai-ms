---
title: My Azure AI Foundry app just went to production
persona: ai-builder
question: My team just shipped a custom AI app on Azure AI Foundry. What turns on now to keep it safe?
summary: >-
  The runtime checklist for a freshly deployed Foundry application — model
  safety, telemetry, runtime threat protection and SOC integration, in the
  order you actually flip the switches.
status: published
steps:
  - phase: build
    heading: Confirm the model-layer guardrails are on
    rationale: >-
      Content Safety, Prompt Shields and offline evaluations should already
      be configured — but production is the moment to verify them against
      real traffic. Managed identity removes the last reason for a key in
      a config file.
    capabilities:
      - azure-ai-foundry-content-safety
      - azure-ai-foundry-prompt-shields
      - azure-ai-foundry-evaluations
      - azure-ai-foundry-managed-identity
  - phase: observe
    heading: Get usage telemetry flowing
    rationale: >-
      Agent 365 usage analytics gives you a per-app view of conversation
      volume, costs and refusal rates — the leading indicators of abuse,
      misconfiguration or an unhappy user base.
    capabilities:
      - agent-365-usage-analytics
  - phase: secure
    heading: Light up runtime threat protection
    rationale: >-
      Defender for Cloud's AI threat protection watches the workload from
      the platform side, Defender XDR surfaces prompt injection alerts,
      and Sentinel correlates them with the rest of your detections.
    capabilities:
      - defender-for-cloud-ai-threat-protection
      - defender-xdr-prompt-injection-alerts
      - sentinel-ai-detection-content
sources:
  - title: Azure AI Content Safety
    url: https://learn.microsoft.com/en-us/azure/ai-services/content-safety/
  - title: Microsoft Defender for Cloud AI threat protection
    url: https://learn.microsoft.com/en-us/azure/defender-for-cloud/ai-threat-protection
---

Production day is the worst possible time to discover that you forgot the
managed identity, that telemetry isn't reaching your workspace, or that
the SOC has no detections wired up for the new workload.

This is the **runtime turn-on checklist**. None of it is heroic — every
item is a portal toggle or an ARM/Bicep flag — but doing it in this order
means you start the first week of production with model-layer filtering
proven against real traffic, telemetry flowing, and Defender + Sentinel
ready to scream if something goes sideways.

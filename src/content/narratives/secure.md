---
title: Secure your AI estate
phase: secure
heroQuestion: How do I detect and respond when something goes wrong?
intro: >-
  Secure is the runtime layer. Even with perfect Build, Discover, Observe
  and Govern, agents will be attacked — and they will misbehave. This
  phase covers the detection, threat protection and response capabilities
  that wrap the whole estate.
keyOutcomes:
  - Prompt injection and indirect attacks raise alerts in the SOC, not just logs.
  - Suspicious agent behaviour shows up alongside user and device incidents in XDR.
  - AI workloads in Azure carry Defender protection like any other resource.
  - SOC teams have hunting queries and playbooks specifically for agents.
status: published
---

Microsoft Defender XDR is the unified hood for agent threats. Agent-aware
detections raise alerts when an agent is being prompt-injected, when it
suddenly accesses unusual data, or when a user is using an agent to
exfiltrate. These alerts appear in the same incident view as device and
identity alerts, so the SOC doesn't need a separate console.

For agents and models running on Azure AI Foundry or Azure OpenAI,
Microsoft Defender for Cloud's AI threat protection adds workload-level
signals — jailbreak attempts, anomalous prompt patterns, suspicious
fine-tuning activity. Microsoft Sentinel ties the AI signals together
with the rest of the SIEM and provides SOAR playbooks tailored to agent
incidents.

Secure is the phase that closes the loop. Detections feed back into
**Govern** as policy adjustments and into **Build** as guardrail
improvements. Done well, the lifecycle becomes a feedback loop rather
than a one-way conveyor.

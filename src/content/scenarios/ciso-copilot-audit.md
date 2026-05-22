---
title: Produce auditor-ready evidence for our Copilot rollout
persona: ciso
question: An auditor wants evidence that our Microsoft 365 Copilot deployment is governed. Where do I pull it from without a six-week scramble?
summary: >-
  The CISO's evidence trail — every step points at a Microsoft surface that
  already produces the artefact an auditor expects to see, no spreadsheets
  required.
status: published
steps:
  - phase: observe
    heading: Show the inventory and the audit log
    rationale: >-
      Agent 365 is the system of record for which agents exist in your
      tenant; Purview audit captures every interaction. Together they
      answer "what runs?" and "what happened?" — usually the first two
      questions on any audit checklist.
    capabilities:
      - agent-365-inventory
      - purview-audit-agent-interactions
  - phase: govern
    heading: Show the data and identity controls applied to it
    rationale: >-
      Sensitivity labels prove that data classification flows through to
      agent outputs. Purview DLP proves you can stop sensitive content
      from leaving. Entra ID Governance sponsors prove a human owns each
      agent's access — which is what auditors actually mean by
      "accountability".
    capabilities:
      - purview-sensitivity-labels-agents
      - purview-dlp-for-agents
      - entra-id-governance-agent-sponsors
  - phase: secure
    heading: Show that detections exist and have been triaged
    rationale: >-
      Defender XDR agent detections demonstrate that someone is watching,
      and the incident queue is the evidence that detections lead to a
      human response — closing the loop on the "monitor and respond"
      control families in any modern framework.
    capabilities:
      - defender-xdr-agent-detections
sources:
  - title: Microsoft Purview audit
    url: https://learn.microsoft.com/en-us/purview/audit-solutions-overview
  - title: Microsoft Entra ID Governance
    url: https://learn.microsoft.com/en-us/entra/id-governance/
---

The hidden cost of an AI rollout is the **next** audit. The good news is
that Microsoft already produces most of the evidence — it just lives in
different portals, and most teams haven't connected the dots yet.

This scenario is the connector. It maps the auditor's standard questions
— *what runs, what happened, who's accountable, how would you know if it
went wrong* — to the Microsoft surface that answers each one, in an order
that matches how an external assessor reads the room.

Lean on the artefacts these tools produce natively (Agent 365 inventory
export, Purview audit search, Entra access review history, Defender
incident summary). They are auditor-credible because they are
tamper-evident logs from the platform of record, not screenshots from a
spreadsheet.

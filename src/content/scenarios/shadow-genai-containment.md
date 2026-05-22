---
title: See and contain shadow generative AI
persona: it-admin
question: Employees are pasting work into ChatGPT, Claude and a dozen other tools. How do I see it and stop the worst of it without a blanket block?
summary: >-
  An Observe-first story for the IT admin who knows shadow AI is happening
  but has no inventory yet. Surface usage, score the risk per service, then
  reach for surgical access controls instead of a blunt firewall rule.
status: published
steps:
  - phase: observe
    heading: Surface the shadow AI estate
    rationale: >-
      Defender for Cloud Apps catalogues hundreds of generative AI services
      and reports who in the tenant is using them. Purview AI Hub adds the
      data-side view — which sensitive content is being pasted into those
      services from managed devices.
    capabilities:
      - defender-cloud-apps-ai-discovery
      - defender-cloud-apps-genai-risk-scoring
      - purview-ai-hub-shadow-ai
  - phase: govern
    heading: Apply policy with a scalpel, not a sledgehammer
    rationale: >-
      Use Conditional Access to require compliant devices for risky AI
      services, Purview DLP to block specific sensitive content from being
      pasted in, and Insider Risk Management to spot the few users whose
      behaviour is genuinely abnormal.
    capabilities:
      - entra-conditional-access-agents
      - purview-dlp-for-agents
      - purview-insider-risk-agents
sources:
  - title: Discover and manage generative AI apps
    url: https://learn.microsoft.com/en-us/defender-cloud-apps/risk-score
  - title: Microsoft Purview AI Hub
    url: https://learn.microsoft.com/en-us/purview/ai-microsoft-purview
---

The instinct when shadow AI hits the news is to block it at the firewall.
That works for about a week, until people start tethering to their phones.
The durable answer is **see, score, then govern**.

Start by accepting that the inventory is the goal: Defender for Cloud Apps
will tell you which AI services your users are reaching, how risky each
one is, and how the usage is trending. Purview AI Hub layers in the data
view so you can tell the difference between a developer asking ChatGPT to
explain a stack trace and a sales rep pasting an account list.

Only then do you apply policy — and you apply it where the user already
is (the browser session, the data, the device) rather than at a chokepoint
they can easily route around.

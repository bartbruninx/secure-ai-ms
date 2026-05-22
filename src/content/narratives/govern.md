---
title: Govern your agents
phase: govern
heroQuestion: Who can use them, with what data, under what policy?
intro: >-
  Govern is where policy meets the agent. The inventory from Observe gets
  paired with identity, access, data protection and lifecycle rules so
  every agent operates inside a defined envelope rather than by default.
keyOutcomes:
  - Conditional Access policies govern which users can invoke which agents.
  - Agents have sponsors, lifecycles and access reviews like any other identity.
  - DLP, sensitivity labels and insider-risk policies follow agent interactions.
  - eDiscovery and compliance work for agent conversations the same way they do for chat.
status: published
---

A deployed agent is an actor in your tenant. Govern treats it that way.
Microsoft Entra Conditional Access can require MFA, device compliance or
specific locations before a user can invoke a Copilot or agent. Entra ID
Governance assigns each agent a human sponsor who is accountable for its
lifecycle, with periodic access reviews so dormant agents don't keep
their permissions forever.

Data-side governance flows through Microsoft Purview. DLP rules apply to
content the agent retrieves, generates or sends. Sensitivity labels
inherit into agent outputs. Insider-risk and communication-compliance
policies pick up on risky agent-mediated activity. eDiscovery surfaces
the same conversations during litigation that you'd expect from email or
Teams.

Govern is also where Build and Discover meet. The same DLP that protected
sanctioned agents during the **Build** phase now applies to the shadow
agents you surfaced in **Discover** — once they're brought into the
managed fold.

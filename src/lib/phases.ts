import type { LifecyclePhase } from '../content.config';

/**
 * Per-phase display metadata. The phase identifiers are the source of truth;
 * everything here is for the UI.
 *
 * Color tokens map to the existing palette in src/styles/tokens.css:
 *   build    → identify (indigo)   — pre-deployment, the maker tools
 *   observe  → detect   (amber)    — inventory + telemetry + shadow-AI discovery
 *   govern   → govern   (purple)   — policy + identity + lifecycle
 *   secure   → protect  (green)    — detect/respond at runtime
 */
export interface PhaseMeta {
  id: LifecyclePhase;
  title: string;
  shortLabel: string;
  heroQuestion: string;
  tagline: string;
  colorVar: string;
  /** Display order in the lifecycle diagram and navigation. */
  order: number;
}

export const PHASE_META: Record<LifecyclePhase, PhaseMeta> = {
  build: {
    id: 'build',
    title: 'Build',
    shortLabel: 'Build',
    heroQuestion: 'How do I ship a safe agent?',
    tagline: 'Controls baked into the maker tools — before an agent ever leaves the workshop.',
    colorVar: 'var(--phase-identify)',
    order: 1,
  },
  observe: {
    id: 'observe',
    title: 'Observe',
    shortLabel: 'Observe',
    heroQuestion: 'Which agents do I have, and what are they doing?',
    tagline: 'Inventory, telemetry and shadow-AI discovery across your tenant.',
    colorVar: 'var(--phase-detect)',
    order: 2,
  },
  govern: {
    id: 'govern',
    title: 'Govern',
    shortLabel: 'Govern',
    heroQuestion: 'Who can use them, with what data, under what policy?',
    tagline: 'Identity, access, data protection and lifecycle policy for agents.',
    colorVar: 'var(--phase-govern)',
    order: 3,
  },
  secure: {
    id: 'secure',
    title: 'Secure',
    shortLabel: 'Secure',
    heroQuestion: 'How do I detect and respond when something goes wrong?',
    tagline: 'Runtime threat protection, detection and response for the AI estate.',
    colorVar: 'var(--phase-protect)',
    order: 4,
  },
};

/** Ordered list for diagrams, nav, dynamic routes. */
export const PHASES_ORDERED: PhaseMeta[] = Object.values(PHASE_META).sort(
  (a, b) => a.order - b.order,
);

/** Next phase in the lifecycle, or null. Used for "what's next" links. */
export function nextPhase(id: LifecyclePhase): PhaseMeta | null {
  const current = PHASE_META[id];
  const next = PHASES_ORDERED.find((p) => p.order === current.order + 1);
  return next ?? null;
}

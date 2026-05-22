import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content model for secure-ai-ms.
 *
 * The site is organised around the **Microsoft AI security lifecycle**:
 *
 *   BUILD ──→ OBSERVE ──→ GOVERN ──→ SECURE
 *
 *   BUILD    : maker tools (Copilot Studio, Azure AI Foundry)
 *   OBSERVE  : Agent 365 inventory + telemetry of sanctioned agents,
 *              plus shadow-AI discovery (Defender for Cloud Apps, Purview AI Hub)
 *   GOVERN   : identity, policy, lifecycle, compliance
 *   SECURE   : detection, protection, response at runtime
 *
 * Collections:
 *   vendors      — who makes the product
 *   products     — a Microsoft solution; anchored to one or more lifecycle phases
 *   capabilities — a discrete security feature of a product
 *   narratives   — per-phase prose (one markdown entry per phase)
 *   categories   — cross-cutting tags (identity, data-protection, ...)
 *   frameworks   — security frameworks (NIST CSF 2.0, NIST AI RMF, ...)  [reference]
 *   controls     — hierarchical entries inside a framework                [reference]
 *   licenses     — SKUs / plans that gate capabilities                    [optional]
 *
 * Lifecycle is the primary IA. Frameworks/controls/licenses are reference
 * data and may be empty. Mappings are optional and live inline on capabilities.
 */

// ---------- shared primitives ----------

const sourceSchema = z.object({
  title: z.string(),
  url: z.url(),
  accessedOn: z.coerce.date().optional(),
});

const statusSchema = z
  .enum(['draft', 'published', 'deprecated'])
  .default('draft');

const coverageSchema = z.enum(['full', 'partial', 'enables', 'not-applicable']);

const controlLevelSchema = z.enum([
  'pillar',
  'function',
  'category',
  'subcategory',
]);

export const LIFECYCLE_PHASES = [
  'build',
  'observe',
  'govern',
  'secure',
] as const;

const lifecyclePhaseSchema = z.enum(LIFECYCLE_PHASES);

export const PRODUCT_ROLES = [
  'maker-tool',
  'runtime-platform',
  'security-control',
  'discovery',
] as const;

const productRoleSchema = z.enum(PRODUCT_ROLES);

// ---------- collections ----------

const vendors = defineCollection({
  loader: glob({
    pattern: '**/*.{yaml,yml,md}',
    base: './src/content/vendors',
  }),
  schema: z.object({
    title: z.string(),
    url: z.url().optional(),
    summary: z.string().optional(),
  }),
});

const frameworks = defineCollection({
  loader: glob({
    pattern: '**/*.{yaml,yml,md}',
    base: './src/content/frameworks',
  }),
  schema: z.object({
    title: z.string(),
    publisher: z.string().optional(),
    version: z.string().optional(),
    url: z.url().optional(),
    summary: z.string().optional(),
    status: statusSchema,
    sources: z.array(sourceSchema).default([]),
  }),
});

const controls = defineCollection({
  loader: glob({
    pattern: '**/*.{yaml,yml,md}',
    base: './src/content/controls',
  }),
  schema: z.object({
    title: z.string(),
    framework: reference('frameworks'),
    code: z.string(),
    level: controlLevelSchema,
    parent: reference('controls').optional(),
    summary: z.string().optional(),
    status: statusSchema,
    sources: z.array(sourceSchema).default([]),
  }),
});

const categories = defineCollection({
  loader: glob({
    pattern: '**/*.{yaml,yml,md}',
    base: './src/content/categories',
  }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
  }),
});

const licenses = defineCollection({
  loader: glob({
    pattern: '**/*.{yaml,yml,md}',
    base: './src/content/licenses',
  }),
  schema: z.object({
    title: z.string(),
    vendor: reference('vendors'),
    summary: z.string().optional(),
    url: z.url().optional(),
    status: statusSchema,
    sources: z.array(sourceSchema).default([]),
  }),
});

const products = defineCollection({
  loader: glob({
    pattern: '**/*.{yaml,yml,md,mdx}',
    base: './src/content/products',
  }),
  schema: z.object({
    title: z.string(),
    vendor: reference('vendors'),
    /** What role this product plays in the AI security architecture. */
    role: productRoleSchema,
    /** Phases this product anchors. Used by phase pages to surface products. */
    primaryPhases: z.array(lifecyclePhaseSchema).default([]),
    summary: z.string().optional(),
    url: z.url().optional(),
    categories: z.array(reference('categories')).default([]),
    status: statusSchema,
    lastReviewed: z.coerce.date().optional(),
    sources: z.array(sourceSchema).default([]),
  }),
});

const capabilityLicenseSchema = z.object({
  license: reference('licenses'),
  required: z.boolean().default(true),
  note: z.string().optional(),
});

const capabilityMappingSchema = z.object({
  control: reference('controls'),
  coverage: coverageSchema,
  note: z.string().optional(),
});

const capabilities = defineCollection({
  loader: glob({
    pattern: '**/*.{yaml,yml,md,mdx}',
    base: './src/content/capabilities',
  }),
  schema: z.object({
    title: z.string(),
    product: reference('products'),
    /** Primary lifecycle phase this capability belongs to. */
    phase: lifecyclePhaseSchema,
    /** Additional phases this capability also contributes to. */
    supportingPhases: z.array(lifecyclePhaseSchema).default([]),
    /** Which product roles this capability operates on. */
    appliesTo: z.array(productRoleSchema).default([]),
    /**
     * Other products this capability governs, monitors or assesses.
     * Lets a cross-product capability (e.g. Defender for Cloud's MCSB
     * compliance assessment) declare which products it watches over so the
     * target product's page can surface a "Governed & monitored by" view.
     */
    appliesToProducts: z.array(reference('products')).default([]),
    summary: z.string().optional(),
    categories: z.array(reference('categories')).default([]),
    licenses: z.array(capabilityLicenseSchema).default([]),
    /** Optional framework mappings. Not required to publish. */
    mappings: z.array(capabilityMappingSchema).default([]),
    status: statusSchema,
    lastReviewed: z.coerce.date().optional(),
    sources: z.array(sourceSchema).default([]),
  }),
});

const narratives = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/narratives',
  }),
  schema: z.object({
    title: z.string(),
    phase: lifecyclePhaseSchema,
    /** Short tagline shown under the page hero. */
    heroQuestion: z.string(),
    /** 1–2 sentence intro shown above the narrative body. */
    intro: z.string(),
    /** Bullets summarising what "done" looks like for this phase. */
    keyOutcomes: z.array(z.string()).default([]),
    status: statusSchema,
    sources: z.array(sourceSchema).default([]),
  }),
});

const personaSchema = z.enum([
  'security-architect',
  'it-admin',
  'ai-builder',
  'ciso',
  'compliance',
]);

const scenarios = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/scenarios',
  }),
  schema: z.object({
    title: z.string(),
    persona: personaSchema,
    /** The user's actual question in plain English. */
    question: z.string(),
    /** 1–2 sentence elevator pitch shown on the index card. */
    summary: z.string(),
    /** Ordered walkthrough through the lifecycle. */
    steps: z
      .array(
        z.object({
          phase: lifecyclePhaseSchema,
          heading: z.string(),
          rationale: z.string(),
          capabilities: z.array(reference('capabilities')).default([]),
        }),
      )
      .min(1),
    status: statusSchema,
    sources: z.array(sourceSchema).default([]),
  }),
});

export const PERSONAS = [
  'security-architect',
  'it-admin',
  'ai-builder',
  'ciso',
  'compliance',
] as const;

export const PERSONA_LABELS: Record<(typeof PERSONAS)[number], string> = {
  'security-architect': 'Security architect',
  'it-admin': 'IT admin',
  'ai-builder': 'AI builder',
  ciso: 'CISO',
  compliance: 'Compliance',
};

export const collections = {
  vendors,
  frameworks,
  controls,
  categories,
  licenses,
  products,
  capabilities,
  narratives,
  scenarios,
};

export type LifecyclePhase = (typeof LIFECYCLE_PHASES)[number];
export type ProductRole = (typeof PRODUCT_ROLES)[number];
export type Persona = (typeof PERSONAS)[number];

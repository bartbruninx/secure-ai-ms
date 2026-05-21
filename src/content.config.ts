import { defineCollection, reference } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/**
 * Content model for secure-ai-ms.
 *
 * Entities:
 *   vendors      — who makes the product (Microsoft, future-proof)
 *   products     — a Microsoft solution (e.g. Microsoft Defender for Cloud)
 *   capabilities — a discrete security feature provided by a product
 *   licenses     — SKUs / plans that gate capabilities
 *   frameworks   — security frameworks (NIST CSF 2.0, NIST AI RMF, ...)
 *   controls     — hierarchical entries inside a framework (pillar → subcategory)
 *   categories   — local taxonomy (identity, data, runtime, governance, ...)
 *
 * Mapping lives inline on the `capabilities` entry. Build-time helpers in
 * src/lib/ compute inverse indexes (per-control, per-license, per-product).
 *
 * Controls are intentionally hierarchical via a `level` + optional `parent`.
 * Today we author at pillar/function level; granular subcategories can be
 * added later with no schema change.
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
    code: z.string(), // e.g. "PR", "PR.AA", "PR.AA-01"
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
    summary: z.string().optional(),
    categories: z.array(reference('categories')).default([]),
    licenses: z.array(capabilityLicenseSchema).default([]),
    mappings: z.array(capabilityMappingSchema).default([]),
    status: statusSchema,
    lastReviewed: z.coerce.date().optional(),
    sources: z.array(sourceSchema).default([]),
  }),
});

export const collections = {
  vendors,
  frameworks,
  controls,
  categories,
  licenses,
  products,
  capabilities,
};

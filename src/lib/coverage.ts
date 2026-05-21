import type { CollectionEntry } from 'astro:content';

/**
 * Build-time helpers for the secure-ai-ms data model.
 *
 * Capabilities declare mappings inline against controls in any framework, at
 * any hierarchy level (pillar → subcategory). These helpers compute the
 * inverse indexes pages need:
 *
 *   - capabilities by control (with ancestor rollup)
 *   - capabilities by license
 *   - capabilities by product
 *   - capabilities by category
 *   - controls by framework, organized as a tree
 *
 * All functions are pure and run once at build. No runtime fetching.
 */

export type Control = CollectionEntry<'controls'>;
export type Capability = CollectionEntry<'capabilities'>;
export type Framework = CollectionEntry<'frameworks'>;
export type Product = CollectionEntry<'products'>;
export type License = CollectionEntry<'licenses'>;
export type Category = CollectionEntry<'categories'>;

export type Coverage = 'full' | 'partial' | 'enables' | 'not-applicable';

export interface ControlNode {
  control: Control;
  children: ControlNode[];
}

/**
 * Group controls into per-framework trees using the optional `parent`
 * reference. Roots are controls with no parent.
 */
export function buildControlTrees(
  controls: Control[],
): Map<string, ControlNode[]> {
  const byId = new Map<string, ControlNode>();
  for (const c of controls) {
    byId.set(c.id, { control: c, children: [] });
  }

  const rootsByFramework = new Map<string, ControlNode[]>();
  for (const node of byId.values()) {
    const parentRef = node.control.data.parent;
    const parentNode = parentRef ? byId.get(parentRef.id) : undefined;
    if (parentNode) {
      parentNode.children.push(node);
      continue;
    }
    const fw = node.control.data.framework.id;
    const list = rootsByFramework.get(fw) ?? [];
    list.push(node);
    rootsByFramework.set(fw, list);
  }
  return rootsByFramework;
}

/**
 * Walk up the parent chain. Returns the control IDs from the given control
 * up to (and including) the framework root.
 */
export function getAncestorIds(
  controlId: string,
  controls: Control[],
): string[] {
  const byId = new Map(controls.map((c) => [c.id, c]));
  const out: string[] = [];
  let cursor: Control | undefined = byId.get(controlId);
  while (cursor) {
    out.push(cursor.id);
    const parentId = cursor.data.parent?.id;
    cursor = parentId ? byId.get(parentId) : undefined;
  }
  return out;
}

/**
 * Walk down the tree to collect every descendant ID (excluding self).
 */
export function getDescendantIds(
  controlId: string,
  controls: Control[],
): string[] {
  const childrenByParent = new Map<string, string[]>();
  for (const c of controls) {
    const parentId = c.data.parent?.id;
    if (!parentId) continue;
    const arr = childrenByParent.get(parentId) ?? [];
    arr.push(c.id);
    childrenByParent.set(parentId, arr);
  }
  const out: string[] = [];
  const stack = [controlId];
  while (stack.length) {
    const id = stack.pop()!;
    const kids = childrenByParent.get(id) ?? [];
    for (const k of kids) {
      out.push(k);
      stack.push(k);
    }
  }
  return out;
}

/**
 * Return capabilities that cover a given control. By default a mapping to a
 * descendant control rolls up: asking for `PROTECT` returns capabilities
 * mapped to `PROTECT` and anything mapped to `PR.AA`, `PR.AA-01`, ... too.
 */
export function getCapabilitiesForControl(
  controlId: string,
  capabilities: Capability[],
  controls: Control[],
  options: { includeDescendants?: boolean } = {},
): Array<{ capability: Capability; coverage: Coverage; note?: string }> {
  const includeDescendants = options.includeDescendants ?? true;
  const targets = new Set<string>([controlId]);
  if (includeDescendants) {
    for (const id of getDescendantIds(controlId, controls)) targets.add(id);
  }

  const matches: Array<{
    capability: Capability;
    coverage: Coverage;
    note?: string;
  }> = [];
  for (const cap of capabilities) {
    for (const m of cap.data.mappings) {
      if (targets.has(m.control.id)) {
        matches.push({
          capability: cap,
          coverage: m.coverage,
          note: m.note,
        });
        break; // one row per capability per query
      }
    }
  }
  return matches;
}

/** Group capabilities by their product id. */
export function indexCapabilitiesByProduct(
  capabilities: Capability[],
): Map<string, Capability[]> {
  const out = new Map<string, Capability[]>();
  for (const c of capabilities) {
    const key = c.data.product.id;
    const arr = out.get(key) ?? [];
    arr.push(c);
    out.set(key, arr);
  }
  return out;
}

/** Group capabilities by each license they require. */
export function indexCapabilitiesByLicense(
  capabilities: Capability[],
): Map<string, Capability[]> {
  const out = new Map<string, Capability[]>();
  for (const c of capabilities) {
    for (const l of c.data.licenses) {
      const arr = out.get(l.license.id) ?? [];
      arr.push(c);
      out.set(l.license.id, arr);
    }
  }
  return out;
}

/** Group capabilities by each category they belong to. */
export function indexCapabilitiesByCategory(
  capabilities: Capability[],
): Map<string, Capability[]> {
  const out = new Map<string, Capability[]>();
  for (const c of capabilities) {
    for (const cat of c.data.categories) {
      const arr = out.get(cat.id) ?? [];
      arr.push(c);
      out.set(cat.id, arr);
    }
  }
  return out;
}

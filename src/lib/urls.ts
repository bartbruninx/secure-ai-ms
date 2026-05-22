/**
 * URL helpers — single source of truth for site-internal links.
 *
 * `import.meta.env.BASE_URL` is set in `astro.config.mjs` for GitHub Pages
 * deployment (e.g. "/secure-ai-ms/"). These helpers normalise the trailing
 * slash so call sites don't have to.
 */

const RAW_BASE = import.meta.env.BASE_URL;

/** Base URL guaranteed to end with exactly one trailing slash. */
export const base = RAW_BASE.endsWith('/') ? RAW_BASE : `${RAW_BASE}/`;

const join = (path: string) => `${base}${path.replace(/^\/+/, '')}`;

/** Link to a lifecycle phase page, e.g. "build" → "/secure-ai-ms/build". */
export const phaseHref = (id: string) => join(id);

/** Link to a scenario detail page. */
export const scenarioHref = (id: string) => join(`scenarios/${id}`);

/** Link to a product detail page. */
export const productHref = (id: string) => join(`products/${id}`);

/** Link to a capability detail page. */
export const capabilityHref = (id: string) => join(`capabilities/${id}`);

/** Link to the scenarios index. */
export const scenariosIndexHref = () => join('scenarios');

/** Link to the products index. */
export const productsIndexHref = () => join('products');

/** Link to the frameworks index. */
export const frameworksIndexHref = () => join('frameworks');

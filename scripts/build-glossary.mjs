#!/usr/bin/env node
/**
 * Build the benefits glossary: a hub at /glossary and one page per term at
 * /glossary/<slug>.
 *
 * WHY A GLOSSARY. Measured on 2026-09-19 against christensengroup.com, the
 * competitor Skol's report put at 77% traffic share: they run 1,044 pages to
 * BBB's 104, and 91 of theirs are glossary terms. It is the cheapest page type
 * on their whole site and the most copyable at BBB's size, because unlike their
 * 432 dated articles and 286 staff bios it needs no publishing cadence and no
 * headcount.
 *
 * WHY A SCRIPT. Same reason as build-carriers-page.mjs. The content lives in
 * one reviewable file (glossary-terms.mjs) and the markup is generated, so 44
 * pages cannot drift apart from each other and the nav cannot go stale on 43 of
 * them when it changes on one.
 *
 * NOTHING IS WRITTEN UNTIL EVERY CHECK PASSES. Pass one validates, pass two
 * writes. See lessons-learned/patterns/2026-09-18-collect-then-abort-has-already-written.md
 *
 * NESTED PAGES USE ROOT RELATIVE ASSET PATHS. A page at /glossary/deductible
 * that asks for "css/style.css" is asking for /glossary/css/style.css, which
 * 404s. deploy.ps1 step 3b was taught about the leading slash and given
 * -Recurse on the same day, and 'glossary' was added to its $sitePaths, or the
 * folder would never have been staged at all.
 */
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { TERMS } from './glossary-terms.mjs';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const attr = (s) => esc(s).replace(/"/g, '&quot;');
const jsonStr = (s) => JSON.stringify(String(s));

// ─────────────────────────────────────────────────────────────────────────────
// PASS 1: validate. Nothing is written in this section.
// ─────────────────────────────────────────────────────────────────────────────
const problems = [];
const onDisk = new Set(readdirSync('.').filter((f) => f.endsWith('.html')).map((f) => f.replace(/\.html$/, '')));
const termSlugs = new Set(TERMS.map((t) => t.slug));

const seenSlug = new Set();
const seenTerm = new Set();
for (const t of TERMS) {
  if (seenSlug.has(t.slug)) problems.push(`duplicate slug: ${t.slug}`);
  seenSlug.add(t.slug);
  if (seenTerm.has(t.term)) problems.push(`duplicate term name: ${t.term}`);
  seenTerm.add(t.term);
  if (!/^[a-z0-9-]+$/.test(t.slug)) problems.push(`slug is not url safe: ${t.slug}`);
  if (onDisk.has(t.slug)) problems.push(`slug ${t.slug} collides with an existing root page`);
  if (!t.short || !t.short.trim().endsWith('.')) problems.push(`${t.slug}: short must be a complete sentence ending in a period`);
  if (!t.body || !t.body.length) problems.push(`${t.slug}: no body`);
  if (!t.facts || t.facts.length < 3) problems.push(`${t.slug}: wants at least 3 quick facts`);

  // every cross reference has to resolve, or the page ships a dead link
  for (const r of t.related ?? []) if (!termSlugs.has(r)) problems.push(`${t.slug}: related term "${r}" is not a term`);
  for (const [slug] of t.links ?? []) if (!onDisk.has(slug)) problems.push(`${t.slug}: links to /${slug}, which is not a page on disk`);

  // house style, checked here so a failure names the term rather than the file
  const all = [t.term, t.short, ...t.body.flatMap((b) => [b.h ?? '', b.p]), ...t.facts.flat()].join(' ');
  if (/[—–]/.test(all)) problems.push(`${t.slug}: contains an em or en dash`);
}

if (!existsSync('services.html')) problems.push('services.html is missing, it is the donor for the nav and footer');

if (problems.length) {
  console.log(`NOTHING WAS WRITTEN. ${problems.length} problem(s):`);
  for (const p of problems) console.log('  ' + p);
  process.exit(1);
}

// ─────────────────────────────────────────────────────────────────────────────
// PASS 2: build.
// ─────────────────────────────────────────────────────────────────────────────
const donor = readFileSync('services.html', 'utf8');
const grab = (re, what) => { const m = donor.match(re); if (!m) throw new Error(`could not read ${what} from services.html`); return m[0]; };

// Root relative, so the same markup works at /glossary and at /glossary/<term>.
const rooted = (s) => s.replace(/(src|href)="(images|js|css)\//g, '$1="/$2/');

const nav = rooted(grab(/<nav class="nav"[\s\S]*?<\/nav>/, 'nav'));
const footer = rooted(grab(/<footer class="footer">[\s\S]*?<\/footer>/, 'footer'));
const fonts = grab(/<link rel="preconnect"[\s\S]*?rel="stylesheet"\/>/, 'fonts');
const stylesheet = rooted(grab(/<link rel="stylesheet" href="css\/style\.css[^"]*"\/>/, 'stylesheet'));
const icons = grab(/<link rel="icon"[\s\S]*?<meta name="theme-color"[^>]*\/>/, 'icons');

const SET_NAME = 'Barker Brothers Benefits Employee Benefits Glossary';

function shell({ title, description, canonical, ogTitle, schema, hero, main }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
${icons}
<title>${attr(title)}</title>
<meta name="description" content="${attr(description)}"/>
<link rel="canonical" href="${canonical}"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="${canonical}"/>
<meta property="og:title" content="${attr(ogTitle)}"/>
<meta property="og:description" content="${attr(description)}"/>
<meta property="og:image" content="https://barkerbb.com/images/og-card.png"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="Barker Brothers Benefits, Business Hassle Removed"/>
<meta property="og:site_name" content="Barker Brothers Benefits"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="${attr(ogTitle)}"/>
<meta name="twitter:description" content="${attr(description)}"/>
<meta name="twitter:image" content="https://barkerbb.com/images/og-card.png"/>
${fonts}
${stylesheet}
<!-- Analytics -->
<script defer data-domain="barkerbb.com" src="https://plausible.io/js/script.js"></script>
<script type="application/ld+json">
${schema}
</script>
</head>
<body>

${nav}

${hero}

${main}

${footer}

<script src="/js/main.js"></script>
</body>
</html>
`;
}

// ── term pages ───────────────────────────────────────────────────────────────
mkdirSync('glossary', { recursive: true });
const bySlug = Object.fromEntries(TERMS.map((t) => [t.slug, t]));
let written = 0;

for (const t of TERMS) {
  const heading = t.aka ? `${t.term} <em>(${t.aka})</em>` : t.term;
  const titleName = t.aka ? `${t.term} (${t.aka})` : t.term;

  const bodyHtml = t.body.map((b) => (b.h ? `<h3>${esc(b.h)}</h3>` : '') + `<p>${esc(b.p)}</p>`).join('\n        ');
  const factsHtml = t.facts.map(([k, v]) => `<li><strong>${esc(k)}</strong><span>${esc(v)}</span></li>`).join('');

  const relatedCards = (t.related ?? []).map((r) => {
    const o = bySlug[r];
    return `<a href="/glossary/${o.slug}" class="related-card"><div class="rc-icon">${esc(o.term[0])}</div><h4>${esc(o.term)}</h4><p>${esc(o.short)}</p></a>`;
  }).join('');
  const readCards = (t.links ?? []).map(([slug, label]) =>
    `<a href="/${slug}" class="related-card"><div class="rc-icon">${esc(label[0])}</div><h4>${esc(label)}</h4><p>Read the full guide.</p></a>`).join('');

  const schema = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTerm",
      "name": ${jsonStr(t.term)},
      ${t.aka ? `"alternateName": ${jsonStr(t.aka)},\n      ` : ''}"description": ${jsonStr(t.short)},
      "url": "https://barkerbb.com/glossary/${t.slug}",
      "inDefinedTermSet": {
        "@type": "DefinedTermSet",
        "name": ${jsonStr(SET_NAME)},
        "url": "https://barkerbb.com/glossary"
      }
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://barkerbb.com/" },
        { "@type": "ListItem", "position": 2, "name": "Benefits Glossary", "item": "https://barkerbb.com/glossary" },
        { "@type": "ListItem", "position": 3, "name": ${jsonStr(t.term)} }
      ]
    }
  ]
}`;

  const hero = `<section class="page-hero">
  <div class="page-hero-inner">
    <div class="hero-eyebrow"><a href="/glossary" style="color:inherit;text-decoration:none;">Benefits Glossary</a></div>
    <h1>${heading}</h1>
    <p>${esc(t.short)}</p>
  </div>
</section>`;

  const main = `<section class="section">
  <div class="section-inner">
    <div class="product-layout">
      <div class="product-main">
        ${bodyHtml}
      </div>

      <aside class="product-side">
        <h4>Quick Facts</h4>
        <ul class="qf-list">
          ${factsHtml}
        </ul>
        <a href="/contact" class="btn btn-maroon">Get a Free Quote</a>
      </aside>
    </div>
  </div>
</section>

<section class="related-strip">
  <div class="related-strip-inner">
    <h3>Related terms</h3>
    <div class="related-grid">
      ${relatedCards}<a href="/glossary" class="related-card"><div class="rc-icon">G</div><h4>Full glossary</h4><p>Every benefits term we get asked about, in plain English.</p></a>
    </div>
  </div>
</section>${readCards ? `

<section class="related-strip">
  <div class="related-strip-inner">
    <h3>Read more on this</h3>
    <div class="related-grid">
      ${readCards}
    </div>
  </div>
</section>` : ''}

<section class="cta-strip">
  <h2>Questions about how this applies <em>to your team?</em></h2>
  <p>That is the job. Ask us anything about your plan, your renewal, or a term nobody has explained yet. No cost, and a real person replies within 1 business day.</p>
  <a href="/contact" class="btn btn-primary">Get a Free Quote</a>
</section>`;

  writeFileSync(`glossary/${t.slug}.html`, shell({
    title: `${titleName} | Benefits Glossary | Barker Brothers Benefits`,
    description: t.short,
    canonical: `https://barkerbb.com/glossary/${t.slug}`,
    ogTitle: `${titleName}, explained`,
    schema, hero, main,
  }));
  written++;
}

// ── the hub ──────────────────────────────────────────────────────────────────
const letters = [...new Set(TERMS.map((t) => t.letter))].sort();
const sorted = [...TERMS].sort((a, b) => a.term.localeCompare(b.term));

const jump = letters.map((l) => `<a href="#letter-${l}" class="btn btn-ghost" style="padding:6px 14px;">${l}</a>`).join(' ');

const groups = letters.map((l) => {
  const items = sorted.filter((t) => t.letter === l).map((t) =>
    `        <a href="/glossary/${t.slug}" class="related-card"><div class="rc-icon">${esc(t.term[0])}</div><h4>${esc(t.aka ? `${t.term} (${t.aka})` : t.term)}</h4><p>${esc(t.short)}</p></a>`).join('\n');
  return `    <h2 id="letter-${l}">${l}</h2>
    <div class="related-grid">
${items}
    </div>`;
}).join('\n\n');

const hubSchema = `{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "DefinedTermSet",
      "name": ${jsonStr(SET_NAME)},
      "url": "https://barkerbb.com/glossary",
      "description": "Plain-English definitions of the employee benefits terms Minnesota employers ask us about.",
      "hasDefinedTerm": [
${sorted.map((t) => `        { "@type": "DefinedTerm", "name": ${jsonStr(t.term)}, "description": ${jsonStr(t.short)}, "url": "https://barkerbb.com/glossary/${t.slug}" }`).join(',\n')}
      ]
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://barkerbb.com/" },
        { "@type": "ListItem", "position": 2, "name": "Benefits Glossary" }
      ]
    }
  ]
}`;

writeFileSync('glossary.html', shell({
  title: 'Employee Benefits Glossary | Barker Brothers Benefits',
  description: `Plain-English definitions of ${TERMS.length} employee benefits terms, written for Minnesota employers. No jargon, no sales pitch.`,
  canonical: 'https://barkerbb.com/glossary',
  ogTitle: 'Employee Benefits Glossary',
  schema: hubSchema,
  hero: `<section class="page-hero">
  <div class="page-hero-inner">
    <div class="hero-eyebrow">Benefits Glossary</div>
    <h1>Benefits language, <em>in plain English.</em></h1>
    <p>Benefits are full of words that get used as though everybody already knows them. Here are ${TERMS.length} of them, written the way we would explain them to you on the phone. If something here still does not make sense, call us and ask.</p>
    <div style="margin-top:26px;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;">${jump}</div>
  </div>
</section>`,
  main: `<section class="section">
  <div class="section-inner">
${groups}
  </div>
</section>

<section class="cta-strip">
  <h2>Still not sure what something <em>means for you?</em></h2>
  <p>Definitions only go so far. Tell us about your group and we will tell you which of these actually matter for your plan.</p>
  <a href="/contact" class="btn btn-primary">Get a Free Quote</a>
</section>`,
}));

// ── sitemap ──────────────────────────────────────────────────────────────────
const today = new Date().toISOString().slice(0, 10);
let sm = readFileSync('sitemap.xml', 'utf8');
const wanted = ['glossary', ...sorted.map((t) => `glossary/${t.slug}`)];
let added = 0;
for (const path of wanted) {
  if (sm.includes(`<loc>https://barkerbb.com/${path}</loc>`)) continue;
  sm = sm.replace('</urlset>', `  <url>\n    <loc>https://barkerbb.com/${path}</loc>\n    <lastmod>${today}</lastmod>\n    <priority>${path === 'glossary' ? '0.8' : '0.6'}</priority>\n  </url>\n</urlset>`);
  added++;
}
writeFileSync('sitemap.xml', sm);

console.log(`glossary built`);
console.log(`  terms: ${written}`);
console.log(`  hub: glossary.html`);
console.log(`  letters: ${letters.join(' ')}`);
console.log(`  sitemap entries added: ${added}`);
console.log(`  cross references: ${TERMS.reduce((n, t) => n + (t.related?.length ?? 0), 0)} between terms, ${TERMS.reduce((n, t) => n + (t.links?.length ?? 0), 0)} out to existing pages`);

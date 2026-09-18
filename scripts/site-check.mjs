#!/usr/bin/env node
/**
 * Pre-deploy checks for barkerbb.com.
 *
 * WHY THIS FILE EXISTS. On 2026-09-17 the site had 38 URLs renamed, 5 pages
 * added, 325 FAQ answers written and the nav rebuilt, and every one of those
 * batches was verified by a one-off script typed in a terminal. Those scripts
 * caught real defects: dead internal links, a page declaring FAQ schema with
 * nothing visible, British spellings in American copy, an em dash in live copy.
 * Then they were thrown away.
 *
 * A check that lives in a terminal history is not a check. This runs from
 * deploy.ps1 on every deploy and REFUSES the deploy when it fails, which is the
 * same reasoning as the stylesheet stamping in step 3b: this repo ships through
 * exactly one path, so the guard belongs in that path.
 *
 * Run by hand:  node scripts/site-check.mjs
 * Exit code 0 means safe to ship. Anything else means do not.
 */
import { readFileSync, readdirSync, existsSync } from "node:fs";

const failures = [];
const notes = [];
const fail = (check, detail) => failures.push(`${check}: ${detail}`);

const pages = readdirSync(".").filter((f) => f.endsWith(".html"));
const slugs = new Set(pages.map((f) => f.replace(/\.html$/, "")));
const src = Object.fromEntries(pages.map((f) => [f, readFileSync(f, "utf8")]));

const isNoIndex = (f) => /<meta name="robots" content="noindex/.test(src[f]);
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&#39;/g, "'").replace(/&quot;/g, '"');

// ── titles, unique and present ────────────────────────────────────────────────
const titles = new Map();
for (const f of pages) {
  const t = src[f].match(/<title>([^<]*)<\/title>/)?.[1];
  if (!t) fail("title", `${f} has none`);
  else titles.set(t, [...(titles.get(t) ?? []), f]);
}
for (const [t, files] of titles) if (files.length > 1) fail("title", `duplicated on ${files.join(", ")}: "${t}"`);

// ── canonicals: present, extensionless, and pointing at the page itself ───────
for (const f of pages) {
  if (isNoIndex(f)) continue;
  const c = src[f].match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!c) { fail("canonical", `${f} has none and is indexable`); continue; }
  if (c.endsWith(".html")) fail("canonical", `${f} still points at a .html url: ${c}`);
  const slug = f.replace(/\.html$/, "");
  const expected = slug === "index" ? "https://barkerbb.com/" : `https://barkerbb.com/${slug}`;
  if (c !== expected) fail("canonical", `${f} points at ${c}, expected ${expected}`);
}

// ── every internal link resolves ──────────────────────────────────────────────
const allowed = new Set(["", "favicon.ico", "site.webmanifest"]);
for (const f of pages) {
  for (const m of src[f].matchAll(/href="\/([^"#?]*)/g)) {
    const t = m[1];
    if (allowed.has(t) || /^(images|css|js)\//.test(t)) continue;
    if (!slugs.has(t)) fail("dead link", `${f} -> /${t}`);
  }
  const leftovers = src[f].match(/(href="|barkerbb\.com\/|value=")[a-z0-9-]+\.html/g);
  if (leftovers) fail("stale .html", `${f} has ${leftovers.length}, e.g. ${leftovers[0]}`);
}

// ── structured data parses, and the FAQ matches what a visitor can see ────────
for (const f of pages) {
  const blocks = src[f].match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g) ?? [];
  let schemaQuestions = null;
  for (const b of blocks) {
    let parsed;
    try {
      parsed = JSON.parse(b.replace(/<\/?script[^>]*>/g, ""));
    } catch {
      fail("json-ld", `${f} has a block that does not parse`);
      continue;
    }
    const findFaq = (o) => {
      if (!o || typeof o !== "object") return null;
      if (o["@type"] === "FAQPage") return o;
      for (const k of Object.keys(o)) { const r = findFaq(o[k]); if (r) return r; }
      return null;
    };
    const faq = findFaq(parsed);
    if (faq && Array.isArray(faq.mainEntity)) schemaQuestions = faq.mainEntity.map((q) => q.name.trim());
  }

  const visible = [...src[f].matchAll(/<div class="faq-item">\s*<h3>([\s\S]*?)<\/h3>/g)].map((m) => decode(m[1]).trim());
  const sections = (src[f].match(/class="faq-section"/g) ?? []).length;

  if (sections > 1) fail("faq", `${f} has ${sections} FAQ blocks`);
  // The defect this catches: 17 pages once declared FAQPage schema and showed no
  // questions anywhere. Google's policy is that the markup describes visible
  // content, so schema without the questions on the page is a violation.
  if (schemaQuestions && visible.length === 0) fail("faq", `${f} declares FAQPage and shows no questions`);
  if (visible.length && !schemaQuestions) fail("faq", `${f} shows questions with no FAQPage schema`);
  if (schemaQuestions && visible.length && JSON.stringify(schemaQuestions) !== JSON.stringify(visible)) {
    fail("faq", `${f} schema questions do not match the visible ones`);
  }
}

// ── sitemap agrees with the site in both directions ───────────────────────────
if (!existsSync("sitemap.xml")) fail("sitemap", "missing");
else {
  const sm = readFileSync("sitemap.xml", "utf8");
  const urls = [...sm.matchAll(/<loc>https:\/\/barkerbb\.com\/([^<]*)<\/loc>/g)].map((m) => m[1]);
  if (new Set(urls).size !== urls.length) fail("sitemap", "contains a duplicate url");
  for (const u of urls) {
    if (u === "") continue;
    if (u.endsWith(".html")) fail("sitemap", `${u} still carries .html`);
    if (!slugs.has(u)) fail("sitemap", `lists ${u}, which is not a page on disk`);
    const f = `${u}.html`;
    if (src[f] && isNoIndex(f)) fail("sitemap", `lists ${u}, which is noindex`);
  }
  for (const f of pages) {
    if (isNoIndex(f)) continue;
    const slug = f.replace(/\.html$/, "");
    const want = slug === "index" ? "" : slug;
    if (!urls.includes(want)) fail("sitemap", `${f} is indexable and missing from the sitemap`);
  }
}

// ── house style, the rules that keep getting broken by generated copy ─────────
for (const f of pages) {
  const dashes = src[f].match(/[—–]/g);
  if (dashes) fail("dashes", `${f} has ${dashes.length}, and the rule is none anywhere`);
}

// British spellings. ANCHORED, because a loose pattern flags correct words:
// "specialis" matches "specialist", "licence" is wrong but "licensed" is right.
// This reports rather than fails, because the list can produce a false positive
// on a proper noun and a deploy should not be blocked by a place name.
const BRITISH = [/\bneighbour/i, /\bfavour(?!ite\b)/i, /\bcolour/i, /\bbehaviour/i, /\benrol\b/i, /\benrols\b/i, /\bautumn\b/i, /\bwhilst\b/i, /\bprogramme\b/i, /\bcentre\b/i, /\blicence\b/i, /\bspecialise/i, /\borganise/i, /\bsummaris/i, /\brecognise/i];
for (const f of pages) {
  const hits = BRITISH.filter((re) => re.test(src[f])).map((re) => String(re));
  if (hits.length) notes.push(`british spelling? ${f}: ${hits.join(", ")}`);
}

// ── the stylesheet stamp is the same on every page ────────────────────────────
const stamps = new Set(pages.map((f) => src[f].match(/css\/style\.css\?v=([0-9a-f]+)/)?.[1] ?? "none"));
if (stamps.size > 1) fail("css stamp", `pages disagree: ${[...stamps].join(", ")}. Step 3b of deploy.ps1 restamps.`);

// ── report ────────────────────────────────────────────────────────────────────
const indexable = pages.filter((f) => !isNoIndex(f)).length;
console.log(`site-check: ${pages.length} pages, ${indexable} indexable, ${pages.length - indexable} noindex`);
for (const n of notes) console.log(`  note  ${n}`);
if (failures.length === 0) {
  console.log("site-check: PASSED");
  process.exit(0);
}
console.log(`\nsite-check: FAILED, ${failures.length} problem(s)`);
for (const f of failures.slice(0, 40)) console.log(`  ${f}`);
if (failures.length > 40) console.log(`  ...and ${failures.length - 40} more`);
process.exit(1);

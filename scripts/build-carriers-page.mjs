#!/usr/bin/env node
/**
 * Build carriers.html: every carrier BBB shops, grouped by product line.
 *
 * Matt, 2026-09-18: "I want it to only live on there own page. and also
 * include there image."
 *
 * WHY THIS IS A SCRIPT AND NOT A HAND EDITED PAGE. The tile shows a LOGO when
 * one exists in images/carriers/ and the carrier's NAME when it does not, and
 * that decision is made here at build time. So the page works right now with
 * zero logo files, and it upgrades itself the moment any single file is
 * dropped in and this is re-run. Nothing is broken while the images arrive.
 *
 * LOGO FILES ARE NOT IN THE REPO AND WERE NOT FETCHED. A carrier logo is a
 * trademark, and the right source is each carrier's producer or marketing
 * portal, which an appointed agent can use and which states that carrier's own
 * usage rules. Pulling them off public websites would skip both.
 *
 * To add one: drop images/carriers/<slug>.png (or .svg/.webp/.jpg) and re-run
 * this. The slug for each carrier is printed by the run.
 *
 * NAMES COME FROM agent-os/learned/carriers-master-list.md Section A, the
 * locked canonical list. MN DEED is out because it is the state programme and
 * not a carrier BBB places; Ichra is out because it is a platform rather than
 * a carrier brand, and the site already explains ICHRA on two pages.
 */
import { readFileSync, writeFileSync, existsSync, readdirSync } from 'node:fs';

const LINES = [
  ['Medical', 'Traditional group medical, level funded plans, and the cooperative alternative.',
    ['Blue Cross Blue Shield of Minnesota', 'HealthPartners', 'Medica', 'UnitedHealthcare', 'Aetna', 'Cigna', 'Allstate Benefits', 'National General', 'Health Access Solutions']],
  ['Dental', 'Group and voluntary dental, from the large Minnesota networks to the newer carriers.',
    ['Delta Dental of Minnesota', 'Beam Benefits', 'Aflac', 'HealthPartners', 'Blue Cross Blue Shield of Minnesota', 'UnitedHealthcare', 'Principal', 'Guardian', 'Mutual of Omaha', 'MetLife', 'Ameritas', 'Cigna']],
  ['Vision', 'Group and voluntary vision, including the vision-only carriers most employers ask for by name.',
    ['VSP', 'EyeMed', 'Beam Benefits', 'Aflac', 'Blue Cross Blue Shield of Minnesota', 'UnitedHealthcare', 'MetLife', 'Principal', 'Guardian', 'HealthPartners', 'Unum', 'XP Health']],
  ['Supplemental', 'Accident, critical illness, hospital indemnity, and short and long term disability.',
    ['Aflac', 'Beam Benefits', 'Colonial Life', 'Allstate Benefits', 'MetLife', 'Mutual of Omaha', 'Principal', 'Unum', 'Transamerica', 'Combined Insurance', 'The Hartford', 'Sun Life', 'Lincoln Financial', 'The Standard', 'Reliance Matrix']],
  ['Life', 'Employer paid basic life and voluntary term life.',
    ['Aflac', 'Beam Benefits', 'Mutual of Omaha', 'Principal', 'The Hartford', 'Sun Life', 'MetLife', 'Lincoln Financial', 'Unum', 'The Standard']],
  ['Minnesota Paid Leave', 'Private plan options for Minnesota Paid Family and Medical Leave.',
    ['The Hartford', 'Sun Life', 'Guardian', 'Principal', 'ShelterPoint']],
];

const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const EXTS = ['svg', 'png', 'webp', 'jpg', 'jpeg'];
function logoFor(name) {
  const s = slug(name);
  for (const e of EXTS) if (existsSync(`images/carriers/${s}.${e}`)) return `images/carriers/${s}.${e}`;
  return null;
}

const donor = readFileSync('services.html', 'utf8');
const grab = (re, what) => { const m = donor.match(re); if (!m) throw new Error(`could not read ${what}`); return m[0]; };
const nav = grab(/<nav class="nav"[\s\S]*?<\/nav>/, 'nav');
const footer = grab(/<footer class="footer">[\s\S]*?<\/footer>/, 'footer');
const fonts = grab(/<link rel="preconnect"[\s\S]*?rel="stylesheet"\/>/, 'fonts');
const stylesheet = grab(/<link rel="stylesheet" href="css\/style\.css[^"]*"\/>/, 'stylesheet');
const icons = grab(/<link rel="icon"[\s\S]*?<meta name="theme-color"[^>]*\/>/, 'icons');

let withLogo = 0, withoutLogo = 0;
const missing = [];

const sections = LINES.map(([label, note, names]) => {
  const tiles = names.map((n) => {
    const logo = logoFor(n);
    if (logo) { withLogo++; return `        <div class="carrier-tile"><img src="${logo}" alt="${esc(n)}" loading="lazy"/></div>`; }
    withoutLogo++; missing.push(slug(n));
    return `        <div class="carrier-tile"><span>${esc(n)}</span></div>`;
  }).join('\n');
  return `    <div class="carrier-section">
      <h2>${esc(label)}</h2>
      <p class="carrier-note">${esc(note)}</p>
    </div>
    <div class="carrier-grid">
${tiles}
    </div>`;
}).join('\n');

const unique = [...new Set(LINES.flatMap(([, , n]) => n))];

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
${icons}
<title>Carriers We Work With | Barker Brothers Benefits</title>
<meta name="description" content="Barker Brothers Benefits is independent, so we shop your group across ${unique.length} carriers for medical, dental, vision, supplemental, life and Minnesota Paid Leave."/>
<link rel="canonical" href="https://barkerbb.com/carriers"/>
<meta property="og:type" content="website"/>
<meta property="og:url" content="https://barkerbb.com/carriers"/>
<meta property="og:title" content="Carriers We Work With"/>
<meta property="og:description" content="We are independent, so we quote your group across the whole Minnesota market rather than one company's shelf."/>
<meta property="og:image" content="https://barkerbb.com/images/og-card.png"/>
<meta property="og:image:width" content="1200"/>
<meta property="og:image:height" content="630"/>
<meta property="og:image:alt" content="Barker Brothers Benefits, Business Hassle Removed"/>
<meta property="og:site_name" content="Barker Brothers Benefits"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter:title" content="Carriers We Work With"/>
<meta name="twitter:description" content="We are independent, so we quote your group across the whole Minnesota market rather than one company's shelf."/>
<meta name="twitter:image" content="https://barkerbb.com/images/og-card.png"/>
${fonts}
${stylesheet}
<!-- Analytics -->
<script defer data-domain="barkerbb.com" src="https://plausible.io/js/script.js"></script>
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://barkerbb.com/" },
        { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://barkerbb.com/services" },
        { "@type": "ListItem", "position": 3, "name": "Carriers" }
      ]
    }
  ]
}
</script>
</head>
<body>

${nav}

<section class="page-hero">
  <div class="page-hero-inner">
    <div class="hero-eyebrow">Carriers</div>
    <h1>We are independent, so <em>you get the whole market.</em></h1>
    <p>We are not captive to one insurance company, which means we quote your group across the carriers below rather than the one shelf we happen to sell. Which carriers make sense depends on your team, your budget, and which doctors and dentists your people already use.</p>
  </div>
</section>

<section class="section">
  <div class="section-inner">
${sections}
  </div>
</section>

<section class="cta-strip">
  <h2>Not sure which of these <em>fits your team?</em></h2>
  <p>That is the whole job. Send us a census and we will shop it and come back with two or three real options.</p>
  <a href="/contact" class="btn btn-primary">Get a Free Quote</a>
</section>

${footer}

<script src="js/main.js"></script>
</body>
</html>
`;

writeFileSync('carriers.html', html);

console.log('carriers.html written');
console.log(`  product lines: ${LINES.length}`);
console.log(`  unique carriers: ${unique.length}`);
console.log(`  tiles with a logo: ${withLogo}`);
console.log(`  tiles showing the name (no logo file yet): ${withoutLogo}`);
const have = existsSync('images/carriers') ? readdirSync('images/carriers').filter((f) => !f.startsWith('.')) : [];
console.log(`  files currently in images/carriers/: ${have.length ? have.join(', ') : 'none'}`);
console.log('\n  drop a file named <slug>.png|svg|webp into images/carriers/ and re-run. Slugs needed:');
console.log('  ' + [...new Set(missing)].join('\n  '));

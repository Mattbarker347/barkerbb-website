# Claude Code: barkerbb-website

You are working in the **live website source** for Barker Brothers Benefits.

## Read first (every session)

@C:\Users\M1_Barker\Documents\BBB\agent-os\memory.md
@C:\Users\M1_Barker\Documents\BBB\agent-os\business-brain.md
@C:\Users\M1_Barker\Documents\BBB\agent-os\website.md
@C:\Users\M1_Barker\Documents\BBB\agent-os\how-to-learn.md
@C:\Users\M1_Barker\Documents\BBB\agent-os\lessons-learned\_index.md
@C:\Users\M1_Barker\Documents\BBB\agent-os\decisions\_index.md
@C:\Users\M1_Barker\Documents\BBB\agent-os\questions-for-matt.md
@README.md

## Auto-capture lessons

Follow `how-to-learn.md`. When Matt corrects voice / phrasing / brand / a deploy step, draft a lesson immediately, get approval, file it under `agent-os\lessons-learned\voice-and-writing\` (or `process\`), apply the fix. Same mistake never twice.

## At a glance

- **Live URL:** https://barkerbb.com (also https://www.barkerbb.com)
- **Stack:** Static HTML/CSS/JS (no framework)
- **Hosting:** GitHub Pages
- **DNS:** Cloudflare → GitHub Pages IPs (apex), CNAME for www
- **Repo:** `mattbarker347/barkerbb-website` (public)
- **Domain registrar:** Squarespace Domains

## Pages (13)

`index.html`, `services.html`, `why-us.html`, `team.html`, `contact.html`, `claims.html`, `thank-you.html`, `portal-agent.html`, plus six `product-*.html` (group-health, dental-vision, life-disability, supplemental, enrollment-tech, employee-education).

## Deploy flow

Edit files locally → run `deploy.ps1` → it stages, commits, pushes → GitHub Pages rebuilds in ~1 minute.

**Don't change** without thinking carefully:
- `CNAME` (pins the site to `barkerbb.com`)
- The DNS records (Cloudflare → GitHub Pages IPs)

## Working agreements

- Show the plan first, then execute.
- Default voice for any copy: warm, conversational, first-person. Plain language, no insurance jargon where avoidable.
- Service-forward — *what we do for you*, not *who we are*.
- Reassuring, not salesy.
- Don't promise specific coverage outcomes — defer to actual policy.
- Don't quote response times faster than "within 1 business day."
- Preview locally before pushing: `python -m http.server 8000` then http://localhost:8000.

## Related context elsewhere

- Brand assets + logos: `C:\Users\M1_Barker\Documents\BBB\BBB Internal\Brand Assets\`
- DNS export reference: `C:\Users\M1_Barker\Documents\BBB\BBB Website\barkerbb.com.txt`

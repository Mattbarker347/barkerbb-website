# Barker Brothers Benefits — Website

Static multi-page website for Barker Brothers Benefits.

## Deploy to GitHub Pages + barkerbb.com

### First-time setup (one-time only)

**1. Create an empty GitHub repo**

- Sign in at github.com as `mattbarker347`
- Click **+** (top right) → **New repository**
- Repository name: `barkerbb-website`
- Public
- Do **not** add a README, .gitignore, or license
- Click **Create repository**

**2. Run the deploy script**

Double-click `deploy.ps1` (or right-click → **Run with PowerShell**).
On first run it will open a browser window to log you into GitHub.

**3. Turn on GitHub Pages**

- In your repo, go to **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)** → **Save**
- Under **Custom domain**, type `barkerbb.com` and save

**4. Point your domain at GitHub (Squarespace Domains)**

Sign in at account.squarespace.com → **Domains** → **barkerbb.com** → **DNS Settings**.

Add four A records for the apex (`@`):

```
Type: A   Host: @   Value: 185.199.108.153
Type: A   Host: @   Value: 185.199.109.153
Type: A   Host: @   Value: 185.199.110.153
Type: A   Host: @   Value: 185.199.111.153
```

Add one CNAME record for www:

```
Type: CNAME   Host: www   Value: mattbarker347.github.io
```

**5. Enable HTTPS**

Wait 5–30 minutes for DNS to propagate, then go back to **Settings → Pages** on GitHub and check **Enforce HTTPS**.

Your site is now live at **https://barkerbb.com** and **https://www.barkerbb.com**.

---

## Publishing updates

Any time you change a file, just run `deploy.ps1` again. It stages, commits, and pushes automatically. GitHub Pages redeploys within about a minute.

## Previewing locally

```powershell
cd "$env:USERPROFILE\Downloads\barkerbb-website"
python -m http.server 8000
```

Then open http://localhost:8000 in your browser.

## File map

- `index.html` — homepage
- `services.html` — services overview
- `why-us.html` — why choose BBB
- `team.html` — meet the brothers
- `contact.html` — quote form
- `portal-*.html` — Agent / Member / Owner sign-in pages
- `product-*.html` — six individual product pages
- `css/style.css` — shared stylesheet
- `js/main.js` — shared JavaScript
- `images/logo.png` — nav logo
- `images/logo-light.png` — footer logo
- `CNAME` — tells GitHub Pages which domain to serve (`barkerbb.com`)

# Hearth Bowl — Website

Static site for hearthbowl.net. No build step, no dependencies — just HTML/CSS/JS and images.

```
restaurant-website/
├── index.html              # the site
├── style.css
├── script.js
├── images/                 # 33 dish/logo photos, referenced as images/xxx.jpg
├── assets/
│   ├── og-image.jpg        # social share preview (Facebook/Twitter link unfurls)
│   └── printable-menu.html # print-optimized 2-page menu (open it, then Print > Save as PDF)
├── favicon.ico / favicon-16x16.png / favicon-32x32.png / apple-touch-icon.png
├── CNAME                   # tells GitHub Pages to serve this repo at hearthbowl.net
├── robots.txt
└── sitemap.xml
```

## 1. Push to GitHub

```
cd restaurant-website
git init
git add .
git commit -m "Launch Hearth Bowl site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

## 2. Turn on GitHub Pages

Repo → **Settings → Pages** → Source: `Deploy from a branch` → Branch: `main` / `root` → Save.
GitHub will give you a URL like `https://<your-username>.github.io/<repo-name>/`. Confirm the site loads there first.

## 3. Point your domain (Spaceship) at GitHub Pages

In your Spaceship DNS settings for `hearthbowl.net`, add:

**A records** (root domain `@`) pointing at GitHub Pages' IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

**CNAME record** for `www` pointing at:
```
<your-username>.github.io
```

Then in GitHub → Settings → Pages → Custom domain, enter `hearthbowl.net` and save (this writes the CNAME file — already included here, so it should auto-detect). Check **Enforce HTTPS** once GitHub finishes issuing the certificate (can take up to ~24 hrs after DNS propagates).

DNS changes usually take effect within a few minutes to a few hours, occasionally up to 24–48 hrs.

## 4. Before/after launch checklist

- [ ] Verify hearthbowl.net loads over **https://** (not just http)
- [ ] Test on an actual phone, not just browser dev tools
- [ ] Submit `https://hearthbowl.net/sitemap.xml` in Google Search Console
- [ ] Create/claim your **Google Business Profile** and make sure the address/hours match the site exactly
- [ ] Add the real Instagram handle and online ordering link in `index.html` (search for "placeholder" — a few spots are marked)
- [ ] Share a link on Facebook/Instagram once to confirm the preview card shows the logo + description correctly (uses `assets/og-image.jpg`)
- [ ] Double check phone number and address are correct: currently (907) 451-0000 / 550 3rd St, Fairbanks, AK 99701

## Editing content later

- **Menu items/prices/hours/phone/address**: these are hand-written directly in `index.html` (search for the item name or the section, e.g. "ADDRESS_FULL" won't exist since this is plain HTML — search for the phone number or address text directly).
- **Images**: swap any file in `images/` (keep the same filename) or add new ones and update the `src=` in `index.html`.
- **Colors/fonts**: all defined as CSS variables at the top of `style.css` (`:root { --ember: ...; --charcoal: ...; }`).

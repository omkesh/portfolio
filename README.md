# Personal Portfolio — Vite + React

A production-ready personal portfolio template built with **Vite + React 18 (JavaScript)**, Tailwind CSS, Framer Motion, and react-i18next. **Every piece of content is configurable from a single file** — fork it, edit one file, and it's yours.

## Features

- 2 themes (Noir / Newsprint) with localStorage persistence
- 6 languages (English, हिन्दी, मराठी, Deutsch, Русский, 中文)
- Filterable project showcase
- Interactive work-experience timeline
- Live Medium blog feed (with configurable fallback posts)
- Scroll progress bar, back-to-top, scroll-spy nav
- WCAG 2.1 AA-minded: focus rings, ARIA roles, reduced-motion support
- SEO: Open Graph, Twitter cards, canonical — **auto-injected from your data at build time**
- Auto-generated favicon monogram from your name

## Getting started

```bash
npm install
npm run dev      # start dev server
npm run build    # production build → dist/
npm run preview  # preview the production build
```

## Make it yours — 5 steps

1. Edit **`src/data/resumeData.js`** (the only file you must touch — full reference below)
2. Replace the photos in `public/assets/`
3. Drop your resume PDF at `public/resume.pdf`
4. (Optional) Set up the contact form delivery
5. Deploy

---

## Configuration reference — `src/data/resumeData.js`

Everything below lives in this one file. All exports are plain JS objects/arrays — edit values, add/remove array items freely.

### `profile` — who you are

| Key | Type | Used for |
|-----|------|----------|
| `name` | string | Hero heading, footer copyright, `<meta name="author">`, avatar fallback |
| `title` | string | Hero subtitle line (also set per-language in i18n) |
| `role` | string | Your role label |
| `company` | string | Interpolated into the hero subtitle as `{{company}}` |
| `experienceYears` | number | Interpolated as `{{years}}` in hero badge + subtitle |
| `location` | string | Hero location line |
| `email` | string | Contact section, noscript fallback, contact form recipient |
| `phone` | string | Contact section (`tel:` link) |
| `linkedin` | string | Social icons, contact section, noscript fallback |
| `medium` | string | Social icons, contact section, noscript fallback |
| `mediumUsername` | string | Live Medium feed fetch (your Medium subdomain, e.g. `omken`) |
| `education` | object | `{ degree, score, college, university, year }` |
| `profileImage` | string | Hero photo (desktop) — path under `public/` |
| `profileImageMobile` | string | Optional face-crop photo for small screens; `""` reuses `profileImage` |
| `profileImageFallback` | string | Remote image used if the local photo fails to load |

### `socialLinks` — hero social icons

| Key | Used for |
|-----|----------|
| `linkedin` | LinkedIn icon URL |
| `medium` | Medium icon URL |
| `email` | (reserved) |
| `phone` | (reserved) |

### `skills` — skills grid

Array of `{ name, category, proficiency }`:

- `category` — one of `frontend` / `backend` / `testing` / `architecture` (labels translated in i18n)
- `proficiency` — 0–100, shown on badge hover

### `experience` — work timeline

Array of `{ company, role, period, location, isCurrent, keyDeliverables }`:

- `isCurrent: true` shows the "Current" badge (usually your latest entry)
- `keyDeliverables` — bullet list shown per job
- Order: most recent first

### `projects` — project cards

Array of `{ id, title, category, description, technologies, highlights, demoUrl, repoUrl }`:

- `category` — must match one of `projectCategories` (except `"All"`)
- `demoUrl` / `repoUrl` — empty string renders "Private / NDA" instead of a link
- `technologies` — chip list; `highlights` — bullet list

### `projectCategories` — filter bar

Array of filter labels, e.g. `["All", "FinTech", "E-Commerce", "Enterprise", "Sales"]`. `"All"` is required; the rest must match the `category` values used in `projects`.

### `languages` — UI language selector

Array of `{ code, label, nativeLabel }`. `code` must have a matching translation block in `src/i18n/i18n.js`. Remove entries you don't want to offer.

### `themes` — theme switcher

Array of `{ id, label }`. `id` must match a `.theme-<id>` class in `src/index.css`.

### `siteMeta` — branding, SEO & `<head>` content

| Key | Type | Used for |
|-----|------|----------|
| `logoText` | string | Header logo, first part (e.g. `omkesh`) |
| `logoAccent` | string | Header logo, accent-colored part (e.g. `.dev`) |
| `title` | string | Browser tab title + OG/Twitter titles |
| `description` | string | `<meta description>` + OG/Twitter descriptions |
| `keywords` | string | `<meta keywords>` |
| `siteUrl` | string | Canonical URL + `og:url` (no trailing slash) |
| `ogImage` | string | OG/Twitter preview image (path under `public/`) |
| `faviconInitial` | string | Letter(s) in the auto-generated SVG favicon monogram |
| `builtWith` | string | Footer "built with" line |

### `featuredPosts` — fallback blog posts

Array of `{ title, link, date }`. Shown in the Writing section when the live Medium feed can't be fetched. Replace with your own posts.

### `contactForm` — form delivery

| Key | Type | Used for |
|-----|------|----------|
| `provider` | string | `"mailto"` (default — opens visitor's email client), `"formspree"`, or `"emailjs"` |
| `formspreeId` | string | Your Formspree form ID (from [formspree.io](https://formspree.io)) — required when `provider: "formspree"` |
| `emailjs` | object | `{ serviceId, templateId, publicKey }` — required when `provider: "emailjs"` |

---

## Other configuration

| What | Where |
|------|-------|
| Photos | `public/assets/` — point `profile.profileImage` / `profile.profileImageMobile` at them |
| Resume PDF | `public/resume.pdf` — linked by the hero "Resume" button |
| Translations | `src/i18n/i18n.js` — hero subtitle interpolates `{{company}}` / `{{years}}` from profile automatically |
| Theme palettes | `src/index.css` — `.theme-noir` / `.theme-newsprint` CSS variables |
| Fonts | `index.html` (Google Fonts link) + `tailwind.config.js` |

## Deployment

- **Netlify** — `netlify.toml` included; connect repo and deploy.
- **Vercel** — `vercel.json` included; `vercel` CLI or dashboard import.
- **GitHub Pages** — set `base` in `vite.config.js` to your repo name, then push `dist/` to `gh-pages`.

## How the auto-injection works

`index.html` contains placeholders like `__SITE_TITLE__`. A tiny Vite plugin (`vite-plugin-inject-meta.js`) reads `profile` and `siteMeta` from `resumeData.js` at build time and fills them in — so the browser tab title, SEO meta tags, Open Graph/Twitter cards, favicon monogram, and noscript fallback all update automatically when you edit your data. No need to touch `index.html` at all.

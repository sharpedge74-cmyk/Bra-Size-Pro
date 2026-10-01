# BraSizePRO - Bra Size Calculators & Fit Guides

**Domain:** [https://brasizepro.com](https://brasizepro.com)  
**Brand:** BraSizePRO  
**Design Palette:** Dual theme support (Pinkish Rose/Blush & Emerald Forest), switchable with instant client-side persistence.

---

## 1. Jekyll Architecture & File Structure

This site uses a standard Jekyll architecture with a **flat root for tools and guides**:
- **Tools (14):** Directly in project root as `.html` files (e.g., `bra-size-calculator.html`, `sister-size-calculator.html`).
- **Guides (10):** Directly in project root as `.html` files (e.g., `how-to-measure-bra-size-at-home.html`).
- **Pages (8):** Stored in `_pages/` with explicit slashless permalinks (e.g., `permalink: /about`).
- **Layouts (`_layouts/`):** `default.html`, `tool.html`, `guide.html`, `page.html`, `home.html`.
- **Includes (`_includes/`):**
  - `components/`: header, footer, breadcrumbs, faq, related, clear_data, theme_toggle.
  - `jsonld/`: organization, website, webapplication, faqpage, breadcrumblist, article.
  - `ads/`: ad slots adhering to `ads.yml` config.
  - `seo/`: canonical tags, Open Graph, Twitter cards, meta tags.
- **Data (`_data/`):** `sizes.yml`, `regions.yml`, `brands.yml`, `symptoms.yml`, `nav.yml`, `ads.yml`.
- **Sass (`_sass/`):** `_tokens.scss`, `_base.scss`, `_controller-ui.scss`, `_app-shell.scss`, `_ads.scss`, `_guide.scss`, `_utilities.scss`.
- **Scripts (`assets/js/`):** `core.js`, `ads.js`, and specialized scripts in `tools/*.js`.

---

## 2. Strict URL Rules

- **Zero Trailing Slashes & Extensionless URLs:** Every page URL is canonicalized without `.html` and without a trailing slash (e.g., `https://brasizepro.com/bra-size-calculator`).
- **Host Redirects:**
  - Netlify / Cloudflare Pages: Handled via `/_redirects` (301 status).
  - Apache: Handled via `/.htaccess` with mod_rewrite.
- **Internal Links & Breadcrumbs:** Always point to the exact slashless path to prevent redundant 301 round-trips.

---

## 3. SEO & Structured Data (JSON-LD)

Each page generates compliant Schema.org JSON-LD via `_includes/jsonld/`:
- `Organization` & `WebSite` on all pages.
- `SoftwareApplication` on all 14 calculator tool pages.
- `FAQPage` wherever front matter defines `faq` arrays.
- `BreadcrumbList` based on front matter hierarchy (`Home > Page Name`).
- `Article` on all educational guide pages.

---

## 4. Theme System

- **Pinkish Rose:** Blush tones, warm terracotta, delicate plum accents for an intimate, reassuring aesthetic.
- **Emerald Forest:** Deep botanical emerald, crisp mint, and champagne gold accents for a luxury, tailored studio feel.
- Switchable via the header control, persisting to `localStorage` (`imrango_theme`).

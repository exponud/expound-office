# Expound Coderz — Redesigned Multi-Page Web Application

A modern, high-craft redesign for **Expound Coderz Pvt. Ltd.** (`expoundcoderz.com`), engineered with React 19, TypeScript, Tailwind CSS v4, and Motion (`motion/react`).

## Architecture & Highlights

- **Separated Services & Digital Products**: Cleanly separates custom development services (Shopify Plus, Platform Migrations, Magento 2 / Adobe Commerce, WordPress & WooCommerce, Custom Web & SaaS, AI & Performance) from commercial products (Shopify Apps under ESTS, Magento 2 Extensions, and WordPress Plugins).
- **Signature Interactive Experiences**:
  - **Interactive Digital Ecosystem**: Clickable SVG circuit topology illustrating how Storefronts, ERP Middleware, Migration Pipelines, and Extensions & AI connect.
  - **Horizontal Case Study Reel**: Sticky pinned scroll-to-glide showcase on desktop (with velocity skew, 3D card tilt, pointer spotlight, and brand stepper) plus a touch-friendly carousel on mobile.
  - **From Idea to Innovation**: Scroll-progress pinned storytelling tracing discovery schemas, storefront UI, staged ETL, and zero-downtime launch.
  - **Digital Product Preview Studio**: Live interactive storefront widgets for ESTS Free Shipping Booster AI, ESTS B2B Lock & Hide Price, ESTS Smart Product Bundler, CallToOrder, and Buy Now for Magento 2.
- **Complete Multi-Page Routes**:
  - `/` — Homepage
  - `/services` & `/services/:slug` — Services Overview & Individual Service Pages
  - `/products`, `/products/shopify-apps`, `/products/magento-extensions`, `/products/wordpress-plugins`, `/products/:category/:slug`
  - `/work` & `/work/:slug` — Portfolio & Case Studies (Performance-PCs, Sophie Conran, XY London, Skull Shaver, Hessaire Products)
  - `/about`, `/process`, `/careers`, `/insights`, `/insights/:slug`, `/contact`

## Local Development

```bash
npm install
npm run dev
```

## Production & GitHub Pages Build

```bash
npm run lint
npm run build
```

A GitHub Actions workflow is included at `.github/workflows/deploy.yml` to build and deploy `dist/` automatically to **GitHub Pages** when pushed to `main`. In your repository settings on GitHub, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**.

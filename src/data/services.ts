export interface ServiceItem {
  slug: string;
  index: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  category: 'Commerce Platforms' | 'Engineering & AI' | 'Migration & Growth';
  idealFor: string;
  capabilities: string[];
  architectureHighlights: {
    label: string;
    detail: string;
  }[];
  relatedCaseSlugs: string[];
  techStack: string[];
}

export const SERVICES: ServiceItem[] = [
  {
    slug: 'shopify-plus-development',
    index: '01',
    title: 'Shopify & Shopify Plus Development',
    shortTitle: 'Shopify Plus',
    tagline: 'Enterprise storefronts, Checkout Extensibility, and B2B commerce engineered for conversion.',
    summary:
      'As an official Shopify Partner with over 30 published apps, we build custom Shopify Plus architectures that handle deep SKU catalogs, high-volume flash traffic, and tailored checkout logic without sacrificing page speed.',
    category: 'Commerce Platforms',
    idealFor: 'High-growth DTC brands and B2B merchants scaling beyond template limitations.',
    capabilities: [
      'Custom OS 2.0 & headless Hydrogen / React storefront builds',
      'Checkout Extensibility UI components and custom Shopify Functions',
      'B2B wholesale portals, tiered pricing, and custom company catalogs',
      'Private & public Shopify App engineering via App Bridge, OAuth, and webhooks',
      'Structured metafield & metaobject architecture for technical catalogs',
    ],
    architectureHighlights: [
      {
        label: 'Checkout Extensibility',
        detail: 'Upgrade legacy checkout.liquid scripts into sandboxed, upgrade-safe Shopify Functions and UI extensions.',
      },
      {
        label: 'Catalog Precision',
        detail: 'Model 100,000+ technical SKUs, compatibility filters, and multi-attribute variants cleanly.',
      },
      {
        label: 'Private App Middleware',
        detail: 'Connect ERP, accounting, and custom fulfillment workflows via reliable webhook queues.',
      },
    ],
    relatedCaseSlugs: ['performance-pcs', 'skull-shaver', 'hessaire-products'],
    techStack: ['Shopify Plus', 'Liquid', 'Shopify Functions', 'App Bridge', 'React', 'GraphQL'],
  },
  {
    slug: 'platform-migrations',
    index: '02',
    title: 'Enterprise Platform Migrations',
    shortTitle: 'Migrations',
    tagline: 'Zero-downtime transitions from Magento, WooCommerce, and legacy stacks to Shopify Plus.',
    summary:
      'Platform migrations fail when data parity or SEO equity is treated as an afterthought. We engineer staged ETL pipelines that move hundreds of thousands of products, customer histories, and orders with strict QA gates and zero launch downtime.',
    category: 'Migration & Growth',
    idealFor: 'Merchants migrating off Magento 1/2, WooCommerce, or custom legacy monoliths.',
    capabilities: [
      'Magento to Shopify Plus full-catalog, variant, and customer migration',
      'Historical order migration preserving account lookups and tax records',
      'Exhaustive 301 URL redirect mapping and canonical SEO equity protection',
      'Staged delta-sync pipelines for continuous data parity prior to cutover',
      'Post-launch traffic load testing and war-room cutover execution',
    ],
    architectureHighlights: [
      {
        label: 'Verified SKU Scale',
        detail: 'Proven across 100K+ product variants (Performance-PCs) and 60K+ fashion SKUs (XY London).',
      },
      {
        label: 'SEO Continuity',
        detail: 'Preserve organic rankings through automated URL mapping, structured data parity, and metadata transfer.',
      },
      {
        label: 'Zero Cutover Downtime',
        detail: 'Delta synchronization ensures orders placed during final cutover never fall through the cracks.',
      },
    ],
    relatedCaseSlugs: ['performance-pcs', 'sophie-conran', 'xy-london'],
    techStack: ['Shopify Admin API', 'Magento 2 API', 'Node.js ETL', 'Python', '301 Redirect Matrix'],
  },
  {
    slug: 'magento-adobe-commerce',
    index: '03',
    title: 'Magento & Adobe Commerce',
    shortTitle: 'Magento 2',
    tagline: 'Custom Magento 2 modules, Hyvä theme transformations, and enterprise upgrades.',
    summary:
      'Backed by over a decade of Magento engineering and 35+ marketplace extensions, we maintain, upgrade, and accelerate complex Adobe Commerce installations—bringing modern Core Web Vitals via Hyvä and reliable custom module architecture.',
    category: 'Commerce Platforms',
    idealFor: 'Established enterprises operating complex multi-store or B2B Adobe Commerce stacks.',
    capabilities: [
      'Hyvä theme implementation for sub-second Magento 2 frontend speed',
      'Custom Magento 2 extension architecture and Adobe Marketplace compliance',
      'Version upgrades, security patching, and database reindexing optimization',
      'OAuth 2.0, Zoho Books, and carrier shipping API integrations',
      'Multi-warehouse inventory and custom pricing rule engineering',
    ],
    architectureHighlights: [
      {
        label: 'Hyvä Performance',
        detail: 'Replace heavy RequireJS/Knockout frontends with lightweight Tailwind + Alpine.js Hyvä themes.',
      },
      {
        label: 'Clean Extension DI',
        detail: 'Strictly modular plugins and observers without core file overrides or upgrade friction.',
      },
      {
        label: 'ERP & Accounting Bridge',
        detail: 'Bi-directional order, invoice, and stock sync for complex back-office environments.',
      },
    ],
    relatedCaseSlugs: ['performance-pcs', 'xy-london'],
    techStack: ['Magento 2', 'Adobe Commerce', 'Hyvä Theme', 'PHP 8', 'GraphQL', 'MySQL'],
  },
  {
    slug: 'wordpress-woocommerce',
    index: '04',
    title: 'WordPress & WooCommerce Development',
    shortTitle: 'WordPress',
    tagline: 'Custom plugins, headless WordPress architectures, and performance-tuned WooCommerce.',
    summary:
      'We build enterprise-grade WordPress and WooCommerce systems free from bloated third-party plugin conflicts—delivering bespoke plugin engineering, editorial CMS workflows, and decoupled React/Next.js frontends.',
    category: 'Commerce Platforms',
    idealFor: 'Content-driven commerce brands, publishers, and agile WooCommerce stores.',
    capabilities: [
      'Custom WordPress plugin development built to coding and security standards',
      'WooCommerce checkout customization, subscriptions, and payment integrations',
      'Headless WordPress setups pairing WP REST/GraphQL with Next.js frontends',
      'Custom Gutenberg block systems and tailored editorial themes',
      'Database query profiling, caching architecture, and malware hardening',
    ],
    architectureHighlights: [
      {
        label: 'Plugin Independence',
        detail: 'Replace fragile multi-plugin stacks with lean, purpose-built custom plugins.',
      },
      {
        label: 'Headless Decoupling',
        detail: 'Combine editorial publishing speed with static/SSR React delivery.',
      },
      {
        label: 'WooCommerce Scale',
        detail: 'High-Performance Order Storage (HPOS) readiness and custom ERP webhooks.',
      },
    ],
    relatedCaseSlugs: ['sophie-conran'],
    techStack: ['WordPress', 'WooCommerce', 'PHP', 'Next.js', 'WPGraphQL', 'REST API'],
  },
  {
    slug: 'custom-software-saas',
    index: '05',
    title: 'Custom Web Apps & SaaS Engineering',
    shortTitle: 'Web & SaaS',
    tagline: 'Full-stack Laravel, React, Next.js, and Node.js applications built from first principles.',
    summary:
      'Beyond storefronts, our engineering team architects multi-tenant SaaS platforms, internal operations portals, and high-throughput web applications tailored around proprietary business logic.',
    category: 'Engineering & AI',
    idealFor: 'Software startups and enterprises building proprietary digital platforms or merchant portals.',
    capabilities: [
      'Full-stack application architecture in Laravel, React, Next.js, and Node.js',
      'Multi-tenant SaaS design with role-based access control and billing hooks',
      'Custom REST & GraphQL API development and third-party webhook orchestration',
      'Merchant admin dashboards and inventory/order operations portals',
      'AWS cloud deployment, CI/CD pipelines, and DevOps infrastructure support',
    ],
    architectureHighlights: [
      {
        label: 'Clean Domain Modeling',
        detail: 'Normalized schemas and resilient queue architectures that scale predictably.',
      },
      {
        label: 'Modern Frontend Craft',
        detail: 'Accessible, responsive React and Next.js interfaces with crisp state management.',
      },
      {
        label: 'Production DevOps',
        detail: 'Automated deployments, staging environments, and uptime observability on AWS.',
      },
    ],
    relatedCaseSlugs: ['performance-pcs', 'skull-shaver'],
    techStack: ['Laravel', 'React', 'Next.js', 'Node.js', 'TypeScript', 'AWS'],
  },
  {
    slug: 'ai-integrations-optimization',
    index: '06',
    title: 'AI Integrations, APIs & Speed Optimization',
    shortTitle: 'AI & Performance',
    tagline: 'Python AI workflows, ERP synchronization, and Core Web Vitals engineering.',
    summary:
      'We connect commerce storefronts with real-world operational systems—shipping Python AI automation, Zoho/QuickBooks accounting pipelines, and forensic Core Web Vitals optimization that turns latency into measurable revenue.',
    category: 'Engineering & AI',
    idealFor: 'Operations-heavy merchants and engineering teams removing manual bottlenecks and site lag.',
    capabilities: [
      'Python and LLM-assisted catalog enrichment, metadata generation, and smart search',
      'Bi-directional Zoho Books, QuickBooks, and custom ERP synchronization',
      'Core Web Vitals tuning (LCP, INP, CLS) and render-blocking asset elimination',
      'Technical SEO architecture, structured schema markup, and crawl efficiency',
      'Pre-scoped TechTime engineering blocks for rapid fixes and integrations',
    ],
    architectureHighlights: [
      {
        label: 'Applied Commerce AI',
        detail: 'Practical catalog metadata, shipping threshold intelligence, and automated support workflows.',
      },
      {
        label: 'Accounting & ERP Parity',
        detail: 'Eliminate manual CSV exports with real-time order, tax, and inventory sync.',
      },
      {
        label: 'Core Web Vitals',
        detail: 'Script deferral, liquid/query optimization, and responsive media pipelines.',
      },
    ],
    relatedCaseSlugs: ['skull-shaver', 'keysmart', 'hessaire-products'],
    techStack: ['Python', 'AI APIs', 'Zoho Books', 'QuickBooks', 'Core Web Vitals', 'Webhooks'],
  },
];

export const ECOSYSTEM_PILLARS = [
  {
    id: 'storefront',
    index: '01',
    title: 'Storefront Layer',
    subtitle: 'High-Velocity Customer Experience',
    description:
      'Editorial UI/UX, OS 2.0 / Hyvä themes, and Checkout Extensibility built to eliminate render lag and guide shoppers effortlessly from discovery to order confirmation.',
    platforms: ['Shopify Plus', 'Hyvä Magento 2', 'Headless Next.js', 'WooCommerce'],
    output: 'Sub-second storefront interactions & mobile-first conversion architecture',
    caseReference: 'XY London · 60K+ SKU Mobile-First Rebuild',
  },
  {
    id: 'middleware',
    index: '02',
    title: 'ERP & Data Middleware',
    subtitle: 'Real-Time Operational Sync',
    description:
      'Resilient Node.js, Laravel, and Python API bridges connecting storefronts directly to Zoho Books, QuickBooks, warehouse inventory, and custom fulfillment partners.',
    platforms: ['Zoho Books', 'QuickBooks', 'OAuth 2.0 & Webhooks', 'UPS Shipping API'],
    output: 'Zero manual reconciliation across invoices, stock levels, and orders',
    caseReference: 'Performance-PCs · Custom ERP & Inventory Middleware',
  },
  {
    id: 'migration',
    index: '03',
    title: 'Migration Engine',
    subtitle: 'Zero-Downtime Data Preservation',
    description:
      'Staged ETL pipelines with strict QA verification gates transferring 100K+ SKUs, 200K+ historical orders, customer accounts, and 301 SEO redirects cleanly.',
    platforms: ['Magento → Shopify Plus', 'WooCommerce → Shopify', 'Custom ETL Pipelines'],
    output: '100% historical order & SEO equity retention at launch cutover',
    caseReference: 'Sophie Conran & PPCS · Zero-Downtime Cutovers',
  },
  {
    id: 'extensions',
    index: '04',
    title: 'Apps, Plugins & AI',
    subtitle: 'Productized Commerce Capabilities',
    description:
      'Over 60 battle-tested apps and extensions extending native store functionality—from B2B price locks and smart bundling to WhatsApp campaigns and AI catalog tools.',
    platforms: ['30+ Shopify Apps', '35+ Magento Extensions', 'WordPress Plugins', 'Python AI'],
    output: 'Verified marketplace extensions ready to install or customize',
    caseReference: 'ESTS Product Suite · Shopify App Store & Adobe Marketplace',
  },
];

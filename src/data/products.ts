export type ProductPlatform = 'shopify' | 'magento' | 'wordpress';

export interface DigitalProduct {
  slug: string;
  name: string;
  platform: ProductPlatform;
  platformLabel: string;
  category: string;
  tagline: string;
  description: string;
  compatibility: string[];
  features: string[];
  benefits: string[];
  pricingModel: string;
  marketplaceLabel: string;
  marketplaceUrl: string;
  interactivePreviewType?: 'b2b-lock' | 'bundler' | 'call-to-order' | 'buy-now' | 'shipping-booster';
  featuredOnHome?: boolean;
}

export const PRODUCTS: DigitalProduct[] = [
  // ========================
  // SHOPIFY APPS (ESTS)
  // ========================
  {
    slug: 'ests-free-shipping-booster-ai',
    name: 'ESTS Free Shipping Booster AI',
    platform: 'shopify',
    platformLabel: 'Shopify App',
    category: 'Cart & Conversion',
    tagline: 'Dynamic free-shipping progress bars and AI-assisted cart threshold recommendations.',
    description:
      'Encourage higher average order value with real-time shipping threshold bars, smart product add-on suggestions inside the cart drawer, and geo-targeted shipping rules.',
    compatibility: ['Shopify OS 2.0', 'Shopify Plus', 'Cart Drawer & Full Cart'],
    features: [
      'Real-time dynamic cart progress indicator for free shipping thresholds',
      'AI-assisted complementary item suggestions near threshold completion',
      'Multi-currency and country-specific shipping goal configuration',
      'Zero theme-code pollution via native Shopify App Embed blocks',
    ],
    benefits: [
      'Increases average order value without aggressive discount codes',
      'Installs cleanly via Shopify Theme App Extensions',
      'Preserves storefront Core Web Vitals with lightweight asset loading',
    ],
    pricingModel: 'Free plan available · Paid tiers on Shopify App Store',
    marketplaceLabel: 'View on Shopify App Store',
    marketplaceUrl: 'https://apps.shopify.com/partners/expound-coderz',
    interactivePreviewType: 'shipping-booster',
    featuredOnHome: true,
  },
  {
    slug: 'zoho-books-integration',
    name: 'Zoho Books Integration',
    platform: 'shopify',
    platformLabel: 'Shopify App',
    category: 'ERP & Accounting Sync',
    tagline: 'Automated two-way synchronization between Shopify orders, inventory, and Zoho Books.',
    description:
      'Eliminate manual bookkeeping exports by automatically syncing Shopify orders, invoices, tax lines, customer profiles, and SKU stock counts directly with Zoho Books.',
    compatibility: ['Shopify', 'Shopify Plus', 'Zoho Books Global Editions'],
    features: [
      'Real-time order-to-invoice sync triggered via Shopify webhooks',
      'Customer, SKU, tax mapping, and refund synchronization',
      'Automatic inventory quantity updates between Zoho Books and Shopify locations',
      'Detailed sync logs and retry handling for failed API payloads',
    ],
    benefits: [
      'Saves finance teams hours of manual CSV reconciliation every week',
      'Maintains tax and invoice parity across high-volume order days',
      'Prevents overselling with automated multi-location stock alignment',
    ],
    pricingModel: 'Subscription · Direct enquiry for enterprise volume',
    marketplaceLabel: 'View on Shopify App Store',
    marketplaceUrl: 'https://apps.shopify.com/partners/expound-coderz',
    featuredOnHome: false,
  },
  {
    slug: 'ests-b2b-lock-hide-price',
    name: 'ESTS B2B Lock & Hide Price',
    platform: 'shopify',
    platformLabel: 'Shopify App',
    category: 'B2B & Wholesale',
    tagline: 'Granular storefront access control, price hiding, and login-gated wholesale catalogs.',
    description:
      'Turn any Shopify storefront into a private wholesale or hybrid B2B/DTC portal by locking specific collections, hiding prices for guests, and displaying custom quote CTAs until approved login.',
    compatibility: ['Shopify OS 2.0', 'Shopify Plus', 'Wholesale & Hybrid Stores'],
    features: [
      'Hide product prices and Add-to-Cart buttons from unauthenticated visitors',
      'Lock specific products, collections, or entire storefront URLs by customer tag',
      'Replace hidden prices with custom Login-to-View or Request Quote messaging',
      'Passcode or approved customer-tag gating rules with zero Liquid hacks',
    ],
    benefits: [
      'Run B2B wholesale pricing alongside DTC retail on a single Shopify store',
      'Protect dealer-only margins from public search indexing',
      'Capture qualified trade leads directly from locked product pages',
    ],
    pricingModel: 'Monthly plans · Free trial on Shopify App Store',
    marketplaceLabel: 'View on Shopify App Store',
    marketplaceUrl: 'https://apps.shopify.com/partners/expound-coderz',
    interactivePreviewType: 'b2b-lock',
    featuredOnHome: true,
  },
  {
    slug: 'ests-smart-product-bundler',
    name: 'ESTS Smart Product Bundler',
    platform: 'shopify',
    platformLabel: 'Shopify App',
    category: 'Merchandising & AOV',
    tagline: 'Flexible product bundles, volume kits, and tiered bundle discounts with native inventory sync.',
    description:
      'Create curated kits, mix-and-match product bundles, and cross-sell packages that keep individual component SKUs accurately deducted in Shopify inventory.',
    compatibility: ['Shopify OS 2.0', 'Shopify Plus', 'Multi-Variant Products'],
    features: [
      'Fixed kits, mix-and-match bundles, and tiered percentage/flat discounts',
      'Real-time component SKU stock tracking to prevent overselling',
      'Clean embedded product-page bundle builder matching your theme typography',
      'Native cart discount breakdown without duplicate dummy products',
    ],
    benefits: [
      'Drives multi-item purchases with clear bundle savings display',
      'Maintains accurate warehouse SKU counts on every bundle order',
      'Fast setup without custom Liquid theme rewrites',
    ],
    pricingModel: 'Monthly plans on Shopify App Store',
    marketplaceLabel: 'View on Shopify App Store',
    marketplaceUrl: 'https://apps.shopify.com/partners/expound-coderz',
    interactivePreviewType: 'bundler',
    featuredOnHome: true,
  },
  {
    slug: 'call-to-order',
    name: 'CallToOrder',
    platform: 'shopify',
    platformLabel: 'Shopify App',
    category: 'Customer Support & Sales',
    tagline: 'Enable shoppers to place phone orders or request immediate callbacks directly from product pages.',
    description:
      'Ideal for high-consideration, custom-configured, or B2B hardware catalogs where buyers want quick human confirmation before purchasing.',
    compatibility: ['Shopify OS 2.0', 'Shopify Plus', 'Mobile & Desktop Storefronts'],
    features: [
      'One-tap Call-to-Order button on product and cart pages',
      'Structured callback request capture linked to exact product variant and SKU',
      'Configurable business hours and regional phone routing',
      'Merchant dashboard logging callback requests and conversion status',
    ],
    benefits: [
      'Converts hesitant high-ticket shoppers who prefer speaking to a specialist',
      'Eliminates friction on complex technical or custom-sized products',
      'Works seamlessly alongside standard online checkout',
    ],
    pricingModel: 'Subscription · Shopify App Store',
    marketplaceLabel: 'View on Shopify App Store',
    marketplaceUrl: 'https://apps.shopify.com/partners/expound-coderz',
    interactivePreviewType: 'call-to-order',
    featuredOnHome: true,
  },
  {
    slug: 'order-modify-by-ests',
    name: 'Order Modify by ESTS',
    platform: 'shopify',
    platformLabel: 'Shopify App',
    category: 'Post-Purchase Operations',
    tagline: 'Allow customers to self-edit shipping addresses, items, or cancel orders before fulfillment.',
    description:
      'Reduce customer support tickets by giving buyers a controlled post-purchase window to fix typos, update delivery addresses, or adjust quantities before warehouse dispatch.',
    compatibility: ['Shopify', 'Shopify Plus', 'Order Status & Customer Accounts'],
    features: [
      'Configurable edit time window (e.g., 30 minutes post-checkout)',
      'Address corrections, variant swaps, and self-service cancellation rules',
      'Automatic lock once fulfillment or ERP sync begins',
      'Audit trail and email confirmation on every order adjustment',
    ],
    benefits: [
      'Cuts repetitive address-change and order-cancel support tickets',
      'Reduces failed deliveries and return shipping costs',
      'Maintains strict warehouse fulfillment cutoffs',
    ],
    pricingModel: 'Monthly plans on Shopify App Store',
    marketplaceLabel: 'View on Shopify App Store',
    marketplaceUrl: 'https://apps.shopify.com/partners/expound-coderz',
  },
  {
    slug: 'ests-whatsapp-campaign',
    name: 'ESTS WhatsApp Campaign',
    platform: 'shopify',
    platformLabel: 'Shopify App',
    category: 'Customer Engagement',
    tagline: 'Targeted WhatsApp marketing broadcasts, order alerts, and integrated customer support.',
    description:
      'Engage buyers where they respond fastest—connecting Shopify customer segments and order events to structured WhatsApp notifications and two-way support.',
    compatibility: ['Shopify', 'Shopify Plus', 'WhatsApp Business API'],
    features: [
      'Automated order confirmation, shipping, and abandoned cart messages',
      'Segmented broadcast campaigns with product cards and quick checkout links',
      'Integrated customer inquiry inbox linked to order history',
      'Opt-in compliance management and delivery telemetry',
    ],
    benefits: [
      'Significantly higher open rates compared to traditional email blasts',
      'Streamlines post-purchase support inside one merchant inbox',
    ],
    pricingModel: 'Subscription · Shopify App Store',
    marketplaceLabel: 'View on Shopify App Store',
    marketplaceUrl: 'https://apps.shopify.com/partners/expound-coderz',
  },
  {
    slug: 'ests-shop-by-brand',
    name: 'ESTS Shop By Brand',
    platform: 'shopify',
    platformLabel: 'Shopify App',
    category: 'Navigation & SEO',
    tagline: 'Alphabetical brand directories, filterable brand sliders, and AI-assisted brand SEO metadata.',
    description:
      'Built for multi-brand retailers managing dozens or hundreds of vendors—generate clean A–Z brand landing pages, logo carousels, and structured SEO metadata.',
    compatibility: ['Shopify OS 2.0', 'Shopify Plus', 'Multi-Brand Retailers'],
    features: [
      'Auto-synced A–Z brand directory page mapped to Shopify vendor fields',
      'Responsive brand logo slider and sidebar filter blocks',
      'AI-assisted brand descriptions and SEO meta title/description generation',
      'Custom brand landing URLs for organic search discovery',
    ],
    benefits: [
      'Helps shoppers locate favorite manufacturers in seconds',
      'Captures high-intent brand-name organic search traffic',
    ],
    pricingModel: 'Free & Paid plans on Shopify App Store',
    marketplaceLabel: 'View on Shopify App Store',
    marketplaceUrl: 'https://apps.shopify.com/partners/expound-coderz',
  },
  {
    slug: 'ests-preorder-notify',
    name: 'ESTS PreOrder | Notify',
    platform: 'shopify',
    platformLabel: 'Shopify App',
    category: 'Inventory & Demand',
    tagline: 'Capture pre-order revenue and automated back-in-stock alerts for out-of-stock SKUs.',
    description:
      'Never lose demand during inventory restocks—automatically switch sold-out variants to Pre-Order or Back-in-Stock Notify Me capture.',
    compatibility: ['Shopify OS 2.0', 'Shopify Plus'],
    features: [
      'Automated Pre-Order button swap when inventory hits zero',
      'Email restock alerts triggered immediately upon inventory replenishment',
      'Pre-order quantity caps and estimated ship-date badges',
    ],
    benefits: [
      'Retains revenue on high-demand drops and seasonal replenishments',
      'Provides clear restock demand forecasting across variants',
    ],
    pricingModel: 'Monthly plans on Shopify App Store',
    marketplaceLabel: 'View on Shopify App Store',
    marketplaceUrl: 'https://apps.shopify.com/partners/expound-coderz',
  },
  {
    slug: 'ests-catalog-product-pdf',
    name: 'ESTS Catalog Product PDF',
    platform: 'shopify',
    platformLabel: 'Shopify App',
    category: 'B2B & Merchandising',
    tagline: 'Generate branded, print-ready PDF spec sheets and wholesale product catalogs automatically.',
    description:
      'Allow wholesale buyers, architects, and shoppers to download structured PDF product specification sheets or multi-product line sheets directly from your store.',
    compatibility: ['Shopify OS 2.0', 'Shopify Plus', 'B2B & Hardware Stores'],
    features: [
      'One-click product spec sheet PDF export with custom brand header & footer',
      'Collection-level wholesale catalog PDF builder with SKU & pricing tables',
      'Supports QR codes linking back to live online product pages',
    ],
    benefits: [
      'Replaces manually designed Indesign line sheets for B2B sales teams',
      'Gives hardware and interior buyers instant shareable spec sheets',
    ],
    pricingModel: 'Subscription · Shopify App Store',
    marketplaceLabel: 'View on Shopify App Store',
    marketplaceUrl: 'https://apps.shopify.com/partners/expound-coderz',
  },

  // ========================
  // MAGENTO 2 EXTENSIONS
  // ========================
  {
    slug: 'magento-2-buy-now',
    name: 'Buy Now for Magento 2',
    platform: 'magento',
    platformLabel: 'Magento 2 Extension',
    category: 'Checkout Acceleration',
    tagline: 'One-click instant checkout button on product and category pages for Magento 2 & Adobe Commerce.',
    description:
      'Eliminate extra cart-page detours by letting high-intent shoppers jump straight from a product listing or PDP directly to Magento 2 checkout.',
    compatibility: ['Magento 2.3 / 2.4', 'Adobe Commerce', 'Hyvä & Luma Themes'],
    features: [
      'Adds a configurable "Buy Now" button alongside Add to Cart on PDPs and grids',
      'Supports simple, configurable, and bundled Magento 2 product types',
      'Preserves cart validation rules while redirecting immediately to checkout',
      'Custom button label and placement controls from Magento Admin',
    ],
    benefits: [
      'Reduces checkout friction on mobile and single-item impulse purchases',
      'Clean dependency-injection architecture with zero core file edits',
    ],
    pricingModel: 'One-time license · Direct download & support',
    marketplaceLabel: 'Enquire / License Module',
    marketplaceUrl: '/contact',
    interactivePreviewType: 'buy-now',
    featuredOnHome: true,
  },
  {
    slug: 'single-product-category-redirect',
    name: 'Single Product Category Redirect',
    platform: 'magento',
    platformLabel: 'Magento 2 Extension',
    category: 'UX & Navigation',
    tagline: 'Automatically route single-item Magento categories straight to the product detail page.',
    description:
      'Eliminate dead-end 1-product category listing clicks by seamlessly redirecting shoppers and crawlers directly to the active product page.',
    compatibility: ['Magento 2.3 / 2.4', 'Adobe Commerce Cloud & On-Prem'],
    features: [
      'Automatic detection of categories containing exactly one visible enabled product',
      'Configurable 301/302 redirect behavior for SEO safety',
      'Per-store-view enable/disable toggles inside Magento Admin',
    ],
    benefits: [
      'Removes unnecessary navigation steps for shoppers',
      'Improves crawl efficiency and reduces thin category bounce rates',
    ],
    pricingModel: 'One-time license · Expound Coderz Marketplace',
    marketplaceLabel: 'Enquire / License Module',
    marketplaceUrl: '/contact',
  },
  {
    slug: 'dynamic-configurable-product',
    name: 'Dynamic Configurable Product',
    platform: 'magento',
    platformLabel: 'Magento 2 Extension',
    category: 'Catalog & Merchandising',
    tagline: 'Dynamically update SKU, title, description, URL, and tier pricing on swatch selection.',
    description:
      'Give shoppers rich child-SKU details without leaving the parent configurable product page—updating technical specs, stock notes, and metadata instantaneously.',
    compatibility: ['Magento 2.4', 'Adobe Commerce', 'B2B & Technical Catalogs'],
    features: [
      'Real-time AJAX replacement of SKU, description, attributes, and meta title',
      'Dynamic URL hash/history updates for direct variant bookmarking',
      'Full compatibility with custom attribute tables and swatch swatches',
    ],
    benefits: [
      'Essential for hardware, electronics, and apparel stores with variant-specific specs',
      'Improves shopper clarity and reduces wrong-variant returns',
    ],
    pricingModel: 'One-time license · Expound Coderz Marketplace',
    marketplaceLabel: 'Enquire / License Module',
    marketplaceUrl: '/contact',
  },
  {
    slug: 'magento-2-admin-reindex',
    name: 'Admin Reindex for Magento 2',
    platform: 'magento',
    platformLabel: 'Magento 2 Extension',
    category: 'Operations & DevOps',
    tagline: 'Trigger safe Magento 2 index rebuilds directly from the Admin Grid without SSH access.',
    description:
      'Empower store operations managers to run targeted catalog, price, and inventory reindexing from the Magento Admin Panel with full status visibility.',
    compatibility: ['Magento 2.3 / 2.4', 'Adobe Commerce'],
    features: [
      'Single-click and bulk reindex actions inside System > Index Management',
      'Role-based ACL permissions restricting reindex access by admin role',
      'Non-blocking status reporting and execution logging',
    ],
    benefits: [
      'Removes developer bottlenecks for routine catalog and pricing refreshes',
      'Maintains ACL governance for non-technical merchandising teams',
    ],
    pricingModel: 'One-time license · Expound Coderz Marketplace',
    marketplaceLabel: 'Enquire / License Module',
    marketplaceUrl: '/contact',
  },
  {
    slug: 'magento-2-delete-customer-account',
    name: 'Magento 2 Delete Customer Account',
    platform: 'magento',
    platformLabel: 'Magento 2 Extension',
    category: 'Privacy & Compliance',
    tagline: 'Self-service GDPR-ready customer account deletion and anonymization workflow.',
    description:
      'Give customers a compliant self-service pathway inside My Account to request account deletion or PII anonymization while preserving financial order records.',
    compatibility: ['Magento 2.3 / 2.4', 'Adobe Commerce', 'GDPR / Privacy Ready'],
    features: [
      'Password-verified deletion request flow inside customer account dashboard',
      'Configurable order anonymization vs full customer record purge',
      'Admin approval queue and automated confirmation emails',
    ],
    benefits: [
      'Supports GDPR / CCPA right-to-erasure compliance out of the box',
      'Protects historical accounting ledger integrity',
    ],
    pricingModel: 'One-time license · Expound Coderz Marketplace',
    marketplaceLabel: 'Enquire / License Module',
    marketplaceUrl: '/contact',
  },
  {
    slug: 'magento-2-oauth-ups-integration',
    name: 'Magento 2 OAuth 2.0 & UPS Integration',
    platform: 'magento',
    platformLabel: 'Magento 2 Extension',
    category: 'Shipping & Security',
    tagline: 'Modern OAuth 2.0 authentication and live UPS shipping rate & label synchronization.',
    description:
      'Upgrade legacy UPS XML integrations to modern OAuth 2.0 REST endpoints for uninterrupted real-time shipping calculation and tracking generation.',
    compatibility: ['Magento 2.3 / 2.4', 'Adobe Commerce', 'UPS REST API'],
    features: [
      'Automated OAuth 2.0 token refresh and secure credential storage',
      'Real-time checkout shipping rates, label generation, and tracking sync',
      'Fallback rate handling and detailed API diagnostic logging',
    ],
    benefits: [
      'Ensures compliance with UPS API security deprecations',
      'Eliminates checkout shipping calculation failures',
    ],
    pricingModel: 'One-time license · Expound Coderz Marketplace',
    marketplaceLabel: 'Enquire / License Module',
    marketplaceUrl: '/contact',
  },

  // ========================
  // WORDPRESS & WOOCOMMERCE PLUGINS
  // ========================
  {
    slug: 'woocommerce-zoho-books-connector',
    name: 'WooCommerce Zoho Books Connector',
    platform: 'wordpress',
    platformLabel: 'WordPress Plugin',
    category: 'ERP & Accounting',
    tagline: 'Real-time WooCommerce order, invoice, and stock synchronization with Zoho Books.',
    description:
      'Built for WooCommerce stores requiring dependable accounting automation—syncing customer records, tax breakdowns, and SKU inventory in real time.',
    compatibility: ['WordPress 6.x', 'WooCommerce 8+ & HPOS', 'PHP 8.1+'],
    features: [
      'WooCommerce High-Performance Order Storage (HPOS) compatible',
      'Webhook-driven invoice creation and payment status mapping in Zoho Books',
      'Automated two-way stock quantity sync and SKU reconciliation',
      'Clean WP-Admin logs with one-click failed-job retry',
    ],
    benefits: [
      'Eliminates manual spreadsheet bookkeeping for WooCommerce finance teams',
      'Zero external SaaS middleware fees per order',
    ],
    pricingModel: 'Custom License & Implementation',
    marketplaceLabel: 'Request Plugin Package',
    marketplaceUrl: '/contact',
  },
  {
    slug: 'wp-headless-graphql-bridge',
    name: 'Headless WP & Next.js Preview Bridge',
    platform: 'wordpress',
    platformLabel: 'WordPress Plugin',
    category: 'Headless Architecture',
    tagline: 'On-demand ISR cache revalidation and live draft previews for decoupled WordPress frontends.',
    description:
      'Give editorial teams instant live draft previews and automatic static-page revalidation when publishing WordPress posts to Next.js or React frontends.',
    compatibility: ['WordPress 6.x', 'WPGraphQL', 'Next.js App Router'],
    features: [
      'Signed webhook triggers for Next.js On-Demand Revalidation upon post publish',
      'Secure token-authenticated live draft preview inside WordPress Gutenberg',
      'Custom post type & ACF schema exposure helpers',
    ],
    benefits: [
      'Combines familiar WordPress editorial workflows with static React performance',
      'Eliminates stale cache delays after content updates',
    ],
    pricingModel: 'Custom License & Implementation',
    marketplaceLabel: 'Request Plugin Package',
    marketplaceUrl: '/contact',
  },
  {
    slug: 'woocommerce-b2b-quote-workflow',
    name: 'WooCommerce B2B Quote & Order Workflow',
    platform: 'wordpress',
    platformLabel: 'WordPress Plugin',
    category: 'B2B & Wholesale',
    tagline: 'Role-based pricing visibility, wholesale quote requests, and custom order approval statuses.',
    description:
      'Extend WooCommerce for wholesale and industrial distributors with customer-role price locks, multi-item quote carts, and invoice-terms checkout.',
    compatibility: ['WordPress 6.x', 'WooCommerce HPOS', 'Multi-Currency'],
    features: [
      'Role-based price visibility and tiered wholesale discount tables',
      'Convert shopping cart into a formal Request for Quote (RFQ) with PDF summary',
      'Custom order status triggers for warehouse and ERP approvals',
    ],
    benefits: [
      'Supports complex B2B quoting directly within WooCommerce',
      'Lightweight modular codebase without bloated suite overhead',
    ],
    pricingModel: 'Custom License & Implementation',
    marketplaceLabel: 'Request Plugin Package',
    marketplaceUrl: '/contact',
  },
];

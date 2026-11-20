import performancePcsImg from '@/src/assets/images/case_performance_pcs_1795162904516.jpg';
import sophieConranImg from '@/src/assets/images/case_sophie_conran_1795162907333.jpg';
import xyLondonImg from '@/src/assets/images/case_xy_london_1795162903917.jpg';
import skullShaverImg from '@/src/assets/images/case_skull_shaver_1795162904150.jpg';
import heroStudioImg from '@/src/assets/images/hero_commerce_architecture_1795162904296.jpg';

export interface CaseStudy {
  slug: string;
  client: string;
  industry: string;
  category: 'Shopify Plus' | 'Migration' | 'CRO & Checkout' | 'UX & Catalog';
  headline: string;
  summary: string;
  image: string;
  imageAlt: string;
  duration: string;
  platformFrom?: string;
  platformTo: string;
  metrics: {
    value: string;
    label: string;
  }[];
  challenge: string;
  solution: string[];
  outcome: string;
  technologies: string[];
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'performance-pcs',
    client: 'Performance-PCs (PPCS)',
    industry: 'Custom PC Hardware & Liquid Cooling',
    category: 'Migration',
    headline: 'Migrating 100K+ technical hardware SKUs and 200K+ orders to Shopify Plus with zero downtime.',
    summary:
      'An 8-month enterprise rebuild transforming a complex legacy hardware catalog into a high-velocity Shopify Plus storefront backed by custom ERP middleware.',
    image: performancePcsImg,
    imageAlt: 'Custom anodized aluminum liquid-cooled workstation hardware representing Performance-PCs catalog',
    duration: '8 Months',
    platformFrom: 'Legacy / Magento-era Architecture',
    platformTo: 'Shopify Plus',
    metrics: [
      { value: '100K+', label: 'SKUs & Variants Migrated' },
      { value: '200K+', label: 'Historical Orders Preserved' },
      { value: '0 min', label: 'Downtime at Cutover' },
      { value: '8 mo', label: 'End-to-End Engineering' },
    ],
    challenge:
      'Performance-PCs carries one of the deepest specialty liquid-cooling and custom workstation catalogs online—over 100,000 SKUs and variants with intricate compatibility specs, custom kits, and external ERP inventory dependencies. Moving 200,000+ historical customer orders without data loss or checkout interruption required forensic pipeline engineering.',
    solution: [
      'Engineered staged product, variant, and historical order ETL pipelines equipped with automated QA validation gates.',
      'Designed structured Shopify metafield and metaobject schemas tailored for technical fittings, radiators, and configurable kits.',
      'Built custom API middleware synchronizing real-time stock and order updates with external ERP and warehouse systems.',
      'Executed high-concurrency load simulations and a coordinated launch war-room for seamless DNS cutover.',
    ],
    outcome:
      'Performance-PCs launched on Shopify Plus with zero downtime, complete historical customer and order continuity, and a dramatically faster storefront engineered for peak enthusiast hardware demand.',
    technologies: ['Shopify Plus', 'Custom ETL Pipelines', 'ERP Middleware', 'Metafield Architecture', 'Checkout Extensibility'],
  },
  {
    slug: 'sophie-conran',
    client: 'Sophie Conran',
    industry: 'Luxury British Homeware & Furniture',
    category: 'Shopify Plus',
    headline: 'Preserving artisanal British brand heritage through a seamless Magento-to-Shopify migration.',
    summary:
      'Rebuilding an editorial luxury homeware storefront for handmade sofas, fabrics, bedding, and dining while protecting organic search equity and historical customer data.',
    image: sophieConranImg,
    imageAlt: 'Artisanal ceramic tableware on natural limestone representing Sophie Conran homeware',
    duration: 'Enterprise Rebuild',
    platformFrom: 'Magento',
    platformTo: 'Shopify',
    metrics: [
      { value: '100%', label: 'SEO URL Equity Preserved' },
      { value: 'Full', label: 'Customer & Order History' },
      { value: 'OS 2.0', label: 'Bespoke Storefront Build' },
    ],
    challenge:
      'Sophie Conran needed to move away from Magento maintenance overhead without losing the refined editorial presentation required for bespoke furniture, fabrics, and tableware—or sacrificing years of accumulated organic search authority.',
    solution: [
      'Crafted a custom Shopify theme honoring the brand’s tactile photography, fabric storytelling, and collection hierarchy.',
      'Executed an exhaustive 301 redirect matrix and structured schema migration to safeguard organic rankings.',
      'Migrated customer accounts, addresses, and historical order logs cleanly into the new Shopify environment.',
    ],
    outcome:
      'The brand transitioned off legacy Magento infrastructure onto an agile, editorial Shopify storefront with uninterrupted organic search visibility and streamlined merchandising.',
    technologies: ['Shopify OS 2.0', 'Magento Migration', '301 SEO Preservation', 'Custom Liquid Theme'],
  },
  {
    slug: 'xy-london',
    client: 'XY London',
    industry: 'Trend-Led Fashion Footwear',
    category: 'Migration',
    headline: 'Mobile-first fashion storefront rebuild and 60,000+ SKU migration from Magento to Shopify.',
    summary:
      'Transforming high-volume footwear merchandising with disciplined variant integrity, rapid mobile browsing, and protected search redirects.',
    image: xyLondonImg,
    imageAlt: 'Sculptural designer heels and leather boots on travertine blocks representing XY London',
    duration: 'Multi-Phase Migration',
    platformFrom: 'Magento',
    platformTo: 'Shopify',
    metrics: [
      { value: '60K+', label: 'Footwear SKUs Migrated' },
      { value: 'Mobile', label: 'First UX Architecture' },
      { value: '0', label: 'Broken Redirect Chains' },
    ],
    challenge:
      'Fast-moving fashion footwear generates thousands of size-and-color SKU combinations alongside heavy mobile traffic. XY London required a migration from Magento that preserved every size variant and redirect while significantly speeding up mobile collection discovery.',
    solution: [
      'Migrated 60,000+ footwear SKUs with strict parent-child size/color variant validation.',
      'Rebuilt collection filtering, quick-size selection, and lookbook templates around thumb-friendly mobile ergonomics.',
      'Implemented strict redirect mapping and performance-tuned media delivery to lift mobile responsiveness.',
    ],
    outcome:
      'XY London achieved a responsive, mobile-first shopping experience capable of handling rapid seasonal drops without Magento infrastructure bottlenecks.',
    technologies: ['Shopify', 'Magento Migration', 'Mobile-First UX', 'Variant Architecture', 'SEO Redirects'],
  },
  {
    slug: 'skull-shaver',
    client: 'Skull Shaver',
    industry: 'Consumer Grooming Hardware',
    category: 'CRO & Checkout',
    headline: 'Long-term Shopify Plus engineering partnership: Checkout Extensibility and conversion tuning.',
    summary:
      'Ongoing enterprise engineering across custom Shopify Plus checkout flows, workflow automation, third-party integrations, and continuous CRO.',
    image: skullShaverImg,
    imageAlt: 'Ergonomic matte black precision grooming hardware on basalt stone representing Skull Shaver',
    duration: 'Ongoing Partnership',
    platformTo: 'Shopify Plus',
    metrics: [
      { value: 'Plus', label: 'Checkout Extensibility' },
      { value: 'Automated', label: 'Post-Purchase Workflows' },
      { value: 'CRO', label: 'Continuous UX Tuning' },
    ],
    challenge:
      'As an international direct-to-consumer hardware brand, Skull Shaver needed continuous technical iteration—upgrading legacy checkout customizations, integrating marketing and fulfillment tools, and running controlled UX improvements without destabilizing high-volume campaigns.',
    solution: [
      'Engineered custom Shopify Plus Checkout Extensibility UI blocks and validation rules.',
      'Automated cross-system order and marketing integrations to eliminate manual operations overhead.',
      'Partnered continuously on site speed optimization, navigation clarity, and checkout conversion experiments.',
    ],
    outcome:
      'Skull Shaver operates on an upgrade-safe, high-converting Shopify Plus stack backed by responsive senior engineering support.',
    technologies: ['Shopify Plus', 'Checkout Extensibility', 'Shopify Functions', 'CRO Engineering', 'API Integrations'],
  },
  {
    slug: 'hessaire-products',
    client: 'Hessaire Products',
    industry: 'Industrial & Evaporative Cooling',
    category: 'UX & Catalog',
    headline: 'Structured parts catalog, variant architecture, and mega-menu UX for industrial cooling hardware.',
    summary:
      'Shopify storefront development and UX/UI overhaul making complex equipment models and replacement parts effortless to locate and purchase.',
    image: heroStudioImg,
    imageAlt: 'Architectural industrial engineering workspace representing Hessaire Products catalog system',
    duration: 'Storefront Build',
    platformTo: 'Shopify',
    metrics: [
      { value: 'Parts', label: 'Structured Variant Catalog' },
      { value: 'Custom', label: 'Mega Menu Architecture' },
      { value: 'UX/UI', label: 'Full Navigation Overhaul' },
    ],
    challenge:
      'Industrial equipment buyers and facility managers need immediate clarity on model capacities, accessories, and compatible replacement parts—without digging through cluttered menus.',
    solution: [
      'Designed an intuitive multi-tier mega menu separating core cooling units, parts, and application guides.',
      'Structured product templates with clear variant selectors, specification tables, and accessory cross-links.',
      'Refined visual hierarchy and mobile responsiveness across technical product listings.',
    ],
    outcome:
      'Hessaire Products gained a clean, authoritative Shopify storefront where both commercial buyers and homeowners locate exact equipment and replacement parts rapidly.',
    technologies: ['Shopify', 'Custom UI/UX', 'Mega Menu Architecture', 'Catalog Modeling'],
  },
];

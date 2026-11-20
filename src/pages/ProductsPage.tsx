import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { PRODUCTS } from '@/src/data/products';
import { COMPANY } from '@/src/data/company';
import { PageHeader, Reveal } from '@/src/components/MotionPrimitives';
import { ProductPreviewStudio } from '@/src/components/ProductPreviewStudio';

const PLATFORM_SUITES = [
  {
    slug: 'shopify-apps',
    title: 'Shopify Apps',
    count: '30+ Apps Built',
    description:
      'Public and private Shopify OS 2.0 & Shopify Plus applications under the ESTS suite—spanning B2B price locks, product bundling, Zoho Books sync, WhatsApp campaigns, and CallToOrder.',
    countInCatalog: PRODUCTS.filter((p) => p.platform === 'shopify').length,
  },
  {
    slug: 'magento-extensions',
    title: 'Magento 2 Extensions',
    count: '35+ Extensions',
    description:
      'Modular Adobe Commerce and Magento 2 extensions built with clean DI architecture for instant checkout, dynamic configurables, OAuth 2.0 UPS shipping, and admin operations.',
    countInCatalog: PRODUCTS.filter((p) => p.platform === 'magento').length,
  },
  {
    slug: 'wordpress-plugins',
    title: 'WordPress & WooCommerce Plugins',
    count: 'Custom & Commercial',
    description:
      'Lightweight, HPOS-ready WooCommerce ERP connectors, B2B RFQ workflows, and headless WordPress Next.js preview bridges free from third-party bloat.',
    countInCatalog: PRODUCTS.filter((p) => p.platform === 'wordpress').length,
  },
];

export function ProductsPage() {
  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Digital Products' }]}
        title="Commercial Shopify Apps, Magento Extensions & WordPress Plugins"
        subtitle="Our product division engineers ready-to-install commerce software trusted by merchants worldwide—distinct from our custom agency engineering services."
        rightSlot={
          <a
            href={COMPANY.contact.shopifyPartnerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Shopify App Store Partner</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>
        }
      />

      {/* Platform Suites Directory */}
      <section className="bg-[#F9F9F7] py-20 lg:py-24 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214]">
              Explore by Platform Ecosystem
            </h2>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PLATFORM_SUITES.map((suite, idx) => (
              <Reveal key={suite.slug} delay={idx * 0.06}>
                <Link
                  to={`/products/${suite.slug}`}
                  className="group flex flex-col justify-between h-full bg-white border border-[#E4E4DF] rounded-2xl p-8 hover:border-[#111214] transition-colors"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono text-[#52555E]">
                      <span>0{idx + 1}.</span>
                      <span>{suite.count}</span>
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#111214] group-hover:text-[#1D4ED8] transition-colors">
                      {suite.title}
                    </h3>
                    <p className="text-sm sm:text-base text-[#52555E] leading-relaxed">
                      {suite.description}
                    </p>
                  </div>
                  <div className="mt-8 pt-5 border-t border-[#E4E4DF] flex items-center justify-between text-sm font-semibold text-[#111214] group-hover:text-[#1D4ED8]">
                    <span>Browse {suite.title}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Product Preview Studio */}
      <section className="bg-[#F9F9F7] py-20 lg:py-28">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="mb-12 max-w-2xl">
            <p className="text-sm font-medium text-[#1D4ED8] mb-2">Interactive Gallery</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold text-[#111214] tracking-tight">
              Test storefront product behavior before installing.
            </h2>
          </Reveal>
          <ProductPreviewStudio />
        </div>
      </section>
    </div>
  );
}

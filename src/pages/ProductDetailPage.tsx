import { Link, useParams } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { PRODUCTS, ProductPlatform } from '@/src/data/products';
import { PageHeader, Reveal } from '@/src/components/MotionPrimitives';
import { ProductPreviewStudio } from '@/src/components/ProductPreviewStudio';

const ROUTE_TO_PLATFORM: Record<string, { label: string; route: string }> = {
  shopify: { label: 'Shopify Apps', route: '/products/shopify-apps' },
  magento: { label: 'Magento Extensions', route: '/products/magento-extensions' },
  wordpress: { label: 'WordPress Plugins', route: '/products/wordpress-plugins' },
};

export function ProductDetailPage({ platform }: { platform: ProductPlatform }) {
  const { slug } = useParams<{ slug: string }>();
  const product =
    PRODUCTS.find((p) => p.slug === slug && p.platform === platform) ||
    PRODUCTS.find((p) => p.platform === platform) ||
    PRODUCTS[0];

  const parentMeta = ROUTE_TO_PLATFORM[product.platform];
  const isExternalMarketplace = product.marketplaceUrl.startsWith('http');
  const relatedProducts = PRODUCTS.filter(
    (p) => p.platform === product.platform && p.slug !== product.slug
  ).slice(0, 3);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: parentMeta.label, to: parentMeta.route },
          { label: product.name },
        ]}
        title={product.name}
        subtitle={product.tagline}
        rightSlot={
          isExternalMarketplace ? (
            <a
              href={product.marketplaceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>{product.marketplaceLabel}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          ) : (
            <Link
              to={product.marketplaceUrl}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>{product.marketplaceLabel}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )
        }
      />

      <section className="bg-[#F9F9F7] py-16 lg:py-24 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Overview, Features & Benefits */}
          <div className="lg:col-span-7 space-y-10">
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214]">
                Product Architecture & Overview
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#52555E] leading-relaxed">
                {product.description}
              </p>
            </Reveal>

            <Reveal delay={0.06} className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-[#111214]">
                Key Features
              </h3>
              <ul className="divide-y divide-[#E4E4DF] border-t border-b border-[#E4E4DF]">
                {product.features.map((feat) => (
                  <li key={feat} className="py-4 flex items-start gap-3 text-base text-[#111214]">
                    <Check className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1} className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-[#111214]">
                Merchant Benefits
              </h3>
              <ul className="space-y-3">
                {product.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 text-base text-[#52555E]">
                    <span className="font-mono text-xs text-[#1D4ED8] pt-1.5" aria-hidden="true">
                      →
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          {/* Right Specifications Panel */}
          <div className="lg:col-span-5">
            <Reveal delay={0.08} className="bg-white border border-[#E4E4DF] rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24">
              <h3 className="font-display text-xl font-semibold text-[#111214]">
                Specifications & Compatibility
              </h3>

              <dl className="divide-y divide-[#E4E4DF] text-sm">
                <div className="py-3.5 flex justify-between gap-4">
                  <dt className="text-[#52555E]">Platform</dt>
                  <dd className="font-medium text-[#111214] text-right">{product.platformLabel}</dd>
                </div>
                <div className="py-3.5 flex justify-between gap-4">
                  <dt className="text-[#52555E]">Category</dt>
                  <dd className="font-medium text-[#111214] text-right">{product.category}</dd>
                </div>
                <div className="py-3.5 flex justify-between gap-4">
                  <dt className="text-[#52555E]">Pricing</dt>
                  <dd className="font-medium text-[#111214] text-right">{product.pricingModel}</dd>
                </div>
                <div className="py-3.5 space-y-2">
                  <dt className="text-[#52555E]">Supported Environments</dt>
                  <dd className="flex flex-wrap gap-x-2.5 gap-y-1 font-medium text-[#111214]">
                    {product.compatibility.map((c, idx) => (
                      <span key={c} className="inline-flex items-center gap-2.5">
                        {idx > 0 && <span className="text-[#9EA3AE]" aria-hidden="true">·</span>}
                        <span>{c}</span>
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="pt-2 space-y-3">
                {isExternalMarketplace ? (
                  <a
                    href={product.marketplaceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                  >
                    <span>{product.marketplaceLabel}</span>
                    <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                  </a>
                ) : (
                  <Link
                    to={product.marketplaceUrl}
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                  >
                    <span>{product.marketplaceLabel}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                )}
                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#111214] bg-[#F9F9F7] hover:bg-[#E4E4DF]/60 border border-[#E4E4DF] rounded-lg transition-colors"
                >
                  <span>Request Custom Feature Adaptation</span>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Interactive Demo Sandbox */}
      {product.interactivePreviewType && (
        <section className="bg-white py-20 border-b border-[#E4E4DF]">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-medium text-[#1D4ED8] mb-2">Live Sandbox</p>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214]">
                Explore the Interactive Product Preview Studio
              </h2>
            </div>
            <ProductPreviewStudio />
          </div>
        </section>
      )}

      {/* Related Products */}
      <section className="bg-[#F9F9F7] py-20">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-10">
            <h2 className="font-display text-2xl font-semibold text-[#111214]">
              More in {parentMeta.label}
            </h2>
            <Link
              to={parentMeta.route}
              className="text-sm font-medium text-[#1D4ED8] hover:text-[#111214] transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((item) => (
              <Link
                key={item.slug}
                to={`${parentMeta.route}/${item.slug}`}
                className="bg-white border border-[#E4E4DF] rounded-2xl p-6 hover:border-[#111214] transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs text-[#52555E] mb-1.5">{item.category}</div>
                  <h3 className="font-display text-lg font-semibold text-[#111214]">
                    {item.name}
                  </h3>
                  <p className="text-sm text-[#52555E] mt-2 leading-relaxed">{item.tagline}</p>
                </div>
                <div className="mt-5 pt-4 border-t border-[#E4E4DF] text-xs font-semibold text-[#111214] flex items-center gap-1.5">
                  <span>Inspect Product</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

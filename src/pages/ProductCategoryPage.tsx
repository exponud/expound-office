import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { PRODUCTS, ProductPlatform } from '@/src/data/products';
import { PageHeader, Reveal } from '@/src/components/MotionPrimitives';

interface ProductCategoryPageProps {
  platform: ProductPlatform;
}

const META_BY_PLATFORM: Record<
  ProductPlatform,
  {
    routeSegment: string;
    title: string;
    subtitle: string;
    ctaLabel: string;
    ctaHref: string;
    external?: boolean;
  }
> = {
  shopify: {
    routeSegment: 'shopify-apps',
    title: 'Shopify Apps by Expound Coderz (ESTS)',
    subtitle:
      'Over 30 Shopify-approved public and private applications engineered with App Bridge, Theme App Extensions, and Shopify Functions for modern merchants.',
    ctaLabel: 'Visit Shopify Partner Profile',
    ctaHref: 'https://apps.shopify.com/partners/expound-coderz',
    external: true,
  },
  magento: {
    routeSegment: 'magento-extensions',
    title: 'Magento 2 & Adobe Commerce Extensions',
    subtitle:
      'Over 35 production-hardened Magento 2 modules built with strict dependency injection, Hyvä & Luma compatibility, and zero core overrides.',
    ctaLabel: 'Request Custom Module Build',
    ctaHref: '/contact',
  },
  wordpress: {
    routeSegment: 'wordpress-plugins',
    title: 'WordPress & WooCommerce Plugins',
    subtitle:
      'Focused, performance-safe WordPress plugins and WooCommerce ERP connectors engineered for HPOS order storage and headless Next.js deployments.',
    ctaLabel: 'Request Custom Plugin',
    ctaHref: '/contact',
  },
};

export function ProductCategoryPage({ platform }: ProductCategoryPageProps) {
  const meta = META_BY_PLATFORM[platform];
  const platformProducts = PRODUCTS.filter((p) => p.platform === platform);
  const categories = ['All', ...Array.from(new Set(platformProducts.map((p) => p.category)))];
  const [selectedCategory, setSelectedCategory] = useState('All');

  const visibleProducts =
    selectedCategory === 'All'
      ? platformProducts
      : platformProducts.filter((p) => p.category === selectedCategory);

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Products', to: '/products' },
          { label: meta.title.split(' by ')[0] },
        ]}
        title={meta.title}
        subtitle={meta.subtitle}
        rightSlot={
          meta.external ? (
            <a
              href={meta.ctaHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>{meta.ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          ) : (
            <Link
              to={meta.ctaHref}
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
            >
              <span>{meta.ctaLabel}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          )
        }
      />

      <section className="bg-[#F9F9F7] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          {/* Category Filter + Platform Switcher */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-10 border-b border-[#E4E4DF]">
            <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-[#E4E4DF] rounded-xl">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-[#111214] text-white'
                      : 'text-[#52555E] hover:text-[#111214]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 text-sm font-medium text-[#52555E]">
              <Link
                to="/products/shopify-apps"
                className={platform === 'shopify' ? 'text-[#111214]' : 'hover:text-[#111214]'}
              >
                Shopify
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                to="/products/magento-extensions"
                className={platform === 'magento' ? 'text-[#111214]' : 'hover:text-[#111214]'}
              >
                Magento
              </Link>
              <span aria-hidden="true">/</span>
              <Link
                to="/products/wordpress-plugins"
                className={platform === 'wordpress' ? 'text-[#111214]' : 'hover:text-[#111214]'}
              >
                WordPress
              </Link>
            </div>
          </div>

          {/* Product Editorial Rows */}
          <div className="divide-y divide-[#E4E4DF]">
            {visibleProducts.map((product, idx) => (
              <Reveal key={product.slug} delay={idx * 0.04} y={12}>
                <div className="py-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-3">
                    <div className="text-xs text-[#52555E]">
                      <span>{product.platformLabel}</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{product.category}</span>
                    </div>
                    <h2 className="font-display text-2xl font-semibold text-[#111214]">
                      <Link
                        to={`/products/${meta.routeSegment}/${product.slug}`}
                        className="hover:text-[#1D4ED8] transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h2>
                    <p className="text-sm sm:text-base text-[#52555E] leading-relaxed">
                      {product.tagline}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-5">
                      <Link
                        to={`/products/${meta.routeSegment}/${product.slug}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:text-[#111214] transition-colors"
                      >
                        <span>Full Product Page</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                      <span className="text-xs text-[#52555E]">{product.pricingModel}</span>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-white border border-[#E4E4DF] rounded-2xl p-6 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {product.features.slice(0, 4).map((feat) => (
                        <div key={feat} className="flex items-start gap-2.5 text-sm text-[#52555E]">
                          <Check
                            className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-3 border-t border-[#E4E4DF] flex flex-wrap items-center justify-between gap-3 text-xs text-[#52555E]">
                      <span>Compatible: {product.compatibility.join(' · ')}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

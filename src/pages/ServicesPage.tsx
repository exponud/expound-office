import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { SERVICES } from '@/src/data/services';
import { PageHeader, Reveal } from '@/src/components/MotionPrimitives';

type CategoryFilter = 'All' | 'Commerce Platforms' | 'Migration & Growth' | 'Engineering & AI';

export function ServicesPage() {
  const [filter, setFilter] = useState<CategoryFilter>('All');

  const filtered =
    filter === 'All' ? SERVICES : SERVICES.filter((s) => s.category === filter);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Services' }]}
        title="Custom eCommerce & Software Development Services"
        subtitle="Dedicated engineering across Shopify Plus, Adobe Commerce, WordPress, and custom Laravel/React/Node.js applications—kept cleanly separate from our off-the-shelf digital products."
        rightSlot={
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#1D4ED8] hover:text-[#111214] transition-colors whitespace-nowrap"
          >
            <span>Looking for ready-made Apps & Plugins?</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        }
      />

      {/* Interactive Category Filter */}
      <section className="bg-[#F9F9F7] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-[#E4E4DF]">
            <div
              role="group"
              aria-label="Filter services by discipline"
              className="flex flex-wrap gap-1.5 p-1 bg-white border border-[#E4E4DF] rounded-xl"
            >
              {(['All', 'Commerce Platforms', 'Migration & Growth', 'Engineering & AI'] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    className={`px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                      filter === cat
                        ? 'bg-[#111214] text-white'
                        : 'text-[#52555E] hover:text-[#111214]'
                    }`}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>
            <div className="text-xs font-mono text-[#52555E] tabular-nums">
              {filtered.length} Service Disciplines
            </div>
          </div>

          <div className="divide-y divide-[#E4E4DF]">
            {filtered.map((service, idx) => (
              <Reveal key={service.slug} delay={idx * 0.04} y={14}>
                <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  <div className="lg:col-span-5 space-y-3">
                    <div className="flex items-center gap-2 text-xs text-[#52555E]">
                      <span className="font-mono tabular-nums">{service.index}.</span>
                      <span aria-hidden="true">·</span>
                      <span>{service.category}</span>
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214] tracking-tight">
                      {service.title}
                    </h2>
                    <p className="text-sm text-[#52555E] leading-relaxed">{service.idealFor}</p>
                    <div className="pt-2">
                      <Link
                        to={`/services/${service.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#1D4ED8] hover:text-[#111214] transition-colors"
                      >
                        <span>Explore architecture & deliverables</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>

                  <div className="lg:col-span-7 bg-white border border-[#E4E4DF] rounded-2xl p-6 sm:p-8 space-y-6">
                    <p className="text-base text-[#111214] leading-relaxed">{service.summary}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 border-t border-[#E4E4DF]">
                      {service.capabilities.slice(0, 4).map((cap) => (
                        <div key={cap} className="flex items-start gap-2.5 text-sm text-[#52555E]">
                          <Check
                            className="w-4 h-4 text-[#1D4ED8] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{cap}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono text-[#52555E] pt-2">
                      {service.techStack.map((tech, tIdx) => (
                        <span key={tech} className="inline-flex items-center gap-3">
                          {tIdx > 0 && <span aria-hidden="true">/</span>}
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* TechTime & Engagement Models Band */}
      <section className="bg-[#0B0C0E] text-white py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8 space-y-4">
            <p className="text-sm font-medium text-[#60A5FA]">Flexible Engineering Capacity</p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight">
              Need ongoing engineering hours or scoped TechTime blocks?
            </h2>
            <p className="text-base text-[#A5AAB5] max-w-2xl leading-relaxed">
              Alongside fixed-scope builds and migrations, Expound Coderz offers pre-scoped
              TechTime development hours for performance tuning, bug resolution, and API
              integrations.
            </p>
          </div>
          <div className="lg:col-span-4 lg:flex lg:justify-end">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-[#111214] bg-white hover:bg-[#60A5FA] hover:text-white rounded-lg transition-colors whitespace-nowrap"
            >
              <span>Discuss Engagement</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { CASE_STUDIES } from '@/src/data/portfolio';
import {
  PageHeader,
  Reveal,
  ParallaxFrame,
  ResilientImage,
} from '@/src/components/MotionPrimitives';

type WorkFilter = 'All' | 'Migration' | 'Shopify Plus' | 'CRO & Checkout' | 'UX & Catalog';

export function WorkPage() {
  const [filter, setFilter] = useState<WorkFilter>('All');

  const filtered =
    filter === 'All' ? CASE_STUDIES : CASE_STUDIES.filter((c) => c.category === filter);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Selected Work' }]}
        title="Portfolio & Verified Case Studies"
        subtitle="Real enterprise migrations, Shopify Plus storefronts, and conversion engineering delivered for global retail and hardware brands."
        dark
      />

      <section className="bg-[#F9F9F7] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-[#E4E4DF]">
            <div
              role="group"
              aria-label="Filter case studies by category"
              className="flex flex-wrap gap-1.5 p-1 bg-white border border-[#E4E4DF] rounded-xl"
            >
              {(['All', 'Migration', 'Shopify Plus', 'CRO & Checkout', 'UX & Catalog'] as const).map(
                (cat) => {
                  const active = filter === cat;
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFilter(cat)}
                      className="relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0"
                    >
                      {active && (
                        <motion.span
                          layoutId="work-filter-pill"
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 bg-[#111214] rounded-lg"
                        />
                      )}
                      <span
                        className={`relative z-10 transition-colors ${
                          active ? 'text-white' : 'text-[#52555E] hover:text-[#111214]'
                        }`}
                      >
                        {cat}
                      </span>
                    </button>
                  );
                }
              )}
            </div>
            <div className="text-xs font-mono text-[#52555E] tabular-nums">
              {filtered.length} Featured Case Studies
            </div>
          </div>

          {/* Large Editorial Case Study Rows with Parallax Image Framing */}
          <div className="divide-y divide-[#E4E4DF]">
            {filtered.map((project, idx) => (
              <Reveal key={project.slug} delay={idx * 0.05} y={16}>
                <Link
                  to={`/work/${project.slug}`}
                  className="group py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  <div className={`lg:col-span-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <ParallaxFrame
                      offset={18}
                      className="aspect-[4/3] rounded-2xl border border-[#E4E4DF] bg-[#14161A]"
                    >
                      <ResilientImage
                        src={project.image}
                        alt={project.imageAlt}
                        fallbackTitle={project.client}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      />
                    </ParallaxFrame>
                  </div>

                  <div className={`lg:col-span-6 space-y-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#52555E]">
                      <span>{project.client}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.industry}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.category}</span>
                    </div>

                    <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214] leading-snug group-hover:text-[#1D4ED8] transition-colors">
                      {project.headline}
                    </h2>

                    <p className="text-base text-[#52555E] leading-relaxed">{project.summary}</p>

                    <div className="pt-4 border-t border-[#E4E4DF] grid grid-cols-2 sm:grid-cols-3 gap-5">
                      {project.metrics.slice(0, 3).map((m) => (
                        <div key={m.label}>
                          <div className="font-mono text-lg font-semibold text-[#111214] tabular-nums">
                            {m.value}
                          </div>
                          <div className="text-xs text-[#52555E]">{m.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 inline-flex items-center gap-2 text-sm font-semibold text-[#111214] group-hover:text-[#1D4ED8]">
                      <span>Read Case Study</span>
                      <ArrowRight
                        className="w-4 h-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

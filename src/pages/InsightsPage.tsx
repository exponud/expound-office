import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { INSIGHTS } from '@/src/data/insights';
import { PageHeader, Reveal } from '@/src/components/MotionPrimitives';

type InsightCategory = 'All' | 'Shopify Plus' | 'Migrations' | 'Magento & Hyvä' | 'Architecture & AI';

export function InsightsPage() {
  const [filter, setFilter] = useState<InsightCategory>('All');
  const filtered =
    filter === 'All' ? INSIGHTS : INSIGHTS.filter((a) => a.category === filter);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: 'Home', to: '/' }, { label: 'Engineering Insights' }]}
        title="Engineering Notes & Commerce Architecture Guides"
        subtitle="Technical perspectives on zero-downtime platform migrations, Shopify Checkout Extensibility, Hyvä for Magento 2, and practical AI & ERP workflows."
      />

      <section className="bg-[#F9F9F7] py-16 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-10 border-b border-[#E4E4DF]">
            <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-[#E4E4DF] rounded-xl">
              {(
                ['All', 'Migrations', 'Shopify Plus', 'Magento & Hyvä', 'Architecture & AI'] as const
              ).map((cat) => (
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
              ))}
            </div>
            <span className="text-xs font-mono text-[#52555E] tabular-nums">
              {filtered.length} Articles
            </span>
          </div>

          <div className="divide-y divide-[#E4E4DF]">
            {filtered.map((article, idx) => (
              <Reveal key={article.slug} delay={idx * 0.05} y={12}>
                <Link
                  to={`/insights/${article.slug}`}
                  className="group py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-white/70 px-3 -mx-3 rounded-xl transition-colors"
                >
                  <div className="lg:col-span-3 text-xs text-[#52555E] space-y-1 pt-1">
                    <div className="font-medium text-[#1D4ED8]">{article.category}</div>
                    <div>
                      {article.publishedDate} · {article.readTime}
                    </div>
                  </div>
                  <div className="lg:col-span-7 space-y-2.5">
                    <h2 className="font-display text-2xl font-semibold text-[#111214] group-hover:text-[#1D4ED8] transition-colors leading-snug">
                      {article.title}
                    </h2>
                    <p className="text-sm sm:text-base text-[#52555E] leading-relaxed">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="lg:col-span-2 flex lg:justify-end items-center gap-1.5 text-sm font-semibold text-[#111214] group-hover:text-[#1D4ED8] pt-1">
                    <span>Read</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
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

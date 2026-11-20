import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { INSIGHTS } from '@/src/data/insights';
import { PageHeader } from '@/src/components/MotionPrimitives';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = INSIGHTS.find((a) => a.slug === slug) || INSIGHTS[0];

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Insights', to: '/insights' },
          { label: article.category },
        ]}
        title={article.title}
        subtitle={article.excerpt}
        rightSlot={
          <div className="text-left lg:text-right text-sm text-[#52555E] space-y-1">
            <div className="font-medium text-[#111214]">{article.author}</div>
            <div>{article.authorRole}</div>
            <div className="text-xs">
              {article.publishedDate} · {article.readTime}
            </div>
          </div>
        }
      />

      <article className="bg-[#F9F9F7] py-16 lg:py-24">
        <div className="max-w-[780px] mx-auto px-6 space-y-12">
          {article.sections.map((sec) => (
            <section key={sec.heading} className="space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214]">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p) => (
                <p key={p} className="text-base sm:text-lg text-[#52555E] leading-relaxed">
                  {p}
                </p>
              ))}
              {sec.bullets && (
                <ul className="space-y-3 pt-2 border-t border-[#E4E4DF]">
                  {sec.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-base text-[#111214]">
                      <span className="font-mono text-xs text-[#1D4ED8] pt-1.5" aria-hidden="true">
                        →
                      </span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}

          <div className="bg-white border border-[#E4E4DF] rounded-2xl p-6 sm:p-8 space-y-2">
            <div className="text-xs font-medium text-[#1D4ED8]">Engineering Takeaway</div>
            <p className="text-base font-medium text-[#111214] leading-relaxed">
              {article.takeaway}
            </p>
          </div>

          <div className="pt-8 border-t border-[#E4E4DF] flex flex-wrap items-center justify-between gap-4">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#52555E] hover:text-[#111214]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>All Engineering Insights</span>
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors"
            >
              <span>Discuss Your Architecture</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

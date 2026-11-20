import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';
import { SERVICES } from '@/src/data/services';
import { CASE_STUDIES } from '@/src/data/portfolio';
import { PageHeader, Reveal, ResilientImage } from '@/src/components/MotionPrimitives';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug) || SERVICES[0];
  const relatedCases = CASE_STUDIES.filter((c) => service.relatedCaseSlugs.includes(c.slug));

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Services', to: '/services' },
          { label: service.shortTitle },
        ]}
        title={service.title}
        subtitle={service.tagline}
        rightSlot={
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap"
          >
            <span>Discuss {service.shortTitle} Scope</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        }
      />

      <section className="bg-[#F9F9F7] py-16 lg:py-24 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 space-y-8">
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214]">
                Engineering Approach
              </h2>
              <p className="mt-4 text-base sm:text-lg text-[#52555E] leading-relaxed">
                {service.summary}
              </p>
            </Reveal>

            <Reveal delay={0.08} className="space-y-4">
              <h3 className="font-display text-xl font-semibold text-[#111214]">
                Core Capabilities
              </h3>
              <ul className="divide-y divide-[#E4E4DF] border-t border-b border-[#E4E4DF]">
                {service.capabilities.map((cap) => (
                  <li key={cap} className="py-4 flex items-start gap-3 text-base text-[#111214]">
                    <Check className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <Reveal delay={0.1} className="bg-white border border-[#E4E4DF] rounded-2xl p-6 sm:p-8 space-y-6">
              <h3 className="font-display text-xl font-semibold text-[#111214]">
                Architecture Pillars
              </h3>
              <div className="space-y-5">
                {service.architectureHighlights.map((item) => (
                  <div key={item.label} className="pb-5 border-b border-[#E4E4DF] last:border-b-0 last:pb-0">
                    <div className="font-display text-base font-semibold text-[#111214]">
                      {item.label}
                    </div>
                    <p className="mt-1 text-sm text-[#52555E] leading-relaxed">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-[#E4E4DF]">
                <div className="text-xs font-medium text-[#52555E] mb-2">Primary Stack</div>
                <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs font-mono text-[#111214]">
                  {service.techStack.map((tech, idx) => (
                    <span key={tech} className="inline-flex items-center gap-3">
                      {idx > 0 && <span className="text-[#9EA3AE]" aria-hidden="true">/</span>}
                      <span>{tech}</span>
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {relatedCases.length > 0 && (
        <section className="bg-white py-20 lg:py-24">
          <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-sm font-medium text-[#1D4ED8] mb-2">Verified Proof</p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214]">
                  Related Client Implementations
                </h2>
              </div>
              <Link
                to="/work"
                className="text-sm font-medium text-[#111214] hover:text-[#1D4ED8] transition-colors"
              >
                All Case Studies
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedCases.map((project) => (
                <Link
                  key={project.slug}
                  to={`/work/${project.slug}`}
                  className="group block bg-[#F9F9F7] border border-[#E4E4DF] rounded-2xl overflow-hidden hover:border-[#111214]/40 transition-colors"
                >
                  <div className="aspect-[4/3] bg-[#14161A] overflow-hidden">
                    <ResilientImage
                      src={project.image}
                      alt={project.imageAlt}
                      fallbackTitle={project.client}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6 space-y-2">
                    <div className="text-xs text-[#52555E]">
                      {project.client} · {project.platformTo}
                    </div>
                    <h3 className="font-display text-lg font-semibold text-[#111214] group-hover:text-[#1D4ED8] transition-colors">
                      {project.headline}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { CASE_STUDIES } from '@/src/data/portfolio';
import { PageHeader, Reveal, ResilientImage } from '@/src/components/MotionPrimitives';

export function CaseStudyPage() {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = CASE_STUDIES.findIndex((c) => c.slug === slug);
  const project = currentIndex >= 0 ? CASE_STUDIES[currentIndex] : CASE_STUDIES[0];
  const nextProject = CASE_STUDIES[(Math.max(0, currentIndex) + 1) % CASE_STUDIES.length];

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'Selected Work', to: '/work' },
          { label: project.client },
        ]}
        title={project.headline}
        subtitle={project.summary}
        dark
        rightSlot={
          <div className="text-left lg:text-right space-y-1 text-sm text-[#A5AAB5]">
            <div className="text-white font-semibold">{project.client}</div>
            <div>{project.industry}</div>
            <div className="font-mono text-xs text-[#60A5FA]">
              {project.platformFrom ? `${project.platformFrom} → ${project.platformTo}` : project.platformTo}
            </div>
          </div>
        }
      />

      {/* Hero Visual & Metrics Strip */}
      <section className="bg-[#F9F9F7] pt-14 pb-20 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 space-y-12">
          <div className="aspect-[16/9] max-h-[580px] w-full rounded-2xl overflow-hidden border border-[#E4E4DF] bg-[#14161A]">
            <ResilientImage
              src={project.image}
              alt={project.imageAlt}
              fallbackTitle={project.client}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 py-8 border-y border-[#E4E4DF]">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-mono text-3xl sm:text-4xl font-semibold text-[#111214] tabular-nums">
                  {m.value}
                </div>
                <div className="text-sm text-[#52555E] mt-1">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Editorial Storytelling: Challenge -> Solution -> Outcome */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-4">
            <div className="lg:col-span-8 space-y-12">
              <Reveal>
                <p className="text-xs font-mono text-[#1D4ED8] mb-2">01. The Challenge</p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214] mb-4">
                  Technical Context & Constraints
                </h2>
                <p className="text-base sm:text-lg text-[#52555E] leading-relaxed">
                  {project.challenge}
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <p className="text-xs font-mono text-[#1D4ED8] mb-2">02. Engineering Solution</p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214] mb-5">
                  Architecture & Execution
                </h2>
                <ul className="divide-y divide-[#E4E4DF] border-t border-b border-[#E4E4DF]">
                  {project.solution.map((step) => (
                    <li key={step} className="py-4 flex items-start gap-3 text-base text-[#111214]">
                      <Check
                        className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.1}>
                <p className="text-xs font-mono text-[#1D4ED8] mb-2">03. Verified Outcome</p>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214] mb-4">
                  Production Result
                </h2>
                <p className="text-base sm:text-lg text-[#52555E] leading-relaxed">
                  {project.outcome}
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-4">
              <div className="bg-white border border-[#E4E4DF] rounded-2xl p-6 sm:p-8 space-y-6 sticky top-24">
                <h3 className="font-display text-lg font-semibold text-[#111214]">
                  Project Metadata
                </h3>
                <dl className="divide-y divide-[#E4E4DF] text-sm">
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#52555E]">Client</dt>
                    <dd className="font-medium text-[#111214]">{project.client}</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#52555E]">Engagement</dt>
                    <dd className="font-medium text-[#111214]">{project.duration}</dd>
                  </div>
                  <div className="py-3 flex justify-between gap-4">
                    <dt className="text-[#52555E]">Target Platform</dt>
                    <dd className="font-medium text-[#111214]">{project.platformTo}</dd>
                  </div>
                  <div className="py-3 space-y-2">
                    <dt className="text-[#52555E]">Technologies Applied</dt>
                    <dd className="flex flex-wrap gap-x-2.5 gap-y-1 font-mono text-xs text-[#111214]">
                      {project.technologies.map((tech, idx) => (
                        <span key={tech} className="inline-flex items-center gap-2.5">
                          {idx > 0 && <span className="text-[#9EA3AE]" aria-hidden="true">/</span>}
                          <span>{tech}</span>
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <Link
                  to="/contact"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors"
                >
                  <span>Discuss a Similar Build</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Case Study Footer Band */}
      <section className="bg-white py-16">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#52555E] hover:text-[#111214]"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            <span>Back to All Case Studies</span>
          </Link>
          <Link
            to={`/work/${nextProject.slug}`}
            className="group inline-flex items-center gap-3 text-right"
          >
            <div>
              <div className="text-xs text-[#52555E]">Next Case Study</div>
              <div className="font-display text-lg font-semibold text-[#111214] group-hover:text-[#1D4ED8] transition-colors">
                {nextProject.client}
              </div>
            </div>
            <ArrowRight
              className="w-5 h-5 text-[#111214] group-hover:text-[#1D4ED8] transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </div>
      </section>
    </div>
  );
}

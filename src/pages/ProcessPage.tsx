import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { COMPANY } from '@/src/data/company';
import { PageHeader, Reveal } from '@/src/components/MotionPrimitives';

export function ProcessPage() {
  const [activePhase, setActivePhase] = useState(0);
  const current = COMPANY.processPhases[activePhase];

  return (
    <div>
      <PageHeader
        breadcrumbs={[
          { label: 'Home', to: '/' },
          { label: 'About', to: '/about' },
          { label: 'Our Process' },
        ]}
        title="From Idea & Legacy Stack to Zero-Downtime Production"
        subtitle="A disciplined four-stage engineering cadence built around schema parity, automated QA gates, and predictable launches."
        dark
      />

      {/* Interactive Phase Selector ("From Idea to Innovation") */}
      <section className="bg-[#F9F9F7] py-20 lg:py-28 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Step Tabs */}
            <div className="lg:col-span-5 divide-y divide-[#E4E4DF] border-t border-b border-[#E4E4DF]">
              {COMPANY.processPhases.map((phase, idx) => {
                const selected = idx === activePhase;
                return (
                  <button
                    key={phase.step}
                    type="button"
                    onClick={() => setActivePhase(idx)}
                    aria-pressed={selected}
                    className={`w-full text-left py-6 px-4 transition-colors ${
                      selected ? 'bg-white' : 'hover:bg-white/60'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#52555E] mb-1">
                      <span className={selected ? 'text-[#1D4ED8]' : ''}>Phase {phase.step}</span>
                      <span>{phase.duration}</span>
                    </div>
                    <div className="font-display text-xl font-semibold text-[#111214]">
                      {phase.title}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Phase Blueprint */}
            <div className="lg:col-span-7 bg-white border border-[#E4E4DF] rounded-2xl p-8 lg:p-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.step}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-2 text-xs font-mono text-[#1D4ED8]">
                    <span>Phase {current.step}</span>
                    <span aria-hidden="true">/</span>
                    <span>{current.duration}</span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#111214]">
                    {current.title}
                  </h2>
                  <p className="text-base sm:text-lg text-[#52555E] leading-relaxed">
                    {current.summary}
                  </p>

                  <div className="pt-4 border-t border-[#E4E4DF] space-y-3">
                    <div className="text-xs font-medium text-[#52555E]">Key Deliverables</div>
                    <ul className="space-y-3">
                      {current.deliverables.map((del) => (
                        <li key={del} className="flex items-start gap-3 text-base text-[#111214]">
                          <Check
                            className="w-5 h-5 text-[#1D4ED8] shrink-0 mt-0.5"
                            aria-hidden="true"
                          />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* Full Process Timeline Overview */}
      <section className="bg-white py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <h2 className="font-display text-3xl font-semibold text-[#111214]">
                Ready to review your technical roadmap?
              </h2>
              <p className="text-base text-[#52555E]">
                Share your platform architecture and timeline for a structured discovery session.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <span>Book Technical Discovery</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

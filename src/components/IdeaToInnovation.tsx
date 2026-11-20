import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  AnimatePresence,
  useInView,
  useScroll,
  useTransform,
} from 'motion/react';
import { ArrowRight, Check } from 'lucide-react';
import { COMPANY } from '@/src/data/company';

function PhaseStepCard({
  phase,
  index,
  isActive,
  onActivate,
}: {
  phase: (typeof COMPANY.processPhases)[number];
  index: number;
  isActive: boolean;
  onActivate: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: '-35% 0px -35% 0px' });

  useEffect(() => {
    if (inView) onActivate();
  }, [inView, onActivate]);

  return (
    <motion.div
      ref={ref}
      onClick={onActivate}
      onMouseEnter={onActivate}
      role="button"
      tabIndex={0}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onActivate();
        }
      }}
      className={`cursor-pointer rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
        isActive
          ? 'bg-white border-[#111214] shadow-sm'
          : 'bg-white/60 border-[#E4E4DF] opacity-80 hover:opacity-100'
      }`}
    >
      <div className="flex items-center justify-between gap-4 text-xs font-mono text-[#52555E] mb-3">
        <span className={isActive ? 'text-[#1D4ED8] font-semibold' : ''}>
          Phase {phase.step}
        </span>
        <span>{phase.duration}</span>
      </div>

      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#111214]">
        {phase.title}
      </h3>
      <p className="mt-3 text-sm sm:text-base text-[#52555E] leading-relaxed">
        {phase.summary}
      </p>

      <ul className="mt-5 pt-4 border-t border-[#E4E4DF] space-y-2.5">
        {phase.deliverables.map((del) => (
          <li key={del} className="flex items-start gap-2.5 text-sm text-[#111214]">
            <Check
              className={`w-4 h-4 shrink-0 mt-0.5 transition-colors ${
                isActive ? 'text-[#1D4ED8]' : 'text-[#9EA3AE]'
              }`}
              aria-hidden="true"
            />
            <span>{del}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-xs font-mono text-[#52555E] tabular-nums">
        Stage 0{index + 1} / 04
      </div>
    </motion.div>
  );
}

const STAGE_VISUALS = [
  {
    title: 'Schema & Redirect Blueprint',
    subtitle: 'Catalog Topology & Risk Audit',
    nodes: [
      { label: 'Legacy Catalog', detail: '100K+ SKUs Mapped' },
      { label: '301 Matrix', detail: '100% URL Parity' },
      { label: 'ERP Contract', detail: 'Zoho / QuickBooks Spec' },
    ],
    codeSnippet: [
      'audit.catalog({ configurableSKUs: true })',
      'map.redirects({ preserveCanonical: true })',
      'verify.erpHooks(["orders", "inventory"])',
    ],
  },
  {
    title: 'Full-Stack Storefront & UI',
    subtitle: 'Design System + Checkout Extensibility',
    nodes: [
      { label: 'Editorial UI', detail: 'OS 2.0 / Hyvä / Next.js' },
      { label: 'Checkout UI', detail: 'Sandboxed Functions' },
      { label: 'Core Web Vitals', detail: 'LCP & INP Tuned' },
    ],
    codeSnippet: [
      'theme.render({ designTokens: "editorial" })',
      'checkout.extend({ b2bPricing: true })',
      'assets.defer({ criticalCSS: inline })',
    ],
  },
  {
    title: 'Staged ETL & Parity QA',
    subtitle: 'Automated Validation Gates',
    nodes: [
      { label: 'Batch Import', detail: '200K+ Orders Synced' },
      { label: 'Delta Queue', detail: 'Zero Missed Orders' },
      { label: 'Load Stress', detail: 'Peak Traffic Verified' },
    ],
    codeSnippet: [
      'etl.migrate({ batchSize: 500, verifyParity: true })',
      'delta.capture({ window: "pre-cutover" })',
      'qa.assert({ skuCountDiff: 0 })',
    ],
  },
  {
    title: 'Zero-Downtime Launch',
    subtitle: 'War-Room Cutover & Iteration',
    nodes: [
      { label: 'DNS Cutover', detail: '0 min Downtime' },
      { label: 'Live Telemetry', detail: 'Webhook Health 100%' },
      { label: 'TechTime Ops', detail: 'Continuous CRO' },
    ],
    codeSnippet: [
      'launch.cutover({ downtimeTarget: "0m" })',
      'monitor.webhooks({ retryPolicy: "exponential" })',
      'optimize.cro({ sprint: "continuous" })',
    ],
  },
];

export function IdeaToInnovation() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start center', 'end center'],
  });
  const railHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  const activeVisual = STAGE_VISUALS[activeIndex] || STAGE_VISUALS[0];

  return (
    <section
      ref={sectionRef}
      id="idea-to-production"
      className="bg-[#F9F9F7] py-24 lg:py-32 border-b border-[#E4E4DF]"
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Sticky Pinned Architectural Stage */}
          <div className="lg:col-span-5 lg:sticky lg:top-24 space-y-6">
            <div>
              <p className="text-sm font-medium text-[#1D4ED8] mb-3">
                From Idea to Innovation
              </p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111214] leading-[1.12]">
                Design craft meets full-stack systems engineering.
              </h2>
              <p className="mt-4 text-base text-[#52555E] leading-relaxed">
                Scroll through each chapter on the right to watch the full-stack architecture
                canvas morph from discovery schema to zero-downtime production.
              </p>
            </div>

            {/* Morphing Live System Preview Box */}
            <div className="bg-[#0B0C0E] text-white border border-[#262930] rounded-2xl p-6 sm:p-7 space-y-6">
              {/* Interactive Stage Selector Bar */}
              <div className="grid grid-cols-4 gap-2">
                {COMPANY.processPhases.map((p, idx) => (
                  <button
                    key={p.step}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Jump to Phase ${p.step}`}
                    className="group text-left space-y-1.5"
                  >
                    <div className="h-1 rounded-full bg-[#262930] overflow-hidden">
                      <motion.div
                        className="h-full bg-[#60A5FA]"
                        animate={{ width: idx <= activeIndex ? '100%' : '0%' }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      />
                    </div>
                    <span
                      className={`block font-mono text-[11px] tabular-nums ${
                        idx === activeIndex ? 'text-[#60A5FA]' : 'text-[#717682]'
                      }`}
                    >
                      {p.step}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-5"
                >
                  <div>
                    <div className="text-xs font-mono text-[#60A5FA]">
                      {activeVisual.subtitle}
                    </div>
                    <div className="font-display text-xl font-semibold text-white mt-1">
                      {activeVisual.title}
                    </div>
                  </div>

                  {/* Animated Architecture Pipeline Nodes */}
                  <div className="space-y-2.5">
                    {activeVisual.nodes.map((node, nIdx) => (
                      <motion.div
                        key={node.label}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.26, delay: nIdx * 0.06 }}
                        className="flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[#14161A] border border-[#262930]"
                      >
                        <span className="text-xs font-medium text-white">{node.label}</span>
                        <span className="font-mono text-xs text-[#9EA3AE]">{node.detail}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Clean Execution Specification */}
                  <div className="bg-[#14161A] border border-[#262930] rounded-lg p-3.5 font-mono text-[11px] text-[#A5AAB5] space-y-1">
                    {activeVisual.codeSnippet.map((line) => (
                      <div key={line} className="truncate">
                        {line}
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="pt-2 border-t border-[#262930] flex items-center justify-between">
                <Link
                  to="/process"
                  className="inline-flex items-center gap-2 text-xs font-medium text-white hover:text-[#60A5FA] transition-colors"
                >
                  <span>Full Delivery Playbook</span>
                  <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Right Scrolling Engineering Chapters with Scroll-Driven Vertical Progress Spine */}
          <div className="lg:col-span-7 relative pl-6 sm:pl-8">
            <div
              aria-hidden="true"
              className="absolute left-0 top-2 bottom-2 w-[2px] bg-[#E4E4DF] rounded-full overflow-hidden"
            >
              <motion.div
                style={{ height: railHeight }}
                className="w-full bg-[#1D4ED8] origin-top"
              />
            </div>

            <div className="space-y-6">
              {COMPANY.processPhases.map((phase, idx) => (
                <PhaseStepCard
                  key={phase.step}
                  phase={phase}
                  index={idx}
                  isActive={activeIndex === idx}
                  onActivate={() => setActiveIndex(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

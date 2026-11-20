import { useRef, useState, useEffect, useCallback, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  useMotionValueEvent,
  useMotionValue,
  useMotionTemplate,
} from 'motion/react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { CASE_STUDIES, CaseStudy } from '@/src/data/portfolio';
import { ResilientImage, TiltCard } from '@/src/components/MotionPrimitives';

function ReelCard({
  project,
  index,
  isActive,
}: {
  project: CaseStudy;
  index: number;
  isActive: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const rect = cardRef.current.getBoundingClientRect();
    pointerX.set(((e.clientX - rect.left) / rect.width) * 100);
    pointerY.set(((e.clientY - rect.top) / rect.height) * 100);
  };

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${pointerX}% ${pointerY}%, rgba(29, 78, 216, 0.12), transparent 65%)`;

  return (
    <TiltCard
      maxTilt={3.5}
      className="w-[82vw] sm:w-[400px] lg:w-[460px] shrink-0 snap-center"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        animate={{
          scale: isActive ? 1 : 0.965,
          opacity: isActive ? 1 : 0.86,
        }}
        transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
        className={`group/card relative h-full rounded-2xl overflow-hidden bg-white border transition-colors duration-300 ${
          isActive ? 'border-[#111214]/60 shadow-lg' : 'border-[#E4E4DF] shadow-sm'
        }`}
      >
        {/* Pointer-tracking surface sheen */}
        <motion.div
          aria-hidden="true"
          style={{ background: spotlight }}
          className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300"
        />

        <Link to={`/work/${project.slug}`} className="group block h-full">
          <div className="aspect-[16/10] w-full overflow-hidden bg-[#14161A] relative">
            <ResilientImage
              src={project.image}
              alt={project.imageAlt}
              fallbackTitle={project.client}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]"
            />

            {/* Index watermark tag inside media corner (clean unboxed mono) */}
            <div className="absolute top-3.5 left-4 px-2.5 py-1 rounded-md bg-black/65 backdrop-blur-sm text-white font-mono text-[11px] tabular-nums">
              0{index + 1} / 0{CASE_STUDIES.length}
            </div>

            {/* Measured contrast scrim sliding in on hover */}
            <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex items-end justify-between p-5 text-white">
              <div>
                <div className="text-[11px] text-white/75">{project.platformTo}</div>
                <div className="text-sm font-semibold">Explore Case Study</div>
              </div>
              <span className="w-9 h-9 rounded-full bg-white text-[#111214] inline-flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </span>
            </div>
          </div>

          <div className="relative z-20 p-6 sm:p-7 space-y-3.5 bg-white">
            <div className="flex items-center justify-between gap-2 text-xs text-[#52555E]">
              <div className="flex items-center gap-2 truncate">
                <span className="font-semibold text-[#111214]">{project.client}</span>
                <span aria-hidden="true">·</span>
                <span className="truncate">{project.industry}</span>
              </div>
              <span className="font-mono text-[11px] text-[#1D4ED8] shrink-0">
                {project.category}
              </span>
            </div>

            <h3 className="font-display text-lg sm:text-xl font-semibold text-[#111214] leading-snug group-hover:text-[#1D4ED8] transition-colors line-clamp-2 min-h-[3.25rem]">
              {project.headline}
            </h3>

            <div className="pt-3.5 border-t border-[#E4E4DF] flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-4">
                {project.metrics.slice(0, 2).map((m) => (
                  <div key={m.label}>
                    <span className="font-mono font-semibold text-[#111214] tabular-nums">
                      {m.value}
                    </span>{' '}
                    <span className="text-[#52555E]">{m.label}</span>
                  </div>
                ))}
              </div>
              <ArrowRight
                className="w-4 h-4 shrink-0 text-[#52555E] group-hover:text-[#1D4ED8] transition-transform duration-200 group-hover:translate-x-1"
                aria-hidden="true"
              />
            </div>
          </div>
        </Link>
      </motion.div>
    </TiltCard>
  );
}

export function HorizontalWorkReel() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileScrollRef = useRef<HTMLDivElement>(null);

  const [maxTranslate, setMaxTranslate] = useState(1100);
  const [activeIndex, setActiveIndex] = useState(0);

  const measureTrack = useCallback(() => {
    if (!viewportRef.current || !trackRef.current) return;
    const vw = viewportRef.current.clientWidth;
    const tw = trackRef.current.scrollWidth;
    setMaxTranslate(Math.max(0, tw - vw + 48));
  }, []);

  useEffect(() => {
    measureTrack();
    const ro = new ResizeObserver(measureTrack);
    if (viewportRef.current) ro.observe(viewportRef.current);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener('resize', measureTrack);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureTrack);
    };
  }, [measureTrack]);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 28,
    mass: 0.4,
  });

  // Map vertical scroll runway [0.05..0.95] cleanly across exact measured horizontal width
  const x = useTransform(smoothProgress, [0.04, 0.96], [0, -maxTranslate]);

  // Kinetic velocity skew on fast scroll
  const progressVelocity = useVelocity(smoothProgress);
  const rawSkew = useTransform(progressVelocity, [-1.5, 0, 1.5], [2.4, 0, -2.4]);
  const skewX = useSpring(rawSkew, { stiffness: 180, damping: 24 });

  // Progress bar fill
  const barScaleX = useTransform(smoothProgress, [0.04, 0.96], [0, 1]);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const normalized = Math.min(1, Math.max(0, (latest - 0.04) / 0.92));
    const idx = Math.min(
      CASE_STUDIES.length - 1,
      Math.round(normalized * (CASE_STUDIES.length - 1))
    );
    setActiveIndex(idx);
  });

  const jumpToCard = (idx: number) => {
    const clamped = Math.max(0, Math.min(CASE_STUDIES.length - 1, idx));
    setActiveIndex(clamped);

    // Desktop pinned runway jump
    if (window.innerWidth >= 1024 && runwayRef.current) {
      const rect = runwayRef.current.getBoundingClientRect();
      const runwayTop = window.scrollY + rect.top;
      const scrollable = runwayRef.current.offsetHeight - window.innerHeight;
      const targetProgress = 0.04 + (clamped / (CASE_STUDIES.length - 1)) * 0.92;
      window.scrollTo({
        top: runwayTop + scrollable * targetProgress,
        behavior: 'smooth',
      });
      return;
    }

    // Mobile horizontal container jump
    if (mobileScrollRef.current) {
      const child = mobileScrollRef.current.children[clamped] as HTMLElement | undefined;
      child?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  };

  return (
    <div className="relative">
      {/* DESKTOP: True Sticky Pinned Horizontal Scroll Runway */}
      <div ref={runwayRef} className="hidden lg:block lg:h-[260vh] relative">
        <div
          ref={viewportRef}
          className="sticky top-18 h-[calc(100vh-4.5rem)] flex flex-col justify-center overflow-x-clip py-8"
        >
          {/* Pinned Header Controls & Live Progress */}
          <div className="max-w-[1280px] mx-auto w-full px-10 mb-7 space-y-4">
            <div className="flex items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-[#1D4ED8] font-semibold tabular-nums">
                  0{activeIndex + 1} / 0{CASE_STUDIES.length}
                </span>
                <span className="text-sm font-medium text-[#52555E]">
                  Horizontal Case Study Reel — Scroll down or select a client to glide
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  aria-label="Previous case study"
                  onClick={() => jumpToCard(activeIndex - 1)}
                  disabled={activeIndex === 0}
                  className="w-10 h-10 rounded-lg border border-[#E4E4DF] bg-white inline-flex items-center justify-center text-[#111214] hover:border-[#111214] disabled:opacity-35 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  aria-label="Next case study"
                  onClick={() => jumpToCard(activeIndex + 1)}
                  disabled={activeIndex === CASE_STUDIES.length - 1}
                  className="w-10 h-10 rounded-lg border border-[#E4E4DF] bg-white inline-flex items-center justify-center text-[#111214] hover:border-[#111214] disabled:opacity-35 transition-colors"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Interactive Brand Stepper + Scroll Progress Track */}
            <div className="flex items-center gap-3">
              <div className="flex flex-wrap gap-1.5 p-1 bg-white border border-[#E4E4DF] rounded-xl">
                {CASE_STUDIES.map((cs, idx) => {
                  const active = idx === activeIndex;
                  return (
                    <button
                      key={cs.slug}
                      type="button"
                      onClick={() => jumpToCard(idx)}
                      className="relative px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap"
                    >
                      {active && (
                        <motion.span
                          layoutId="reel-client-pill"
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 bg-[#111214] rounded-lg"
                        />
                      )}
                      <span
                        className={`relative z-10 transition-colors ${
                          active ? 'text-white' : 'text-[#52555E] hover:text-[#111214]'
                        }`}
                      >
                        {cs.client}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="flex-1 h-[2px] bg-[#E4E4DF] rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: barScaleX }}
                  className="h-full bg-[#1D4ED8] origin-left"
                />
              </div>
            </div>
          </div>

          {/* Gliding Horizontal Card Track with Velocity Skew */}
          <div className="w-full overflow-x-clip">
            <motion.div
              ref={trackRef}
              style={{ x, skewX }}
              className="flex gap-8 w-max pl-[max(2.5rem,calc((100vw-1280px)/2+2.5rem))] pr-16 py-2 will-change-transform"
            >
              {CASE_STUDIES.map((project, idx) => (
                <ReelCard
                  key={project.slug}
                  project={project}
                  index={idx}
                  isActive={idx === activeIndex}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>

      {/* MOBILE / TABLET: Touch-Friendly Snap Carousel + Arrow Controls */}
      <div className="lg:hidden space-y-5">
        <div className="px-6 flex items-center justify-between">
          <div className="text-xs font-medium text-[#52555E]">
            Swipe to explore all {CASE_STUDIES.length} builds
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Previous case study"
              onClick={() => jumpToCard(activeIndex - 1)}
              className="w-10 h-10 rounded-lg border border-[#E4E4DF] bg-white inline-flex items-center justify-center text-[#111214]"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next case study"
              onClick={() => jumpToCard(activeIndex + 1)}
              className="w-10 h-10 rounded-lg border border-[#E4E4DF] bg-white inline-flex items-center justify-center text-[#111214]"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div
          ref={mobileScrollRef}
          className="flex gap-5 overflow-x-auto snap-x snap-mandatory px-6 pb-4 scroll-smooth"
        >
          {CASE_STUDIES.map((project, idx) => (
            <ReelCard key={project.slug} project={project} index={idx} isActive />
          ))}
        </div>
      </div>
    </div>
  );
}

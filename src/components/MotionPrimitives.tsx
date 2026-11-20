import { useEffect, useRef, useState, ReactNode, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from 'motion/react';
import { Layers } from 'lucide-react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

export function Reveal({ children, className = '', delay = 0, y = 26 }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface MaskedTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

export function MaskedTextReveal({
  text,
  className = '',
  delay = 0,
  as = 'h1',
}: MaskedTextRevealProps) {
  const words = text.split(' ');
  const Tag = motion[as];

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, idx) => (
        <span
          key={`${word}-${idx}`}
          className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em] mr-[0.26em] last:mr-0"
        >
          <motion.span
            className="inline-block"
            initial={{ y: '115%', opacity: 0.15 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.68,
              delay: delay + idx * 0.04,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

interface ParallaxFrameProps {
  children: ReactNode;
  className?: string;
  offset?: number;
}

export function ParallaxFrame({
  children,
  className = '',
  offset = 34,
}: ParallaxFrameProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div style={{ y }} className="w-full h-full scale-[1.1] will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = '', maxTilt = 4.5 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const smoothX = useSpring(rotateX, { stiffness: 220, damping: 24 });
  const smoothY = useSpring(rotateY, { stiffness: 220, damping: 24 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateX.set(-py * maxTilt * 2);
    rotateY.set(px * maxTilt * 2);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: smoothX,
        rotateY: smoothY,
        transformPerspective: 1000,
      }}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 20, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 260, damping: 20, mass: 0.4 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    ) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function InteractiveSpotlight({ className = '' }: { className?: string }) {
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(35);
  const smoothX = useSpring(mouseX, { stiffness: 120, damping: 28 });
  const smoothY = useSpring(mouseY, { stiffness: 120, damping: 28 });

  useEffect(() => {
    const onMove = (e: globalThis.MouseEvent) => {
      if (window.matchMedia('(pointer: coarse)').matches) return;
      mouseX.set((e.clientX / window.innerWidth) * 100);
      mouseY.set((e.clientY / window.innerHeight) * 100);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [mouseX, mouseY]);

  const background = useMotionTemplate`radial-gradient(650px circle at ${smoothX}% ${smoothY}%, rgba(29, 78, 216, 0.075), transparent 65%)`;

  return (
    <motion.div
      aria-hidden="true"
      style={{ background }}
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}

export function KineticMarquee({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="w-full overflow-hidden border-y border-[#E4E4DF] bg-white py-4 select-none"
      aria-label="Core technologies and engineering capabilities"
    >
      <div
        className="flex w-max items-center gap-8 animate-marquee-glide will-change-transform"
        style={{ animationPlayState: paused ? 'paused' : 'running' }}
      >
        {[...items, ...items].map((item, idx) => (
          <div
            key={`${item}-${idx}`}
            className="flex items-center gap-8 text-sm font-medium text-[#52555E] whitespace-nowrap"
          >
            <span className="hover:text-[#111214] transition-colors">{item}</span>
            <span className="text-[#9EA3AE]" aria-hidden="true">
              /
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ScrollProgressLine() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 32,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-[#1D4ED8] origin-left z-[60] pointer-events-none"
    />
  );
}

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  animateAsYear?: boolean;
  className?: string;
}

export function AnimatedCounter({
  value,
  suffix = '',
  animateAsYear = false,
  className = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [displayValue, setDisplayValue] = useState(animateAsYear ? 2000 : 0);

  useEffect(() => {
    if (!inView) return;
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setDisplayValue(value);
      return;
    }

    const startVal = animateAsYear ? 2000 : 0;
    const duration = 950;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startVal + (value - startVal) * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, value, animateAsYear]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {displayValue}
      {suffix}
    </span>
  );
}

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackTitle?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackTitle,
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`w-full h-full bg-[#14161A] flex flex-col items-center justify-center p-6 text-center text-[#9EA3AE] ${className}`}
      >
        <Layers className="w-8 h-8 mb-3 text-[#52555E]" aria-hidden="true" />
        <span className="text-sm font-medium text-white">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}

interface BreadcrumbItem {
  label: string;
  to?: string;
}

interface PageHeaderProps {
  breadcrumbs: BreadcrumbItem[];
  title: string;
  subtitle: string;
  dark?: boolean;
  rightSlot?: ReactNode;
}

export function PageHeader({
  breadcrumbs,
  title,
  subtitle,
  dark = false,
  rightSlot,
}: PageHeaderProps) {
  return (
    <section
      className={`border-b ${
        dark
          ? 'bg-[#0B0C0E] text-white border-[#262930]'
          : 'bg-[#F9F9F7] text-[#111214] border-[#E4E4DF]'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-16 pb-14 lg:pt-24 lg:pb-20">
        <nav
          aria-label="Breadcrumb"
          className={`flex flex-wrap items-center gap-2 text-xs font-medium mb-6 ${
            dark ? 'text-[#9EA3AE]' : 'text-[#52555E]'
          }`}
        >
          {breadcrumbs.map((crumb, idx) => (
            <span key={crumb.label} className="inline-flex items-center gap-2">
              {idx > 0 && <span aria-hidden="true">/</span>}
              {crumb.to ? (
                <Link
                  to={crumb.to}
                  className={`transition-colors ${
                    dark ? 'hover:text-white' : 'hover:text-[#111214]'
                  }`}
                >
                  {crumb.label}
                </Link>
              ) : (
                <span className={dark ? 'text-white' : 'text-[#111214]'}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className={rightSlot ? 'lg:col-span-8' : 'lg:col-span-9'}>
            <MaskedTextReveal
              as="h1"
              text={title}
              className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight leading-[1.08] max-w-4xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className={`mt-5 text-base sm:text-lg leading-relaxed max-w-2xl ${
                dark ? 'text-[#A5AAB5]' : 'text-[#52555E]'
              }`}
            >
              {subtitle}
            </motion.p>
          </div>
          {rightSlot && <div className="lg:col-span-4 lg:flex lg:justify-end">{rightSlot}</div>}
        </div>
      </div>
    </section>
  );
}

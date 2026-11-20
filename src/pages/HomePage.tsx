import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { COMPANY } from '@/src/data/company';
import { SERVICES } from '@/src/data/services';
import { CASE_STUDIES } from '@/src/data/portfolio';
import {
  Reveal,
  MaskedTextReveal,
  ParallaxFrame,
  TiltCard,
  MagneticButton,
  InteractiveSpotlight,
  KineticMarquee,
  AnimatedCounter,
  ResilientImage,
} from '@/src/components/MotionPrimitives';
import { InteractiveEcosystem } from '@/src/components/InteractiveEcosystem';
import { ProductPreviewStudio } from '@/src/components/ProductPreviewStudio';
import { IdeaToInnovation } from '@/src/components/IdeaToInnovation';
import { HorizontalWorkReel } from '@/src/components/HorizontalWorkReel';
import heroStudioImg from '@/src/assets/images/hero_commerce_architecture_1795162904296.jpg';

const MARQUEE_ITEMS = [
  'Shopify Plus & Checkout Extensibility',
  'Zero-Downtime Magento Migrations',
  'Adobe Commerce & Hyvä Themes',
  '30+ Shopify App Store Products',
  'Laravel, React, Next.js & Node.js',
  'Zoho Books & QuickBooks ERP Sync',
  'Python AI Catalog Automation',
  'Core Web Vitals Engineering',
];

export function HomePage() {
  const [hoveredService, setHoveredService] = useState<string>(SERVICES[0].slug);
  const [activeTechLayer, setActiveTechLayer] = useState(0);
  const activeServiceObj =
    SERVICES.find((s) => s.slug === hoveredService) || SERVICES[0];

  const featuredLead = CASE_STUDIES[0];
  const featuredSecond = CASE_STUDIES[1];

  return (
    <div>
      {/* 1. HERO SECTION — Interactive Spotlight + Masked Kinetic Headline + Parallax Visual + Magnetic CTA */}
      <section className="relative bg-[#F9F9F7] pt-12 pb-16 lg:pt-20 lg:pb-24 border-b border-[#E4E4DF] overflow-hidden">
        <InteractiveSpotlight />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #E4E4DF 1px, transparent 1px), linear-gradient(to bottom, #E4E4DF 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />

        <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
            {/* Left Typographic Anchor */}
            <div className="lg:col-span-6 flex flex-col justify-between py-2">
              <div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="text-sm font-medium text-[#52555E] mb-5"
                >
                  Engineering eCommerce & Custom Software Since {COMPANY.founded}
                </motion.p>

                <MaskedTextReveal
                  as="h1"
                  text="Commerce architecture built to scale without friction."
                  delay={0.05}
                  className="font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-semibold tracking-tight text-[#111214] leading-[1.06]"
                />

                <motion.p
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="mt-6 text-base sm:text-lg text-[#52555E] leading-relaxed max-w-xl"
                >
                  Expound Coderz partners with ambitious retail brands and software teams to
                  engineer Shopify Plus storefronts, zero-downtime Magento migrations, custom SaaS
                  platforms, and 60+ marketplace apps and extensions.
                </motion.p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10 flex flex-wrap items-center gap-6"
              >
                <MagneticButton>
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-[#111214] hover:bg-[#1D4ED8] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
                  >
                    <span>Start a Project</span>
                    <ArrowRight
                      className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </MagneticButton>
                <Link
                  to="/work"
                  className="link-underline text-sm font-medium text-[#111214] py-1 whitespace-nowrap shrink-0"
                >
                  View Selected Case Studies
                </Link>
              </motion.div>
            </div>

            {/* Right Dominant Architectural Visual with Parallax + Tilt */}
            <motion.div
              initial={{ opacity: 0, y: 22, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6"
            >
              <TiltCard maxTilt={2.5} className="h-full">
                <ParallaxFrame
                  offset={22}
                  className="w-full aspect-[16/10] lg:aspect-auto lg:h-full min-h-[320px] lg:min-h-[460px] rounded-2xl border border-[#E4E4DF] bg-[#14161A]"
                >
                  <ResilientImage
                    src={heroStudioImg}
                    alt="Expound Coderz architectural software engineering workspace"
                    fallbackTitle="Expound Coderz Studio"
                    className="w-full h-full object-cover"
                  />
                </ParallaxFrame>
              </TiltCard>
            </motion.div>
          </div>

          {/* 2. TRUST & EXPERIENCE ROW */}
          <div className="mt-14 pt-10 border-t border-[#E4E4DF]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {COMPANY.verifiedMetrics.map((metric, idx) => (
                <Reveal key={metric.label} delay={idx * 0.06} y={14}>
                  <div className="space-y-1.5">
                    <div className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111214]">
                      <AnimatedCounter
                        value={metric.value}
                        suffix={metric.suffix}
                        animateAsYear={metric.animateAsYear}
                      />
                    </div>
                    <div className="text-sm font-semibold text-[#111214]">{metric.label}</div>
                    <p className="text-xs sm:text-sm text-[#52555E] leading-relaxed">
                      {metric.detail}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-[#E4E4DF]/70 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-[#52555E]">
              <span>Official Shopify Partner (5.0 Standing)</span>
              <span aria-hidden="true">·</span>
              <span>Adobe Commerce & Magento 2 Specialists</span>
              <span aria-hidden="true">·</span>
              <span>Upwork Top Rated Plus Agency</span>
              <span aria-hidden="true">·</span>
              <span>Dewas, India — Serving Global Brands</span>
            </div>
          </div>
        </div>
      </section>

      {/* Kinetic Capability Marquee Divider */}
      <KineticMarquee items={MARQUEE_ITEMS} />

      {/* 3. CUSTOM DEVELOPMENT SERVICES — Interactive Split Hover Preview */}
      <section className="bg-[#F9F9F7] py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#1D4ED8] mb-3">
                Custom Development Services
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-[#111214] leading-[1.12]">
                Bespoke engineering for enterprise commerce and web platforms.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <Link
                to="/services"
                className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-[#111214] hover:text-[#1D4ED8] transition-colors"
              >
                <span>Explore all engineering services</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Interactive Service Selector Index */}
            <div className="lg:col-span-7 divide-y divide-[#E4E4DF] border-t border-b border-[#E4E4DF]">
              {SERVICES.map((service) => {
                const isHovered = hoveredService === service.slug;
                return (
                  <Link
                    key={service.slug}
                    to={`/services/${service.slug}`}
                    onMouseEnter={() => setHoveredService(service.slug)}
                    onFocus={() => setHoveredService(service.slug)}
                    className="group relative block py-6 px-4 rounded-xl transition-colors"
                  >
                    {isHovered && (
                      <motion.div
                        layoutId="service-hover-surface"
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="absolute inset-0 bg-white border border-[#E4E4DF] rounded-xl"
                      />
                    )}
                    <div className="relative z-10 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <span className="font-mono text-xs text-[#52555E] tabular-nums">
                          {service.index}.
                        </span>
                        <div>
                          <h3
                            className={`font-display text-lg sm:text-xl font-semibold transition-colors ${
                              isHovered ? 'text-[#1D4ED8]' : 'text-[#111214]'
                            }`}
                          >
                            {service.title}
                          </h3>
                          <p className="text-sm text-[#52555E] mt-0.5 line-clamp-1">
                            {service.tagline}
                          </p>
                        </div>
                      </div>
                      <ArrowUpRight
                        className={`w-4 h-4 shrink-0 transition-transform duration-150 ${
                          isHovered
                            ? 'text-[#1D4ED8] translate-x-0.5 -translate-y-0.5'
                            : 'text-[#9EA3AE]'
                        }`}
                        aria-hidden="true"
                      />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Live Sticky Architecture Preview Card */}
            <div className="lg:col-span-5 lg:sticky lg:top-24 bg-white border border-[#E4E4DF] rounded-2xl p-6 sm:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeServiceObj.slug}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6"
                >
                  <div>
                    <div className="text-xs font-mono text-[#1D4ED8]">
                      {activeServiceObj.index} · {activeServiceObj.category}
                    </div>
                    <h3 className="font-display text-2xl font-semibold text-[#111214] mt-1">
                      {activeServiceObj.title}
                    </h3>
                    <p className="text-sm text-[#52555E] mt-2 leading-relaxed">
                      {activeServiceObj.summary}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-4 border-t border-[#E4E4DF]">
                    {activeServiceObj.architectureHighlights.map((item) => (
                      <div key={item.label} className="bg-[#F9F9F7] rounded-lg p-3.5">
                        <div className="text-xs font-semibold text-[#111214]">{item.label}</div>
                        <div className="text-xs text-[#52555E] mt-0.5">{item.detail}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-mono text-xs text-[#52555E]">
                      {activeServiceObj.techStack.slice(0, 3).join(' / ')}
                    </span>
                    <Link
                      to={`/services/${activeServiceObj.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1D4ED8] hover:text-[#111214]"
                    >
                      <span>Open Service</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* 4. SIGNATURE INTERACTIVE SECTION 1: OUR EXPERTISE IN MOTION (Animated SVG Circuit Node Canvas) */}
      <InteractiveEcosystem />

      {/* 5. SELECTED WORK — Featured Spotlight + Pinned Scroll-to-Glide Horizontal Reel */}
      <section className="bg-[#F9F9F7] py-24 lg:py-32 border-b border-[#E4E4DF] overflow-x-clip">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 mb-14">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#1D4ED8] mb-3">Selected Work</p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-[#111214] leading-[1.12]">
                Verified migrations and flagship storefronts delivered at scale.
              </h2>
            </div>
            <div className="lg:col-span-5 lg:flex lg:justify-end">
              <Link
                to="/work"
                className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-[#111214] hover:text-[#1D4ED8] transition-colors"
              >
                <span>View complete portfolio</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>

          {/* Top Editorial Pair */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
            {[featuredLead, featuredSecond].map((project, idx) => (
              <Reveal
                key={project.slug}
                delay={idx * 0.08}
                className={idx === 0 ? 'lg:col-span-7' : 'lg:col-span-5'}
              >
                <TiltCard maxTilt={2.8} className="h-full">
                  <Link
                    to={`/work/${project.slug}`}
                    className="group block h-full bg-white border border-[#E4E4DF] rounded-2xl overflow-hidden hover:border-[#111214]/40 transition-colors duration-200"
                  >
                    <ParallaxFrame
                      offset={18}
                      className={`w-full bg-[#14161A] ${
                        idx === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'
                      }`}
                    >
                      <ResilientImage
                        src={project.image}
                        alt={project.imageAlt}
                        fallbackTitle={project.client}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
                      />
                    </ParallaxFrame>
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#52555E]">
                        <div className="flex flex-wrap items-center gap-2">
                          <span>{project.client}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.industry}</span>
                          <span aria-hidden="true">·</span>
                          <span>{project.platformTo}</span>
                        </div>
                        <span className="inline-flex items-center gap-1 font-medium text-[#111214] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          Case Study <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                        </span>
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#111214] leading-snug group-hover:text-[#1D4ED8] transition-colors">
                        {project.headline}
                      </h3>

                      <div className="pt-3 border-t border-[#E4E4DF] grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {project.metrics.slice(0, 3).map((m) => (
                          <div key={m.label}>
                            <div className="font-mono text-base sm:text-lg font-semibold text-[#111214] tabular-nums">
                              {m.value}
                            </div>
                            <div className="text-xs text-[#52555E]">{m.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>

        <HorizontalWorkReel />
      </section>

      {/* 6. SIGNATURE INTERACTIVE SECTION 2: PINNED SCROLL — FROM IDEA TO INNOVATION */}
      <IdeaToInnovation />

      {/* 7. DIGITAL PRODUCTS SHOWCASE (Strictly Separated from Services) */}
      <section className="bg-[#F9F9F7] py-24 lg:py-32 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-14">
            <div className="lg:col-span-7">
              <p className="text-sm font-medium text-[#1D4ED8] mb-3">
                Ready-Made Digital Products
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-[#111214] leading-[1.12]">
                60+ Shopify apps, Magento extensions, and WordPress plugins.
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-base text-[#52555E] leading-relaxed">
                Alongside custom engineering, we build and maintain commercial commerce extensions
                under the ESTS and Expound Coderz suites. Interact with live storefront previews
                below.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <ProductPreviewStudio />
          </Reveal>
        </div>
      </section>

      {/* 8. TECHNOLOGY EXPERTISE (Interactive Stack Visualizer) */}
      <section className="bg-white py-24 lg:py-28 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-sm font-medium text-[#1D4ED8]">Technology Ecosystem</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111214] leading-[1.14]">
                Multi-stack depth from storefront theme to cloud middleware.
              </h2>
              <p className="text-base text-[#52555E] leading-relaxed">
                Whether accelerating a Shopify Plus checkout, modernizing Magento 2 with Hyvä, or
                shipping Laravel and React SaaS platforms, our engineers work natively across every
                layer.
              </p>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <div
                role="tablist"
                aria-label="Technology layers"
                className="flex flex-wrap gap-1.5 p-1.5 bg-[#F9F9F7] border border-[#E4E4DF] rounded-xl"
              >
                {COMPANY.techEcosystem.map((group, idx) => {
                  const selected = activeTechLayer === idx;
                  return (
                    <button
                      key={group.layer}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setActiveTechLayer(idx)}
                      className="relative px-3.5 py-2 text-xs sm:text-sm font-medium rounded-lg whitespace-nowrap shrink-0"
                    >
                      {selected && (
                        <motion.span
                          layoutId="tech-tab-pill"
                          transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 bg-white border border-[#E4E4DF] rounded-lg"
                        />
                      )}
                      <span
                        className={`relative z-10 transition-colors ${
                          selected ? 'text-[#111214]' : 'text-[#52555E] hover:text-[#111214]'
                        }`}
                      >
                        {group.layer}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="bg-[#F9F9F7] border border-[#E4E4DF] rounded-2xl p-6 sm:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTechLayer}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <div className="text-xs font-medium text-[#52555E] mb-4">
                      {COMPANY.techEcosystem[activeTechLayer].layer}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {COMPANY.techEcosystem[activeTechLayer].items.map((tech, idx) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2, delay: idx * 0.04 }}
                          className="flex items-center justify-between px-4 py-3.5 bg-white border border-[#E4E4DF] rounded-xl"
                        >
                          <span className="font-display text-sm sm:text-base font-semibold text-[#111214]">
                            {tech}
                          </span>
                          <span className="font-mono text-xs text-[#52555E] tabular-nums">
                            0{idx + 1}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 9. ABOUT EXPOUND CODERZ */}
      <section className="bg-[#F9F9F7] py-24 lg:py-28 border-b border-[#E4E4DF]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <p className="text-sm font-medium text-[#1D4ED8] mb-3">About Expound Coderz</p>
              <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#111214] leading-[1.14]">
                Fourteen years of disciplined software and commerce craft.
              </h2>
            </div>
            <div className="lg:col-span-7 space-y-6">
              <p className="text-base sm:text-lg text-[#52555E] leading-relaxed">
                Founded in {COMPANY.founded} in {COMPANY.headquarters.city}, India, Expound Coderz
                Pvt. Ltd. has grown into a specialized engineering partner for enterprise merchants
                across North America, the UK, Europe, and APAC. We combine custom architecture with
                productized commerce tooling—delivering clean codebases that teams can operate and
                scale with confidence.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#111214] hover:text-[#1D4ED8] transition-colors"
                >
                  <span>Read our story & credentials</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/insights"
                  className="link-underline text-sm font-medium text-[#52555E] hover:text-[#111214]"
                >
                  Read Engineering Insights
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. FINAL CTA */}
      <section className="bg-[#0B0C0E] text-white py-24 lg:py-32">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <Reveal className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-5">
              <p className="text-sm font-medium text-[#60A5FA]">Start a Conversation</p>
              <h2 className="font-display text-3xl sm:text-5xl font-semibold tracking-tight leading-[1.08] max-w-3xl">
                Planning a platform migration, custom build, or app integration?
              </h2>
              <p className="text-base sm:text-lg text-[#A5AAB5] leading-relaxed max-w-2xl">
                Share your technical scope, catalog complexity, or target timeline—our senior
                engineers respond directly with practical architecture guidance.
              </p>
            </div>
            <div className="lg:col-span-4 lg:flex lg:justify-end">
              <MagneticButton>
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-2.5 px-7 py-4 text-sm font-semibold text-[#111214] bg-white hover:bg-[#60A5FA] hover:text-white rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
                >
                  <span>Schedule Technical Consultation</span>
                  <ArrowRight
                    className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </MagneticButton>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

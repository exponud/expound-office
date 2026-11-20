import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Layers, RefreshCw, Cpu, Boxes } from 'lucide-react';
import { ECOSYSTEM_PILLARS } from '@/src/data/services';

const PILLAR_ICONS = {
  storefront: Layers,
  middleware: RefreshCw,
  migration: Boxes,
  extensions: Cpu,
} as const;

const CIRCUIT_PATHS = [
  'M 290 120 C 210 120, 175 64, 95 64',
  'M 290 120 C 370 120, 405 64, 485 64',
  'M 290 120 C 210 120, 175 176, 95 176',
  'M 290 120 C 370 120, 405 176, 485 176',
];

const NODE_COORDS = [
  { x: 95, y: 64 },
  { x: 485, y: 64 },
  { x: 95, y: 176 },
  { x: 485, y: 176 },
];

export function InteractiveEcosystem() {
  const [activeId, setActiveId] = useState<string>(ECOSYSTEM_PILLARS[0].id);
  const activeIndex = Math.max(
    0,
    ECOSYSTEM_PILLARS.findIndex((p) => p.id === activeId)
  );
  const activePillar = ECOSYSTEM_PILLARS[activeIndex] || ECOSYSTEM_PILLARS[0];

  return (
    <section
      id="ecosystem"
      className="relative bg-[#0B0C0E] text-white py-24 lg:py-32 border-y border-[#262930] overflow-hidden"
    >
      {/* Subtle Drifting Coordinate Grid */}
      <motion.div
        aria-hidden="true"
        animate={{ backgroundPosition: ['0px 0px', '64px 64px'] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #9EA3AE 1px, transparent 1px), linear-gradient(to bottom, #9EA3AE 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-end mb-14">
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#60A5FA] mb-3">
              Interactive Digital Ecosystem
            </p>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-[1.12]">
              Our expertise in motion: how storefronts, ERP middleware, migrations, and apps unite.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-[#A5AAB5] leading-relaxed">
              Click any architecture node below or in the left selector to watch live data pathways
              illuminate across platforms and verified case implementations.
            </p>
          </div>
        </div>

        {/* Interactive Architecture Visualization + Blueprint */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: 4 Interactive Selectors */}
          <div className="lg:col-span-5 flex flex-col divide-y divide-[#262930] border-t border-b border-[#262930]">
            {ECOSYSTEM_PILLARS.map((pillar) => {
              const Icon = PILLAR_ICONS[pillar.id as keyof typeof PILLAR_ICONS] || Layers;
              const isSelected = pillar.id === activeId;
              return (
                <button
                  key={pillar.id}
                  type="button"
                  onClick={() => setActiveId(pillar.id)}
                  aria-pressed={isSelected}
                  className="group relative text-left py-6 px-4 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[#60A5FA]"
                >
                  {isSelected && (
                    <motion.div
                      layoutId="ecosystem-active-bg"
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 bg-[#14161A]"
                    />
                  )}
                  <div className="relative z-10 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span
                        className={`font-mono text-xs pt-1 tabular-nums transition-colors ${
                          isSelected ? 'text-[#60A5FA]' : 'text-[#717682]'
                        }`}
                      >
                        {pillar.index}.
                      </span>
                      <div>
                        <div className="font-display text-lg font-semibold text-white">
                          {pillar.title}
                        </div>
                        <div className="text-sm text-[#9EA3AE] mt-0.5">{pillar.subtitle}</div>
                      </div>
                    </div>
                    <Icon
                      className={`w-5 h-5 shrink-0 mt-0.5 transition-transform duration-200 ${
                        isSelected
                          ? 'text-[#60A5FA] scale-110'
                          : 'text-[#52555E] group-hover:text-[#9EA3AE]'
                      }`}
                      aria-hidden="true"
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Animated Node Circuit + Active Pillar Details */}
          <div className="lg:col-span-7 bg-[#14161A] border border-[#262930] rounded-2xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-8">
            {/* Animated SVG Circuit Diagram */}
            <div className="relative bg-[#0B0C0E] border border-[#262930] rounded-xl p-4 sm:p-5 overflow-hidden">
              <div className="flex items-center justify-between text-xs text-[#717682] mb-2">
                <span>Architecture Topology</span>
                <span className="font-mono text-[#60A5FA]">
                  Active Node: {activePillar.index} · {activePillar.title}
                </span>
              </div>

              <svg
                viewBox="0 0 580 240"
                className="w-full h-auto max-h-[210px]"
                role="img"
                aria-label="Interactive Expound Coderz digital ecosystem node topology"
              >
                {/* Base Circuit Tracks + Animated Traveling Data Pulses */}
                {CIRCUIT_PATHS.map((d, idx) => {
                  const isActivePath = idx === activeIndex;
                  return (
                    <g key={d}>
                      <path
                        d={d}
                        fill="none"
                        stroke={isActivePath ? '#3B82F6' : '#262930'}
                        strokeWidth={isActivePath ? 2.5 : 1.5}
                        strokeDasharray={isActivePath ? undefined : '4 5'}
                      />
                      {isActivePath && (
                        <>
                          <motion.path
                            d={d}
                            fill="none"
                            stroke="#60A5FA"
                            strokeWidth={2.5}
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                          />
                          <circle r={4.5} fill="#93C5FD">
                            <animateMotion dur="1.8s" repeatCount="indefinite" path={d} />
                          </circle>
                        </>
                      )}
                    </g>
                  );
                })}

                {/* Central Hub Node */}
                <g transform="translate(290, 120)">
                  <motion.circle
                    r={38}
                    fill="#14161A"
                    stroke="#3B82F6"
                    strokeWidth={1.5}
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <text
                    textAnchor="middle"
                    y="-4"
                    fill="#FFFFFF"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="Plus Jakarta Sans, sans-serif"
                  >
                    Expound
                  </text>
                  <text
                    textAnchor="middle"
                    y="11"
                    fill="#60A5FA"
                    fontSize="10"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    Core
                  </text>
                </g>

                {/* 4 Clickable Satellite Nodes */}
                {ECOSYSTEM_PILLARS.map((pillar, idx) => {
                  const pos = NODE_COORDS[idx];
                  const isSelected = pillar.id === activeId;
                  return (
                    <g
                      key={pillar.id}
                      transform={`translate(${pos.x}, ${pos.y})`}
                      onClick={() => setActiveId(pillar.id)}
                      className="cursor-pointer"
                    >
                      <motion.rect
                        x={-84}
                        y={-24}
                        width={168}
                        height={48}
                        rx={10}
                        fill={isSelected ? '#1D4ED8' : '#14161A'}
                        stroke={isSelected ? '#93C5FD' : '#262930'}
                        strokeWidth={1.5}
                        whileHover={{ scale: 1.04 }}
                        transition={{ duration: 0.18 }}
                      />
                      <text
                        textAnchor="middle"
                        y="-3"
                        fill="#FFFFFF"
                        fontSize="11"
                        fontWeight="600"
                        fontFamily="Plus Jakarta Sans, sans-serif"
                      >
                        {pillar.title}
                      </text>
                      <text
                        textAnchor="middle"
                        y="12"
                        fill={isSelected ? '#DBEAFE' : '#717682'}
                        fontSize="9.5"
                        fontFamily="JetBrains Mono, monospace"
                      >
                        {pillar.index} · Click to inspect
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Active Pillar Specifications */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePillar.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h3 className="font-display text-2xl font-semibold text-white tracking-tight">
                    {activePillar.title} — {activePillar.subtitle}
                  </h3>
                  <p className="text-sm sm:text-base text-[#B6BAC4] leading-relaxed">
                    {activePillar.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activePillar.platforms.map((item, idx) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.22, delay: idx * 0.05 }}
                      className="flex items-center justify-between px-4 py-3 rounded-lg bg-[#0B0C0E] border border-[#262930]"
                    >
                      <span className="text-sm font-medium text-white">{item}</span>
                      <span className="font-mono text-xs text-[#60A5FA] tabular-nums">
                        0{idx + 1}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#262930] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs text-[#717682]">Verified Production Outcome</div>
                    <div className="text-sm font-medium text-white">{activePillar.output}</div>
                    <div className="text-xs text-[#9EA3AE]">{activePillar.caseReference}</div>
                  </div>
                  <Link
                    to={activePillar.id === 'extensions' ? '/products' : '/services'}
                    className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-[#60A5FA] transition-colors whitespace-nowrap shrink-0"
                  >
                    <span>
                      {activePillar.id === 'extensions' ? 'Explore Products' : 'Explore Services'}
                    </span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

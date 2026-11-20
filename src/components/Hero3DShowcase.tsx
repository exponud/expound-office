import { useRef, useState } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useAnimationFrame,
  useReducedMotion,
} from 'motion/react';
import { ResilientImage } from '@/src/components/MotionPrimitives';

interface Hero3DShowcaseProps {
  imageSrc: string;
}

export function Hero3DShowcase({ imageSrc }: Hero3DShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Normalized pointer coordinates (-0.5 to +0.5)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const hoverFactor = useSpring(0, { stiffness: 210, damping: 24, mass: 0.7 });

  // Continuous gentle 3D orbital oscillation in idle state, smoothly blended with cursor tilt on hover
  const smoothX = useSpring(pointerX, { stiffness: 170, damping: 22, mass: 0.65 });
  const smoothY = useSpring(pointerY, { stiffness: 170, damping: 22, mass: 0.65 });

  // Target rotation values driven by animation frame so idle & hover transition seamlessly
  const stageRotateX = useMotionValue(1.5);
  const stageRotateY = useMotionValue(-3.5);
  const stageLiftZ = useSpring(0, { stiffness: 180, damping: 24 });

  // Parallax micro-offsets for floating 3D planes
  const cardTopX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const cardTopY = useTransform(smoothY, [-0.5, 0.5], [-14, 14]);
  const cardBottomX = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const cardBottomY = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const bgGridX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const bgGridY = useTransform(smoothY, [-0.5, 0.5], [12, -12]);

  // Cursor-tracking radial glare coordinates (%)
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['12%', '88%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['12%', '88%']);
  const glareBackground = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(520px circle at ${gx} ${gy}, rgba(96, 165, 250, 0.28), rgba(255, 255, 255, 0.08) 38%, transparent 70%)`
  );

  useAnimationFrame((time) => {
    if (prefersReduced) {
      stageRotateX.set(0);
      stageRotateY.set(0);
      return;
    }

    const t = time * 0.001;
    // Ambient architectural 3D breathing orbit when idle
    const idleX = Math.sin(t * 0.95) * 3.4 + 1.2;
    const idleY = Math.cos(t * 0.72) * 4.8 - 1.5;

    // Interactive cursor tilt when hovered on desktop
    const cursorX = -smoothY.get() * 20; // +/- 10 deg
    const cursorY = smoothX.get() * 24; // +/- 12 deg

    const blend = hoverFactor.get();
    stageRotateX.set(idleX * (1 - blend) + cursorX * blend);
    stageRotateY.set(idleY * (1 - blend) + cursorY * blend);
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || e.pointerType === 'touch') return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    pointerX.set(Math.max(-0.5, Math.min(0.5, nx)));
    pointerY.set(Math.max(-0.5, Math.min(0.5, ny)));
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || e.pointerType === 'touch') return;
    setIsHovered(true);
    hoverFactor.set(1);
    stageLiftZ.set(22);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    hoverFactor.set(0);
    stageLiftZ.set(0);
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className="relative w-full h-full min-h-[340px] lg:min-h-[470px] flex items-center justify-center py-2 lg:py-4 select-none"
      style={{ perspective: '1400px' }}
    >
      {/* Interactive 3D Stage Container */}
      <motion.div
        style={{
          rotateX: stageRotateX,
          rotateY: stageRotateY,
          z: stageLiftZ,
          transformStyle: 'preserve-3d',
        }}
        className="relative w-full aspect-[16/11] lg:aspect-[16/11] max-w-[640px]"
      >
        {/* LAYER -1: Deep Architectural Shadow Plane */}
        <motion.div
          aria-hidden="true"
          animate={
            prefersReduced
              ? undefined
              : {
                  opacity: isHovered ? 0.52 : [0.28, 0.38, 0.28],
                  scale: isHovered ? 0.98 : [0.93, 0.96, 0.93],
                }
          }
          transition={{
            duration: isHovered ? 0.35 : 4.5,
            repeat: isHovered ? 0 : Infinity,
            ease: 'easeInOut',
          }}
          className="pointer-events-none absolute -inset-x-3 -bottom-5 top-6 rounded-3xl bg-[#0B0C0E]/55 blur-2xl"
          style={{ transform: 'translateZ(-56px)' }}
        />

        {/* LAYER 0: Deep Parallax Wireframe Backplate */}
        <motion.div
          aria-hidden="true"
          style={{
            x: bgGridX,
            y: bgGridY,
            transform: 'translateZ(-34px)',
          }}
          className="pointer-events-none absolute -inset-3 sm:-inset-4 rounded-2xl border border-[#1D4ED8]/25 bg-[#0B0C0E]/90 overflow-hidden shadow-inner"
        >
          {/* Slowly drifting isometric/orthographic engineering blueprint grid */}
          <motion.div
            animate={
              prefersReduced
                ? undefined
                : { backgroundPosition: ['0px 0px', '48px 48px'] }
            }
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 opacity-35"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(96,165,250,0.2) 1px, transparent 1px), linear-gradient(to bottom, rgba(96,165,250,0.2) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 75% 25%, rgba(29, 78, 216, 0.32), transparent 58%)',
            }}
          />
        </motion.div>

        {/* LAYER 1: Main Obsidian 3D Architectural Display Bezel */}
        <div
          className={`relative w-full h-full rounded-2xl overflow-hidden bg-[#111214] border transition-colors duration-300 ${
            isHovered ? 'border-[#60A5FA]/80' : 'border-[#2E333E]'
          }`}
          style={{
            transform: 'translateZ(12px)',
            transformStyle: 'preserve-3d',
            boxShadow: isHovered
              ? '0 32px 64px -18px rgba(11, 12, 14, 0.55), 0 0 36px -8px rgba(29, 78, 216, 0.35)'
              : '0 22px 44px -16px rgba(11, 12, 14, 0.42)',
          }}
        >
          {/* Main Workspace Image with Gentle Hover Scale */}
          <motion.div
            animate={{ scale: isHovered ? 1.05 : 1.01 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full"
          >
            <ResilientImage
              src={imageSrc}
              alt="Expound Coderz architectural commerce engineering 3D stage"
              fallbackTitle="Expound Coderz Studio"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Subtle Obsidian Contrast Vignette for Depth */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#0B0C0E]/65 via-transparent to-[#1D4ED8]/15"
          />

          {/* Idle Animation: Periodic Diagonal Specular Glass Sweep */}
          {!prefersReduced && (
            <motion.div
              aria-hidden="true"
              animate={{ x: ['-120%', '220%'] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                repeatDelay: 3.4,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pointer-events-none absolute inset-y-0 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent"
            />
          )}

          {/* Hover Animation: Cursor-Following Glass Glare */}
          <motion.div
            aria-hidden="true"
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-none absolute inset-0 mix-blend-screen"
            style={{ background: glareBackground }}
          />

          {/* Animated SVG Architectural Circuit Edge Frame */}
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full"
            viewBox="0 0 640 440"
            preserveAspectRatio="none"
          >
            <motion.rect
              x="8"
              y="8"
              width="624"
              height="424"
              rx="12"
              fill="none"
              stroke={isHovered ? '#60A5FA' : 'rgba(255,255,255,0.22)'}
              strokeWidth="1"
              strokeDasharray="12 10"
              animate={
                prefersReduced
                  ? undefined
                  : { strokeDashoffset: [0, -88] }
              }
              transition={{
                duration: isHovered ? 3.5 : 8,
                repeat: Infinity,
                ease: 'linear',
              }}
            />
          </svg>
        </div>

        {/* LAYER 2A: Top-Left Elevated 3D Telemetry Card (Floats in Idle + Lifts Forward on Hover) */}
        <motion.div
          style={{
            x: cardTopX,
            y: cardTopY,
            transformStyle: 'preserve-3d',
          }}
          animate={
            prefersReduced
              ? undefined
              : { z: isHovered ? 84 : 46 }
          }
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:block pointer-events-none absolute -top-4 -left-3 lg:-left-6 z-20"
        >
          <motion.div
            animate={
              prefersReduced
                ? undefined
                : { y: isHovered ? -4 : [0, -6, 0] }
            }
            transition={{
              duration: isHovered ? 0.3 : 4.2,
              repeat: isHovered ? 0 : Infinity,
              ease: 'easeInOut',
            }}
            className={`rounded-xl border backdrop-blur-md px-4 py-3 transition-colors duration-300 ${
              isHovered
                ? 'bg-[#0B0C0E]/92 border-[#60A5FA]/65 shadow-[0_24px_48px_-12px_rgba(29,78,216,0.45)]'
                : 'bg-[#0B0C0E]/82 border-white/15 shadow-[0_18px_36px_-12px_rgba(11,12,14,0.5)]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <motion.span
                animate={
                  prefersReduced
                    ? undefined
                    : { opacity: [0.45, 1, 0.45], scale: [0.95, 1.15, 0.95] }
                }
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                className="w-2 h-2 rounded-sm bg-[#60A5FA]"
              />
              <span className="font-mono text-[10px] tracking-[0.14em] uppercase text-[#93C5FD]">
                Architecture · Est. 2011
              </span>
            </div>
            <div className="mt-1.5 font-display text-sm font-semibold text-white">
              Shopify Plus &amp; Magento 2
            </div>
            {/* Mini animated signal wave */}
            <svg
              aria-hidden="true"
              viewBox="0 0 156 18"
              className="mt-2 w-[156px] h-[18px] overflow-visible"
            >
              <path
                d="M0 12 L28 12 L38 4 L48 15 L58 7 L68 12 L156 12"
                fill="none"
                stroke="rgba(255,255,255,0.12)"
                strokeWidth="1.25"
              />
              {!prefersReduced && (
                <motion.path
                  d="M0 12 L28 12 L38 4 L48 15 L58 7 L68 12 L156 12"
                  fill="none"
                  stroke="#60A5FA"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0.25, pathOffset: 0 }}
                  animate={{ pathOffset: [0, 1] }}
                  transition={{
                    duration: isHovered ? 1.5 : 2.8,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
              )}
            </svg>
          </motion.div>
        </motion.div>

        {/* LAYER 2B: Bottom-Right Elevated 3D Verified Metrics Plate */}
        <motion.div
          style={{
            x: cardBottomX,
            y: cardBottomY,
            transformStyle: 'preserve-3d',
          }}
          animate={
            prefersReduced
              ? undefined
              : { z: isHovered ? 96 : 54 }
          }
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="hidden sm:block pointer-events-none absolute -bottom-5 -right-2 lg:-right-6 z-20"
        >
          <motion.div
            animate={
              prefersReduced
                ? undefined
                : { y: isHovered ? 4 : [0, 6, 0] }
            }
            transition={{
              duration: isHovered ? 0.3 : 4.8,
              repeat: isHovered ? 0 : Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className={`rounded-xl border backdrop-blur-md px-4 py-3.5 transition-colors duration-300 ${
              isHovered
                ? 'bg-[#0B0C0E]/92 border-[#60A5FA]/65 shadow-[0_26px_52px_-12px_rgba(29,78,216,0.45)]'
                : 'bg-[#0B0C0E]/85 border-white/15 shadow-[0_18px_36px_-12px_rgba(11,12,14,0.5)]'
            }`}
          >
            <div className="grid grid-cols-2 gap-5">
              <div>
                <div className="font-mono text-base font-semibold text-white tabular-nums">
                  100K+ SKUs
                </div>
                <div className="font-mono text-[10px] text-[#9EA3AE] mt-0.5">
                  0 min cutover downtime
                </div>
              </div>
              <div className="border-l border-white/15 pl-4">
                <div className="font-mono text-base font-semibold text-[#60A5FA] tabular-nums">
                  60+ Apps
                </div>
                <div className="font-mono text-[10px] text-[#9EA3AE] mt-0.5">
                  Shopify &amp; Magento suites
                </div>
              </div>
            </div>

            {/* Interactive Depth Indicator Bar */}
            <div className="mt-2.5 h-1 w-full bg-white/10 rounded-sm overflow-hidden">
              <motion.div
                animate={
                  prefersReduced
                    ? undefined
                    : isHovered
                    ? { width: '100%' }
                    : { width: ['38%', '74%', '38%'] }
                }
                transition={{
                  duration: isHovered ? 0.35 : 4,
                  repeat: isHovered ? 0 : Infinity,
                  ease: 'easeInOut',
                }}
                className="h-full bg-gradient-to-r from-[#1D4ED8] to-[#60A5FA]"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* LAYER 2C: Top-Right Rotating Architectural Vector Ring (Desktop Depth Cue) */}
        <motion.div
          aria-hidden="true"
          style={{
            x: cardBottomX,
            y: cardTopY,
            transformStyle: 'preserve-3d',
          }}
          animate={
            prefersReduced
              ? undefined
              : {
                  z: isHovered ? 64 : 30,
                  rotate: 360,
                  scale: isHovered ? 1.12 : 1,
                }
          }
          transition={{
            z: { duration: 0.4 },
            scale: { duration: 0.4 },
            rotate: { duration: isHovered ? 10 : 24, repeat: Infinity, ease: 'linear' },
          }}
          className="hidden lg:flex pointer-events-none absolute -top-5 -right-5 z-10 w-16 h-16 items-center justify-center"
        >
          <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke={isHovered ? '#60A5FA' : 'rgba(29,78,216,0.4)'}
              strokeWidth="1.25"
              strokeDasharray="6 6"
            />
            <circle
              cx="32"
              cy="4"
              r="2.5"
              fill={isHovered ? '#60A5FA' : '#1D4ED8'}
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import ParticleNetwork from "./ParticleNetwork";
import { Button } from "./ui/button";

/**
 * HeroSection — Cinematic Scrollytelling
 *
 * Architecture:
 * - Outer container: 200vh tall → creates scroll runway
 * - Sticky viewport: stays pinned while user scrolls through
 * - Scroll phases:
 *   Phase 1 (0–30%): Name entrance with staggered character animation
 *   Phase 2 (30–65%): Role + positioning lines reveal
 *   Phase 3 (65–100%): CTA appears, background fades for transition
 *
 * Background: ParticleNetwork (interconnected nodes + parallax drift)
 * Colors: Theme-variable driven (--hero-node, --hero-accent, --hero-glow)
 */

// ——————————————————————————————————————
// Animated Text Components
// ——————————————————————————————————————

/** Splits text into individually animated characters */
function StaggeredText({
  text,
  className = "",
  charDelay = 0.04,
  startDelay = 0,
}: {
  text: string;
  className?: string;
  charDelay?: number;
  startDelay?: number;
}) {
  const chars = text.split("");

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: charDelay,
            delayChildren: startDelay,
          },
        },
      }}
    >
      {chars.map((char, i) => (
        <motion.span
          key={`${char}-${i}`}
          className="inline-block"
          variants={{
            hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
            visible: {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              transition: {
                duration: 0.6,
                ease: "easeOut",
              },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

/** Animated line that reveals on scroll via opacity/y transform */
function ScrollRevealLine({
  children,
  scrollProgress,
  enterAt,
  className = "",
}: {
  children: React.ReactNode;
  scrollProgress: MotionValue<number>;
  enterAt: [number, number];
  className?: string;
}) {
  const opacity = useTransform(
    scrollProgress,
    [enterAt[0], enterAt[1]],
    [0, 1],
  );
  const y = useTransform(scrollProgress, [enterAt[0], enterAt[1]], [30, 0]);
  const blur = useTransform(
    scrollProgress,
    [enterAt[0], enterAt[1]],
    ["blur(6px)", "blur(0px)"],
  );

  return (
    <motion.div className={className} style={{ opacity, y, filter: blur }}>
      {children}
    </motion.div>
  );
}

// ——————————————————————————————————————
// Parallax Depth Layers
// ——————————————————————————————————————
function DepthLayers({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  // Large faint ring — back layer (slowest)
  const ringY = useTransform(scrollProgress, [0, 1], [0, -60]);
  const ringOpacity = useTransform(
    scrollProgress,
    [0, 0.5, 1],
    [0.08, 0.12, 0],
  );
  const ringScale = useTransform(scrollProgress, [0, 1], [1, 1.15]);

  // Medium accent rectangle — mid layer
  const rectY = useTransform(scrollProgress, [0, 1], [0, -100]);
  const rectOpacity = useTransform(scrollProgress, [0, 0.4, 1], [0.06, 0.1, 0]);
  const rectRotate = useTransform(scrollProgress, [0, 1], [12, 25]);

  // Small diamond accent — front layer (fastest)
  const diamondY = useTransform(scrollProgress, [0, 1], [0, -160]);
  const diamondOpacity = useTransform(
    scrollProgress,
    [0, 0.3, 1],
    [0.1, 0.15, 0],
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Back ring */}
      <motion.div
        className="absolute rounded-full border"
        style={{
          width: 600,
          height: 600,
          top: "10%",
          right: "-10%",
          borderColor: "var(--hero-accent)",
          y: ringY,
          opacity: ringOpacity,
          scale: ringScale,
        }}
      />

      {/* Mid rectangle */}
      <motion.div
        className="absolute rounded-lg border"
        style={{
          width: 200,
          height: 200,
          top: "60%",
          left: "5%",
          borderColor: "var(--hero-node)",
          y: rectY,
          opacity: rectOpacity,
          rotate: rectRotate,
        }}
      />

      {/* Front diamond */}
      <motion.div
        className="absolute rounded-sm border"
        style={{
          width: 80,
          height: 80,
          top: "35%",
          right: "15%",
          borderColor: "var(--hero-accent)",
          rotate: 45,
          y: diamondY,
          opacity: diamondOpacity,
        }}
      />

      {/* Extra subtle circle left */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 12,
          height: 12,
          top: "25%",
          left: "20%",
          background: "var(--hero-node)",
          y: useTransform(scrollProgress, [0, 1], [0, -80]),
          opacity: useTransform(scrollProgress, [0, 0.5, 1], [0.2, 0.3, 0]),
        }}
      />
    </div>
  );
}

// ——————————————————————————————————————
// Scroll Progress Indicator
// ——————————————————————————————————————
function ScrollIndicator({
  scrollProgress,
}: {
  scrollProgress: MotionValue<number>;
}) {
  const opacity = useTransform(scrollProgress, [0, 0.15, 0.25], [1, 1, 0]);
  const y = useTransform(scrollProgress, [0, 0.2], [0, 10]);

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ opacity, y }}
    >
      <span className="text-xs tracking-widest uppercase">Scroll</span>
      <motion.div
        className="w-5 h-8 rounded-full border-2 flex justify-center pt-1"
        style={{ borderColor: "var(--hero-node)" }}
      >
        <motion.div
          className="w-1 h-2 rounded-full"
          style={{ background: "var(--hero-node)" }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </motion.div>
  );
}

// ——————————————————————————————————————
// Main HeroSection
// ——————————————————————————————————————
export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll through the 200vh hero container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Phase-based content opacity
  // The entire hero content fades out at the tail end for a smooth handoff
  const heroContentOpacity = useTransform(
    scrollYProgress,
    [0, 0.85, 1],
    [1, 1, 0],
  );

  const boxStyle = {
    filter:
      "drop-shadow(0 1px 5px var(--primary-foreground)) drop-shadow(0 5px 10px var(--primary))",
  };

  return (
    <section ref={containerRef} className="relative h-[200vh]">
      {/* Sticky viewport — stays pinned while scrolling through container */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">
        {/* Background gradient base */}
        <div className="absolute inset-0" />

        {/* Radial glow behind text cluster */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 45%, var(--hero-glow), transparent 70%)",
            opacity: useTransform(scrollYProgress, [0, 0.4, 1], [0.06, 0.1, 0]),
          }}
        />

        {/* Parallax depth layers (geometric shapes) */}
        <DepthLayers scrollProgress={scrollYProgress} />

        {/* Particle network background */}
        <ParticleNetwork scrollProgress={scrollYProgress} />

        {/* ——— Text Content ——— */}
        <motion.div
          className="relative z-10 text-center max-w-5xl px-6"
          style={{ opacity: heroContentOpacity }}
        >
          {/* Phase 1: Name — immediate entrance with stagger */}
          <h1 className="mb-4 flex gap-4 justify-center flex-wrap">
            <StaggeredText
              text="Courtez"
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
              charDelay={0.045}
              startDelay={0.3}
            />

            <StaggeredText
              text="Jones"
              className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight"
              charDelay={0.045}
              startDelay={0.5}
            />
          </h1>

          {/* Phase 2: Role — scroll-triggered reveal */}
          <ScrollRevealLine
            scrollProgress={scrollYProgress}
            enterAt={[0.05, 0.2]}
            className="mb-6"
          >
            <p
              className="text-xl sm:text-2xl md:text-3xl font-medium tracking-wide"
              style={{ color: "var(--hero-node)" }}
            >
              Senior Software Engineer &amp; Systems Analyst
            </p>
          </ScrollRevealLine>

          {/* Phase 2b: Positioning statement */}
          <ScrollRevealLine
            scrollProgress={scrollYProgress}
            enterAt={[0.1, 0.35]}
            className="mb-4"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
              I design and build enterprise-grade systems.
            </p>
          </ScrollRevealLine>

          {/* Phase 2c: How-he-thinks line */}
          <ScrollRevealLine
            scrollProgress={scrollYProgress}
            enterAt={[0.15, 0.45]}
            className="mb-10"
          >
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Clean code. Strong systems. Real impact.
            </p>
          </ScrollRevealLine>

          {/* Phase 3: CTA */}
          <ScrollRevealLine
            scrollProgress={scrollYProgress}
            enterAt={[0.2, 0.55]}
          >
            <a
              href="/#projects"
            >
              <Button
                size="lg"
                style={boxStyle}
              >
                Explore My Work
              </Button>
            </a>
          </ScrollRevealLine>
        </motion.div>

        {/* Scroll indicator — visible only at top */}
        <ScrollIndicator scrollProgress={scrollYProgress} />
      </div>
    </section>
  );
}

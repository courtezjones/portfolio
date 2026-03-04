import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import {
  aboutStaggerContainer,
  timelineCardEntrance,
  timelineCardFromLeft,
  timelineCardFromRight,
  timelineNodeEntrance,
  narrativeEntrance,
} from "../lib/animations";
import { Code2, Building2, Shield, Rocket } from "lucide-react";

/**
 * AboutSection — Journey Timeline
 *
 * Mobile-first vertical timeline with scroll-linked progress line.
 * - Mobile: left-aligned rail with content cards to the right
 * - Desktop (md+): centered rail with alternating left/right cards
 * Minimal dot markers with icons on the rail — clean and focused.
 */

interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accent: string;
}

const milestones: TimelineMilestone[] = [
  {
    year: "2017–2019",
    title: "Foundation & Community",
    description:
      "Participated in a college-affiliated apprenticeship building full-stack applications for local organizations and introducing elementary students to programming. Real-world projects, real community impact.",
    icon: <Code2 className="w-4 h-4 text-background" />,
    accent: "from-emerald-400 to-cyan-400",
  },
  {
    year: "2019–2023",
    title: "Enterprise & Leadership",
    description:
      "Lead Software Engineer and government contractor supporting statewide enterprise applications. Led front-end initiatives, designed database schemas, built CI/CD pipelines, onboarded developers, and served as the escalation point for production incidents across systems over a decade old.",
    icon: <Building2 className="w-4 h-4 text-background" />,
    accent: "from-emerald-400 to-cyan-400",
  },
  {
    year: "2024–2025",
    title: "Infrastructure Security",
    description:
      "Modernized the internal infrastructure for a medium-sized company after they experienced a ransomware incident. Rebuilt server environments, improved operational reliability, and strengthened security posture.",
    icon: <Shield className="w-4 h-4 text-background" />,
    accent: "from-emerald-400 to-cyan-400",
  },
  {
    year: "2025–Present",
    title: "Building What Lasts",
    description:
      "Currently freelancing. In addition, building scalable tools and pursuing projects that strengthen communities.",
    icon: <Rocket className="w-4 h-4 text-background" />,
    accent: "from-emerald-400 to-cyan-400",
  },
];

/* ———————————————————————————————————————
   TimelineDot — minimal marker on the rail
   with icon inside
   ——————————————————————————————————————— */
function TimelineDot({
  icon,
  index,
}: {
  icon: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      variants={timelineNodeEntrance}
      className="relative z-10 w-7 h-7 md:w-10 md:h-10 rounded-full bg-primary shadow-sm shadow-primary/40 shrink-0 flex items-center justify-center font-semibold"
    >
      {icon}

      {/* Subtle pulse */}
      <motion.div
        className="absolute inset-0 rounded-full bg-chart-4/60"
        animate={{
          scale: [1.1, 1.2, 1.1, 1.2],
          opacity: [0.2, 0.2, 0.2, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.8,
          ease: "easeOut",
        }}
      />
    </motion.div>
  );
}

/* ———————————————————————————————————————
   MilestoneContent — card interior
   Glassmorphism card with top gradient bar
   ——————————————————————————————————————— */
function MilestoneContent({
  milestone,
  align,
}: {
  milestone: TimelineMilestone;
  align: "left" | "right";
}) {
  return (
    <div
      className={`
        group relative rounded-xl p-5 md:p-6
        bg-card/70 backdrop-blur-md
        border border-primary/30 hover:bg-primary/10
        transition-colors duration-300
        shadow-xl
        ${align === "right" ? "md:ml-auto" : ""}
      `}
    >
      <span
        className={`inline-block text-xs md:text-sm font-mono font-semibold tracking-wider mb-2 header-text`}
      >
        {milestone.year}
      </span>
      <h3 className="text-lg md:text-xl font-bold mb-2">{milestone.title}</h3>
      <p className="text-card-foreground leading-relaxed text-sm md:text-base">
        {milestone.description}
      </p>
    </div>
  );
}

/* ———————————————————————————————————————
   TimelineCard — individual milestone
   Mobile: content right of the rail
   Desktop: alternates left/right
   ——————————————————————————————————————— */
function TimelineCard({
  milestone,
  index,
}: {
  milestone: TimelineMilestone;
  index: number;
}) {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={aboutStaggerContainer}
      className={`
        relative flex items-center gap-5
        md:gap-0
        ${isEven ? "md:flex-row" : "md:flex-row-reverse"}
      `}
    >
      {/* ── Mobile card (always right of rail) ── */}
      <motion.div
        variants={timelineCardEntrance}
        className="flex-1 min-w-0 md:hidden"
      >
        <MilestoneContent milestone={milestone} align="left" />
      </motion.div>

      {/* ── Desktop card (alternating side) ── */}
      <motion.div
        variants={isEven ? timelineCardFromLeft : timelineCardFromRight}
        className={`
          hidden md:block md:flex-1 md:min-w-0
          ${isEven ? "md:pr-30 md:text-right" : "md:pl-30 md:text-left"}
        `}
      >
        <MilestoneContent
          milestone={milestone}
          align={isEven ? "right" : "left"}
        />
      </motion.div>

      {/* ── Rail dot with icon ── */}
      <TimelineDot icon={milestone.icon} index={index} />

      {/* ── Desktop opposite-side spacer ── */}
      <div className="hidden md:block md:flex-1" />
    </motion.div>
  );
}

/* ———————————————————————————————————————
   ScrollProgressLine — scroll-linked rail
   Fills as the user scrolls through the
   timeline section
   ——————————————————————————————————————— */
function ScrollProgressLine({
  containerRef,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  });

  const height = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className={`
        absolute top-0 bottom-0
        left-1.5 md:left-1/2
        w-px -translate-x-1/2
      `}
    >
      {/* Background rail */}
      <div className="absolute inset-0 bg-foreground/20 dark:bg-muted" />

      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-linear-to-b from-primary/20 via-primary/40 to-primary origin-top"
        style={{ height }}
      />

      {/* Glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-0.75 bg-linear-to-b from-primary/10 via-primary/30 to-chart-4/30 blur-sm origin-top"
        style={{ height }}
      />
    </div>
  );
}

export default function AboutSection() {
  const timelineRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="about"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 md:w-200 md:h-200 bg-primary/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            default: { type: "spring", visualDuration: 0.8, bounce: 0.15 },
            opacity: { duration: 0.6, ease: "easeOut" },
            filter: { duration: 0.6, ease: "easeOut" },
          }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="header-text">The Journey</span>
          </h2>
          <p className="text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            From tinkering with hardware to leading enterprise projects, my
            journey has been driven by curiosity and a passion for building.
          </p>
        </motion.div>

        {/* ── Timeline ── */}
        <div ref={timelineRef} className="relative">
          <ScrollProgressLine containerRef={timelineRef} />

          <div className="relative z-10 space-y-8 md:space-y-14">
            {milestones.map((milestone, i) => (
              <TimelineCard
                key={milestone.year}
                milestone={milestone}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ── Narrative Footer ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={aboutStaggerContainer}
          className="mt-16 md:mt-24 max-w-3xl mx-auto text-center space-y-5 md:space-y-6
          group relative rounded-xl p-5 md:p-6
        bg-card/70 backdrop-blur-md
        border border-primary/30 hover:bg-primary/10
        transition-colors duration-300
        shadow-xl
          "
        >
          <motion.h3
            variants={narrativeEntrance}
            className="text-xl md:text-2xl font-bold header-text"
          >
            In My Free Time
          </motion.h3>
          <motion.p
            variants={narrativeEntrance}
            className="leading-relaxed text-sm md:text-base"
          >
            I'm a father, a fitness enthusiast, and I know my way around the
            grill. The same curiosity that had me dissecting Xboxes at sixteen
            still drives me today. I believe technology should strengthen
            communities, advance equality, and scale responsibly.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'motion/react'
import {
  aboutStaggerContainer,
  timelineCardEntrance,
  timelineCardFromLeft,
  timelineCardFromRight,
  timelineNodeEntrance,
  narrativeEntrance,
} from '../lib/animations'
import {
  Code2,
  Building2,
  Shield,
  Rocket,
} from 'lucide-react'

/**
 * AboutSection — Journey Timeline
 *
 * Mobile-first vertical timeline with scroll-linked progress line.
 * - Mobile: left-aligned rail with content cards to the right
 * - Desktop (md+): centered rail with alternating left/right cards
 * Minimal dot markers with icons on the rail — clean and focused.
 */

interface TimelineMilestone {
  year: string
  title: string
  description: string
  icon: React.ReactNode
  accent: string
}

const milestones: TimelineMilestone[] = [
  {
    year: '2017–2019',
    title: 'Foundation & Community',
    description:
      'Started in a college-affiliated apprenticeship building full-stack applications for local organizations and introducing elementary students to programming. Real-world execution met community impact from day one.',
    icon: <Code2 className="w-4 h-4" />,
    accent: 'from-emerald-400 to-cyan-400',
  },
  {
    year: '2019–2023',
    title: 'Enterprise & Leadership',
    description:
      'Lead Software Engineer and government contractor supporting statewide enterprise applications. Led front-end initiatives, designed database schemas, built CI/CD pipelines, onboarded developers, and served as the escalation point for production incidents across systems over a decade old.',
    icon: <Building2 className="w-4 h-4" />,
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    year: '2024–2025',
    title: 'Infrastructure Security',
    description:
      'Rebuilt the internal infrastructure for a medium-sized company after they experienced a ransomware incident. Modernized server environments, improved operational reliability, and strengthened security posture.',
    icon: <Shield className="w-4 h-4" />,
    accent: 'from-blue-500 to-violet-500',
  },
  {
    year: '2025–Present',
    title: 'Building What Lasts',
    description:
      'Channeling eight years of enterprise depth, security literacy, and systems thinking into architecture that endures. Building scalable platforms and pursuing tools that strengthen communities.',
    icon: <Rocket className="w-4 h-4" />,
    accent: 'from-violet-500 to-emerald-400',
  },
]

/* ———————————————————————————————————————
   TimelineDot — minimal marker on the rail
   with icon inside
   ——————————————————————————————————————— */
function TimelineDot({ icon, index }: { icon: React.ReactNode; index: number }) {
  return (
    <motion.div
      variants={timelineNodeEntrance}
      className="relative z-10 w-7 h-7 md:w-8 md:h-8 rounded-full bg-linear-to-br from-emerald-400 to-cyan-400 shadow-sm shadow-emerald-400/40 shrink-0 flex items-center justify-center text-slate-900 font-semibold"
    >
      {icon}
      
      {/* Subtle pulse */}
      <motion.div
        className="absolute inset-0 rounded-full bg-emerald-400/40"
        animate={{
          scale: [1, 2.2, 2.2],
          opacity: [0.6, 0, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          delay: index * 0.8,
          ease: 'easeOut',
        }}
      />
    </motion.div>
  )
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
  milestone: TimelineMilestone
  index: number
}) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      variants={aboutStaggerContainer}
      className={`
        relative flex items-center gap-5
        md:gap-0
        ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}
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
          ${isEven ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}
        `}
      >
        <MilestoneContent milestone={milestone} align={isEven ? 'right' : 'left'} />
      </motion.div>

      {/* ── Rail dot with icon ── */}
      <TimelineDot icon={milestone.icon} index={index} />

      {/* ── Desktop opposite-side spacer ── */}
      <div className="hidden md:block md:flex-1" />
    </motion.div>
  )
}

/* ———————————————————————————————————————
   MilestoneContent — card interior
   Glassmorphism card with top gradient bar
   ——————————————————————————————————————— */
function MilestoneContent({
  milestone,
  align,
}: {
  milestone: TimelineMilestone
  align: 'left' | 'right'
}) {
  return (
    <div
      className={`
        group relative rounded-xl p-5 md:p-6
        bg-slate-800/40 backdrop-blur-md
        border border-slate-700/50
        hover:border-emerald-500/30 hover:bg-slate-800/60
        transition-colors duration-300
        ${align === 'right' ? 'md:ml-auto' : ''}
      `}
    >
      {/* Gradient accent bar */}
      <div
        className={`
          absolute top-0 h-px w-2/3 bg-linear-to-r ${milestone.accent} opacity-50
          group-hover:opacity-100 transition-opacity duration-300
          ${align === 'right' ? 'right-0 rounded-tr-xl' : 'left-0 rounded-tl-xl'}
        `}
      />

      <span
        className={`inline-block text-xs md:text-sm font-mono font-semibold tracking-wider bg-linear-to-r ${milestone.accent} bg-clip-text text-transparent mb-2`}
      >
        {milestone.year}
      </span>
      <h3 className="text-lg md:text-xl font-bold text-slate-100 mb-2">
        {milestone.title}
      </h3>
      <p className="text-slate-400 leading-relaxed text-sm md:text-base">
        {milestone.description}
      </p>
    </div>
  )
}

/* ———————————————————————————————————————
   ScrollProgressLine — scroll-linked rail
   Fills as the user scrolls through the
   timeline section
   ——————————————————————————————————————— */
function ScrollProgressLine({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  })

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 25,
    restDelta: 0.001,
  })

  const height = useTransform(smoothProgress, [0, 1], ['0%', '100%'])

  return (
    <div
      className={`
        absolute top-0 bottom-0
        left-1.5 md:left-1/2
        w-px -translate-x-1/2
      `}
    >
      {/* Background rail */}
      <div className="absolute inset-0 bg-slate-700/30" />

      {/* Animated fill */}
      <motion.div
        className="absolute top-0 left-0 w-full bg-linear-to-b from-emerald-400 via-cyan-400 to-violet-500 origin-top"
        style={{ height }}
      />

      {/* Glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-0.75 bg-linear-to-b from-emerald-400/50 via-cyan-400/30 to-violet-500/50 blur-sm origin-top"
        style={{ height }}
      />
    </div>
  )
}

export default function AboutSection() {
  const timelineRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="about"
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <motion.div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-125 h-125 md:w-200 md:h-200 bg-emerald-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* ── Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{
            default: { type: 'spring', visualDuration: 0.8, bounce: 0.15 },
            opacity: { duration: 0.6, ease: 'easeOut' },
            filter: { duration: 0.6, ease: 'easeOut' },
          }}
          viewport={{ once: true }}
          className="mb-14 md:mb-20 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              The Journey
            </span>
          </h2>
          <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From disassembling Xbox CD drives out of curiosity to rebuilding
            statewide infrastructure. Every chapter built on the last.
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
          viewport={{ once: true, margin: '-40px' }}
          variants={aboutStaggerContainer}
          className="mt-16 md:mt-24 max-w-3xl mx-auto text-center space-y-5 md:space-y-6"
        >
          <motion.h3
            variants={narrativeEntrance}
            className="text-xl md:text-2xl font-bold text-slate-100"
          >
            Outside of work
          </motion.h3>
          <motion.p
            variants={narrativeEntrance}
            className="text-slate-400 leading-relaxed text-sm md:text-base"
          >
            I'm a father, a fitness enthusiast, and someone who grew up
            watching{' '}
            <span className="text-blue-400 font-medium">Dragon Ball</span> and{' '}
            <span className="text-orange-500 font-medium">Naruto</span>. I've
            always been drawn to stories about strategic thinking, relentless
            growth, and the will to protect what matters.
          </motion.p>
          <motion.p
            variants={narrativeEntrance}
            className="text-slate-400 leading-relaxed text-sm md:text-base"
          >
            The same curiosity that had me fixing consoles at twelve still
            drives me today. I believe technology should strengthen communities,
            advance equality, and scale responsibly.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

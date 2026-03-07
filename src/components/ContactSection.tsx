import { motion } from "motion/react";
import { staggerContainerInView, staggerChildFadeUp } from "../lib/animations";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";

/**
 * ContactSection — Mobile-first CTA with animated contact channels
 *
 * Centered layout with staggered card reveals, spring hover effects,
 * and a glowing CTA email button.
 */

const contactChannels = [
  {
    label: "Email",
    value: "courtezjones@yahoo.com",
    href: "mailto:courtezjones@yahoo.com",
    icon: <Mail className="w-6 h-6" />,
    description: "Best way to reach me directly",
    color: "emerald",
  },
  {
    label: "GitHub",
    value: "gitcourtez",
    href: "https://github.com/gitcourtez",
    icon: <Github className="w-6 h-6" />,
    description: "Explore my code and contributions",
    color: "purple",
  },
  {
    label: "LinkedIn",
    value: "courtezjones",
    href: "https://www.linkedin.com/in/courtezjones",
    icon: <Linkedin className="w-6 h-6" />,
    description: "Let's connect professionally",
    color: "blue",
  },
];

const channelColors: Record<
  string,
  { border: string; bg: string; glow: string; iconBg: string }
> = {
  emerald: {
    border: "hover:border-emerald-500/40",
    bg: "hover:bg-emerald-500/[0.04]",
    glow: "0 0 40px rgba(34, 197, 94, 0.12)",
    iconBg: "bg-emerald-500/10 text-emerald-400",
  },
  purple: {
    border: "hover:border-purple-500/40",
    bg: "hover:bg-purple-500/[0.04]",
    glow: "0 0 40px rgba(128, 90, 213, 0.12)",
    iconBg: "bg-purple-500/10 text-purple-400",
  },
  blue: {
    border: "hover:border-blue-500/40",
    bg: "hover:bg-blue-500/[0.04]",
    glow: "0 0 40px rgba(59, 130, 246, 0.12)",
    iconBg: "bg-blue-500/10 text-blue-400",
  },
};

/** Container with heavier stagger for the channel cards */
const channelStagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren" as const,
      staggerChildren: 0.18,
      delayChildren: 0.3,
    },
  },
};

/** Card entrance — slide up + scale + blur clear */
const channelCardEntrance = {
  hidden: { opacity: 0, y: 50, scale: 0.92, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      default: { type: "spring" as const, visualDuration: 0.7, bounce: 0.2 },
      opacity: { duration: 0.5, ease: "easeOut" as const },
      filter: { duration: 0.6, ease: "easeOut" as const },
    },
  },
};

/** Decorative line draw animation */
const lineReveal = {
  hidden: { scaleX: 0, opacity: 0 },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      delay: 0.2,
    },
  },
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Layered background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-150 sm:w-225 h-75 sm:h-112.5 bg-emerald-500/3 rounded-full blur-3xl" />
        <div className="absolute top-1/4 right-0 w-75 sm:w-100 h-75 sm:h-100 bg-cyan-500/2 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-62.5 sm:w-87.5 h-62.5 sm:h-87.5 bg-blue-500/2 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={staggerContainerInView}
          className="mb-10 sm:mb-14 md:mb-16 text-center"
        >
          <motion.h2
            variants={staggerChildFadeUp}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6"
          >
            <span className="header-text">Let's Work</span>
            <br />
            <span>Together</span>
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            variants={lineReveal}
            className="mx-auto mb-5 sm:mb-6 h-px w-24 sm:w-32 bg-linear-to-r from-transparent via-emerald-500/50 to-transparent origin-center"
          />

          <motion.p
            variants={staggerChildFadeUp}
            className="text-base sm:text-lg max-w-xl mx-auto leading-relaxed px-2"
          >
            I like building things. Reach out for any development or system
            design opportunities.
          </motion.p>
        </motion.div>

        {/* Contact Channel Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={channelStagger}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mb-10 sm:mb-14"
        >
          {contactChannels.map((channel) => {
            const colors = channelColors[channel.color];
            return (
              <motion.a
                key={channel.label}
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  channel.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                variants={channelCardEntrance}
                whileHover={{
                  y: -8,
                  scale: 1.03,
                  boxShadow: colors.glow,
                }}
                whileTap={{ scale: 0.97 }}
                transition={{
                  type: "spring",
                  visualDuration: 0.3,
                  bounce: 0.25,
                }}
                className={`group relative flex flex-col items-center text-center p-6 sm:p-7 md:p-8 rounded-2xl border border-slate-700/50 bg-card backdrop-blur-sm ${colors.border} ${colors.bg} transition-colors cursor-pointer`}
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${colors.iconBg} flex items-center justify-center mb-4 sm:mb-5 transition-transform group-hover:scale-110`}
                >
                  {channel.icon}
                </div>

                {/* Label */}
                <span className="text-[11px] uppercase tracking-widest font-medium mb-1.5">
                  {channel.label}
                </span>

                {/* Value */}
                <p className="text-sm sm:text-base font-semibold mb-2 break-all sm:break-normal">
                  {channel.value}
                </p>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                  {channel.description}
                </p>

                {/* Arrow indicator */}
                <div className="absolute top-4 right-4 sm:top-5 sm:right-5">
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-slate-300 transition-colors" />
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* CTA Email Button */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            default: { type: "spring", visualDuration: 0.7, bounce: 0.15 },
            opacity: { duration: 0.5, ease: "easeOut" },
            filter: { duration: 0.5, ease: "easeOut" },
            delay: 0.6,
          }}
          className="text-center"
        >
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="mt-4 sm:mt-5 text-xs sm:text-sm text-slate-500"
          >
            courtezjones@yahoo.com
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}

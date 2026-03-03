import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { staggerChildScaleIn } from "../lib/animations";
import {
  Code2,
  Layers,
  Library,
  TestTube2,
  Server,
  ShieldCheck,
} from "lucide-react";
import { Badge } from "./ui/badge";

/**
 * SkillsSection — Categorized Skill Cards with Glow
 *
 * Skills organized by: Languages | Frameworks | Libraries | Testing | Infrastructure | Security
 * Each skill: name, proficiency signal, 1-2 project examples
 * Animation: staggered entrance on scroll, hover glow effect
 */

interface Skill {
  name: string;
  /** 1-5 proficiency level (displayed as bar fill) */
  level: number;
  /** Brief context — where this skill was applied */
  context: string;
}

interface SkillCategory {
  title: string;
  icon: React.ReactNode;
  accent: string;
  glowColor: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Languages",
    icon: <Code2 className="w-5 h-5" />,
    accent: "from-emerald-400 to-green-500",
    glowColor: "rgba(34, 197, 94, 0.12)",
    skills: [
      {
        name: "JavaScript / TypeScript",
        level: 5,
        context: "Full-stack - from legacy jQuery to modern Next.js, React",
      },
      {
        name: "C#",
        level: 4,
        context:
          "Enterprise ASP.NET (including Dynamics 365 / Power Platform integrations)",
      },
      {
        name: "SQL",
        level: 4,
        context: "SQL Server - schema design, migrations, stored procedures",
      },
      {
        name: "HTML / CSS",
        level: 5,
        context: "Semantic markup, responsive design, accessibility-first",
      },
      {
        name: "Python",
        level: 4,
        context: "Data analysis, scripting, automation",
      },
    ],
  },
  {
    title: "Frameworks",
    icon: <Layers className="w-5 h-5" />,
    accent: "from-cyan-400 to-blue-500",
    glowColor: "rgba(34, 211, 238, 0.12)",
    skills: [
      {
        name: "Next.js / React",
        level: 5,
        context: "One Drop Video - SSR, API routes, Vercel deployment",
      },
      {
        name: "ASP.NET",
        level: 4,
        context: "Enterprise apps, government contractor - 4+ years",
      },
      {
        name: "Entity Framework",
        level: 4,
        context: "Database-first & code-first ORM in enterprise systems",
      },
      {
        name: "Laravel",
        level: 4,
        context:
          "Legacy PHP app maintenance - security patches, feature additions",
      },
    ],
  },
  {
    title: "Libraries",
    icon: <Library className="w-5 h-5" />,
    accent: "from-blue-500 to-violet-500",
    glowColor: "rgba(99, 102, 241, 0.12)",
    skills: [
      {
        name: "Tailwind CSS",
        level: 5,
        context: "Utility-first styling across all modern projects",
      },
      {
        name: "ShadCN / Base UI",
        level: 5,
        context: "Accessible component primitives",
      },
      {
        name: "Dapper",
        level: 4,
        context: "Lightweight ORM for high-performance data access in C#",
      },
      {
        name: "Clerk",
        level: 4,
        context: "Authentication & user management - OAuth, OpenID Connect",
      },
    ],
  },
  {
    title: "Testing",
    icon: <TestTube2 className="w-5 h-5" />,
    accent: "from-violet-500 to-purple-500",
    glowColor: "rgba(139, 92, 246, 0.12)",
    skills: [
      {
        name: "Manual QA Collaboration",
        level: 5,
        context: "Cross-team QA - test plans, bug triage, regression",
      },
      {
        name: "Unit Testing",
        level: 5,
        context: "xUnit, Jest for enterprise test suites",
      },
      {
        name: "Integration Testing",
        level: 4,
        context: "API contract testing, database integration",
      },
    ],
  },
  {
    title: "Infrastructure",
    icon: <Server className="w-5 h-5" />,
    accent: "from-amber-400 to-orange-500",
    glowColor: "rgba(251, 191, 36, 0.12)",
    skills: [
      {
        name: "Git / Version Control",
        level: 5,
        context: "Branching strategies, code review, merge workflows",
      },
      {
        name: "CI/CD Pipelines",
        level: 4,
        context:
          "Azure DevOps, GitHub Actions, Vercel - build + deploy automation",
      },
      {
        name: "SQL Server Administration",
        level: 4,
        context: "Backups, migrations, performance tuning",
      },
      {
        name: "Server Environment Setup",
        level: 4,
        context: "New installations and infrastructure rebuilds",
      },
    ],
  },
  {
    title: "Security",
    icon: <ShieldCheck className="w-5 h-5" />,
    accent: "from-red-400 to-rose-500",
    glowColor: "rgba(251, 113, 133, 0.12)",
    skills: [
      {
        name: "CompTIA Security+",
        level: 4,
        context: "Certified - threat analysis, risk management",
      },
      {
        name: "CompTIA Network+",
        level: 4,
        context: "Certified - network architecture, troubleshooting",
      },
      {
        name: "OAuth / Auth Security",
        level: 5,
        context: "Enterprise authentication - OAuth, OpenID Connect, ID.me",
      },
      {
        name: "Infrastructure Hardening",
        level: 4,
        context:
          "Server security best practices - patching, access controls, monitoring",
      },
    ],
  },
];

function ProficiencyBar({ level, accent }: { level: number; accent: string }) {
  return (
    <div className="flex gap-1 items-center">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className={`h-1.5 rounded-full ${
            i < level ? `bg-linear-to-r ${accent}` : "bg-slate-700"
          }`}
          style={{ width: i < level ? "100%" : "100%" }}
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: i * 0.08, duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        />
      ))}
    </div>
  );
}

function SkillCard({ category }: { category: SkillCategory }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      variants={staggerChildScaleIn}
      whileHover={{
        y: -4,
        boxShadow: `0 20px 60px ${category.glowColor}, 0 8px 24px rgba(0, 0, 0, 0.3)`,
      }}
      transition={{ type: "spring", visualDuration: 0.3, bounce: 0.2 }}
      className="relative rounded-xl border border-slate-700/50 bg-card backdrop-blur-sm overflow-hidden cursor-pointer group"
      onClick={() => setIsExpanded(!isExpanded)}
    >
      {/* Top glow accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-px bg-linear-to-r ${category.accent} opacity-50 group-hover:opacity-100 transition-opacity`}
      />

      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-10 h-10 rounded-lg bg-linear-to-br ${category.accent} flex items-center justify-center`}
          >
            {category.icon}
          </div>
          <div>
            <h3 className="text-lg font-bold">{category.title}</h3>
            <span className="text-xs text-muted-foreground">
              {category.skills.length} skills
            </span>
          </div>
          {/* Expand indicator */}
          <motion.div
            className="ml-auto text-muted-foreground"
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </motion.div>
        </div>

        {/* Skill names preview (always visible) */}
        <div className="flex flex-wrap gap-1.5">
          {category.skills.map((skill) => (
            <Badge
              key={skill.name}
              variant="secondary"
              className="text-xs px-2.5 py-1 dark:bg-slate-700/50 dark:text-slate-300 dark:border-slate-600/30"
            >
              {skill.name}
            </Badge>
          ))}
        </div>
      </div>

      {/* Expanded detail */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 space-y-4 border-t border-slate-700/30 pt-4">
              {category.skills.map((skill) => (
                <div key={skill.name} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {skill.name}
                    </span>
                  </div>
                  <ProficiencyBar
                    level={skill.level}
                    accent={category.accent}
                  />
                  <p className="text-xs leading-relaxed">
                    {skill.context}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-violet-500/[0.02] rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-primary to-cyan-500 bg-clip-text text-transparent">
              Skills & Technologies
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            An overview of my technical expertise. Each skill includes a
            proficiency level and real-world context to demonstrate how I've
            applied these technologies in various projects.
          </p>
        </motion.div>

        {/* Skill Category Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                when: "beforeChildren",
                staggerChildren: 0.1,
                delayChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {skillCategories.map((category) => (
            <SkillCard key={category.title} category={category} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

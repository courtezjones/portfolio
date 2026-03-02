/**
 * Motion.js Animation Primitives
 * Reusable animation patterns for the portfolio
 */

// Fade in animation - simple opacity entrance
export const fadeInAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

// Slide in from bottom - reveals content as it moves up
export const slideUpAnimation = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: 'easeOut' }
}

// Slide in from left - horizontal entrance
export const slideInLeftAnimation = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.7, ease: 'easeOut' }
}

// Stagger container - for animating child elements with delay
export const staggerContainerAnimation = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
}

// Staggered child item
export const staggerItemAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

// Scale entrance - emphasis on reveal
export const scaleInAnimation = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.6, ease: 'easeOut' }
}

// Hover elevation - projects, cards
export const hoverElevateAnimation = {
  whileHover: {
    y: -5,
    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)'
  },
  transition: { duration: 0.3 }
}

// Scroll-triggered fade in (useInView compatible)
export const scrollFadeInAnimation = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { duration: 0.8 },
  viewport: { once: true, margin: '-100px' }
}

// Parallax effect for hero images
export const parallaxAnimation = {
  initial: { y: 0 },
  whileInView: { y: -20 },
  transition: { duration: 1, type: 'tween' },
  viewport: { once: false }
}

// Title entrance with character-level animation (cinematic)
export const titleCinematicAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 1,
    ease: 'easeOut',
    staggerChildren: 0.05,
  }
}

// ——————————————————————————————————————
// Hero-specific animation presets
// ——————————————————————————————————————

/** Staggered character reveal (used by StaggeredText) */
export const heroCharVariants = {
  hidden: { opacity: 0, y: 30, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

/** Hero content fade-out on deep scroll */
export const heroFadeOutRange = {
  input: [0, 0.85, 1],
  output: [1, 1, 0],
}

/** Node entrance animation */
export const heroNodeEntrance = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1 },
  transition: { duration: 1.2, ease: 'easeOut' },
}

/** Scroll indicator bounce */
export const scrollIndicatorBounce = {
  animate: { y: [0, 8, 0] },
  transition: { duration: 1.8, repeat: Infinity, ease: 'easeInOut' },
}

// ——————————————————————————————————————
// Phase 3: Section animation presets
// ——————————————————————————————————————

/** Stagger container for whileInView — children animate sequentially */
export const staggerContainerInView = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren' as const,
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

/** Stagger child — fade up with blur clear */
export const staggerChildFadeUp = {
  hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      default: { type: 'spring' as const, visualDuration: 0.6, bounce: 0.15 },
      opacity: { duration: 0.5, ease: 'easeOut' as const },
      filter: { duration: 0.5, ease: 'easeOut' as const },
    },
  },
}

/** Stagger child — slide in from left */
export const staggerChildSlideLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      default: { type: 'spring' as const, visualDuration: 0.6, bounce: 0.15 },
      opacity: { duration: 0.4, ease: 'easeOut' as const },
    },
  },
}

/** Stagger child — scale reveal with glow */
export const staggerChildScaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      default: { type: 'spring' as const, visualDuration: 0.5, bounce: 0.2 },
      opacity: { duration: 0.4, ease: 'easeOut' as const },
    },
  },
}

/** Timeline node entrance — ping + scale */
export const timelineNodeEntrance = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring' as const,
      visualDuration: 0.6,
      bounce: 0.3,
    },
  },
}

/** Timeline connector line grow */
export const timelineLineGrow = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
}

/** Card hover with glow effect */
export const cardHoverGlow = {
  whileHover: {
    y: -6,
    boxShadow: '0 20px 60px rgba(34, 197, 94, 0.15), 0 8px 24px rgba(0, 0, 0, 0.3)',
    borderColor: 'rgba(34, 197, 94, 0.4)',
  },
  transition: {
    type: 'spring',
    visualDuration: 0.3,
    bounce: 0.2,
  },
}

// ——————————————————————————————————————
// About Section animation presets
// ——————————————————————————————————————

/** Timeline card entrance — slides up with scale and blur clear */
export const timelineCardEntrance = {
  hidden: { opacity: 0, y: 50, scale: 0.92, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      default: { type: 'spring' as const, visualDuration: 0.7, bounce: 0.18 },
      opacity: { duration: 0.5, ease: 'easeOut' as const },
      filter: { duration: 0.6, ease: 'easeOut' as const },
    },
  },
}

/** Timeline card entrance from left (desktop alternating) */
export const timelineCardFromLeft = {
  hidden: { opacity: 0, x: -60, scale: 0.92, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      default: { type: 'spring' as const, visualDuration: 0.7, bounce: 0.18 },
      opacity: { duration: 0.5, ease: 'easeOut' as const },
      filter: { duration: 0.6, ease: 'easeOut' as const },
    },
  },
}

/** Timeline card entrance from right (desktop alternating) */
export const timelineCardFromRight = {
  hidden: { opacity: 0, x: 60, scale: 0.92, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      default: { type: 'spring' as const, visualDuration: 0.7, bounce: 0.18 },
      opacity: { duration: 0.5, ease: 'easeOut' as const },
      filter: { duration: 0.6, ease: 'easeOut' as const },
    },
  },
}

/** Narrative section entrance — gentle float up with opacity */
export const narrativeEntrance = {
  hidden: { opacity: 0, y: 40, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      default: { type: 'spring' as const, visualDuration: 0.8, bounce: 0.1 },
      opacity: { duration: 0.7, ease: 'easeOut' as const },
      filter: { duration: 0.6, ease: 'easeOut' as const },
    },
  },
}

/** Stagger container for about section — slower cadence for dramatic feel */
export const aboutStaggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: 'beforeChildren' as const,
      staggerChildren: 0.2,
      delayChildren: 0.15,
    },
  },
}

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

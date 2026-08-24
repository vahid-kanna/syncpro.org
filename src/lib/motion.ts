import { Transition, Variants } from "framer-motion";

// Spring transitions inspired by Zero (landing.love/sites/zero)
export const springTransition: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

export const softSpringTransition: Transition = {
  type: "spring",
  stiffness: 180,
  damping: 22,
};

export const kineticTextFlipVariants: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    rotateX: -45,
  },
  animate: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    rotateX: 45,
    transition: {
      duration: 0.35,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.05,
    },
  },
};

export const cardHoverVariants: Variants = {
  rest: {
    y: 0,
    scale: 1,
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.5)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
  hover: {
    y: -6,
    scale: 1.015,
    boxShadow: "0 24px 50px rgba(46, 98, 255, 0.25), 0 0 0 1px rgba(46, 98, 255, 0.45)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
};

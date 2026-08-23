import { Transition, Variants } from "framer-motion";

// Spring transitions inspired by Jitter.video motion design
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

export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
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
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.4)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
  hover: {
    y: -6,
    scale: 1.015,
    boxShadow: "0 20px 40px rgba(217, 119, 87, 0.15), 0 0 0 1px rgba(217, 119, 87, 0.4)",
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 24,
    },
  },
};

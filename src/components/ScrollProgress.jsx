import { motion, useScroll, useSpring } from "framer-motion";

/**
 * ScrollProgress — gradient bar fixed at the very top of the viewport,
 * fills as the user scrolls. Decorative, hidden from screen readers.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-0.5 origin-left"
      style={{ scaleX, background: "var(--grad)" }}
      aria-hidden="true"
    />
  );
}

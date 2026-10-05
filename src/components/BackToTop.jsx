import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * BackToTop — floating button that appears after scrolling 600px,
 * smooth-scrolls back to the hero.
 */
export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full border text-lg transition-transform hover:-translate-y-1"
          style={{
            background: "var(--card-bg)",
            borderColor: "var(--border-strong)",
            color: "var(--accent)",
            boxShadow: "var(--glow)",
          }}
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  );
}

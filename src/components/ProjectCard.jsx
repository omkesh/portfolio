import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export default function ProjectCard({
  id,
  title,
  category,
  description,
  technologies,
  highlights,
  demoUrl,
  repoUrl,
}) {
  const { t } = useTranslation();
  const cardRef = useRef(null);

  // Cursor position within the card, normalized to [-0.5, 0.5]
  // (0 = center, -0.5 = left/top edge, +0.5 = right/bottom edge)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  // Smooth springy follow
  const springConfig = { stiffness: 250, damping: 20, mass: 0.6 };
  const smoothX = useSpring(pointerX, springConfig);
  const smoothY = useSpring(pointerY, springConfig);

  // The corner under the cursor rises: rotateX/rotateY are derived
  // from the cursor offset, so lift is strongest at corners and
  // fades to flat at the center
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerX.set((e.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <motion.article
      ref={cardRef}
      id={id}
      className="glass-card flex flex-col"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
    >
      <div className="flex flex-1 flex-col gap-3.5 p-6">
        <span className="tag w-fit">{category}</span>

        <h3 className="text-lg font-bold">{title}</h3>

        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>

        {highlights?.length > 0 && (
          <ul className="flex flex-col gap-2 list-none">
            {highlights.map((h) => (
              <li key={h} className="relative pl-5 text-sm" style={{ color: "var(--text-muted)" }}>
                <span aria-hidden="true" className="absolute left-0" style={{ color: "var(--accent-3)" }}>▸</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          {technologies.map((tech) => (
            <span key={tech} className="chip !px-3 !py-1 !text-xs">{tech}</span>
          ))}
        </div>

        <div className="mt-auto flex gap-5 pt-2">
          {demoUrl ? (
            <a href={demoUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline transition-all hover:gap-2.5"
              style={{ color: "var(--accent)" }}>
              {t("projects.demo")} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <span className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
              {t("projects.noDemo")}
            </span>
          )}
          {repoUrl && (
            <a href={repoUrl} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold no-underline transition-all hover:gap-2.5"
              style={{ color: "var(--accent)" }}>
              {t("projects.repo")} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

ProjectCard.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  category: PropTypes.oneOf(["FinTech", "E-Commerce", "Enterprise", "Sales"]).isRequired,
  description: PropTypes.string.isRequired,
  technologies: PropTypes.arrayOf(PropTypes.string).isRequired,
  highlights: PropTypes.arrayOf(PropTypes.string),
  demoUrl: PropTypes.string,
  repoUrl: PropTypes.string,
};

ProjectCard.defaultProps = {
  highlights: [],
  demoUrl: "",
  repoUrl: "",
};

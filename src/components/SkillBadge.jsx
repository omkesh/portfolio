import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import TechIcon from "./TechIcon";

const categoryColors = {
  frontend: "var(--accent)",
  backend: "var(--accent-3)",
  testing: "var(--green)",
  architecture: "var(--accent-2)",
};

const STAR_POINTS =
  "12,2 14.35,8.76 21.51,8.91 15.8,13.24 17.88,20.09 12,16 6.12,20.09 8.2,13.24 2.49,8.91 9.65,8.76";

function StarIcon({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      width="100%"
      height="100%"
      aria-hidden="true"
    >
      <polygon
        points={STAR_POINTS}
        fill="#e8a000"
        stroke="none"
      />
    </svg>
  );
}

export default function SkillBadge({ name, category, proficiency, icon }) {
  const { t } = useTranslation();

  return (
    <div
      className="glass-card skill-badge group relative p-4"
      title={`${t("skills.proficiency")}: ${proficiency}%`}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="flex items-center gap-2 text-sm font-semibold">
          <TechIcon name={name} />
          {name}
        </span>
        <span className="font-mono text-xs" style={{ color: categoryColors[category] }}>
          {proficiency}%
        </span>
      </div>

      {/* Proficiency bar — static on load; animates 0 → pct on hover */}
      <div
        className="skill-bar relative h-1.5 w-full rounded-full"
        style={{
          background: "var(--surface-hover)",
          "--pct": `${proficiency}%`,
        }}
        role="meter"
        aria-valuenow={proficiency}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${name} proficiency`}
      >
        <div className="skill-bar-track">
          <div
            className="skill-bar-fill"
            style={{ width: `${proficiency}%` }}
          />
        </div>
        {/* Star rides the tip as the bar grows (hover only) */}
        <span className="skill-bar-star" aria-hidden="true">
          <StarIcon />
        </span>
      </div>
    </div>
  );
}

SkillBadge.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.oneOf(["frontend", "backend", "testing", "architecture"]).isRequired,
  proficiency: PropTypes.number.isRequired,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

SkillBadge.defaultProps = {
  icon: null,
};

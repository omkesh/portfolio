import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

export default function TimelineItem({
  company,
  role,
  period,
  location,
  isCurrent,
  keyDeliverables,
}) {
  const { t } = useTranslation();

  return (
    <li className="relative">
      <span
        className="absolute -left-8 top-1.5 h-4 w-4 rounded-full border-2"
        style={{
          background: "var(--bg)",
          borderColor: isCurrent ? "var(--accent)" : "var(--accent-3)",
          boxShadow: isCurrent ? "0 0 12px var(--accent)" : "none",
        }}
        aria-hidden="true"
      />
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.45 }}
      >
      <p className="mb-1 font-mono text-xs" style={{ color: "var(--accent)" }}>
        {period}
        {isCurrent && (
          <span className="ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase"
            style={{ background: "var(--surface-hover)", color: "var(--green)" }}>
            {t("experience.current")}
          </span>
        )}
      </p>
      <h3 className="text-lg font-bold">{role}</h3>
      <p className="mb-3 text-sm font-semibold" style={{ color: "var(--accent-3)" }}>
        {company} · {location}
      </p>
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide" style={{ color: "var(--text-muted)" }}>
        {t("experience.keyDeliverables")}
      </p>
      <ul className="flex list-none flex-col gap-1.5">
        {keyDeliverables.map((item) => (
          <li key={item} className="relative pl-5 text-sm" style={{ color: "var(--text-muted)" }}>
            <span aria-hidden="true" className="absolute left-0" style={{ color: "var(--accent-2)" }}>▹</span>
            {item}
          </li>
        ))}
      </ul>
      </motion.div>
    </li>
  );
}

TimelineItem.propTypes = {
  company: PropTypes.string.isRequired,
  role: PropTypes.string.isRequired,
  period: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  isCurrent: PropTypes.bool,
  keyDeliverables: PropTypes.arrayOf(PropTypes.string).isRequired,
};

TimelineItem.defaultProps = {
  isCurrent: false,
  location: "",
};

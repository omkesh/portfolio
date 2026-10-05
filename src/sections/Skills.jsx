import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import SkillBadge from "../components/SkillBadge";
import { skills } from "../data/resumeData";

const categoryOrder = ["frontend", "backend", "testing", "architecture"];

export default function Skills() {
  const { t } = useTranslation();

  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    label: t(`skills.${cat}`),
    items: skills.filter((s) => s.category === cat),
  }));

  return (
    <section id="skills" className="section-pf">
      <div className="section-container-pf">
        <span className="section-label">Skills</span>
        <h2 className="section-title">{t("sections.skillsTitle")}</h2>
        <p className="section-sub">{t("sections.skillsSub")}</p>

        <div className="grid gap-8 lg:grid-cols-2">
          {grouped.map((group) => (
            <div key={group.category} className="glass-card p-6">
              <h3 className="mb-4 flex items-center gap-2 text-base font-bold">
                <span aria-hidden="true" style={{ color: "var(--accent)" }}>◆</span>
                {group.label}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {group.items.map((skill, i) => (
                  <SkillBadge key={skill.name} {...skill} />
                ))}
              </div>
              <p className="sr-only">{group.items.length} skills listed</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

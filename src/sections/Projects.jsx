import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ProjectCard from "../components/ProjectCard";
import { projects, projectCategories } from "../data/resumeData";

const categoryKey = {
  All: "projects.all",
  FinTech: "projects.fintech",
  "E-Commerce": "projects.ecommerce",
  Enterprise: "projects.enterprise",
  Sales: "projects.sales",
};

export default function Projects() {
  const { t } = useTranslation();
  const [filter, setFilter] = useState("All");

  const visible =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-pf">
      <div className="section-container-pf">
        <span className="section-label">Projects</span>
        <h2 className="section-title">{t("sections.projectsTitle")}</h2>
        <p className="section-sub">{t("sections.projectsSub")}</p>

        {/* Filter bar */}
        <div className="mb-10 flex flex-wrap gap-3" role="tablist" aria-label="Filter projects by category">
          {projectCategories.map((cat) => {
            const selected = filter === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(cat)}
                className="rounded-full border px-5 py-2 text-sm font-semibold transition-all"
                style={{
                  background: selected ? "var(--grad)" : "var(--surface)",
                  borderColor: selected ? "transparent" : "var(--border)",
                  color: selected ? "var(--btn-fg)" : "var(--text-muted)",
                  boxShadow: selected ? "var(--glow-strong)" : "none",
                }}
              >
                {t(categoryKey[cat])}
              </button>
            );
          })}
        </div>

        <motion.div layout className="grid gap-7 md:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard key={project.id} {...project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

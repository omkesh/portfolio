import { useTranslation } from "react-i18next";
import TimelineItem from "../components/TimelineItem";
import { experience } from "../data/resumeData";

export default function Experience() {
  const { t } = useTranslation();

  return (
    <section id="experience" className="section-pf">
      <div className="section-container-pf">
        <span className="section-label">Experience</span>
        <h2 className="section-title">{t("sections.experienceTitle")}</h2>
        <p className="section-sub">{t("sections.experienceSub")}</p>

        <div className="relative pl-8">
          {/* Gradient timeline spine */}
          <span
            className="absolute left-[7px] top-2 bottom-2 w-0.5 opacity-50"
            style={{ background: "linear-gradient(180deg, var(--accent), var(--accent-2), var(--accent-3))" }}
            aria-hidden="true"
          />
          <ul className="list-none space-y-12">
            {experience.map((job) => (
              <TimelineItem key={job.company} {...job} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

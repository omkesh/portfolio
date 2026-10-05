import { useTranslation } from "react-i18next";
import MediumFeed from "../components/MediumFeed";
import { featuredPosts, profile } from "../data/resumeData";

export default function Writing() {
  const { t } = useTranslation();

  return (
    <section id="writing" className="section-pf">
      <div className="section-container-pf">
        <span className="section-label">Writing</span>
        <h2 className="section-title">{t("sections.writingTitle")}</h2>
        <p className="section-sub">{t("sections.writingSub")}</p>

        <MediumFeed
          mediumUsername={profile.mediumUsername}
          maxPosts={3}
          featuredPosts={featuredPosts}
        />
      </div>
    </section>
  );
}

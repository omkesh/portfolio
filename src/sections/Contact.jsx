import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import ContactForm from "../components/ContactForm";
import { profile } from "../data/resumeData";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <section id="contact" className="section-pf">
      <div className="section-container-pf grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">{t("sections.contactTitle")}</h2>
          <p className="mb-8" style={{ color: "var(--text-muted)" }}>
            {t("sections.contactSub")}
          </p>

          <div className="mb-8 flex flex-col gap-4">
            <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 no-underline transition-colors"
              style={{ color: "var(--text-muted)" }}>
              <span aria-hidden="true">✉</span> {profile.email}
            </a>
            <a href={`tel:${profile.phone.replace(/[^+\d]/g, "")}`} className="inline-flex items-center gap-3 no-underline transition-colors"
              style={{ color: "var(--text-muted)" }}>
              <span aria-hidden="true">☎</span> {profile.phone}
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 no-underline transition-colors"
              style={{ color: "var(--text-muted)" }}>
              <span aria-hidden="true">in</span>
              {profile.linkedin.replace(/\/+$/, "").split("/").pop()}
            </a>
            <a href={profile.medium} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-3 no-underline"
              style={{ color: "var(--text-muted)" }}>
              <span aria-hidden="true">✍</span>
              {profile.medium.replace(/^https?:\/\//, "").replace(/\/+$/, "")}
            </a>
          </div>
        </motion.div>

        <ContactForm recipientEmail={profile.email} />
      </div>
    </section>
  );
}

import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function Hero({
  name,
  title,
  experienceYears,
  location,
  company,
  profileImage,
  profileImageMobile,
  socialLinks,
}) {
  const { t } = useTranslation();

  // Auto-generated avatar fallback: initials from the name
  const avatarFallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&background=6366f1&color=fff&size=512`;

  const socialIcons = [
    {
      key: "linkedin",
      label: "LinkedIn",
      url: socialLinks.linkedin,
      brand: "#0a66c2",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.66V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45z" />
        </svg>
      ),
    },
    {
      key: "medium",
      label: "Medium",
      url: socialLinks.medium,
      brand: "#111111",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
        </svg>
      ),
    },
    {
      key: "email",
      label: "Email",
      url: `mailto:${socialLinks.email}`,
      brand: "#ea4335",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z" />
        </svg>
      ),
    },
    {
      key: "phone",
      label: "Phone",
      url: `tel:${socialLinks.phone.replace(/[^+\d]/g, "")}`,
      brand: "#34a853",
      svg: (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M6.62 10.79a15.05 15.05 0 0 0 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.61 21 3 13.39 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="flex min-h-screen items-end pt-16">
      <div className="grid w-full items-end gap-10 lg:grid-cols-2 lg:gap-0">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6 }}
          className="px-6 pb-10 sm:px-10 lg:pb-16 lg:pl-24 lg:pr-10 xl:pl-60 xl:pr-14"
        >
          <h1 className="mb-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("hero.greeting")} {name.toUpperCase()}
          </h1>

          <p className="mb-3 text-xl font-semibold" style={{ color: "var(--accent)" }}>
            {title}
          </p>

          <p className="mb-8 max-w-lg" style={{ color: "var(--text-muted)" }}>
            {t("hero.subtitle", { company: company, years: experienceYears })}
          </p>

          <div className="mb-8 flex flex-wrap gap-4">
            <a href="#projects" className="btn btn-primary no-underline">
              {t("hero.viewWork")} <span aria-hidden="true">→</span>
            </a>
            <a href="#contact" className="btn btn-ghost no-underline">
              {t("hero.contactMe")}
            </a>
            <a href="/resume.pdf" download className="btn btn-ghost no-underline">
              Resume <span aria-hidden="true">⬇</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <span className="font-mono text-sm" style={{ color: "var(--accent-3)" }}>
              {t("hero.yearsExperience", { years: experienceYears })}
            </span>
            <span aria-hidden="true" style={{ color: "var(--border-strong)" }}>|</span>
            <span className="text-sm" style={{ color: "var(--text-muted)" }}>📍 {location}</span>
          </div>

          <div className="mt-6 flex gap-3">
            {socialIcons.map((s) => (
              <a
                key={s.key}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="social-icon-btn flex h-14 w-14 items-center justify-center no-underline"
                style={{ "--brand-color": s.brand }}
              >
                <span className="social-icon-glyph" aria-hidden="true">
                  {s.svg}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full"
        >
          <picture>
            {/* Stacked layout (below lg): text on top, image below — use the face cutout */}
            {profileImageMobile && (
              <source media="(max-width: 1023px)" srcSet={profileImageMobile} />
            )}
            <img
              src={profileImage}
              alt={`${name} — profile photo`}
              className="hero-photo-img block h-auto w-full object-cover"
              loading="eager"
              onError={(e) => {
                if (!e.currentTarget.dataset.fallback) {
                  e.currentTarget.dataset.fallback = "1";
                  e.currentTarget.src = avatarFallback;
                }
              }}
            />
          </picture>
        </motion.div>
      </div>
    </section>
  );
}

Hero.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  experienceYears: PropTypes.number.isRequired,
  location: PropTypes.string.isRequired,
  company: PropTypes.string,
  profileImage: PropTypes.string,
  profileImageMobile: PropTypes.string,
  socialLinks: PropTypes.shape({
    linkedin: PropTypes.string,
    medium: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
};

Hero.defaultProps = {
  company: "",
  profileImage: "",
  profileImageMobile: "",
};

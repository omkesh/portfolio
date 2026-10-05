import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { languages, siteMeta } from "../data/resumeData";
import LanguageSelector from "./LanguageSelector";

const themeIcons = { noir: "◐", newsprint: "◑" };

export default function Header({
  activeSection,
  currentTheme,
  onThemeToggle,
  currentLang,
  onLangChange,
}) {
  const { t } = useTranslation();

  const cycleTheme = () => {
    const order = ["noir", "newsprint"];
    const next = order[(order.indexOf(currentTheme) + 1) % order.length];
    onThemeToggle(next);
  };

  const navItems = [
    { id: "about", label: t("nav.about") },
    { id: "skills", label: t("nav.skills") },
    { id: "projects", label: t("nav.projects") },
    { id: "experience", label: t("nav.experience") },
    { id: "writing", label: t("nav.writing") },
    { id: "contact", label: t("nav.contact") },
  ];

  return (
    <header className="static top-0 left-0 right-0 z-50 border-b backdrop-blur-md md:fixed"
      style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}>
      <div className="container-pf flex h-16 items-center justify-between">
        <a href="#about" className="font-mono font-bold text-lg no-underline" style={{ color: "var(--text)" }}>
          {siteMeta.logoText}
          <span style={{ color: "var(--accent)" }}>{siteMeta.logoAccent}</span>
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7 list-none">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="nav-link text-sm font-medium no-underline transition-colors"
                  style={{
                    color: activeSection === item.id ? "var(--accent)" : "var(--text-muted)",
                  }}
                  aria-current={activeSection === item.id ? "true" : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSelector currentLang={currentLang} onChange={onLangChange} languages={languages} />

          <button
            onClick={cycleTheme}
            className="rounded-lg border px-3 py-2 text-sm transition-transform hover:scale-105"
            style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
            aria-label={`Current theme: ${currentTheme}. Click to change theme.`}
          >
            {themeIcons[currentTheme]} <span className="hidden sm:inline capitalize">{currentTheme}</span>
          </button>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center rounded-lg border px-3 py-2 text-sm font-medium no-underline transition-transform hover:scale-105"
            style={{
              background: "var(--surface)",
              borderColor: "var(--border)",
              color: "var(--text)",
            }}
          >
            {t("nav.contact")}
          </a>

          <button
            className="rounded-lg border px-3 py-2 md:hidden"
            style={{ background: "var(--surface)", borderColor: "var(--border)", color: "var(--text)" }}
            aria-label="Toggle navigation"
            aria-expanded="false"
            onClick={() => {
              const menu = document.getElementById("mobileNav");
              menu.classList.toggle("hidden");
            }}
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div id="mobileNav" className="hidden border-t px-6 py-4 md:hidden"
        style={{ background: "var(--nav-bg)", borderColor: "var(--border)" }}>
        <ul className="flex flex-col gap-4 list-none">
          {navItems.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-sm font-medium no-underline"
                style={{ color: "var(--text-muted)" }}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}

Header.propTypes = {
  activeSection: PropTypes.string,
  currentTheme: PropTypes.oneOf(["dark", "light", "neon"]).isRequired,
  onThemeToggle: PropTypes.func.isRequired,
  currentLang: PropTypes.string.isRequired,
  onLangChange: PropTypes.func.isRequired,
};

Header.defaultProps = {
  activeSection: "",
};

import PropTypes from "prop-types";

export default function LanguageSelector({ currentLang, onChange, languages }) {
  return (
    <select
      value={currentLang}
      onChange={(e) => onChange(e.target.value)}
      className="rounded-lg border px-2 py-2 text-sm outline-none cursor-pointer"
      style={{
        background: "var(--surface)",
        borderColor: "var(--border)",
        color: "var(--text)",
      }}
      aria-label="Select language"
    >
      {languages.map((lang) => (
        <option key={lang.code} value={lang.code} style={{ color: "#000000" }}>
          {lang.nativeLabel}
        </option>
      ))}
    </select>
  );
}

LanguageSelector.propTypes = {
  currentLang: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  languages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      nativeLabel: PropTypes.string.isRequired,
    })
  ).isRequired,
};

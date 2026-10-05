/**
 * TechIcon — official tech stack logos rendered as small monochrome icons.
 * Black & white by default; the badge hover reveals the brand color.
 * Logos come from the devicon CDN; skills without an official devicon
 * fall back to an inline glyph.
 */
import PropTypes from "prop-types";

const DEVICON_BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

const techIconMap = {
  React: `${DEVICON_BASE}/react/react-original.svg`,
  Redux: `${DEVICON_BASE}/redux/redux-original.svg`,
  "JavaScript (ES6+)": `${DEVICON_BASE}/javascript/javascript-original.svg`,
  HTML5: `${DEVICON_BASE}/html5/html5-original.svg`,
  CSS3: `${DEVICON_BASE}/css3/css3-original.svg`,
  SCSS: `${DEVICON_BASE}/sass/sass-original.svg`,
  "Node.js": `${DEVICON_BASE}/nodejs/nodejs-original.svg`,
  "Next.js": `${DEVICON_BASE}/nextjs/nextjs-original.svg`,
  MongoDB: `${DEVICON_BASE}/mongodb/mongodb-original.svg`,
  Jest: `${DEVICON_BASE}/jest/jest-plain.svg`,
  "React Testing Library": `${DEVICON_BASE}/react/react-original.svg`,
  Playwright: `${DEVICON_BASE}/playwright/playwright-original.svg`,
  Storybook: `${DEVICON_BASE}/storybook/storybook-original.svg`,
  Webpack: `${DEVICON_BASE}/webpack/webpack-original.svg`,
  "Azure CI/CD": `${DEVICON_BASE}/azure/azure-original.svg`,
  GitHub: `${DEVICON_BASE}/github/github-original.svg`,
};

// Skills without an official devicon — inline glyph fallbacks
const glyphFallbackMap = {
  "Micro Frontend Architecture": "🧩",
  "WCAG 2.1 AA": "♿",
};

export default function TechIcon({ name }) {
  const iconUrl = techIconMap[name];
  const glyph = glyphFallbackMap[name];

  if (iconUrl) {
    return (
      <span className="tech-icon" aria-hidden="true">
        <img src={iconUrl} alt="" loading="lazy" width="20" height="20" />
      </span>
    );
  }

  if (glyph) {
    return (
      <span className="tech-icon tech-icon-glyph" aria-hidden="true">
        {glyph}
      </span>
    );
  }

  return null;
}

TechIcon.propTypes = {
  name: PropTypes.string.isRequired,
};

// ============================================================
// resumeData.js — single source of truth for all portfolio data
// ============================================================

export const profile = {
  name: "Omkesh B. Kendre",
  title: "Senior Frontend / UI Developer",
  role: "Senior Software Engineer",
  company: "Globant India Pvt. Ltd.",
  experienceYears: 10,
  location: "Pune, Maharashtra, India",
  email: "omkeshkendre08@gmail.com",
  phone: "+91-7588389818",
  linkedin: "https://www.linkedin.com/in/omkeshk",
  medium: "https://omken.medium.com/",
  mediumUsername: "omken",
  education: {
    degree: "Bachelor of Computer Science and Engineering",
    score: "63%",
    college: "ADCET Ashta (Sangli)",
    university: "Shivaji University, Kolhapur",
    year: 2015,
  },
  profileImage: "/assets/omkesh-kendre-bg.png",
  // Optional: a different (face-crop) image used on small screens.
  // Leave "" to reuse profileImage everywhere.
  profileImageMobile: "/assets/omkesh-kendre-face-bg.png",
  profileImageFallback:
    "https://media.licdn.com/dms/image/v2/D4D16AQFWJLd87K8QuA/profile-displaybackgroundimage-shrink_200_800/profile-displaybackgroundimage-shrink_200_800/0/1673873494890",
};

export const socialLinks = {
  linkedin: "https://www.linkedin.com/in/omkeshk",
  medium: "https://omken.medium.com/",
  email: "omkeshkendre08@gmail.com",
  phone: "+91-7588389818",
};

export const skills = [
  // Frontend
  { name: "React", category: "frontend", proficiency: 95 },
  { name: "Redux", category: "frontend", proficiency: 90 },
  { name: "JavaScript (ES6+)", category: "frontend", proficiency: 95 },
  { name: "HTML5", category: "frontend", proficiency: 95 },
  { name: "CSS3", category: "frontend", proficiency: 92 },
  { name: "SCSS", category: "frontend", proficiency: 90 },
  // Backend
  { name: "Node.js", category: "backend", proficiency: 80 },
  { name: "Next.js", category: "backend", proficiency: 85 },
  { name: "MongoDB", category: "backend", proficiency: 80 },
  // Testing
  { name: "Jest", category: "testing", proficiency: 88 },
  { name: "React Testing Library", category: "testing", proficiency: 88 },
  { name: "Playwright", category: "testing", proficiency: 80 },
  // Architecture & Tooling
  { name: "Micro Frontend Architecture", category: "architecture", proficiency: 90 },
  { name: "Storybook", category: "architecture", proficiency: 90 },
  { name: "Webpack", category: "architecture", proficiency: 82 },
  { name: "Azure CI/CD", category: "architecture", proficiency: 85 },
  { name: "WCAG 2.1 AA", category: "architecture", proficiency: 92 },
  { name: "GitHub", category: "architecture", proficiency: 92 },
];

export const experience = [
  {
    company: "Globant India Pvt. Ltd.",
    role: "Senior Software Engineer",
    period: "Sept 2021 – Present",
    location: "Pune, India",
    isCurrent: true,
    keyDeliverables: [
      "Enterprise frontend architecture with Micro Frontends",
      "React performance tuning for large-scale applications",
      "Accessible component design (WCAG 2.1 AA)",
      "CI/CD integrations with Microsoft Azure Pipelines",
    ],
  },
  {
    company: "GlobalLogic",
    role: "Senior Software Engineer",
    period: "July 2020 – Sept 2021",
    location: "Pune, India",
    isCurrent: false,
    keyDeliverables: [
      "Scalable UI engineering for enterprise products",
      "Cross-functional agile delivery",
      "PR code reviews and mentoring",
      "Unit testing implementation with Jest & RTL",
    ],
  },
  {
    company: "Capgemini Technology Services India Pvt. Ltd.",
    role: "Associate Consultant",
    period: "Jan 2019 – June 2020",
    location: "India",
    isCurrent: false,
    keyDeliverables: [
      "Enterprise web application delivery",
      "Reusable component libraries",
      "Requirement analysis with stakeholders",
    ],
  },
  {
    company: "Iglulabs Softwares Pvt. Ltd.",
    role: "Web Developer",
    period: "June 2018 – Dec 2018",
    location: "Pune, India",
    isCurrent: false,
    keyDeliverables: [
      "Responsive UI development",
      "Cross-browser frontend solutions",
    ],
  },
  {
    company: "Triage Technocrats Pvt. Ltd.",
    role: "Software Developer",
    period: "July 2016 – June 2018",
    location: "India",
    isCurrent: false,
    keyDeliverables: [
      "Core web development with HTML/CSS/JavaScript",
      "Client deliverables end-to-end",
    ],
  },
];

export const projects = [
  {
    id: "reged-ui",
    title: "RegEd UI Transformation",
    category: "FinTech",
    description:
      "Developed reusable, independently deployable UI components with high web accessibility compliance, Storybook design systems, and full mobile responsiveness.",
    technologies: ["React", "Redux", "Storybook", "SCSS", "HTML5", "CSS3"],
    highlights: [
      "Independently deployable Micro Frontend components",
      "WCAG-compliant accessible component library",
      "Storybook design system adopted across teams",
    ],
    demoUrl: "",
    repoUrl: "",
  },
  {
    id: "bank-of-ireland",
    title: "Bank of Ireland (PSD2 & Open Banking)",
    category: "FinTech",
    description:
      "PSD2 banking application enabling secure, accessible financial transactions for Bank of Ireland employees and customers via third-party integrations and web accessibility compliance.",
    technologies: ["React", "Redux", "Angular", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    highlights: [
      "Secure PSD2 / Open Banking transactions",
      "Third-party API integrations",
      "Web accessibility compliance for banking UX",
    ],
    demoUrl: "",
    repoUrl: "",
  },
  {
    id: "retail-sales",
    title: "Retail Sales Product",
    category: "Enterprise",
    description:
      "Multi-store management application for retail items, inventory, customer billing, user management, and detailed reporting with Role-Based Access Control (RBAC).",
    technologies: ["AngularJS", "Vue.js", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    highlights: [
      "Multi-store inventory & billing management",
      "Role-Based Access Control (RBAC)",
      "Detailed reporting dashboards",
    ],
    demoUrl: "",
    repoUrl: "",
  },
  {
    id: "rentsher",
    title: "RentSher (E-Commerce)",
    category: "E-Commerce",
    description:
      "E-commerce rental marketplace offering curated home, office, and event products with doorstep delivery across major Indian metropolitan cities.",
    technologies: ["Angular", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    highlights: [
      "Rental marketplace with curated catalogs",
      "Doorstep delivery across metro cities",
      "End-to-end customer journey",
    ],
    demoUrl: "",
    repoUrl: "",
  },
  {
    id: "castrol-calculator",
    title: "Castrol Value Calculator",
    category: "Sales",
    description:
      "Built a value calculator empowering frontline sales teams to compute product ROI, generate value reports, and assemble customer presentation decks.",
    technologies: ["Angular", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    highlights: [
      "Product ROI computation engine",
      "Auto-generated value reports",
      "Customer presentation deck builder",
    ],
    demoUrl: "",
    repoUrl: "",
  },
];

export const projectCategories = ["All", "FinTech", "E-Commerce", "Enterprise", "Sales"];

export const languages = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
  { code: "de", label: "German", nativeLabel: "Deutsch" },
  { code: "ru", label: "Russian", nativeLabel: "Русский" },
  { code: "zh", label: "Chinese", nativeLabel: "中文" },
];

export const themes = [
  { id: "noir", label: "Noir" },
  { id: "newsprint", label: "Newsprint" },
];

// ============================================================
// siteMeta — everything that appears in <head>, the header
// logo, the footer, and the noscript fallback.
// ============================================================
export const siteMeta = {
  // Shown in the header logo. e.g. "omkesh.dev" → "omkesh" + ".dev"
  logoText: "omkesh",
  logoAccent: ".dev",
  // Browser tab title: "{name} — {title}"
  title: "Omkesh B. Kendre — Senior Software Engineer",
  description:
    "Senior Software Engineer at Globant. 10+ years in React.js, frontend architecture, Micro Frontends, and accessible UI (WCAG 2.1 AA).",
  keywords:
    "Omkesh Kendre, Senior Software Engineer, React Developer, Frontend Architect, Globant, Pune",
  // Canonical site URL (no trailing slash) — used for og:url / canonical
  siteUrl: "https://omkesh.dev",
  ogImage: "/assets/omkesh-kendre-bg.png",
  // First letter(s) of the inline SVG favicon monogram
  faviconInitial: "O",
  // Footer "built with" line
  builtWith: "Built with React, Tailwind & Framer Motion",
};

// ============================================================
// featuredPosts — fallback articles shown in the Writing
// section when the live Medium feed can't be fetched.
// Replace with your own posts (title, link, date).
// ============================================================
export const featuredPosts = [
  {
    title: "Mastering Linked Lists in JavaScript",
    link: "https://omken.medium.com/mastering-linked-lists-in-javascript-95c35a9b99e6",
    date: "Apr 19, 2024",
  },
  {
    title: "Node version manager — NVM",
    link: "https://omken.medium.com/nvm-node-version-manager-c43aa7c3275a",
    date: "Sep 23, 2021",
  },
  {
    title: "WCAG — Web Content Accessibility",
    link: "https://omken.medium.com/wcag-web-content-accessibility-8b0e30ae3f58",
    date: "Sep 24, 2021",
  },
  {
    title:
      "JavaScript's Push, Pop, Shift, and Unshift Array Methods With Big O Notation.",
    link: "https://omken.medium.com/javascripts-push-pop-shift-and-unshift-array-methods-with-respect-to-big-o-notation-e129ac5464",
    date: "Nov 28, 2022",
  },
];

// ============================================================
// contactForm — how the contact form sends messages.
//   provider: "mailto"   → opens the visitor's email client (no setup)
//   provider: "formspree" → POST to Formspree. Set formspreeId.
//   provider: "emailjs"   → POST via EmailJS SDK. Set the 3 ids.
// ============================================================
export const contactForm = {
  provider: "mailto",
  formspreeId: "", // e.g. "mgjxyzab" from https://formspree.io
  emailjs: { serviceId: "", templateId: "", publicKey: "" },
};

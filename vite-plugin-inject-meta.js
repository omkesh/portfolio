// ============================================================
// vite-plugin-inject-meta.js
// Injects profile/site data from src/data/resumeData.js into
// index.html at build time — so editing resumeData.js is the
// ONLY thing needed to personalize the whole portfolio.
// ============================================================

import { pathToFileURL } from "node:url";
import path from "node:path";

const root = process.cwd();

async function loadSiteData() {
  const moduleUrl = pathToFileURL(
    path.join(root, "src/data/resumeData.js")
  ).href;
  const mod = await import(moduleUrl);
  return mod;
}

export function injectMeta() {
  return {
    name: "inject-meta",
    async transformIndexHtml(html) {
      const { profile, siteMeta } = await loadSiteData();

      const name = profile?.name ?? "";
      const title = siteMeta?.title || name;
      const description = siteMeta?.description ?? "";
      const keywords = siteMeta?.keywords ?? "";
      const siteUrl = siteMeta?.siteUrl ?? "";
      const ogImage = siteMeta?.ogImage ?? "";
      const initial = siteMeta?.faviconInitial || name.charAt(0).toUpperCase();

      const svgFavicon = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' rx='14' fill='%23000000'/%3E%3Ctext x='32' y='44' font-family='monospace' font-size='28' font-weight='bold' fill='%23ffffff' text-anchor='middle'%3E${encodeURIComponent(
        initial
      )}%3C/text%3E%3C/svg%3E`;

      const out = html
        .replaceAll("__SITE_TITLE__", escapeHtml(title))
        .replaceAll("__SITE_DESCRIPTION__", escapeHtml(description))
        .replaceAll("__SITE_KEYWORDS__", escapeHtml(keywords))
        .replaceAll("__SITE_URL__", escapeHtml(siteUrl))
        .replaceAll("__SITE_OG_IMAGE__", escapeHtml(ogImage))
        .replaceAll("__SITE_FAVICON__", svgFavicon)
        .replaceAll("__SITE_AUTHOR__", escapeHtml(name))
        .replaceAll("__SITE_AUTHOR_EMAIL__", escapeHtml(profile?.email ?? ""))
        .replaceAll("__SITE_AUTHOR_LINKEDIN__", escapeHtml(profile?.linkedin ?? ""))
        .replaceAll("__SITE_AUTHOR_MEDIUM__", escapeHtml(profile?.medium ?? ""));

      return out;
    },
  };
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

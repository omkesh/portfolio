import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";

/**
 * MediumFeed — fetches latest posts from a Medium user via their RSS feed.
 * Uses a public RSS-to-JSON bridge; falls back to a direct link on failure.
 * Featured posts (if provided) are pinned first, sorted by date (newest first).
 */
function MediumIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
    </svg>
  );
}

export default function MediumFeed({ mediumUsername, maxPosts, featuredPosts }) {
  const { t } = useTranslation();
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading"); // loading | ok | error

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(
            `https://medium.com/feed/@${mediumUsername}`
          )}`
        );
        if (!res.ok) throw new Error("feed unavailable");
        const data = await res.json();
        if (data.status !== "ok" || !Array.isArray(data.items)) throw new Error("bad payload");
        if (cancelled) return;
        setPosts(data.items.slice(0, maxPosts));
        setStatus("ok");
      } catch {
        if (!cancelled) setStatus("error");
      }
    }

    load();
    return () => { cancelled = true; };
  }, [mediumUsername, maxPosts]);

  if (status === "error") {
    return (
      <div className="glass-card p-6 text-sm" style={{ color: "var(--text-muted)" }}>
        {t("medium.error")}{" "}
        <a href={`https://medium.com/@${mediumUsername}`} target="_blank" rel="noopener noreferrer"
          className="font-semibold underline" style={{ color: "var(--accent)" }}>
          Medium ↗
        </a>
      </div>
    );
  }

  const sortedFeaturedPosts = [...(featuredPosts || [])].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {sortedFeaturedPosts.map((featuredPost) => (
        <motion.a
          key={featuredPost.link}
          href={featuredPost.link}
          target="_blank"
          rel="noopener noreferrer"
          className="glass-card flex flex-col gap-2 p-6 no-underline"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
            {featuredPost.date}
          </span>
          <h3 className="font-bold leading-snug" style={{ color: "var(--text)" }}>
            {featuredPost.title}
          </h3>
          {featuredPost.readTime && (
            <span className="text-xs" style={{ color: "var(--text-muted)" }}>
              {featuredPost.readTime}
            </span>
          )}
          <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--accent)" }}>
            <MediumIcon />
            {t("medium.readMore")} <span aria-hidden="true">↗</span>
          </span>
        </motion.a>
      ))}

      {status === "loading" &&
        Array.from({ length: maxPosts }).map((_, i) => (
          <div key={i} className="glass-card h-44 animate-pulse p-6" aria-hidden="true" />
        ))}

      {status === "ok" &&
        posts.map((post, i) => (
          <motion.a
            key={post.guid || post.title}
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card flex flex-col gap-2 p-6 no-underline"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <span className="font-mono text-xs" style={{ color: "var(--accent)" }}>
              {new Date(post.pubDate).toLocaleDateString()}
            </span>
            <h3 className="font-bold leading-snug" style={{ color: "var(--text)" }}>
              {post.title}
            </h3>
            <span className="mt-auto flex items-center gap-1.5 text-sm font-semibold" style={{ color: "var(--accent)" }}>
              <MediumIcon />
              {t("medium.readMore")} <span aria-hidden="true">↗</span>
            </span>
          </motion.a>
        ))}
    </div>
  );
}

MediumFeed.propTypes = {
  mediumUsername: PropTypes.string.isRequired,
  maxPosts: PropTypes.number,
  featuredPosts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      date: PropTypes.string,
      readTime: PropTypes.string,
    })
  ),
};

MediumFeed.defaultProps = {
  maxPosts: 3,
  featuredPosts: [],
};

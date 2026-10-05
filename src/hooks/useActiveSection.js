import { useEffect, useState } from "react";

/**
 * useActiveSection — tracks which section is currently in view
 * using IntersectionObserver, for nav highlighting.
 */
export default function useActiveSection(sectionIds) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sectionIds.join(",")]);

  return active;
}

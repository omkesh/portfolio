import { useEffect } from "react";

const STAR_POINTS =
  "12,2 14.35,8.76 21.51,8.91 15.8,13.24 17.88,20.09 12,16 6.12,20.09 8.2,13.24 2.49,8.91 9.65,8.76";
const MAIN_SIZE = 34;
const IDLE_HIDE_MS = 700;
const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input, textarea, select, label, summary";
const SPARKLE_MIN_SIZE = 7;
const SPARKLE_MAX_SIZE = 16;
const SPARKLE_LIFETIME_MS = 750;
const SPARKLE_SPAWN_DISTANCE = 6;
const MAX_SPARKLES = 90;
const SPARKLES_PER_SPAWN = 2;
const TAIL_OFFSET = 20; // how far behind the cursor the tail starts
const TURMERIC = "#e8a000";

function createStarElement(className, fill, stroke, strokeWidth) {
  const el = document.createElement("div");
  el.className = className;
  el.innerHTML = `<svg viewBox="0 0 24 24" width="100%" height="100%" aria-hidden="true"><polygon points="${STAR_POINTS}" fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" stroke-linejoin="round" /></svg>`;
  return el;
}

/**
 * CursorTrail — hollow black star cursor that leaves a trail of magic
 * star sparkles while moving. Disabled on touch devices via CSS.
 */
export default function CursorTrail() {
  useEffect(() => {
    const mainStar = createStarElement("cursor-star", "none", "#111", 2);
    mainStar.style.width = `${MAIN_SIZE}px`;
    mainStar.style.height = `${MAIN_SIZE}px`;
    document.body.appendChild(mainStar);

    const sparkles = new Set();
    let lastSpawnX = -100;
    let lastSpawnY = -100;
    let prevX = null;
    let prevY = null;
    let idleTimer;
    let visible = false;

    const isInteractive = (target) =>
      target instanceof Element && !!target.closest(INTERACTIVE_SELECTOR);

    const showStar = () => {
      if (visible) return;
      visible = true;
      mainStar.classList.add("cursor-star-active");
    };

    const hideStar = () => {
      if (!visible) return;
      visible = false;
      mainStar.classList.remove("cursor-star-active");
    };

    const spawnSparkle = (x, y) => {
      for (let s = 0; s < SPARKLES_PER_SPAWN; s += 1) {
        if (sparkles.size >= MAX_SPARKLES) return;
        const size =
          SPARKLE_MIN_SIZE +
          Math.random() * (SPARKLE_MAX_SIZE - SPARKLE_MIN_SIZE);
        const el = createStarElement("cursor-sparkle", TURMERIC, "none", 0);
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        document.body.appendChild(el);

        // Random scatter direction with a slight upward float, like magic dust
        const angle = Math.random() * Math.PI * 2;
        const drift = 16 + Math.random() * 34;
        const dx = Math.cos(angle) * drift;
        const dy = Math.sin(angle) * drift - 12;
        const rotation = (Math.random() - 0.5) * 260;
        const duration = SPARKLE_LIFETIME_MS + Math.random() * 350;
        const base = "translate(-50%, -50%)";
        const animation = el.animate(
          [
            {
              transform: `translate(${x}px, ${y}px) ${base} rotate(0deg) scale(1)`,
              opacity: 0.95,
            },
            {
              transform: `translate(${x + dx}px, ${y + dy}px) ${base} rotate(${rotation}deg) scale(0.05)`,
              opacity: 0,
            },
          ],
          { duration, easing: "cubic-bezier(0.2, 0.6, 0.35, 1)", fill: "forwards" }
        );
        sparkles.add(animation);
        animation.onfinish = () => {
          sparkles.delete(animation);
          el.remove();
        };
      }
    };

    const onMouseMove = (e) => {
      const { clientX, clientY, target } = e;
      mainStar.style.transform = `translate(${clientX}px, ${clientY}px) translate(-50%, -50%)`;

      // Native hand on links/buttons, text caret on inputs — hide star there
      if (isInteractive(target)) {
        hideStar();
        clearTimeout(idleTimer);
        prevX = clientX;
        prevY = clientY;
        return;
      }

      showStar();
      clearTimeout(idleTimer);
      idleTimer = setTimeout(hideStar, IDLE_HIDE_MS);

      // Sparkles spawn from the tail of the star (behind the movement
      // direction), not from its center.
      if (prevX === null || prevY === null) {
        prevX = clientX;
        prevY = clientY;
      }
      const moveX = clientX - prevX;
      const moveY = clientY - prevY;
      const moveLen = Math.hypot(moveX, moveY) || 1;
      const tailX = clientX - (moveX / moveLen) * TAIL_OFFSET;
      const tailY = clientY - (moveY / moveLen) * TAIL_OFFSET;
      prevX = clientX;
      prevY = clientY;

      // Throttle sparkle spawning by movement distance
      const distSq = (clientX - lastSpawnX) ** 2 + (clientY - lastSpawnY) ** 2;
      if (distSq >= SPARKLE_SPAWN_DISTANCE ** 2) {
        lastSpawnX = clientX;
        lastSpawnY = clientY;
        spawnSparkle(tailX, tailY);
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      clearTimeout(idleTimer);
      sparkles.forEach((animation) => animation.cancel());
      sparkles.clear();
      document
        .querySelectorAll(".cursor-sparkle, .cursor-star")
        .forEach((el) => el.remove());
    };
  }, []);

  return null;
}

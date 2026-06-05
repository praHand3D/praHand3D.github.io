// ui.jsx — primitives, icons, hooks
import React from 'react';

// ---------- Icons (simple, geometric — no complex SVG art) ----------
export function GitHubIcon({ size = 18 }) {
  return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true },
    React.createElement("path", { d: "M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.92 1.23 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.6-.01 2.9-.01 3.29 0 .32.21.7.82.58A12 12 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" })
  );
}
export function ArrowUpRight({ size = 16 }) {
  return React.createElement("svg", { className: "ico", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, "aria-hidden": true },
    React.createElement("path", { d: "M7 17 17 7M9 7h8v8" })
  );
}
export function BookIcon({ size = 16 }) {
  return React.createElement("svg", { className: "ico", width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, "aria-hidden": true },
    React.createElement("path", { d: "M4 5a2 2 0 0 1 2-2h12v16H6a2 2 0 0 0-2 2zM8 3v16" })
  );
}
export function CheckIcon({ size = 15 }) {
  return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2.4, "aria-hidden": true },
    React.createElement("path", { d: "M5 13l4 4L19 7" })
  );
}
export function MenuIcon({ open }) {
  return React.createElement("svg", { width: 22, height: 22, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, "aria-hidden": true },
    open
      ? React.createElement("path", { d: "M6 6l12 12M18 6 6 18" })
      : React.createElement("path", { d: "M3 6h18M3 12h18M3 18h18" })
  );
}
export function PlayIcon({ size = 18 }) {
  return React.createElement("svg", { width: size, height: size, viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": true },
    React.createElement("path", { d: "M8 5v14l11-7z" })
  );
}

// ---------- Primitives ----------
export function Button({ variant = "default", href, external, onClick, children, icon, ...rest }) {
  const cls = "btn" + (variant === "primary" ? " btn--primary" : variant === "ghost" ? " btn--ghost" : "");
  const content = React.createElement(React.Fragment, null, children, icon || null);
  if (href) {
    return React.createElement("a", {
      className: cls, href, onClick,
      target: external ? "_blank" : undefined,
      rel: external ? "noopener noreferrer" : undefined,
      ...rest,
    }, content);
  }
  return React.createElement("button", { className: cls, onClick, ...rest }, content);
}

export function Tag({ children }) {
  return React.createElement("span", { className: "tag" },
    React.createElement("span", { className: "dot" }), children);
}

export function Badge({ children, muted }) {
  return React.createElement("span", { className: "badge" + (muted ? " badge--muted" : "") }, children);
}

export function Card({ children, className = "", ...rest }) {
  return React.createElement("div", { className: "card " + className, ...rest }, children);
}

// ---------- Scroll reveal ----------
// Shared rAF ticker (throttled). Some embedded iframes (a) report IO
// intersecting=false for on-screen nodes and (b) don't emit scroll events for
// programmatic window.scrollTo. A polling ticker on geometry is immune to both.
const __revealRegistry = new Set();
let __revealRunning = false;
let __revealLast = 0;
function __revealTick(now) {
  if (now - __revealLast > 90) {
    __revealLast = now;
    const vh = window.innerHeight || document.documentElement.clientHeight;
    __revealRegistry.forEach((entry) => {
      const el = entry.ref.current;
      if (!el) { __revealRegistry.delete(entry); return; }
      const rect = el.getBoundingClientRect();
      if (rect.top < vh * 0.9 && rect.bottom > 0) {
        entry.cb();
        __revealRegistry.delete(entry);
      }
    });
  }
  if (__revealRegistry.size > 0) {
    requestAnimationFrame(__revealTick);
  } else {
    __revealRunning = false;
  }
}
function __revealStart() {
  if (!__revealRunning) { __revealRunning = true; requestAnimationFrame(__revealTick); }
}

export function useInView() {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    const entry = { ref, cb: () => setInView(true) };
    __revealRegistry.add(entry);
    __revealStart();
    return () => { __revealRegistry.delete(entry); };
  }, []);
  return [ref, inView];
}

// Reveal wrapper — fade + translate up
export function Reveal({ children, as = "div", delay = 0, className = "", ...rest }) {
  const [ref, inView] = useInView();
  return React.createElement(as, {
    ref, className: "reveal " + (inView ? "in " : "") + className,
    style: { transitionDelay: delay ? delay + "ms" : undefined },
    ...rest,
  }, children);
}

// ---------- CAD / blueprint decorations ----------
export function CornerBrackets() {
  return React.createElement("span", { className: "cad-corners", "aria-hidden": true },
    React.createElement("i", { className: "c tl" }),
    React.createElement("i", { className: "c tr" }),
    React.createElement("i", { className: "c bl" }),
    React.createElement("i", { className: "c br" })
  );
}
export function Crosshair({ size = 16 }) {
  return React.createElement("svg", { className: "cad-cross", width: size, height: size, viewBox: "0 0 24 24", "aria-hidden": true },
    React.createElement("circle", { cx: 12, cy: 12, r: 6.5, fill: "none", stroke: "currentColor", strokeWidth: 1 }),
    React.createElement("path", { d: "M12 0v6.5M12 17.5V24M0 12h6.5M17.5 12H24", stroke: "currentColor", strokeWidth: 1 })
  );
}
export function CoordBox({ children }) {
  return React.createElement("span", { className: "cad-coord" }, children);
}
export function TickRuler({ count = 7, w = 13, h = 78 }) {
  const ticks = [];
  for (let i = 0; i < count; i++) {
    const y = (i / (count - 1)) * (h - 2) + 1;
    ticks.push(React.createElement("line", { key: i, x1: 0, y1: y, x2: i % 2 === 0 ? w : w * 0.5, y2: y, stroke: "currentColor", strokeWidth: 1 }));
  }
  return React.createElement("svg", { className: "cad-ruler", width: w, height: h, viewBox: "0 0 " + w + " " + h, "aria-hidden": true },
    React.createElement("line", { x1: 0, y1: 0, x2: 0, y2: h, stroke: "currentColor", strokeWidth: 1 }), ticks);
}
export function DimLine({ label = "", w = 168, bg = "var(--bg)" }) {
  const h = 16;
  return React.createElement("svg", { className: "cad-dim", width: w, height: h, viewBox: "0 0 " + w + " " + h, preserveAspectRatio: "none", "aria-hidden": true },
    React.createElement("path", { d: "M1 2 V14 M" + (w - 1) + " 2 V14", stroke: "currentColor", strokeWidth: 1 }),
    React.createElement("line", { x1: 2, y1: 8, x2: w - 2, y2: 8, stroke: "currentColor", strokeWidth: 1 }),
    React.createElement("path", { d: "M2 8 l8 -3 v6 z M" + (w - 2) + " 8 l-8 -3 v6 z", fill: "currentColor" }),
    label ? React.createElement("rect", { x: w / 2 - 30, y: 1, width: 60, height: 14, fill: bg }) : null,
    label ? React.createElement("text", { x: w / 2, y: 11.5, textAnchor: "middle", fill: "currentColor", className: "cad-dim-txt" }, label) : null
  );
}
export function DiagGuide({ w = 64, h = 64 }) {
  const hashes = [];
  for (let i = 1; i < 6; i++) {
    const x = (i / 6) * w, y = (i / 6) * h;
    hashes.push(React.createElement("line", { key: i, x1: x - 4, y1: y + 4, x2: x + 4, y2: y - 4, stroke: "currentColor", strokeWidth: 1 }));
  }
  return React.createElement("svg", { className: "cad-diag", width: w, height: h, viewBox: "0 0 " + w + " " + h, "aria-hidden": true },
    React.createElement("line", { x1: 0, y1: 0, x2: w, y2: h, stroke: "currentColor", strokeWidth: 1 }), hashes);
}

// cluster placed at section top-right
export function SectionCAD({ coord }) {
  return React.createElement("div", { className: "section-cad", "aria-hidden": true },
    React.createElement(CoordBox, null, coord || "REF"),
    React.createElement(Crosshair, null),
    React.createElement(TickRuler, null)
  );
}

export function SectionHeader({ eyebrow, title, lead, coord, fig }) {
  return React.createElement(React.Fragment, null,
    React.createElement(SectionCAD, { coord }),
    React.createElement(Reveal, { className: "section-head" },
      React.createElement("div", { className: "section-eyebrow" }, eyebrow),
      React.createElement("h2", { className: "section-title" }, title),
      React.createElement("div", { className: "section-dim" }, React.createElement(DimLine, { label: fig || "SCALE 1:1", w: 156 })),
      lead ? React.createElement("p", { className: "section-lead" }, lead) : null
    )
  );
}

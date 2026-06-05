// sections.jsx — About, Architecture, Showcase, Changelog, Roadmap
const { useI18n: useI18nS, richText: rt } = window;

// ---------- About ----------
function About() {
  const { t } = useI18nS();
  return React.createElement("section", { className: "section", id: "about", "data-screen-label": "About" },
    React.createElement(window.SectionCAD, { coord: "REF·ABT-02" }),
    React.createElement("div", { className: "container" },
      React.createElement("div", { className: "about-grid" },
        React.createElement(window.Reveal, { className: "about-copy" },
          React.createElement("div", { className: "section-eyebrow" }, t("about.eyebrow")),
          React.createElement("h2", { className: "section-title", style: { marginBottom: "28px" } }, t("about.title")),
          React.createElement("p", null, rt(t("about.p1"))),
          React.createElement("p", null, rt(t("about.p2"))),
          React.createElement("p", null, rt(t("about.p3")))
        ),
        React.createElement(window.Reveal, { delay: 120 },
          React.createElement("div", { className: "ph", style: { marginBottom: "18px", color: "var(--accent)" } }, t("about.stackLabel")),
          React.createElement("div", { className: "stack" },
            window.STACK.map((s, i) =>
              React.createElement(window.Reveal, { key: s, as: "span", delay: 120 + i * 70, style: { display: "inline-block" } },
                React.createElement(window.Tag, null, s)
              )
            )
          )
        )
      )
    )
  );
}

// ---------- Architecture ----------
function ArchNode({ node, stacked }) {
  const { t } = useI18nS();
  const style = stacked ? {} : { left: node.pos.left, top: node.pos.top, transform: "translate(-50%, -50%)" };
  return React.createElement("a", {
    className: "node" + (node.core ? " node--core" : ""),
    href: node.repo, target: "_blank", rel: "noopener noreferrer",
    style,
    "aria-label": node.label,
  },
    React.createElement(window.CornerBrackets, null),
    React.createElement("div", { className: "node-head" },
      React.createElement("div", null,
        React.createElement("h4", null, node.label),
        React.createElement("span", { className: "node-kind" }, t("arch.nodes." + node.id + ".kind"))
      ),
      React.createElement("span", { className: "node-ref" }, "[" + node.ref + "]")
    ),
    React.createElement("div", { className: "node-repo" }, "/" + node.label),
    React.createElement("div", { className: "node-desc" }, t("arch.nodes." + node.id + ".desc"))
  );
}

// PCB-style tree: engine at the root, math & pr4 as children, formatter under pr4.
const TRACES = [
  { d: "M500 109 V150" },                  // trunk (engine -> branch bus)
  { d: "M500 150 H276 L260 166 V230" },    // branch -> math (chamfered)
  { d: "M500 150 H724 L740 166 V230" },    // branch -> pr4 (chamfered)
  { d: "M740 279 V400" },                  // pr4 -> formatter
];

function TLabel({ x, y, w, children }) {
  return React.createElement(React.Fragment, null,
    React.createElement("rect", { x: x - w / 2, y: y - 11, width: w, height: 14, fill: "var(--bg)" }),
    React.createElement("text", { className: "trace-label", x: x, y: y, textAnchor: "middle" }, children)
  );
}

function Architecture() {
  const { t } = useI18nS();
  const [ref, inView] = window.useInView();
  return React.createElement("section", { className: "section", id: "architecture", "data-screen-label": "Architecture" },
    React.createElement("div", { className: "container" },
      React.createElement(window.SectionHeader, { eyebrow: t("arch.eyebrow"), title: t("arch.title"), lead: t("arch.lead"), coord: "REF·ARC-03", fig: "FIG.03" }),
      // desktop schematic
      React.createElement("div", { className: "schematic" + (inView ? " in" : ""), ref },
        React.createElement("svg", { className: "traces", viewBox: "0 0 1000 460", "aria-hidden": true },
          TRACES.map((tr, i) => React.createElement("path", { key: "t" + i, className: "trace t" + i, d: tr.d, pathLength: "1" })),
          TRACES.map((tr, i) => React.createElement("path", { key: "f" + i, className: "trace-flow", d: tr.d, pathLength: "1" })),
          // vias / junction pads
          [[500, 150], [500, 109]].map((p, i) =>
            React.createElement("circle", { key: "v" + i, className: "via", cx: p[0], cy: p[1], r: 5 })
          ),
          // connection labels
          React.createElement(TLabel, { x: 380, y: 145, w: 86 }, "transforms"),
          React.createElement(TLabel, { x: 620, y: 145, w: 74 }, "load .pr4"),
          React.createElement("text", { className: "trace-label", x: 758, y: 344, textAnchor: "start" }, "export")
        ),
        window.ARCH_NODES.map((n) => React.createElement(ArchNode, { key: n.id, node: n }))
      ),
      // mobile stacked list
      React.createElement("div", { className: "schematic-list" },
        window.ARCH_NODES.map((n) => React.createElement(ArchNode, { key: n.id, node: n, stacked: true }))
      )
    )
  );
}

// ---------- Showcase ----------
function ShowCard({ cls, label, video, tag }) {
  return React.createElement(window.Reveal, { className: "show-card " + cls },
    React.createElement("div", { className: "ph-fill" },
      React.createElement(window.CornerBrackets, null),
      video ? React.createElement("span", { className: "play-badge" }, React.createElement(window.PlayIcon)) : null,
      React.createElement("span", { className: "ph" }, label),
      React.createElement("span", { className: "ph-coord" }, tag)
    ),
    React.createElement("div", { className: "meta" },
      React.createElement("span", { className: "ph", style: { color: video ? "var(--accent)" : undefined } }, video ? "[VIDEO]" : "[SCREENSHOT]"),
      React.createElement("span", { className: "ph dim" }, "1920×1080")
    )
  );
}

function Showcase() {
  const { t } = useI18nS();
  return React.createElement("section", { className: "section", id: "showcase", "data-screen-label": "Showcase" },
    React.createElement("div", { className: "container" },
      React.createElement(window.SectionHeader, { eyebrow: t("showcase.eyebrow"), title: t("showcase.title"), lead: t("showcase.lead"), coord: "REF·CAP-04", fig: "FIG.04" }),
      React.createElement("div", { className: "showcase-grid" },
        React.createElement(ShowCard, { cls: "s-a", label: "[SCREENSHOT: engine MVP]", tag: "IMG.01" }),
        React.createElement(ShowCard, { cls: "s-b", label: "[VIDEO: rotating cube]", video: true, tag: "VID.01" }),
        React.createElement(ShowCard, { cls: "s-c", label: "[SCREENSHOT: blender plugin]", tag: "IMG.02" }),
        React.createElement(ShowCard, { cls: "s-d", label: "[SCREENSHOT: .PR4 inspector]", tag: "IMG.03" })
      )
    )
  );
}

// ---------- Changelog ----------
function Changelog() {
  const { t } = useI18nS();
  const items = window.CHANGELOG;
  return React.createElement("section", { className: "section", id: "changelog", "data-screen-label": "Changelog" },
    React.createElement("div", { className: "container" },
      React.createElement(window.SectionHeader, { eyebrow: t("changelog.eyebrow"), title: t("changelog.title"), lead: t("changelog.lead"), coord: "REF·LOG-05", fig: "FIG.05" }),
      React.createElement("div", { className: "timeline" },
        React.createElement("div", { className: "tl-spine", style: { gridRow: "1 / " + (items.length + 1) }, "aria-hidden": true }),
        items.map((c, i) =>
          React.createElement(window.Reveal, {
            key: c.version, as: "div",
            className: "tl-entry " + (i % 2 === 0 ? "left" : "right") + (i === 0 ? " latest" : ""),
            style: { gridRow: i + 1, gridColumn: i % 2 === 0 ? 1 : 3 },
            delay: i * 60,
          },
            React.createElement("div", { className: "tl-card" },
              React.createElement(window.CornerBrackets, null),
              React.createElement("div", { className: "tl-head" },
                React.createElement("span", { className: "ver" }, c.version),
                React.createElement("span", { className: "date" }, c.date),
                i === 0 ? React.createElement(window.Badge, null, "latest") : null
              ),
              React.createElement("ul", { className: "tl-entries" },
                c.entries.map((e, j) => React.createElement("li", { key: j }, e))
              )
            )
          )
        )
      )
    )
  );
}

// ---------- Roadmap ----------
function RoadCol({ titleKey, items, kind }) {
  const { t } = useI18nS();
  return React.createElement(window.Reveal, { className: "rm-col", delay: kind === "progress" ? 100 : kind === "planned" ? 180 : 0 },
    React.createElement("div", { className: "rm-col-head" },
      React.createElement("span", { style: { color: kind === "done" ? "var(--accent)" : "var(--text)" } }, t("roadmap." + titleKey)),
      React.createElement("span", { className: "count" }, String(items.length).padStart(2, "0"))
    ),
    items.map((it, i) =>
      React.createElement("div", { key: i, className: "rm-item rm-item--" + kind },
        kind === "done" ? React.createElement("span", { className: "check" }, React.createElement(window.CheckIcon))
          : kind === "progress" ? React.createElement("span", { className: "spin" })
          : React.createElement("span", { className: "dotbox" }),
        React.createElement("span", null, it)
      )
    )
  );
}

function Roadmap() {
  const { t } = useI18nS();
  return React.createElement("section", { className: "section", id: "roadmap", "data-screen-label": "Roadmap" },
    React.createElement("div", { className: "container" },
      React.createElement(window.SectionHeader, { eyebrow: t("roadmap.eyebrow"), title: t("roadmap.title"), lead: t("roadmap.lead"), coord: "REF·MAP-06", fig: "FIG.06" }),
      React.createElement("div", { className: "roadmap-cols" },
        React.createElement(RoadCol, { titleKey: "done", items: window.ROADMAP.done, kind: "done" }),
        React.createElement(RoadCol, { titleKey: "progress", items: window.ROADMAP.progress, kind: "progress" }),
        React.createElement(RoadCol, { titleKey: "planned", items: window.ROADMAP.planned, kind: "planned" })
      )
    )
  );
}

Object.assign(window, { About, Architecture, Showcase, Changelog, Roadmap });

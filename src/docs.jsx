// docs.jsx — Documentation page with sidebar nav + breadcrumb
import React from 'react';
import { useI18n } from './i18n.jsx';
import { DOCS_NAV } from './data.jsx';

const DOC_CONTENT = {
  "getting-started": {
    title: "Getting Started",
    body: (t) => [
      ["lead", t("docs.lead")],
      ["note", t("docs.note")],
      ["h2", "Overview"],
      ["p", "[PLACEHOLDER: high-level description of how the engine, the .PR4 format, and the glove driver fit together in a single capture-to-render loop.]"],
      ["h2", "Prerequisites"],
      ["ul", ["A C++20 toolchain (Clang or MSVC)", "CMake ≥ 3.24", "Python 3.11 (for the Blender exporter)", "[PLACEHOLDER: glove firmware flashed via PlatformIO]"]],
      ["h2", "Clone & build"],
      ["code", "git clone https://github.com/praHand3D/praHangine.git\ncd praHangine\ncmake -B build -DPR4_TESTS=ON\ncmake --build build -j"],
      ["p", "[PLACEHOLDER: notes on running the first sample scene from a bundled .PR4 asset.]"],
    ],
  },
  "install": { title: "Installation", body: (t) => [
    ["lead", "[PLACEHOLDER: platform-by-platform install instructions.]"],
    ["h2", "Linux"], ["code", "sudo apt install libgl1-mesa-dev libglfw3-dev\ncmake -B build && cmake --build build"],
    ["h2", "macOS"], ["p", "[PLACEHOLDER: brew dependencies + Xcode CLT.]"],
    ["h2", "Windows"], ["p", "[PLACEHOLDER: vcpkg manifest + Visual Studio generator.]"],
  ]},
  "architecture": { title: "Architecture", body: (t) => [
    ["lead", "[PLACEHOLDER: module-by-module breakdown mirroring the schematic on the home page.]"],
    ["h2", "praHangine"], ["p", "[PLACEHOLDER: frame loop, scene graph, render passes.]"],
    ["h2", "praMath"], ["p", "[PLACEHOLDER: SIMD vector/matrix/quaternion types.]"],
    ["h2", "Data flow"], ["p", "[PLACEHOLDER: glove → engine → .PR4 serialization path.]"],
  ]},
  "pr4-format": { title: ".PR4 Format", body: (t) => [
    ["lead", "[PLACEHOLDER: the binary container spec for meshes, rigs, and animation tracks.]"],
    ["h2", "Header layout"], ["code", "magic   : char[4]   // \"PR4\\0\"\nversion : uint16\nchunks  : uint16\nflags   : uint32"],
    ["h3", "Chunk types"], ["ul", ["MESH — vertex/index buffers", "RIG  — joint hierarchy + bind pose", "ANIM — keyframe tracks", "[PLACEHOLDER: TEX chunk]"]],
  ]},
  "api": { title: "API Reference", body: (t) => [
    ["lead", "[PLACEHOLDER: generated reference for the public C++ surface.]"],
    ["h2", "Renderer"], ["code", "Renderer r;\nr.loadScene(\"hand.pr4\");\nr.run();"],
    ["h2", "Glove"], ["p", "[PLACEHOLDER: Glove::poll() returns a JointFrame.]"],
  ]},
  "blender": { title: "Blender Plugin", body: (t) => [
    ["lead", "[PLACEHOLDER: install and use praFormatterPR4 inside Blender.]"],
    ["h2", "Install"], ["p", "[PLACEHOLDER: Edit ▸ Preferences ▸ Add-ons ▸ Install from disk.]"],
    ["h2", "Export"], ["p", "[PLACEHOLDER: File ▸ Export ▸ praHand3D (.PR4).]"],
  ]},
};

function renderBlock(b, i) {
  const [kind, val] = b;
  switch (kind) {
    case "lead": return React.createElement("p", { key: i, className: "lead" }, val);
    case "note": return React.createElement("div", { key: i, className: "doc-note" }, React.createElement("strong", null, "NOTE  "), val);
    case "h2": return React.createElement("h2", { key: i }, val);
    case "h3": return React.createElement("h3", { key: i }, val);
    case "p": return React.createElement("p", { key: i }, val);
    case "code": return React.createElement("pre", { key: i }, React.createElement("code", null, val));
    case "ul": return React.createElement("ul", { key: i }, val.map((li, j) => React.createElement("li", { key: j }, li)));
    default: return null;
  }
}

export function Docs({ navigate, anchor }) {
  const { t } = useI18n();
  const [active, setActive] = React.useState(anchor && DOC_CONTENT[anchor] ? anchor : "getting-started");

  React.useEffect(() => { window.scrollTo(0, 0); }, [active]);

  const page = DOC_CONTENT[active];

  return React.createElement("div", { className: "docs-wrap", "data-screen-label": "Docs" },
    React.createElement("div", { className: "container" },
      React.createElement("nav", { className: "breadcrumb", "aria-label": "Breadcrumb" },
        React.createElement("a", { href: "#/", onClick: (e) => { e.preventDefault(); navigate("home"); } }, t("docs.home")),
        React.createElement("span", { className: "sep" }, "/"),
        React.createElement("a", { href: "#/docs", onClick: (e) => { e.preventDefault(); setActive("getting-started"); } }, t("docs.breadcrumb")),
        React.createElement("span", { className: "sep" }, "/"),
        React.createElement("span", { style: { color: "var(--text)" } }, page.title)
      ),
      React.createElement("div", { className: "docs-grid" },
        React.createElement("aside", { className: "docs-side" },
          DOCS_NAV.map((grp) =>
            React.createElement("div", { key: grp.group, className: "side-group" },
              React.createElement("div", { className: "side-title" }, t("docs.groups." + grp.group)),
              grp.items.map((it) =>
                React.createElement("a", {
                  key: it.id, href: "#/docs/" + it.id,
                  className: active === it.id ? "active" : "",
                  onClick: (e) => { e.preventDefault(); setActive(it.id); window.history.replaceState(null, "", "#/docs/" + it.id); },
                }, it.label)
              )
            )
          )
        ),
        React.createElement("article", { className: "docs-content", key: active },
          React.createElement("h1", null, page.title),
          page.body(t).map(renderBlock)
        )
      )
    )
  );
}

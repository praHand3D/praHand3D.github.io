// data.jsx — content data (typed shape mirrors changelog.ts / roadmap)
const GH_ORG = "https://github.com/praHand3D";

// changelog: { version, date, entries[] }[]
const CHANGELOG = [
  { version: "v0.3.0", date: "2026-05-18", entries: [
    "[PLACEHOLDER: glove serial driver streams 22 joints at 120Hz]",
    "[PLACEHOLDER: .PR4 animation-track chunk added to format spec]",
    "praMath: quaternion SLERP + dual-quaternion skinning",
  ]},
  { version: "v0.2.0", date: "2026-03-02", entries: [
    "[PLACEHOLDER: Blender exporter writes meshes + rigs to .PR4]",
    "praHangine: scene graph + frustum culling",
    "[PLACEHOLDER: first textured cube rendered from .PR4 asset]",
  ]},
  { version: "v0.1.0", date: "2026-01-09", entries: [
    "Initial engine bootstrap — OpenGL context + frame loop",
    "[PLACEHOLDER: .PR4 binary header + mesh chunk defined]",
  ]},
];

// roadmap columns
const ROADMAP = {
  done: [
    "OpenGL render loop + scene graph",
    ".PR4 binary header & mesh chunk",
    "praMath linear algebra core",
    "[PLACEHOLDER: Blender mesh export]",
  ],
  progress: [
    "Glove sensor fusion & calibration",
    "[PLACEHOLDER: skeletal animation playback]",
    "Docs site + API reference",
  ],
  planned: [
    "[PLACEHOLDER: real-time IK retargeting]",
    "[PLACEHOLDER: .PR4 compression]",
    "[PLACEHOLDER: web viewer (WASM)]",
    "[PLACEHOLDER: multi-glove sessions]",
  ],
};

// stack badges
const STACK = ["C++", "OpenGL", "CMake", "Python", "Blender", "GLSL"];

// architecture nodes — id maps to i18n arch.nodes.<id>; pos = center (% of schematic)
const ARCH_NODES = [
  { id: "engine",    label: "praHangine",       ref: "01", repo: GH_ORG + "/praHangine",       core: true,  pos: { left: "50%", top: "13%" } },
  { id: "math",      label: "praMath",          ref: "02", repo: GH_ORG + "/praMath",          pos: { left: "26%", top: "50%" } },
  { id: "pr4",       label: "praPR4",           ref: "03", repo: GH_ORG + "/praPR4",           pos: { left: "74%", top: "50%" } },
  { id: "formatter", label: "praFormatterPR4",  ref: "04", repo: GH_ORG + "/praFormatterPR4",  pos: { left: "74%", top: "87%" } },
];

const DOCS_NAV = [
  { group: "start", items: [
    { id: "getting-started", label: "Getting Started" },
    { id: "install", label: "Installation" },
  ]},
  { group: "reference", items: [
    { id: "architecture", label: "Architecture" },
    { id: "pr4-format", label: ".PR4 Format" },
    { id: "api", label: "API Reference" },
  ]},
  { group: "tooling", items: [
    { id: "blender", label: "Blender Plugin" },
  ]},
];

Object.assign(window, { GH_ORG, CHANGELOG, ROADMAP, STACK, ARCH_NODES, DOCS_NAV });

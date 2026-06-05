// i18n.jsx — translations + context + localStorage persistence
import React from 'react';

const TRANSLATIONS = {
  en: {
    nav: { about: "About", architecture: "Architecture", showcase: "Showcase", changelog: "Changelog", roadmap: "Roadmap", docs: "Docs", home: "Home" },
    hero: {
      kicker: "Open-source · Built from scratch",
      sub: "A real-time hand motion monitoring system built entirely from scratch — custom 3D engine, binary asset format, and sensor glove integration.",
      github: "GitHub", docs: "Documentation", scroll: "Scroll",
    },
    about: {
      eyebrow: "What is this",
      title: "An engine, a format, and a glove.",
      p1: "praHand3D is a real-time hand-tracking platform written **end to end** — no game engine, no off-the-shelf renderer.",
      p2: "The custom **C++ / OpenGL** engine streams skeletal data from a **sensor glove**, serializes scenes into a purpose-built **.PR4** binary format, and pipes assets straight out of Blender.",
      p3: "It's a study in owning the **full stack** of a graphics pipeline — from the silicon-adjacent sensor reads up to the frame on screen.",
      stackLabel: "// stack",
    },
    arch: {
      eyebrow: "How it fits together",
      title: "System Architecture",
      lead: "Five modules wired like a circuit board. Hover a node for detail, click to open its repository.",
      open: "open repo ↗",
      nodes: {
        engine: { kind: "core engine", desc: "Real-time C++/OpenGL renderer. Owns the frame loop, scene graph, and device input." },
        math: { kind: "library", desc: "Linear algebra & quaternion library powering transforms, IK, and camera math." },
        pr4: { kind: "format runtime", desc: "Loader/writer for the .PR4 binary scene format — meshes, rigs, and animation tracks." },
        formatter: { kind: "tooling", desc: "Blender export plugin that bakes scenes into .PR4 packages." },
        glove: { kind: "hardware", desc: "Sensor glove firmware + driver streaming skeletal joint data over serial." },
      },
    },
    showcase: {
      eyebrow: "Captures",
      title: "Showcase",
      lead: "Screenshots and clips from the engine, format tooling, and Blender pipeline.",
    },
    changelog: { eyebrow: "History", title: "Changelog", lead: "Notable changes, newest first." },
    roadmap: {
      eyebrow: "What's next",
      title: "Roadmap",
      lead: "Where the project stands and where it's headed.",
      done: "Done", progress: "In Progress", planned: "Planned",
    },
    footer: { rights: "Built from scratch.", org: "GitHub", license: "MIT License" },
    docs: {
      home: "Home", title: "Documentation", breadcrumb: "Docs",
      groups: {
        start: "Getting Started", reference: "Reference", tooling: "Tooling",
      },
      heading: "Getting Started",
      lead: "Everything you need to build, run, and extend praHand3D — from cloning the engine to writing your first .PR4 exporter.",
      note: "This documentation is a work in progress. Sections below are placeholders for the real reference content.",
    },
  },
  pl: {
    nav: { about: "O projekcie", architecture: "Architektura", showcase: "Galeria", changelog: "Zmiany", roadmap: "Plan", docs: "Dokumentacja", home: "Start" },
    hero: {
      kicker: "Open-source · Zbudowane od zera",
      sub: "System monitorowania ruchu dłoni w czasie rzeczywistym zbudowany całkowicie od zera — własny silnik 3D, binarny format zasobów i integracja z rękawicą sensoryczną.",
      github: "GitHub", docs: "Dokumentacja", scroll: "Przewiń",
    },
    about: {
      eyebrow: "Co to jest",
      title: "Silnik, format i rękawica.",
      p1: "praHand3D to platforma śledzenia dłoni w czasie rzeczywistym napisana **w całości** — bez silnika gier, bez gotowego renderera.",
      p2: "Własny silnik **C++ / OpenGL** przesyła dane szkieletu z **rękawicy sensorycznej**, serializuje sceny do dedykowanego formatu binarnego **.PR4** i pobiera zasoby prosto z Blendera.",
      p3: "To studium panowania nad **całym potokiem** graficznym — od odczytów z sensora aż po klatkę na ekranie.",
      stackLabel: "// stos",
    },
    arch: {
      eyebrow: "Jak to działa razem",
      title: "Architektura Systemu",
      lead: "Pięć modułów połączonych jak płytka drukowana. Najedź na węzeł po szczegóły, kliknij, aby otworzyć repozytorium.",
      open: "otwórz repo ↗",
      nodes: {
        engine: { kind: "rdzeń silnika", desc: "Renderer C++/OpenGL czasu rzeczywistego. Zarządza pętlą klatki, grafem sceny i wejściem urządzeń." },
        math: { kind: "biblioteka", desc: "Biblioteka algebry liniowej i kwaternionów obsługująca transformacje, IK i matematykę kamery." },
        pr4: { kind: "format", desc: "Loader/zapis formatu binarnego .PR4 — siatki, szkielety i ścieżki animacji." },
        formatter: { kind: "narzędzia", desc: "Wtyczka eksportu Blender, która pakuje sceny do paczek .PR4." },
        glove: { kind: "sprzęt", desc: "Firmware i sterownik rękawicy przesyłające dane stawów przez port szeregowy." },
      },
    },
    showcase: {
      eyebrow: "Zrzuty",
      title: "Galeria",
      lead: "Zrzuty ekranu i klipy z silnika, narzędzi formatu i potoku Blender.",
    },
    changelog: { eyebrow: "Historia", title: "Lista zmian", lead: "Ważne zmiany, od najnowszych." },
    roadmap: {
      eyebrow: "Co dalej",
      title: "Plan rozwoju",
      lead: "Gdzie projekt jest teraz i dokąd zmierza.",
      done: "Gotowe", progress: "W toku", planned: "Planowane",
    },
    footer: { rights: "Zbudowane od zera.", org: "GitHub", license: "Licencja MIT" },
    docs: {
      home: "Start", title: "Dokumentacja", breadcrumb: "Dokumentacja",
      groups: { start: "Wprowadzenie", reference: "Referencje", tooling: "Narzędzia" },
      heading: "Wprowadzenie",
      lead: "Wszystko, czego potrzebujesz, aby zbudować, uruchomić i rozszerzyć praHand3D — od sklonowania silnika po napisanie pierwszego eksportera .PR4.",
      note: "Ta dokumentacja jest w trakcie tworzenia. Poniższe sekcje to symbole zastępcze dla właściwej treści.",
    },
  },
};

export const LANGS = ["en", "pl"];
const I18nContext = React.createContext(null);

export function I18nProvider({ children }) {
  const [lang, setLang] = React.useState(() => {
    const stored = localStorage.getItem("praHand3D.lang");
    return LANGS.includes(stored) ? stored : "en";
  });
  React.useEffect(() => {
    localStorage.setItem("praHand3D.lang", lang);
    document.documentElement.setAttribute("lang", lang);
  }, [lang]);

  const t = React.useCallback((path) => {
    const parts = path.split(".");
    let cur = TRANSLATIONS[lang];
    for (const p of parts) { cur = cur && cur[p]; }
    if (cur == null) {
      // fallback to EN
      cur = TRANSLATIONS.en;
      for (const p of parts) { cur = cur && cur[p]; }
    }
    return cur == null ? path : cur;
  }, [lang]);

  return React.createElement(I18nContext.Provider, { value: { lang, setLang, t } }, children);
}

export function useI18n() {
  return React.useContext(I18nContext);
}

// emphasis markdown (**bold**) -> spans
export function richText(str) {
  const parts = String(str).split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => {
    if (p.startsWith("**") && p.endsWith("**")) {
      return React.createElement("strong", { key: i }, p.slice(2, -2));
    }
    return p;
  });
}

// app.jsx — root: hash routing + mount
import React from 'react';
import { createRoot } from 'react-dom/client';
import { I18nProvider, useI18n } from './i18n.jsx';
import { Header, Footer } from './chrome.jsx';
import { Hero } from './hero.jsx';
import { About, Architecture, Showcase, Changelog, Roadmap } from './sections.jsx';
import { Docs } from './docs.jsx';

function parseHash() {
  const h = (window.location.hash || "").replace(/^#/, "");
  if (h.startsWith("/docs")) {
    const parts = h.split("/").filter(Boolean); // ["docs", maybe id]
    return { route: "docs", anchor: parts[1] || null };
  }
  return { route: "home", anchor: null };
}

function App() {
  const [state, setState] = React.useState(parseHash());
  const pendingScroll = React.useRef(null);

  React.useEffect(() => {
    const onHash = () => setState(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const navigate = (route, sectionId) => {
    if (route === "docs") {
      window.history.pushState(null, "", "#/docs");
      setState({ route: "docs", anchor: null });
      window.scrollTo(0, 0);
    } else {
      window.history.pushState(null, "", "#/");
      setState({ route: "home", anchor: null });
      if (sectionId) {
        pendingScroll.current = sectionId;
      } else {
        window.scrollTo(0, 0);
      }
    }
  };

  // after switching to home, scroll to pending section
  React.useEffect(() => {
    if (state.route === "home" && pendingScroll.current) {
      const id = pendingScroll.current;
      pendingScroll.current = null;
      requestAnimationFrame(() => {
        setTimeout(() => {
          const el = document.getElementById(id);
          if (el) window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
        }, 60);
      });
    }
  }, [state.route]);

  return React.createElement(React.Fragment, null,
    React.createElement(Header, { route: state.route, navigate }),
    React.createElement("main", null,
      state.route === "docs"
        ? React.createElement(Docs, { navigate, anchor: state.anchor })
        : React.createElement(React.Fragment, null,
            React.createElement(Hero, { navigate }),
            React.createElement(About),
            React.createElement(Architecture),
            React.createElement(Showcase),
            React.createElement(Changelog),
            React.createElement(Roadmap)
          )
    ),
    React.createElement(Footer)
  );
}

function Root() {
  return React.createElement(I18nProvider, null, React.createElement(App));
}

export default Root;

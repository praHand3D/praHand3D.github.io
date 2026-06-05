// chrome.jsx — Header + Footer
import React from 'react';
import { useI18n, LANGS, richText } from './i18n.jsx';
import { GitHubIcon, MenuIcon, Button, BookIcon } from './ui.jsx';
import { GH_ORG } from './data.jsx';

function LangSwitch() {
  const { lang, setLang } = useI18n();
  return React.createElement("div", { className: "lang", role: "group", "aria-label": "Language" },
    LANGS.map((l) =>
      React.createElement("button", {
        key: l,
        className: lang === l ? "active" : "",
        onClick: () => setLang(l),
        "aria-pressed": lang === l,
      }, l.toUpperCase())
    )
  );
}

// nav links: section anchors only valid on home; on docs they route home then scroll
export function Header({ route, navigate }) {
  const { t } = useI18n();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sections = ["about", "architecture", "showcase", "changelog", "roadmap"];

  const goToSection = (id, e) => {
    if (e) e.preventDefault();
    setOpen(false);
    if (route !== "home") {
      navigate("home", id);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView ? window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" }) : null;
    }
  };

  const goHome = (e) => { if (e) e.preventDefault(); setOpen(false); navigate("home"); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goDocs = (e) => { if (e) e.preventDefault(); setOpen(false); navigate("docs"); };

  return React.createElement(React.Fragment, null,
    React.createElement("header", { className: "header", style: scrolled ? { background: "rgba(30,30,30,0.85)" } : undefined },
      React.createElement("div", { className: "container" },
        React.createElement("div", { className: "brand", onClick: goHome, role: "link", tabIndex: 0,
          onKeyDown: (e) => e.key === "Enter" && goHome() },
          React.createElement("span", { className: "mark" }),
          "praHand3D"
        ),
        React.createElement("nav", { className: "nav", "aria-label": "Primary" },
          sections.map((s) =>
            React.createElement("a", { key: s, href: "#" + s, onClick: (e) => goToSection(s, e) }, useI18n().t("nav." + s))
          ),
          React.createElement("a", { href: "#/docs", onClick: goDocs, className: route === "docs" ? "active" : "" }, useI18n().t("nav.docs"))
        ),
        React.createElement("div", { className: "header-right" },
          React.createElement(LangSwitch),
          React.createElement("a", { className: "icon-link", href: GH_ORG, target: "_blank", rel: "noopener noreferrer", "aria-label": "GitHub" },
            React.createElement(GitHubIcon, { size: 19 })
          ),
          React.createElement("button", { className: "hamburger", onClick: () => setOpen((o) => !o), "aria-label": "Menu", "aria-expanded": open },
            React.createElement(MenuIcon, { open })
          )
        )
      )
    ),
    React.createElement("div", { className: "drawer" + (open ? " open" : ""), "aria-hidden": !open },
      sections.map((s) =>
        React.createElement("a", { key: s, href: "#" + s, onClick: (e) => goToSection(s, e) }, useI18n().t("nav." + s))
      ),
      React.createElement("a", { href: "#/docs", onClick: goDocs }, useI18n().t("nav.docs"))
    )
  );
}

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();
  return React.createElement("footer", { className: "footer" },
    React.createElement("div", { className: "container" },
      React.createElement("div", { className: "f-left" },
        "© " + year + " praHand3D — ", t("footer.rights")
      ),
      React.createElement("div", { className: "f-right" },
        React.createElement("a", { className: "icon-link", href: GH_ORG, target: "_blank", rel: "noopener noreferrer", style: { display: "inline-flex", alignItems: "center", gap: "8px", fontFamily: "var(--mono)", fontSize: "13px" } },
          React.createElement(GitHubIcon, { size: 16 }), t("footer.org")
        ),
        React.createElement("span", { className: "badge" }, t("footer.license"))
      )
    )
  );
}

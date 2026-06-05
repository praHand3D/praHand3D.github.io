// hero.jsx — Hero section with animated blueprint grid canvas
const { useI18n: useI18nHero } = window;

function BlueprintGrid() {
  const canvasRef = React.useRef(null);
  const mouse = React.useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf, w, h, dpr;
    const GRID = 40; // px cell size
    let t0 = performance.now();
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e) {
      const nx = (e.clientX / window.innerWidth) - 0.5;
      const ny = (e.clientY / window.innerHeight) - 0.5;
      mouse.current.tx = nx; mouse.current.ty = ny;
    }
    window.addEventListener("mousemove", onMove);

    function draw(now) {
      const drift = reduce ? 0 : ((now - t0) * 0.006) % GRID;
      // ease mouse
      mouse.current.x += (mouse.current.tx - mouse.current.x) * 0.06;
      mouse.current.y += (mouse.current.ty - mouse.current.y) * 0.06;
      const px = mouse.current.x * 26; // parallax strength
      const py = mouse.current.y * 26;

      ctx.clearRect(0, 0, w, h);

      // minor grid
      const offX = (-drift + px) % GRID;
      const offY = (-drift + py) % GRID;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(255,201,81,0.05)";
      ctx.beginPath();
      for (let x = offX - GRID; x <= w + GRID; x += GRID) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = offY - GRID; y <= h + GRID; y += GRID) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // major grid (every 5 cells) brighter
      const MAJ = GRID * 5;
      const moffX = (-drift * 1.4 + px * 1.6) % MAJ;
      const moffY = (-drift * 1.4 + py * 1.6) % MAJ;
      ctx.strokeStyle = "rgba(255,201,81,0.11)";
      ctx.beginPath();
      for (let x = moffX - MAJ; x <= w + MAJ; x += MAJ) { ctx.moveTo(x, 0); ctx.lineTo(x, h); }
      for (let y = moffY - MAJ; y <= h + MAJ; y += MAJ) { ctx.moveTo(0, y); ctx.lineTo(w, y); }
      ctx.stroke();

      // intersection ticks on major grid
      ctx.fillStyle = "rgba(255,201,81,0.22)";
      for (let x = moffX - MAJ; x <= w + MAJ; x += MAJ) {
        for (let y = moffY - MAJ; y <= h + MAJ; y += MAJ) {
          ctx.fillRect(x - 2.5, y - 0.5, 5, 1);
          ctx.fillRect(x - 0.5, y - 2.5, 1, 5);
        }
      }

      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return React.createElement("canvas", { ref: canvasRef, "aria-hidden": true });
}

function Hero({ navigate }) {
  const { t } = useI18nHero();
  return React.createElement("section", { className: "hero", id: "top", "data-screen-label": "Hero" },
    React.createElement(BlueprintGrid),
    React.createElement("div", { className: "hero-vignette" }),
    // CAD overlay
    React.createElement("div", { className: "hero-cad", "aria-hidden": true },
      React.createElement("span", { className: "cad-coord hc tl" }, "X 0032 · Y 0096"),
      React.createElement("span", { className: "cad-coord hc tr" }, "PROJ praHand3D"),
      React.createElement("span", { className: "cad-coord hc bl" }, "REV 0.3.0"),
      React.createElement("span", { className: "cad-coord hc br" }, "SHEET 01/01"),
      React.createElement("span", { className: "hc-cross c1" }, React.createElement(window.Crosshair, { size: 20 })),
      React.createElement("span", { className: "hc-cross c2" }, React.createElement(window.Crosshair, { size: 20 })),
      React.createElement("span", { className: "hc-diag d1" }, React.createElement(window.DiagGuide, { w: 72, h: 72 })),
      React.createElement("span", { className: "hc-diag d2" }, React.createElement(window.DiagGuide, { w: 72, h: 72 }))
    ),
    React.createElement("div", { className: "hero-inner" },
      React.createElement("div", { className: "container" },
        React.createElement("span", { className: "hero-kicker" },
          React.createElement("span", { className: "pulse" }), t("hero.kicker")
        ),
        React.createElement("h1", null, "pra", React.createElement("span", { className: "alt" }, "Hand"), "3D"),
        React.createElement("div", { className: "hero-dim" }, React.createElement(window.DimLine, { label: "REAL-TIME", w: 300 })),
        React.createElement("p", { className: "hero-sub" }, t("hero.sub")),
        React.createElement("div", { className: "hero-cta" },
          React.createElement(window.Button, { variant: "primary", href: window.GH_ORG, external: true, icon: React.createElement(window.GitHubIcon, { size: 17 }) }, t("hero.github")),
          React.createElement(window.Button, { variant: "ghost", href: "#/docs", onClick: (e) => { e.preventDefault(); navigate("docs"); }, icon: React.createElement(window.BookIcon) }, t("hero.docs"))
        )
      )
    ),
    React.createElement("div", { className: "scroll-ind" },
      t("hero.scroll"),
      React.createElement("span", { className: "line" })
    )
  );
}

Object.assign(window, { Hero, BlueprintGrid });

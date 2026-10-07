(() => {
  "use strict";
  const S = window.SITE;
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const ICON_IMG = '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="16" rx="2"/><circle cx="9" cy="10" r="2"/><path d="M21 16l-5-5-9 9"/></svg>';
  const ICON_ARROW = '<svg viewBox="0 0 24 24"><path d="M4 12h15M13 6l6 6-6 6"/></svg>';
  const placeholder = (label = "Result coming soon") => `<div class="ph"><div>${ICON_IMG}${esc(label)}</div></div>`;
  const img = (src, alt, label) => (src ? `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" data-zoom>` : placeholder(label));

  /* ------------------------------------------------------------ theme & nav */
  const root = document.documentElement;
  $("#theme-toggle").addEventListener("click", () => {
    const dark = root.dataset.theme ? root.dataset.theme === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = dark ? "light" : "dark";
    try { localStorage.setItem("odd-theme", root.dataset.theme); } catch (e) {}
  });
  const nav = $("#nav");
  const onScroll = () => nav.classList.toggle("scrolled", window.scrollY > window.innerHeight * 0.6);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------ reveal on scroll */
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  const observeReveals = () => $$(".reveal:not(.in)").forEach((el) => io.observe(el));
  observeReveals();

  /* ------------------------------------------------------------ links */
  $$("#link-buttons [data-link]").forEach((a) => {
    const url = S.links[a.dataset.link];
    if (url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
    else { a.classList.add("soon"); a.removeAttribute("href"); a.setAttribute("aria-disabled", "true"); }
  });

  $$(".author[data-author]").forEach((el) => {
    const url = (S.authors || {})[el.dataset.author];
    if (url) { el.href = url; el.target = "_blank"; el.rel = "noopener"; }
  });

  /* ------------------------------------------------------------ hero: tokens unmasking in a few steps */
  (function heroTokens() {
    // One canvas, redrawing only the tiles that are changing.
    // Each cycle decodes one of our generated images: every tile is an image token, a random subset
    // is committed at each of 8 steps (as in masked diffusion), and a committed tile flashes and then
    // shows the color of its image patch. Tiles near the cursor preview their patch.
    const cv = $("#hero-canvas"), hero = $(".hero"), ctx = cv.getContext("2d");
    const CELL = 40, SIZE = 34, ANGLE = (-8 * Math.PI) / 180, COS = Math.cos(ANGLE), SIN = Math.sin(ANGLE);
    const STEPS = 8, STEP_MS = 520, HOLD = 3, RISE = 0.45, FALL = 0.9, HOVER_R = 115;
    const STOPS = [[124, 77, 255], [229, 57, 53], [255, 138, 61]];
    let tiles = [], grid = new Map(), W = 0, H = 0, dpr = 1, raf = 0, timer = 0, visible = true;
    let ranks = [], step = 0, last = 0, hovered = new Set(), pointer = null;
    const active = new Set();
    const pics = ((S.hero || {}).images || []).map((src) => { const im = new Image(); im.src = src; return im; });
    let picIdx = -1;
    // Average color of each tile's patch in the image (cover-fit to the hero); null on failure.
    function sampleColors(im) {
      try {
        if (!im || !im.complete || !im.naturalWidth) return null;
        const f = 20, w = Math.ceil(W / f), h = Math.ceil(H / f), oc = document.createElement("canvas");
        oc.width = w; oc.height = h;
        const o = oc.getContext("2d"), s = Math.max(w / im.naturalWidth, h / im.naturalHeight);
        o.drawImage(im, (w - im.naturalWidth * s) / 2, (h - im.naturalHeight * s) / 2, im.naturalWidth * s, im.naturalHeight * s);
        const px = o.getImageData(0, 0, w, h).data;
        return tiles.map((t) => {
          const x = Math.min(w - 1, Math.max(0, Math.floor((t.sx + W / 2) / f))), y = Math.min(h - 1, Math.max(0, Math.floor((t.sy + H / 2) / f)));
          const k = (y * w + x) * 4;
          return [px[k], px[k + 1], px[k + 2]];
        });
      } catch (e) { return null; }                        // e.g. file:// pages taint the canvas
    }
    const lerp = (a, b, t) => a + (b - a) * t;
    const colorAt = (u) => {
      const k = Math.min(0.999, Math.max(0, u)) * 2, i = Math.floor(k), f = k - i;
      return STOPS[i].map((c, j) => Math.round(lerp(c, STOPS[i + 1][j], f)));
    };

    function build() {
      W = hero.clientWidth; H = hero.clientHeight; dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      const n = Math.ceil((Math.hypot(W, H) * 0.6) / CELL);
      tiles = []; grid = new Map(); active.clear(); hovered.clear();
      for (let gy = -n; gy <= n; gy++) for (let gx = -n; gx <= n; gx++) {
        const x = gx * CELL, y = gy * CELL, sx = x * COS - y * SIN, sy = x * SIN + y * COS;
        if (Math.abs(sx) > W / 2 + CELL || Math.abs(sy) > H / 2 + CELL) continue;
        const r = Math.hypot(sx / (W / 2), sy / (H / 2)) / Math.SQRT2;
        const a = Math.min(1, Math.max(0, (r - 0.3) / 0.48));       // clear center, strong edges
        if (a < 0.02) continue;
        grid.set(gx + "," + gy, tiles.length);
        tiles.push({ x, y, sx, sy, a, col: colorAt((sx + W / 2) / W), lit: 0, target: 0, hov: 0, htarget: 0 });
      }
      ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.setTransform(dpr * COS, dpr * SIN, -dpr * SIN, dpr * COS, (W / 2) * dpr, (H / 2) * dpr);
      ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.font = '500 11px "JetBrains Mono", monospace';
      tiles.forEach(draw); newCycle();
    }

    function draw(t) {
      const h = SIZE / 2, x = t.x - h, y = t.y - h, a = t.a;
      const lit = Math.max(t.lit, 0), hov = t.hov, on = Math.min(1, lit + hov * 0.7);
      const flash = t.target === 1 && lit < 1 ? Math.sin(Math.PI * lit) : 0;
      const [r, g, b] = t.col;
      ctx.clearRect(x - 2, y - 2, SIZE + 4, SIZE + 4);
      ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x, y, SIZE, SIZE, 7) : ctx.rect(x, y, SIZE, SIZE);
      ctx.fillStyle = `rgba(255,255,255,${0.025 * a})`; ctx.fill();
      if (on > 0) { ctx.fillStyle = `rgba(${r},${g},${b},${0.72 * on * a})`; ctx.fill(); }
      if (flash > 0) { ctx.fillStyle = `rgba(255,236,240,${0.6 * flash * a})`; ctx.fill(); }
      ctx.lineWidth = 1 + flash;
      ctx.strokeStyle = on > 0 || flash > 0
        ? `rgba(${Math.min(255, r + 70)},${Math.min(255, g + 90)},${Math.min(255, b + 90)},${(0.12 + 0.5 * Math.max(on, flash)) * a})`
        : `rgba(255,255,255,${0.07 * a})`;
      ctx.stroke();
      // "M" (mask token) fades out as the tile is committed.
      const m = 1 - Math.min(1, Math.max(lit, hov) * 1.6);
      if (m > 0) { ctx.fillStyle = `rgba(255,255,255,${0.16 * m * a})`; ctx.fillText("M", t.x, t.y + 0.5); }
    }

    function animate(now) {
      const dt = Math.min(0.05, last ? (now - last) / 1000 : 0.016); last = now;
      for (const i of active) {
        const t = tiles[i];
        t.lit = t.target > t.lit ? Math.min(t.target, t.lit + dt / RISE) : Math.max(t.target, t.lit - dt / FALL);
        t.hov = t.htarget > t.hov ? Math.min(t.htarget, t.hov + dt / 0.18) : Math.max(t.htarget, t.hov - dt / 0.7);
        draw(t);
        if (t.lit === t.target && t.hov === t.htarget) active.delete(i);
      }
      raf = active.size ? requestAnimationFrame(animate) : 0;
      if (!raf) last = 0;
    }
    const kick = () => { if (!raf) raf = requestAnimationFrame(animate); };

    function newCycle() {
      // Next image; tiles keep the gradient colors if it is not available.
      if (pics.length) {
        picIdx = (picIdx + 1) % pics.length;
        const cols = sampleColors(pics[picIdx]);
        if (cols) tiles.forEach((t, i) => (t.col = cols[i]));
      }
      // Masked diffusion: a uniformly random subset of tokens is committed at each step.
      const order = tiles.map((_, i) => i);
      for (let i = order.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [order[i], order[j]] = [order[j], order[i]]; }
      ranks = Array.from({ length: STEPS }, () => []);
      order.forEach((i, k) => ranks[Math.floor((k * STEPS) / order.length)].push(i));
      step = 0;
    }
    function tick() {
      if (step < STEPS) { ranks[step].forEach((i) => { tiles[i].target = 1; active.add(i); }); kick(); }
      else if (step === STEPS + HOLD) {
        // Fade out in the same random order, slightly staggered.
        ranks.forEach((ring, k) => setTimeout(() => { ring.forEach((i) => { tiles[i].target = 0; active.add(i); }); kick(); }, k * 70));
      } else if (step === STEPS + HOLD + 3) { newCycle(); return; }
      step++;
    }

    // Cursor spotlight (desktop only).
    function onPointer() {
      const next = new Set();
      if (pointer) {
        const px = pointer.x - W / 2, py = pointer.y - H / 2;
        const rx = px * COS + py * SIN, ry = -px * SIN + py * COS;      // into grid space
        const cx = Math.round(rx / CELL), cy = Math.round(ry / CELL), k = Math.ceil(HOVER_R / CELL);
        for (let gy = cy - k; gy <= cy + k; gy++) for (let gx = cx - k; gx <= cx + k; gx++) {
          const i = grid.get(gx + "," + gy); if (i === undefined) continue;
          const t = tiles[i], dd = Math.hypot(t.x - rx, t.y - ry);
          if (dd < HOVER_R) { t.htarget = 1 - dd / HOVER_R; next.add(i); active.add(i); }
        }
      }
      hovered.forEach((i) => { if (!next.has(i)) { tiles[i].htarget = 0; active.add(i); } });
      hovered = next; kick();
    }
    let pending = false;
    if (!reduceMotion && matchMedia("(hover: hover)").matches) {
      hero.addEventListener("pointermove", (e) => {
        const r = hero.getBoundingClientRect(); pointer = { x: e.clientX - r.left, y: e.clientY - r.top };
        if (!pending) { pending = true; requestAnimationFrame(() => { pending = false; onPointer(); }); }
      });
      hero.addEventListener("pointerleave", () => { pointer = null; onPointer(); });
    }

    const sync = () => {
      const on = visible && !document.hidden && !reduceMotion;
      if (on && !timer) timer = setInterval(tick, STEP_MS);
      if (!on && timer) { clearInterval(timer); timer = 0; }
    };
    build();
    if (document.fonts) document.fonts.ready.then(build);
    if (pics[0]) pics[0].addEventListener("load", () => { if (step <= 1) { picIdx = -1; newCycle(); } });
    let rt = 0;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(build, 150); });
    new IntersectionObserver((e) => { visible = e[0].isIntersecting; sync(); }).observe(hero);
    document.addEventListener("visibilitychange", sync);
  })();

  /* ------------------------------------------------------------ hero: count-up stats */
  $$(".stat-num").forEach((el) => {
    const target = parseFloat(el.dataset.count), dec = +(el.dataset.decimals || 1);
    if (reduceMotion) return;
    const t0 = performance.now(), dur = 1600;
    const tick = (t) => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 3);
      el.textContent = (target * e).toFixed(dec);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });

  /* ------------------------------------------------------------ decoding race */
  (function race() {
    const OURS_SECONDS = 1.3;           // on-screen duration of the student lane
    const BLOCK = 8;                    // words per displayed text block
    const lanes = { teacher: $("#lane-teacher"), ours: $("#lane-ours") };
    const speedOf = (k) => S.speed.find((s) => s.key === k);
    let raf = 0, task = "t2i", started = false;
    const shuffle = (a) => { for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; };

    // Image: tiles revealed in random order over `steps` steps.
    function imageSchedule(n, steps) {
      const out = Array.from({ length: steps }, () => []);
      shuffle([...Array(n).keys()]).forEach((tile, k) => out[Math.floor((k * steps) / n)].push(tile));
      return out;
    }
    // Text: blocks left to right; inside a block, tokens are committed in random order,
    // `perBlock` tokens per step (teacher: 1, student: several in parallel).
    function textSchedule(n, perBlockSteps) {
      const out = [];
      for (let b = 0; b * BLOCK < n; b++) {
        const ids = shuffle([...Array(Math.min(BLOCK, n - b * BLOCK)).keys()].map((i) => b * BLOCK + i));
        const steps = perBlockSteps === "one" ? ids.length : Math.min(perBlockSteps, ids.length);
        for (let s = 0; s < steps; s++) out.push(ids.filter((_, k) => Math.floor((k * steps) / ids.length) === s));
      }
      return out;
    }

    function context() {
      const r = S.race[task] || {}, box = $("#race-context");
      const thumb = (src) => (src ? `<img src="${esc(src)}" alt="" data-zoom>` : "");
      if (task === "t2i") box.innerHTML = `<div><b>Prompt</b>${esc(r.prompt)}</div>`;
      if (task === "i2i") box.innerHTML = `${thumb(r.source)}<div><b>Instruction</b>${esc(r.instruction)}</div>`;
      if (task === "mmu") box.innerHTML = `${thumb(r.image)}<div><b>Question</b>${esc(r.question)}</div>`;
    }

    function setup(lane, cfg, who) {
      const text = task === "mmu", r = S.race[task] || {};
      const board = $(".board", lane), tiles = $("[data-tiles]", lane), art = $("[data-art]", lane), tb = $("[data-text]", lane);
      board.classList.toggle("text-mode", text);
      tiles.hidden = text; art.hidden = text; tb.hidden = !text;
      $("[data-meta]", lane).textContent = `${cfg.steps} steps · NFE ${cfg.nfe}`;
      $("[data-done]", lane)?.classList.remove("show");
      if (text) {
        const words = String(r[who] || "").split(/\s+/).filter(Boolean);
        tb.innerHTML = words.map((w) => `<span class="tok m">${esc(w)}</span> `).join("");
        return { cells: $$(".tok", tb), sched: textSchedule(words.length, who === "teacher" ? "one" : 4), cfg, lane, board, shown: 0 };
      }
      tiles.style.gridTemplateColumns = "repeat(16, 1fr)";
      tiles.style.gridTemplateRows = "repeat(16, 1fr)";
      tiles.innerHTML = "<i></i>".repeat(256);
      const pic = r[who];
      art.className = "board-art" + (pic ? "" : " placeholder");
      art.style.backgroundImage = pic ? `url("${pic}")` : "";
      return { cells: $$("i", tiles), sched: imageSchedule(256, cfg.steps), cfg, lane, board, art, shown: 0 };
    }

    function run() {
      cancelAnimationFrame(raf);
      const sp = speedOf(task);
      context();
      const L = { teacher: setup(lanes.teacher, sp.teacher, "teacher"), ours: setup(lanes.ours, sp.ours, "ours") };
      $("[data-speedup]", lanes.ours).textContent = `${sp.speedup}×`;
      const scale = sp.ours.sec / OURS_SECONDS;            // real seconds per on-screen second
      const dur = { teacher: sp.teacher.sec / scale, ours: OURS_SECONDS };
      const t0 = performance.now();
      const frame = (t) => {
        const el = Math.max(0, (t - t0) / 1000);
        let alive = false;
        for (const k of ["teacher", "ours"]) {
          const s = L[k], p = reduceMotion ? 1 : Math.min(1, el / dur[k]);
          const target = Math.floor(p * s.sched.length);
          if (s.shown < target) {
            while (s.shown < target) { s.sched[s.shown].forEach((i) => s.cells[i].classList.add("c")); s.shown++; }
            s.board.classList.remove("tick"); void s.board.offsetWidth; s.board.classList.add("tick");   // pulse once per step
          }
          if (s.art) s.art.style.filter = `blur(${((1 - p) * 9).toFixed(1)}px) saturate(${(0.35 + 0.65 * p).toFixed(2)})`;
          const stepsDone = Math.floor(p * s.cfg.steps);
          $("[data-fill]", s.lane).style.width = `${p * 100}%`;
          $("[data-step]", s.lane).textContent = `step ${stepsDone} / ${s.cfg.steps}`;
          $("[data-time]", s.lane).textContent = `${(Math.min(el, dur[k]) * scale).toFixed(1)} s`;
          if (k === "ours" && p === 1) $("[data-done]", s.lane).classList.add("show");
          if (p < 1) alive = true;
        }
        if (alive) raf = requestAnimationFrame(frame);
      };
      raf = requestAnimationFrame(frame);
    }

    $$("#race-task button").forEach((b) => b.addEventListener("click", () => {
      $$("#race-task button").forEach((x) => x.classList.toggle("active", x === b));
      task = b.dataset.task; run();
    }));
    $("#race-replay").addEventListener("click", run);
    new IntersectionObserver((entries, obs) => {
      if (entries[0].isIntersecting && !started) { started = true; run(); obs.disconnect(); }
    }, { threshold: 0.35 }).observe($("#race"));
  })();

  /* ------------------------------------------------------------ latency bars */
  (function latency() {
    const max = Math.max(...S.speed.map((s) => s.teacher.sec));
    $("#latency-bars").innerHTML = S.speed.map((s) => `
      <div class="bar-row">
        <div class="bar-task">${esc(s.task)}<small>${s.speedup}× faster</small></div>
        <div class="bar-pair">
          <div class="bar t"><span data-w="${(s.teacher.sec / max) * 100}"></span><em>${s.teacher.sec} s · ${s.teacher.steps} steps · NFE ${s.teacher.nfe}</em></div>
          <div class="bar o"><span data-w="${Math.max((s.ours.sec / max) * 100, 0.8)}"></span><em>${s.ours.sec} s · ${s.ours.steps} steps · NFE ${s.ours.nfe}</em></div>
        </div>
      </div>`).join("");
    new IntersectionObserver((entries, obs) => {
      if (!entries[0].isIntersecting) return;
      $$("#latency-bars [data-w]").forEach((b) => (b.style.width = b.dataset.w + "%"));
      obs.disconnect();
    }, { threshold: 0.3 }).observe($("#latency"));
  })();

  /* ------------------------------------------------------------ gallery */
  (function gallery() {
    const grid = $("#gallery-grid");
    const render = {
      t2i: (items) => items.map((x) => `
        <div class="g-item square">${img(x.image, x.prompt)}${x.prompt ? `<div class="g-cap">${esc(x.prompt)}</div>` : ""}</div>`).join(""),
      edit: (items) => items.map((x) => `
        <div class="g-item"><div class="pair"><div class="slot">${img(x.source, "source", "Source")}</div>
          <div class="arrow">${ICON_ARROW}</div><div class="slot">${img(x.output, x.instruction, "Edited")}</div></div>
          <div class="pair-cap"><b>${esc(x.type || "Instruction")}:</b> ${esc(x.instruction) || "coming soon"}</div></div>`).join(""),
      control: (items) => items.map((x) => `
        <div class="g-item"><div class="pair"><div class="slot">${img(x.condition, x.type, x.type + " condition")}</div>
          <div class="arrow">${ICON_ARROW}</div><div class="slot">${img(x.output, x.prompt, "Output")}</div></div>
          <div class="pair-cap"><b>${esc(x.type)}:</b> ${esc(x.prompt) || "coming soon"}</div></div>`).join(""),
      mmu: (items) => items.map((x) => `
        <div class="g-item"><div class="qa"><div class="slot">${img(x.image, x.question, "Input image")}</div>
          <div class="bubble q"><b>Question</b>${esc(x.question) || "coming soon"}</div>
          <div class="bubble a"><b>Ours · 64 steps</b>${esc(x.answer) || "coming soon"}</div></div></div>`).join(""),
    };
    const show = (tab) => { grid.className = `gallery reveal in ${tab}`; grid.innerHTML = render[tab](S.gallery[tab] || []); };
    $$("#gallery-tabs button").forEach((b) => b.addEventListener("click", () => {
      $$("#gallery-tabs button").forEach((x) => x.classList.toggle("active", x === b)); show(b.dataset.tab);
    }));
    show("t2i");
  })();

  /* ------------------------------------------------------------ comparison */
  (function comparison() {
    const grid = $("#compare-grid"), chips = $("#compare-chips");
    let tab = "t2i", idx = 0;
    const marked = (s) => esc(s).replace(/\[\[(.+?)\]\]/g, '<mark class="bad">$1</mark>').replace(/\{\{(.+?)\}\}/g, '<mark class="good">$1</mark>');
    const label = (ex, i) => (ex.type ? ex.type + ": " : "") + (ex.prompt || ex.instruction || ex.question || `Example ${i + 1}`);

    function draw() {
      const list = S.comparison[tab] || [], ex = list[idx] || { results: {} };
      chips.innerHTML = list.map((e, i) => `<button class="${i === idx ? "active" : ""}" data-i="${i}" title="${esc(label(e, i))}">${esc(label(e, i))}</button>`).join("");
      let head = "";
      if (tab === "t2i") head = `<p class="compare-prompt"><b>Prompt:</b> ${esc(ex.prompt)}</p>`;
      if (tab === "edit" || tab === "control") head = `<div class="mmu-q"><div class="slot">${img(ex.source, "source", tab === "edit" ? "Source image" : "Condition")}</div><p class="compare-prompt" style="text-align:left;margin:0"><b>${esc(ex.type || "Instruction")}${tab === "edit" ? " · instruction" : " · prompt"}:</b> ${esc(ex.instruction)}</p></div>`;
      if (tab === "mmu") head = `<div class="mmu-q"><div class="slot">${img(ex.image, ex.question, "Input image")}</div><p class="compare-prompt" style="text-align:left;margin:0"><b>Question:</b> ${esc(ex.question)}</p></div>`;
      const shown = S.methods.filter((m) => (ex.results || {})[m.key]);
      const cols = shown.map((m) => {
        const r = (ex.results || {})[m.key];
        const body = tab === "mmu"
          ? `<div class="c-slot c-text">${r ? marked(r) : '<span class="na">—</span>'}</div>`
          : `<div class="c-slot">${img(r, m.label, "coming soon")}</div>`;
        const nfeKey = tab;
        return `<div class="c-col ${m.key === "ours" ? "ours" : ""}">
          <div class="c-head"><b>${esc(m.label)}</b><span>${m.sub ? esc(m.sub) + " · " : ""}NFE ${esc(m.nfe[nfeKey])}</span></div>${body}</div>`;
      }).join("");
      grid.innerHTML = head + `<div class="compare-row" style="grid-template-columns:repeat(${shown.length}, minmax(150px, 1fr));min-width:${shown.length * 160}px">${cols}</div>`;
    }
    chips.addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { idx = +b.dataset.i; draw(); } });
    $$("#compare-tabs button").forEach((b) => b.addEventListener("click", () => {
      $$("#compare-tabs button").forEach((x) => x.classList.toggle("active", x === b)); tab = b.dataset.tab; idx = 0; draw();
    }));
    draw();
  })();

  /* ------------------------------------------------------------ score table */
  (function scores() {
    const table = $("#score-table");
    const distilled = ["t3d", "dimo", "cdlm", "ours"];
    const show = (task) => {
      const sc = S.scores[task];
      const dec = sc.columns.map((_, j) => Math.max(...Object.values(sc.rows).map((r) => (String(r[j]).split(".")[1] || "").length)));
      const best = sc.columns.map((_, j) => Math.max(...distilled.map((k) => sc.rows[k][j])));
      const rows = S.methods.map((m) => {
        const r = sc.rows[m.key]; if (!r) return "";
        const ref = m.key.startsWith("teacher");
        const name = m.label + (m.sub && m.key !== "ours" ? ` (${m.sub})` : "");
        return `<tr class="${m.key === "ours" ? "ours" : ref ? "ref" : ""}"><td>${esc(name)}</td><td>${esc(m.nfe[task === "mmu" ? "mmu" : "t2i"])}</td>${
          r.map((v, j) => `<td class="${!ref && v === best[j] ? "best" : ""}">${v.toFixed(dec[j])}</td>`).join("")}</tr>`;
      }).join("");
      table.innerHTML = `<thead><tr><th>Method</th><th>NFE</th>${sc.columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${rows}</tbody>`;
    };
    $$("#score-task button").forEach((b) => b.addEventListener("click", () => {
      $$("#score-task button").forEach((x) => x.classList.toggle("active", x === b)); show(b.dataset.task);
    }));
    show("t2i");
  })();

  /* ------------------------------------------------------------ bibtex */
  $("#bib-code").textContent = S.bibtex;
  $("#copy-bib").addEventListener("click", async (e) => {
    try { await navigator.clipboard.writeText(S.bibtex); e.target.textContent = "Copied"; }
    catch (err) { e.target.textContent = "Select & copy"; }
    setTimeout(() => (e.target.textContent = "Copy"), 1600);
  });

  /* ------------------------------------------------------------ lightbox */
  const lb = $("#lightbox"), lbImg = $("img", lb);
  document.addEventListener("click", (e) => {
    const t = e.target;
    if (t.matches("img.zoomable, img[data-zoom]")) { lbImg.src = t.currentSrc || t.src; lbImg.alt = t.alt; lb.hidden = false; }
    else if (!lb.hidden && lb.contains(t)) lb.hidden = true;
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") lb.hidden = true; });
})();

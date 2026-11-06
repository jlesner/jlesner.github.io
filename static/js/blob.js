// The goo banner at the top of the home page (templates/home.html).
// blob-sim.js is the world and the fluid body, blob-brain.js is what it has learned; this file draws them,
// turns pointer input into pats / pokes / drags, and runs the loop.

// Sibling modules are loaded with this file's ?v=<hash> (set by build.py), so a deploy never mixes old and new files.
const version = new URL(import.meta.url).search;
const [{ makeLevel, Sim, SKILLS, PLACES, N_CONTEXTS, ROWS, SOLID, POLE, METAL }, { Brain }] = await Promise.all([
  import(`./blob-sim.js${version}`), import(`./blob-brain.js${version}`),
]);

const STORE = "blob-memory-v2";
const PAT_HOLD = 0.25;        // a press shorter than this is a poke
const PAT_EVERY = 0.7;        // seconds between pat rewards while holding
const DRAG_START = 2.5;       // cells of movement (before PAT_HOLD) that turn a press into a drag
const STEP = 1 / 60;

const root = document.querySelector("[data-blob]");
if (root) start(root);

function start(root) {
  root.hidden = false;           // the banner stays hidden for visitors without JavaScript
  const canvas = root.querySelector("canvas");
  const ctx = canvas.getContext("2d");
  const help = root.querySelector(".goo-help");
  const overlay = root.querySelector(".goo-overlay");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  let saved = null;
  try { localStorage.removeItem("blob-memory-v1"); saved = JSON.parse(localStorage.getItem(STORE)); } catch { /* private mode */ }
  const brain = new Brain(SKILLS.map((s) => s.id), N_CONTEXTS, saved);
  const save = () => { try { localStorage.setItem(STORE, JSON.stringify(brain)); } catch { /* ignore */ } };

  let cols = 0, level, sim, img, buf, bg, field, colors;
  let cursor = null, cursorClear = 0;
  let press = null;             // {id, x, y, gx, gy, t, mode: "press" | "pat" | "drag", beat}
  let glow = 0, flinch = 0, blink = 0, nextBlink = 2;
  let awake = !reduced, running = false, idleUntil = 0, lastCtx = null;
  const flash = new Map();      // skill index -> {sign, until} for the overlay
  let visible = true, rafId = 0, last = 0, acc = 0;

  // ------------------------------------------------------------------ setup / resize

  function layout() {
    const w = root.clientWidth || 1280;
    const want = Math.min(480, Math.ceil(w / 4));
    if (cols && Math.abs(want - cols) / cols <= 0.1) return;
    cols = want;
    level = makeLevel(cols, ROWS);
    sim = new Sim(level);
    running = false; press = null; brain.trace.length = 0;
    canvas.width = cols; canvas.height = ROWS;
    // sized here too (not only in style.css), so a stale cached stylesheet can't shrink it to raw pixels
    Object.assign(canvas.style, { display: "block", width: "100%", height: "auto", aspectRatio: `${cols} / ${ROWS}`, imageRendering: "pixelated" });
    img = ctx.createImageData(cols, ROWS);
    buf = new Uint32Array(img.data.buffer);
    bg = new Uint32Array(cols * ROWS);
    field = new Float32Array(cols * ROWS);
    paintLevel();
  }

  function readColors() {
    const css = getComputedStyle(document.documentElement);
    const v = (n) => hex(css.getPropertyValue(n).trim());
    const bgc = v("--bg"), text = v("--text"), accent = v("--accent");
    const dark = bgc[0] + bgc[1] + bgc[2] < 384;
    const t = (a) => mix(bgc, text, a);
    const ink = [12, 14, 28];
    colors = {
      sky: t(0.03), skyLow: t(0.055),
      panel: t(dark ? 0.07 : 0.06), win: t(dark ? 0.12 : 0.1), winLit: mix(t(0.07), accent, dark ? 0.35 : 0.25),
      bpipe: t(dark ? 0.1 : 0.09), bpipeHi: t(dark ? 0.14 : 0.12), chain: t(dark ? 0.2 : 0.17), chain2: t(dark ? 0.13 : 0.11),
      solid: t(dark ? 0.22 : 0.3), solidTop: t(dark ? 0.36 : 0.46), solidIn: t(dark ? 0.17 : 0.22),
      metal: mix(t(dark ? 0.28 : 0.36), accent, 0.12), metalHi: mix(t(dark ? 0.42 : 0.5), accent, 0.12), metalLo: mix(t(dark ? 0.2 : 0.27), accent, 0.1),
      pipeIn: mix(t(dark ? 0.1 : 0.14), accent, 0.06),
      pole: t(dark ? 0.45 : 0.5), poleDark: t(dark ? 0.32 : 0.38),
      goo: accent, gooEdge: mix(accent, ink, dark ? 0.5 : 0.45), gooHi: mix(accent, [255, 255, 255], 0.55),
      gooDeep: mix(accent, ink, 0.18), white: dark ? [235, 236, 240] : [255, 255, 255], pupil: [18, 20, 30],
    };
  }

  // the static world, drawn once per level into `bg`
  function paintLevel() {
    const c = colors, { cells, deco } = level;
    const at = (x, y) => (x < 0 || y < 0 || x >= cols || y >= ROWS ? SOLID : cells[y * cols + x]);
    const solid = (x, y) => { const t = at(x, y); return t === SOLID || t === METAL; };
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x, t = cells[i], n = noise(x, y);
        let col;
        if (t === SOLID) {
          if (!solid(x, y - 1)) col = c.solidTop;
          else if (!solid(x - 1, y) || !solid(x + 1, y) || !solid(x, y + 1)) col = c.solid;
          else col = c.solidIn;
          if (n < 0.08) col = mix(col, c.solidIn, 0.6);            // grime
          else if (n > 0.96) col = mix(col, c.solidTop, 0.5);
        } else if (t === METAL) {
          col = !solid(x, y - 1) ? c.metalHi : !solid(x, y + 1) ? c.metalLo : c.metal;
          if (x % 4 === 0 && solid(x, y - 1) && solid(x, y + 1)) col = c.metalHi;   // rivets
        } else if (t === POLE) {
          col = y % 3 === 0 ? c.poleDark : c.pole;
        } else {
          const d = deco[i];
          col = d === 1 ? c.panel : d === 2 ? c.win : d === 3 ? c.winLit : d === 4 ? c.bpipe : d === 5 ? c.bpipeHi
            : d === 6 ? c.chain : d === 7 ? c.chain2 : d === 8 ? (y === ROWS - 1 || at(x, y - 1) === METAL ? c.metalLo : c.pipeIn)
            : mix(c.sky, c.skyLow, y / ROWS);
          if (d === 1 && n < 0.05) col = c.sky;
          if (!d && n < 0.015) col = c.panel;                    // dust
        }
        bg[i] = pack(col);
      }
    }
  }

  // ------------------------------------------------------------------ drawing

  function draw() {
    const c = colors, b = sim.body, T = 0.85;
    buf.set(bg);
    field.fill(0);
    for (let i = 0; i < sim.n; i++) {
      const px = sim.x[i], py = sim.y[i];
      for (let gy = Math.max(0, Math.floor(py - 2.3)); gy <= Math.min(ROWS - 1, Math.floor(py + 2.3)); gy++) {
        for (let gx = Math.max(0, Math.floor(px - 2.3)); gx <= Math.min(cols - 1, Math.floor(px + 2.3)); gx++) {
          const q = ((gx + 0.5 - px) ** 2 + (gy + 0.5 - py) ** 2) / 5;
          if (q < 1) field[gy * cols + gx] += (1 - q) * (1 - q);
        }
      }
    }
    const inGoo = (x, y) => x >= 0 && y >= 0 && x < cols && y < ROWS && field[y * cols + x] > T;
    const fill = mix(c.goo, c.gooHi, glow * 0.45);
    const x0 = Math.max(0, Math.floor(b.minX - 3)), x1 = Math.min(cols - 1, Math.ceil(b.maxX + 3));
    const y0 = Math.max(0, Math.floor(b.minY - 3)), y1 = Math.min(ROWS - 1, Math.ceil(b.maxY + 3));
    for (let y = y0; y <= y1; y++) {
      for (let x = x0; x <= x1; x++) {
        const i = y * cols + x;
        if (field[i] <= T) continue;
        const t = level.cells[i];
        if (t === SOLID || t === METAL) continue;
        // see-through goo: the world behind shows through the body, the rim is more solid
        let col, see;
        if (!inGoo(x - 1, y) || !inGoo(x + 1, y) || !inGoo(x, y - 1) || !inGoo(x, y + 1)) { col = c.gooEdge; see = 0.3; }
        else if (!inGoo(x, y - 2) && x < b.cx + 1) { col = c.gooHi; see = 0.4; }   // light from the upper left
        else { col = y > b.cy + 2.5 ? mix(fill, c.gooDeep, 0.6) : fill; see = 0.62; }
        buf[i] = pack(mixPacked(col, bg[i], see));
      }
    }
    drawEyes(inGoo);
    ctx.putImageData(img, 0, 0);
  }

  function drawEyes(inGoo) {
    const c = colors, b = sim.body;
    const ex = Math.round(b.cx);
    let ey = Math.round(b.cy - 1), tries = 0;
    while (!(inGoo(ex - 3, ey) && inGoo(ex + 2, ey)) && tries++ < 4) ey += ey < b.cy ? 1 : -1;
    if (!inGoo(ex, ey) || !inGoo(ex, ey - 1)) return;      // too stretched to have a face right now
    const put = (x, y, col) => { if (x >= 0 && y >= 0 && x < cols && y < ROWS) buf[y * cols + x] = pack(col); };
    const resting = sim.skill?.id === "rest" && sim.restLevel > 0.5;
    const closed = resting || blink > 0;
    const look = cursor ?? (press ? { x: press.gx, y: press.gy } : null);
    let lx = sim.heading, ly = 0;
    if (look) { lx = look.x > ex + 2 ? 1 : look.x < ex - 2 ? -1 : 0; ly = look.y < ey - 3 ? -1 : 0; }
    for (const [left, side] of [[ex - 3, -1], [ex + 1, 1]]) {
      if (flinch > 0) {                                       // squint: \ /
        put(left + (side < 0 ? 0 : 1), ey - 1, c.pupil); put(left + (side < 0 ? 1 : 0), ey, c.pupil);
      } else if (closed) {
        put(left, ey, c.gooEdge); put(left + 1, ey, c.gooEdge);
      } else {
        const content = glow > 0.15;                          // patted: eyelids half down
        for (let dy = -1; dy <= 0; dy++) for (let dx = 0; dx < 2; dx++) put(left + dx, ey + dy, content && dy < 0 ? c.gooEdge : c.white);
        const px = lx > 0 ? left + 1 : lx < 0 ? left : left + (side < 0 ? 1 : 0);
        put(px, content ? ey : ey + ly, c.pupil);
      }
    }
  }

  // ------------------------------------------------------------------ input

  function toGrid(e) {
    const r = canvas.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * cols, y: ((e.clientY - r.top) / r.height) * ROWS };
  }
  const onGoo = (p, k = 0.6) => sim.density(p.x, p.y) > k;

  canvas.addEventListener("pointermove", (e) => {
    const p = toGrid(e);
    cursor = p; cursorClear = 0;
    canvas.classList.toggle("over-goo", onGoo(p));
    if (!press || e.pointerId !== press.id) return;
    press.gx = p.x; press.gy = p.y;
    const age = sim.time - press.t, moved = Math.hypot(p.x - press.x, p.y - press.y);
    if (press.mode === "press" && moved > DRAG_START && age < PAT_HOLD) {
      press.mode = "drag";
      sim.grabAt(press.x, press.y);
      canvas.classList.add("grabbing");
    }
    if (press.mode === "drag") sim.dragTo(p.x, p.y);
  });
  canvas.addEventListener("pointerleave", (e) => { if (e.pointerType === "mouse" && !press) cursor = null; });
  canvas.addEventListener("pointerdown", (e) => {
    const p = toGrid(e);
    cursor = p; cursorClear = 0;
    if (!onGoo(p)) return;
    awake = true;
    press = { id: e.pointerId, x: p.x, y: p.y, gx: p.x, gy: p.y, t: sim.time, mode: "press", beat: 0 };
    try { canvas.setPointerCapture(e.pointerId); } catch { /* ignore */ }
    run();
  });
  const end = (e, cancelled) => {
    if (!press || e.pointerId !== press.id) return;
    if (press.mode === "drag") sim.release();
    else if (!cancelled && press.mode === "press" && sim.time - press.t < PAT_HOLD) {
      sim.poke(press.x, press.y);
      flinch = 0.6;
      teach("poke");
    }
    press = null;
    canvas.classList.remove("grabbing");
    if (e.pointerType !== "mouse") cursorClear = sim.time + 4;
  };
  canvas.addEventListener("pointerup", (e) => end(e, false));
  canvas.addEventListener("pointercancel", (e) => end(e, true));

  function teach(kind) {
    for (const { skill, delta } of brain.reward(kind, sim.time)) flash.set(skill, { sign: Math.sign(delta), until: sim.time + 0.8 });
    save();
    if (!overlay.hidden) renderOverlay();
  }

  // ------------------------------------------------------------------ simulation loop

  function tick() {
    if (cursorClear && sim.time > cursorClear) { cursor = null; cursorClear = 0; }

    if (press && press.mode === "press" && sim.time - press.t >= PAT_HOLD) { press.mode = "pat"; press.beat = sim.time - PAT_EVERY + 0.15; }
    if (press && press.mode === "pat" && onGoo({ x: press.gx, y: press.gy }, 0.4) && sim.time - press.beat >= PAT_EVERY) {
      press.beat = sim.time;
      sim.pat(press.gx, press.gy);
      glow = 1;
      teach("pat");
    }

    if (!sim.skill) {
      if (running) { brain.finish(sim.time); running = false; idleUntil = sim.time + 0.25 + Math.random() * 0.5; }
      if (sim.settled && sim.time >= idleUntil) {
        if (awake) {
          lastCtx = sim.context(cursor);
          const k = brain.pick(lastCtx.index, lastCtx.allowed);
          sim.startSkill(SKILLS[k].id, cursor);
          brain.begin(lastCtx.index, k, sim.time);
          running = true;
        } else sim.startSkill("rest", null);
      }
    }
    sim.step();

    glow = Math.max(0, glow - STEP * 1.6);
    flinch = Math.max(0, flinch - STEP);
    if (blink > 0) blink -= STEP;
    else if ((nextBlink -= STEP) <= 0) { blink = 0.13; nextBlink = 2 + Math.random() * 3; }
  }

  function frame() {
    const now = performance.now();
    acc += Math.min(0.1, Math.max(0, (now - last) / 1000));
    last = now;
    let steps = 0;
    while (acc >= STEP && steps++ < 6) { tick(); acc -= STEP; }
    if (acc > STEP) acc = 0;
    draw();
    if (!overlay.hidden && Math.floor(sim.time * 4) !== Math.floor((sim.time - STEP) * 4)) renderOverlay();
    rafId = visible && !document.hidden ? requestAnimationFrame(frame) : 0;
  }
  function run() {
    if (!rafId && visible && !document.hidden) { last = performance.now(); rafId = requestAnimationFrame(frame); }
  }

  // ------------------------------------------------------------------ the "?" overlay

  overlay.innerHTML = `
    <p class="goo-how"><strong>Hold</strong> it to pat it: it does more of whatever it was just doing.
      <strong>Quick tap</strong> to poke: less of it. <strong>Drag</strong> to fling (it doesn't mind).</p>
    <p class="goo-now">It's <b data-o="place"></b><span data-o="near"></span>, doing <b data-o="skill"></b>.</p>
    <p class="goo-sub">Chance it picks each move here next:</p>
    <ol class="goo-bars" data-o="bars"></ol>
    <p class="goo-foot"><span data-o="stats"></span> · <button type="button" class="goo-link" data-o="reset">Forget everything</button>
      · <button type="button" class="goo-link" data-o="close">Close</button></p>`;
  const o = (k) => overlay.querySelector(`[data-o="${k}"]`);
  o("bars").innerHTML = SKILLS.map((s) => `<li><span>${s.name}</span><span class="goo-bar"><i></i></span><span class="goo-pct"></span></li>`).join("");
  const bars = [...o("bars").children];

  function renderOverlay() {
    const c = lastCtx ?? sim.context(cursor);
    const p = brain.probabilities(c.index, c.allowed);
    o("place").textContent = PLACES[c.place];
    o("near").textContent = c.near ? " near you" : "";
    o("skill").textContent = sim.skill ? SKILLS.find((s) => s.id === sim.skill.id).name.toLowerCase() : "nothing";
    bars.forEach((li, k) => {
      const f = flash.get(k), on = f && f.until > sim.time;
      li.className = [c.allowed[k] ? "" : "off", sim.skill?.id === SKILLS[k].id ? "now" : "", on ? (f.sign > 0 ? "up" : "down") : ""].join(" ").trim();
      li.querySelector("i").style.width = `${(p[k] * 100).toFixed(1)}%`;
      li.lastChild.textContent = c.allowed[k] ? `${Math.round(p[k] * 100)}%` : "–";
    });
    o("stats").textContent = `Pats ${brain.stats.pats} · Pokes ${brain.stats.pokes}`;
  }
  function toggleOverlay(show = overlay.hidden) {
    overlay.hidden = !show;
    help.setAttribute("aria-expanded", String(show));
    if (show) renderOverlay();
  }
  help.addEventListener("click", () => toggleOverlay());
  o("close").addEventListener("click", () => toggleOverlay(false));
  o("reset").addEventListener("click", () => {
    if (!confirm("Forget everything it has learned from you?")) return;
    brain.load(null); brain.trace.length = 0; save(); renderOverlay();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key !== "l" && e.key !== "L") return;
    if (e.ctrlKey || e.metaKey || e.altKey || e.target.closest?.("input, textarea, select, [contenteditable]")) return;
    toggleOverlay();
  });

  // ------------------------------------------------------------------ go

  readColors();
  layout();
  draw();
  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => { readColors(); paintLevel(); draw(); });
  new ResizeObserver(() => { const before = cols; layout(); if (cols !== before) draw(); }).observe(root);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; run(); }).observe(root);
  document.addEventListener("visibilitychange", run);
  run();
}

// ------------------------------------------------------------------ helpers

function hex(s) {
  const m = s.replace("#", "");
  const full = m.length === 3 ? [...m].map((c) => c + c).join("") : m;
  return [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) || 0);
}
function mix(a, b, t) { return a.map((v, i) => Math.round(v + (b[i] - v) * t)); }
function pack([r, g, b]) { return (255 << 24 | b << 16 | g << 8 | r) >>> 0; }
function mixPacked(col, p, t) { return mix(col, [p & 255, (p >> 8) & 255, (p >> 16) & 255], t); }
function noise(x, y) {
  let h = (x * 374761393 + y * 668265263) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

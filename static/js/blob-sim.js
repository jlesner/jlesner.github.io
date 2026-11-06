// The goo creature's world and body. No DOM here, so Node can import it for tests.
// Units are grid cells (one cell = a few screen pixels); y grows downward.
//
// World: a grid of cells (EMPTY / SOLID concrete / METAL pipe / POLE), generated from random chunks.
// Body:  ~70 particles of a viscoelastic fluid (Clavet, Beaudoin & Poulin 2005, "double density relaxation"):
//        pressure + near-pressure give it volume and surface tension, viscosity makes it gooey, and a soft
//        spring toward the centroid keeps it one creature. A per-particle "grip" flag makes particles stick to
//        surfaces and poles. Movement skills only apply forces and set grip; the fluid does the rest.

export const EMPTY = 0, SOLID = 1, POLE = 2, METAL = 3;
export const ROWS = 45;

export const SKILLS = [
  { id: "toward", name: "Crawl toward you", dur: 2.4 },
  { id: "away",   name: "Crawl away",       dur: 2.4 },
  { id: "hop",    name: "Hop",              dur: 2.0 },
  { id: "climb",  name: "Climb",            dur: 3.2 },
  { id: "hang",   name: "Hang from ceiling", dur: 3.4 },
  { id: "reach",  name: "Reach out",        dur: 1.9 },
  { id: "rest",   name: "Rest",             dur: 3.0 },
];
export const PLACES = ["on open ground", "near something to climb", "under a ceiling"];
export const N_CONTEXTS = PLACES.length * 2;          // × cursor near / not near

const N = 72;                 // particles
const H = 3.2;                // interaction radius
export const P = {
  g: 110, rho0: 5.3, k: 2800, kNear: 5000, sigma: 6, beta: 0.4,
  cohesion: 85, coreR: 3.4, r: 0.45, friction: 0.12, gripFriction: 0.85, adhesion: 150, vmax: 95,
};
const STEP = 1 / 60, SUB = 2;

const isSolid = (t) => t === SOLID || t === METAL;

// ---------------------------------------------------------------- level generation

export function makeLevel(cols, rows = ROWS, rand = Math.random) {
  const cells = new Uint8Array(cols * rows);
  const deco = new Uint8Array(cols * rows);
  const at = (x, y) => y * cols + x;
  const set = (x, y, t) => { if (x >= 0 && x < cols && y >= 0 && y < rows) cells[at(x, y)] = t; };
  const fill = (x0, y0, x1, y1, t) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) set(x, y, t); };
  const dset = (x, y, v) => { if (x >= 0 && x < cols && y >= 0 && y < rows && !deco[at(x, y)]) deco[at(x, y)] = v; };
  const ri = (a, b) => a + Math.floor(rand() * (b - a + 1));

  // background: big dim panels with window grids, then background pipes and chains on top
  for (let x = ri(-6, 4); x < cols; x += ri(14, 30)) {
    const w = ri(8, 18), top = ri(4, 16);
    for (let y = top; y < rows; y++) for (let i = 0; i < w; i++) dset(x + i, y, 1);
    if (rand() < 0.7) {
      const sx = ri(3, 4), sy = ri(4, 5);
      for (let y = top + 2; y < rows - 8; y += sy) for (let i = 2; i < w - 2; i += sx) {
        const lit = rand() < 0.12 ? 3 : 2;
        dset(x + i, y, lit); dset(x + i, y + 1, lit);
      }
    }
  }
  const back = new Uint8Array(deco);
  deco.fill(0);
  for (let x = ri(2, 10); x < cols; x += ri(18, 40)) {          // vertical background pipes
    for (let y = 0; y < rows; y++) { dset(x, y, 4); dset(x + 1, y, 5); if (y % 9 === 4) { dset(x - 1, y, 4); dset(x + 2, y, 4); } }
  }
  for (let x = ri(5, 20); x < cols; x += ri(20, 45)) {          // hanging chains
    const len = ri(5, 16);
    for (let y = 2; y < 2 + len; y++) dset(x, y, y % 2 ? 6 : 7);
  }
  for (let i = 0; i < deco.length; i++) if (!deco[i]) deco[i] = back[i];

  // ceiling beam and floor
  fill(0, 0, cols - 1, 1, SOLID);
  let yF = rows - 5;
  const floorTop = new Int16Array(cols).fill(yF);
  const ground = (x0, x1, y) => { for (let x = x0; x <= x1 && x < cols; x++) { fill(x, y, x, rows - 1, SOLID); floorTop[x] = y; } };

  const chunks = {
    flat(x, w) { ground(x, x + w - 1, yF); },
    step(x, w) {
      ground(x, x + 3, yF);
      yF = Math.max(rows - 8, Math.min(rows - 4, yF + (rand() < 0.5 ? -2 : 2)));
      ground(x + 4, x + w - 1, yF);
    },
    poleLedge(x, w) {
      ground(x, x + w - 1, yF);
      const ly = yF - ri(12, 17), len = ri(9, 13), left = rand() < 0.5;
      const lx = left ? x + 2 : x + w - 2 - len;
      fill(lx, ly, lx + len, ly + 1, SOLID);
      const px = left ? lx + len + 1 : lx - 1;
      for (let y = ly - 2; y < yF; y++) set(px, y, POLE);
      if (rand() < 0.5 && ly - 10 > 6) fill(lx + 2, ly - 10, lx + len - 2, ly - 9, SOLID);
    },
    pipe(x, w) {
      ground(x, x + w - 1, yF);
      const len = Math.min(w - 4, ri(12, 18)), px = x + Math.floor((w - len) / 2);
      fill(px, yF - 6, px + len, yF - 5, METAL);
      fill(px, yF - 7, px, yF - 5, METAL);
      fill(px + len, yF - 7, px + len, yF - 5, METAL);
      for (let y = yF - 4; y < yF; y++) for (let i = 1; i < len; i++) deco[at(px + i, y)] = 8;   // dark inside
    },
    overhang(x, w) {
      ground(x, x + w - 1, yF);
      const bw = Math.min(w - 4, ri(10, 14)), bx = x + Math.floor((w - bw) / 2), by = yF - ri(11, 13);
      fill(bx, 2, bx + bw, by, SOLID);
      fill(bx - 1, by - 1, bx + bw + 1, by, SOLID);
    },
    pit(x, w) {
      ground(x, x + w - 1, yF);
      const pw = 8, px = x + Math.floor((w - pw) / 2), depth = Math.min(4, rows - 2 - yF);
      for (let i = 0; i < pw; i++) { fill(px + i, yF, px + i, yF + depth - 1, EMPTY); floorTop[px + i] = yF + depth; }
      const pole = px + ri(2, pw - 3);
      for (let y = yF - 9; y < yF + depth; y++) set(pole, y, POLE);
    },
    block(x, w) {
      ground(x, x + w - 1, yF);
      const bw = ri(5, 7), bh = ri(5, 7), bx = x + Math.floor((w - bw) / 2);
      fill(bx, yF - bh, bx + bw, yF - 1, SOLID);
      for (let y = yF - bh - 3; y < yF; y++) set(bx - 1, y, POLE);
    },
  };
  const widths = { flat: [8, 14], step: [8, 12], poleLedge: [22, 28], pipe: [20, 26], overhang: [20, 26], pit: [16, 20], block: [14, 18] };
  const kinds = Object.keys(chunks).filter((k) => k !== "flat");

  // a flat spawn area in the middle third, chunks everywhere else
  const spawnAt = Math.floor(cols / 2) - 8;
  let x = 0, spawnX = cols / 2, last = "";
  while (x < cols) {
    let kind = x === 0 ? "flat" : kinds[Math.floor(rand() * kinds.length)];
    if (kind === last) kind = "flat";
    if (x <= spawnAt && x + 26 > spawnAt) kind = "flat";
    let w = ri(...widths[kind]);
    if (kind === "flat" && x <= spawnAt + 8 && x + w > spawnAt) { w = Math.max(w, 16); spawnX = x + w / 2; }
    if (cols - (x + w) < 8) w = cols - x;                       // don't leave a sliver
    if (w < widths[kind][0]) { kind = "flat"; }
    chunks[kind](x, w);
    x += w; last = kind;
  }
  for (let i = 0; i < cells.length; i++) if (cells[i] && cells[i] !== POLE) deco[i] = 0;

  return { cols, rows, cells, deco, floorTop, spawnX };
}

// ---------------------------------------------------------------- simulation

export class Sim {
  constructor(level, rand = Math.random) {
    this.level = level;
    this.rand = rand;
    this.x = new Float32Array(N); this.y = new Float32Array(N);
    this.vx = new Float32Array(N); this.vy = new Float32Array(N);
    this.px = new Float32Array(N); this.py = new Float32Array(N);
    this.ax = new Float32Array(N); this.ay = new Float32Array(N);
    this.grip = new Uint8Array(N);
    this.contact = new Uint8Array(N);      // bits: 1 floor, 2 ceiling, 4 wall left, 8 wall right, 16 pole
    this.grabbed = new Uint8Array(N);
    this.gox = new Float32Array(N); this.goy = new Float32Array(N);   // grabbed particles keep their offsets
    this.grab = null;                      // {x, y} target while dragging
    this.skill = null;                     // {id, t, dur, dir, ...}
    this.heading = rand() < 0.5 ? -1 : 1;
    this.time = 0;
    this.restLevel = 0;                    // 0..1, softens the body while resting
    this.spawn(level.spawnX, level.floorTop[Math.floor(level.spawnX)] - 5);
    this.measure();
  }

  get n() { return N; }

  spawn(cx, cy) {
    for (let i = 0; i < N; i++) {
      const a = i * 2.39996, r = Math.sqrt(i / N) * 4.2;
      this.x[i] = cx + Math.cos(a) * r; this.y[i] = cy + Math.sin(a) * r * 0.8;
      this.vx[i] = this.vy[i] = 0;
    }
    for (let i = 0; i < N; i++) this.collide(i);
  }

  cell(x, y) {
    const { cols, rows, cells } = this.level;
    if (x < 0 || y < 0 || x >= cols || y >= rows) return SOLID;
    return cells[y * this.level.cols + x];
  }
  solidAt(x, y) { return isSolid(this.cell(x, y)); }

  // ---- body summary, recomputed every step
  measure() {
    let sx = 0, sy = 0, svx = 0, svy = 0, minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    let floor = 0, ceil = 0, wall = 0, pole = 0;
    for (let i = 0; i < N; i++) {
      sx += this.x[i]; sy += this.y[i]; svx += this.vx[i]; svy += this.vy[i];
      if (this.x[i] < minX) minX = this.x[i]; if (this.x[i] > maxX) maxX = this.x[i];
      if (this.y[i] < minY) minY = this.y[i]; if (this.y[i] > maxY) maxY = this.y[i];
      const c = this.contact[i];
      if (c & 1) floor++; if (c & 2) ceil++; if (c & 12) wall++; if (c & 16) pole++;
    }
    this.body = { cx: sx / N, cy: sy / N, vx: svx / N, vy: svy / N, minX, maxX, minY, maxY, floor, ceil, wall, pole };
    return this.body;
  }
  get settled() {
    const b = this.body;
    return !this.grab && (b.floor >= 2 || b.pole >= 3 || (b.wall >= 3 && this.skill)) && Math.abs(b.vy) < 25;
  }

  // ---- what's around the body (used for context and for skill targets)
  surroundings() {
    const b = this.body, y0 = Math.floor(b.minY), y1 = Math.floor(b.maxY);
    let pole = null;
    for (let d = 0; d <= 6 && pole === null; d++) {
      for (const x of [Math.floor(b.cx) - Math.floor((b.maxX - b.minX) / 2) - d, Math.floor(b.cx) + Math.floor((b.maxX - b.minX) / 2) + d, Math.floor(b.cx) + (d ? 0 : 0)]) {
        let hits = 0;
        for (let y = y0 - 6; y <= y1; y++) if (this.cell(x, y) === POLE) hits++;
        if (hits >= 3) { pole = x; break; }
      }
    }
    let wall = 0;
    for (const dir of [this.heading, -this.heading]) {
      const edge = dir > 0 ? b.maxX : b.minX;
      for (let d = 1; d <= 5 && !wall; d++) {
        const x = Math.floor(edge + dir * d);
        if (x <= 0 || x >= this.level.cols - 1) continue;    // the banner's edges don't count
        let stack = 0;
        for (let y = y1; y > y1 - 8; y--) if (this.solidAt(x, y)) stack++;
        if (stack >= 5) wall = dir;
      }
      if (wall) break;
    }
    let ceiling = null;
    for (let dx = -2; dx <= 2 && ceiling === null; dx++) {
      for (let y = y0 - 1; y >= y0 - 9 && y > 1; y--) {
        if (this.solidAt(Math.floor(b.cx) + dx, y)) { ceiling = y + 1; break; }
      }
    }
    return { pole, wall, ceiling };
  }

  // context index for the learner, plus which skills make sense right now
  context(cursor) {
    const s = this.surroundings();
    const place = s.pole !== null || s.wall ? 1 : s.ceiling !== null ? 2 : 0;
    const near = cursor && Math.abs(cursor.x - this.body.cx) < Math.max(20, this.level.cols * 0.3) ? 1 : 0;
    const allowed = SKILLS.map((k) =>
      k.id === "climb" ? place === 1 : k.id === "hang" ? s.ceiling !== null : true);
    return { index: place * 2 + near, place, near, allowed, surroundings: s };
  }

  startSkill(id, cursor) {
    const def = SKILLS.find((k) => k.id === id);
    const b = this.body, s = this.surroundings();
    let dir = this.heading;
    if (id === "toward" || id === "away") {
      if (cursor) dir = Math.sign(cursor.x - b.cx) || 1;
      if (id === "away") dir = -dir;
      if (!cursor && this.blocked(dir)) dir = -dir;
      if (!cursor && this.rand() < 0.2) dir = -dir;
      this.heading = dir;
    } else if (id === "hop") {
      if (this.rand() < 0.3) this.heading = -this.heading;
      dir = this.heading;
    }
    const sk = { id, t: 0, dur: def.dur * (0.85 + this.rand() * 0.3), dir, launched: false };
    if (id === "climb") {
      if (s.pole !== null) {
        sk.pole = s.pole; sk.dir = Math.sign(s.pole - b.cx) || 1;
        let top = Math.floor(b.maxY);
        while (top > 1 && this.cell(s.pole, top - 1) === POLE) top--;
        sk.top = top;
        sk.side = this.solidAt(s.pole + 1, top + 2) ? 1 : this.solidAt(s.pole - 1, top + 2) ? -1 : sk.dir;
      }
      else {
        sk.wall = sk.side = s.wall || dir;
        const wx = Math.floor((sk.wall > 0 ? b.maxX : b.minX) + sk.wall);
        let col = wx;
        for (let d = 0; d < 6 && !this.solidAt(col, Math.floor(b.maxY)); d++) col += sk.wall;
        let top = Math.floor(b.maxY);
        while (top > 1 && this.solidAt(col, top - 1)) top--;
        sk.top = top; sk.col = col;
      }
    }
    if (id === "hang") sk.ceiling = s.ceiling;
    if (id === "reach") {
      if (cursor && Math.hypot(cursor.x - b.cx, cursor.y - b.cy) < 26) sk.target = { x: cursor.x, y: cursor.y };
      else if (s.pole !== null) sk.target = { x: s.pole + 0.5, y: b.minY - 4 };
      else sk.target = { x: b.cx + dir * 12, y: b.minY - 6 };
      const d = this.order((i) => Math.hypot(this.x[i] - sk.target.x, this.y[i] - sk.target.y));
      sk.tip = d.slice(0, Math.round(N * 0.28));
    }
    this.skill = sk;
    return sk;
  }

  blocked(dir) {
    const b = this.body, x = Math.floor(dir > 0 ? b.maxX + 2 : b.minX - 2);
    let stack = 0;
    for (let y = Math.floor(b.maxY); y > b.maxY - 7; y--) if (this.solidAt(x, y)) stack++;
    return stack >= 4;
  }

  order(key) {
    const idx = Array.from({ length: N }, (_, i) => i);
    const k = idx.map(key);
    return idx.sort((a, b) => k[a] - k[b]);
  }

  // ---- interaction
  grabAt(x, y) {
    let any = false;
    for (let i = 0; i < N; i++) {
      const g = Math.hypot(this.x[i] - x, this.y[i] - y) < 3.2;
      this.grabbed[i] = g ? 1 : 0;
      this.gox[i] = (this.x[i] - x) * 0.7; this.goy[i] = (this.y[i] - y) * 0.7;
      any ||= g;
    }
    if (!any) {
      let best = 0, bd = 1e9;
      for (let i = 0; i < N; i++) { const d = Math.hypot(this.x[i] - x, this.y[i] - y); if (d < bd) { bd = d; best = i; } }
      this.grabbed[best] = 1; this.gox[best] = this.goy[best] = 0;
    }
    this.grab = { x, y };
  }
  dragTo(x, y) { if (this.grab) { this.grab.x = x; this.grab.y = y; } }
  release() { this.grab = null; this.grabbed.fill(0); }

  poke(x, y) {
    for (let i = 0; i < N; i++) {
      const dx = this.x[i] - x, dy = this.y[i] - y, d = Math.hypot(dx, dy) || 1;
      if (d > 7) continue;
      const s = 34 * (1 - d / 7);
      this.vx[i] += (dx / d) * s + (this.rand() - 0.5) * 8;
      this.vy[i] += (dy / d) * s - 6 + (this.rand() - 0.5) * 8;
    }
  }
  pat(x, y) {
    for (let i = 0; i < N; i++) {
      const d = Math.hypot(this.x[i] - x, this.y[i] - y);
      if (d < 6) this.vy[i] += 5 * (1 - d / 6);   // press down a little where the hand is
      else if (this.y[i] < this.body.cy) this.vy[i] -= 4;   // and puff up elsewhere
    }
  }

  density(x, y) {
    let d = 0;
    for (let i = 0; i < N; i++) {
      const q = ((this.x[i] - x) ** 2 + (this.y[i] - y) ** 2) / 5.0;
      if (q < 1) d += (1 - q) * (1 - q);
    }
    return d;
  }

  // ---- one fixed step (1/60 s)
  step() {
    this.time += STEP;
    if (this.skill) this.skill.t += STEP;
    const resting = this.skill?.id === "rest";
    this.restLevel += ((resting ? 1 : 0) - this.restLevel) * 0.04;
    const dt = STEP / SUB;
    for (let s = 0; s < SUB; s++) {
      this.drive();
      this.integrate(dt);
    }
    this.measure();
    if (this.skill && (this.skill.t >= this.skill.dur || this.skill.done)) this.skill = null;
  }

  // forces from the current skill, the grip rules and the user's hand
  drive() {
    const { x, y, vx, vy, ax, ay, grip, contact } = this;
    const b = this.body, sk = this.skill, g = P.g;
    ax.fill(0); ay.fill(0);
    if (!sk || this.grab) grip.fill(0);

    if (sk) {
      const t = sk.t, dir = sk.dir;
      const phase = Math.sin(t * Math.PI * 2 * 1.4);
      switch (sk.id) {
        case "toward": case "away": {                       // inchworm: front and back take turns gripping
          for (let i = 0; i < N; i++) {
            const front = (x[i] - b.cx) * dir > 0;
            const moving = front === phase > 0;
            grip[i] = moving ? 0 : 1;
            ax[i] += dir * (moving ? 75 : 18);
            if (moving && front) ay[i] -= 10;
            if (contact[i] & (dir > 0 ? 8 : 4)) { ay[i] -= g * 1.2; ax[i] += dir * 30; }   // flow up small steps
          }
          break;
        }
        case "hop": {
          if (t < 0.32) {
            for (let i = 0; i < N; i++) { grip[i] = 1; if (y[i] < b.cy) ay[i] += 90; }
          } else if (!sk.launched) {
            sk.launched = true;
            for (let i = 0; i < N; i++) { grip[i] = 0; vx[i] += dir * 26; vy[i] -= 66 + (y[i] < b.cy ? 4 : 0); }
          } else if (t > 0.6 && b.floor >= 3) sk.done = true;
          break;
        }
        case "climb": {
          const pole = sk.pole;
          const holds = (i) => pole !== undefined
            ? Math.abs(x[i] - pole - 0.5) < 1.8 && this.cell(pole, Math.floor(y[i])) === POLE
            : (contact[i] & (sk.wall > 0 ? 8 : 4)) || ((contact[i] & 1) && y[i] < sk.top + 0.5);
          let held = 0;
          for (let i = 0; i < N; i++) if (holds(i)) held++;
          for (let i = 0; i < N; i++) {
            grip[i] = 1;
            if (pole !== undefined) ax[i] += Math.max(-60, Math.min(60, (pole + 0.5 - x[i]) * 30));
            else ax[i] += sk.wall * 35;
            // once it has hold of something, the whole body hauls itself up in a peristaltic wave
            if (held >= 3 && y[i] > sk.top - 0.5) ay[i] -= g * 0.97 + 28 * (0.5 + Math.max(0, Math.sin(t * 8 - y[i] * 0.7)));
            if (y[i] < sk.top + 1.5) ax[i] += sk.side * 50;           // over the top: spill onto the ledge
          }
          if (b.floor >= 3 && (pole !== undefined ? b.maxY < sk.top + 3 : b.cy < sk.top - 1 && (b.cx - sk.col - 0.5) * sk.side > 0)) sk.done = true;
          break;
        }
        case "hang": {
          const ceil = sk.ceiling ?? b.minY - 4;
          for (let i = 0; i < N; i++) {
            grip[i] = t < sk.dur - 0.35 ? 1 : 0;
            if (t < 0.9 && !(contact[i] & 2)) ay[i] -= g + 75 * (y[i] < b.cy + 1 ? 1 : 0.5);
            if (contact[i] & 2) {
              const moving = ((x[i] - b.cx) * dir > 0) === phase > 0;
              ax[i] += dir * (moving ? 55 : 10);
            } else if (y[i] - ceil > 4 && t >= 0.9) ay[i] -= 40;   // keep the drip short
          }
          break;
        }
        case "reach": {
          const T = sk.target;
          if (t < 1.0) {
            for (let i = 0; i < N; i++) grip[i] = 1;
            for (const i of sk.tip) {
              grip[i] = 0;
              const dx = T.x - x[i], dy = T.y - y[i], d = Math.hypot(dx, dy) || 1;
              const stretch = Math.hypot(x[i] - b.cx, y[i] - b.cy);
              const f = stretch < 13 ? 85 : 0;
              ax[i] += (dx / d) * f; ay[i] += (dy / d) * f - (stretch < 13 ? g * 0.8 : 0);
            }
          } else {
            let tx = 0, ty = 0, held = 0;
            for (const i of sk.tip) { tx += x[i]; ty += y[i]; if (contact[i]) held++; }
            tx /= sk.tip.length; ty /= sk.tip.length;
            if (held >= 3) {                              // the pseudopod caught something: pull the rest over
              for (const i of sk.tip) grip[i] = 1;
              for (let i = 0; i < N; i++) {
                if (sk.tip.includes(i)) continue;
                grip[i] = 0;
                const dx = tx - x[i], dy = ty - y[i], d = Math.hypot(dx, dy) || 1;
                ax[i] += (dx / d) * 60; ay[i] += (dy / d) * 60 - g * 0.6;
              }
            } else grip.fill(0);
          }
          break;
        }
        case "rest": grip.fill(1); break;
      }
    }

    // grip: stick to touched surfaces, and to poles
    for (let i = 0; i < N; i++) {
      if (!grip[i]) continue;
      const c = contact[i];
      if (c & 2) ay[i] -= g + P.adhesion * 0.6;
      if (c & 4) { ax[i] -= P.adhesion * 0.5; ay[i] -= g * 0.7; }
      if (c & 8) { ax[i] += P.adhesion * 0.5; ay[i] -= g * 0.7; }
      if (c & 16) { ay[i] -= g * 0.9; vx[i] *= 0.97; vy[i] *= 0.95; }
    }

    // the hand: grabbed particles follow the pointer on stiff springs
    if (this.grab) {
      for (let i = 0; i < N; i++) {
        if (!this.grabbed[i]) continue;
        ax[i] += (this.grab.x + this.gox[i] - x[i]) * 260 - vx[i] * 16;
        ay[i] += (this.grab.y + this.goy[i] - y[i]) * 260 - vy[i] * 16 - g;
      }
    }
  }

  integrate(dt) {
    const { x, y, vx, vy, px, py, ax, ay } = this;
    const b = this.body, g = P.g;
    const rho0 = P.rho0 * (1 - 0.25 * this.restLevel), cohesion = P.cohesion * (1 - 0.6 * this.restLevel);

    // external forces: gravity, actuation, and a soft pull toward the centroid beyond the core radius
    for (let i = 0; i < N; i++) {
      let fx = ax[i], fy = ay[i] + g;
      const dx = x[i] - b.cx, dy = y[i] - b.cy, d = Math.hypot(dx, dy);
      if (d > P.coreR) { const s = cohesion * (d - P.coreR) / d; fx -= dx * s; fy -= dy * s; }
      vx[i] += fx * dt; vy[i] += fy * dt;
    }

    // viscosity impulses between neighbours
    for (let i = 0; i < N; i++) {
      for (let j = i + 1; j < N; j++) {
        const dx = x[j] - x[i], dy = y[j] - y[i], r2 = dx * dx + dy * dy;
        if (r2 >= H * H || r2 < 1e-6) continue;
        const r = Math.sqrt(r2), q = r / H, nx = dx / r, ny = dy / r;
        const u = (vx[i] - vx[j]) * nx + (vy[i] - vy[j]) * ny;
        if (u <= 0) continue;
        const I = dt * (1 - q) * (P.sigma * u + P.beta * u * u) * 0.5;
        vx[i] -= I * nx; vy[i] -= I * ny; vx[j] += I * nx; vy[j] += I * ny;
      }
    }

    // predict positions (with a speed cap so nothing tunnels through a 1-cell wall)
    for (let i = 0; i < N; i++) {
      const s = Math.hypot(vx[i], vy[i]);
      if (s > P.vmax) { vx[i] *= P.vmax / s; vy[i] *= P.vmax / s; }
      px[i] = x[i]; py[i] = y[i];
      x[i] += vx[i] * dt; y[i] += vy[i] * dt;
    }

    // double density relaxation: pressure keeps volume, near-pressure keeps particles apart,
    // and the negative pressure of a stretched surface acts as surface tension
    const dt2 = dt * dt;
    for (let i = 0; i < N; i++) {
      let rho = 0, rhoN = 0;
      for (let j = 0; j < N; j++) {
        if (j === i) continue;
        const dx = x[j] - x[i], dy = y[j] - y[i], r2 = dx * dx + dy * dy;
        if (r2 >= H * H) continue;
        const q = 1 - Math.sqrt(r2) / H;
        rho += q * q; rhoN += q * q * q;
      }
      const pr = P.k * (rho - rho0), prN = P.kNear * rhoN;
      let dxi = 0, dyi = 0;
      for (let j = 0; j < N; j++) {
        if (j === i) continue;
        const dx = x[j] - x[i], dy = y[j] - y[i], r2 = dx * dx + dy * dy;
        if (r2 >= H * H || r2 < 1e-8) continue;
        const r = Math.sqrt(r2), q = 1 - r / H;
        const D = Math.max(-0.2, Math.min(0.2, dt2 * (pr * q + prN * q * q) * 0.5));
        const ux = (dx / r) * D, uy = (dy / r) * D;
        x[j] += ux; y[j] += uy; dxi -= ux; dyi -= uy;
      }
      x[i] += dxi; y[i] += dyi;
    }

    // collisions and friction, then velocities from the position change
    for (let i = 0; i < N; i++) {
      this.collide(i);
      const c = this.contact[i];
      if (c) {
        const fr = this.grip[i] ? P.gripFriction : P.friction;
        if (c & 3) x[i] = px[i] + (x[i] - px[i]) * (1 - fr);
        if (c & 12) y[i] = py[i] + (y[i] - py[i]) * (1 - fr * (y[i] > py[i] ? 1 : 0.4));
      }
      vx[i] = (x[i] - px[i]) / dt; vy[i] = (y[i] - py[i]) / dt;
    }
  }

  // push particle i out of solid cells; record which faces it touches
  collide(i) {
    const r = P.r;
    let x = this.x[i], y = this.y[i];
    const { cols, rows } = this.level;
    x = Math.min(cols - 1 - r, Math.max(1 + r, x));
    y = Math.min(rows - 1 - r, Math.max(1 + r, y));
    let cx = Math.floor(x), cy = Math.floor(y);
    if (this.solidAt(cx, cy)) {
      // inside a wall: move to the nearest open neighbouring cell (prefer up, then the side we came from)
      const from = [this.px[i] - x, this.py[i] - y];
      const cand = [[0, -1], [Math.sign(from[0]) || 1, 0], [-(Math.sign(from[0]) || 1), 0], [0, 1],
        [1, -1], [-1, -1], [1, 1], [-1, 1], [0, -2], [2, 0], [-2, 0]];
      let best = null, bd = 1e9;
      for (const [ox, oy] of cand) {
        if (this.solidAt(cx + ox, cy + oy)) continue;
        const tx = Math.min(cx + ox + 1 - r, Math.max(cx + ox + r, x));
        const ty = Math.min(cy + oy + 1 - r, Math.max(cy + oy + r, y));
        const d = (tx - x) ** 2 + (ty - y) ** 2;
        if (d < bd) { bd = d; best = [tx, ty]; }
      }
      if (best) [x, y] = best;
      else if (!this.solidAt(Math.floor(this.px[i]), Math.floor(this.py[i]))) { x = this.px[i]; y = this.py[i]; }
      cx = Math.floor(x); cy = Math.floor(y);
    }
    let c = 0;
    const fx = x - cx, fy = y - cy;
    if (this.solidAt(cx, cy + 1) && fy > 1 - r - 0.02) { y = cy + 1 - r; c |= 1; }
    if (this.solidAt(cx, cy - 1) && fy < r + 0.02) { y = cy + r; c |= 2; }
    if (this.solidAt(cx - 1, cy) && fx < r + 0.02) { x = cx + r; c |= 4; }
    if (this.solidAt(cx + 1, cy) && fx > 1 - r - 0.02) { x = cx + 1 - r; c |= 8; }
    if (this.cell(Math.floor(x), Math.floor(y)) === POLE || this.cell(Math.floor(x + 0.6), Math.floor(y)) === POLE
      || this.cell(Math.floor(x - 0.6), Math.floor(y)) === POLE) c |= 16;
    this.x[i] = x; this.y[i] = y; this.contact[i] = c;
  }
}

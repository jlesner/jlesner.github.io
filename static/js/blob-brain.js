// What the goo has learned: a contextual bandit over movement skills. No DOM here.
//
// preference(context, skill) = b[skill] + w[context][skill]
//   b is shared by every situation, so a lesson carries over a little everywhere;
//   w is per situation, so it can learn "climb when you're close, rest when you're not".
// It picks skills with a softmax over preferences, and a reward (pat +, poke −) is credited to the skills it
// did in the last couple of seconds, most of all to the one it's doing now.

// W_MAX / B_MAX cap how sure it can get, so it always keeps trying other moves now and then (~85% at most here,
// ~30% for a move it learned somewhere else).
export const ALPHA_W = 0.6, ALPHA_B = 0.25, TEMPERATURE = 1, W_MAX = 2.5, B_MAX = 1, TRACE_TAU = 1.5;
export const REWARD = { pat: 0.6, poke: -1 };

export class Brain {
  constructor(skillIds, nContexts, saved) {
    this.ids = skillIds;
    this.nContexts = nContexts;
    this.trace = [];          // [{ctx, skill, end}] most recent last; end = null while still running
    this.load(saved);
  }

  load(saved) {
    const n = this.ids.length;
    this.b = new Array(n).fill(0);
    this.w = Array.from({ length: this.nContexts }, () => new Array(n).fill(0));
    this.stats = { pats: 0, pokes: 0 };
    if (!saved || saved.v !== 2) return;
    const num = (v, m) => (Number.isFinite(v) ? Math.max(-m, Math.min(m, v)) : 0);
    this.ids.forEach((id, k) => {
      this.b[k] = num(saved.b?.[id], B_MAX);
      for (let c = 0; c < this.nContexts; c++) this.w[c][k] = num(saved.w?.[c]?.[id], W_MAX);
    });
    this.stats.pats = saved.stats?.pats | 0;
    this.stats.pokes = saved.stats?.pokes | 0;
  }

  toJSON() {
    const obj = (arr) => Object.fromEntries(this.ids.map((id, k) => [id, +arr[k].toFixed(3)]));
    return { v: 2, b: obj(this.b), w: this.w.map(obj), stats: this.stats };
  }

  get trained() { return this.stats.pats + this.stats.pokes > 0; }

  probabilities(ctx, allowed) {
    const z = this.ids.map((_, k) => (allowed[k] ? (this.b[k] + this.w[ctx][k]) / TEMPERATURE : -Infinity));
    const m = Math.max(...z);
    const e = z.map((v) => (v === -Infinity ? 0 : Math.exp(v - m)));
    const s = e.reduce((a, v) => a + v, 0);
    return e.map((v) => v / s);
  }

  pick(ctx, allowed, rand = Math.random) {
    const p = this.probabilities(ctx, allowed);
    let r = rand(), k = 0;
    for (; k < p.length - 1; k++) { r -= p[k]; if (r < 0) break; }
    while (!allowed[k]) k = (k + 1) % p.length;
    return k;
  }

  begin(ctx, skill, now) {
    const last = this.trace[this.trace.length - 1];
    if (last && last.end === null) last.end = now;
    this.trace.push({ ctx, skill, end: null });
    if (this.trace.length > 4) this.trace.shift();
  }
  finish(now) {
    const last = this.trace[this.trace.length - 1];
    if (last && last.end === null) last.end = now;
  }

  // returns [{skill, delta}] so the page can show what changed
  reward(kind, now) {
    const r = REWARD[kind];
    if (kind === "pat") this.stats.pats++; else this.stats.pokes++;
    const out = [];
    for (const e of this.trace) {
      const weight = e.end === null ? 1 : Math.exp(-(now - e.end) / TRACE_TAU);
      if (weight < 0.1) continue;
      const k = e.skill, clamp = (v, m) => Math.max(-m, Math.min(m, v));
      this.w[e.ctx][k] = clamp(this.w[e.ctx][k] + ALPHA_W * r * weight, W_MAX);
      this.b[k] = clamp(this.b[k] + ALPHA_B * r * weight, B_MAX);
      out.push({ skill: k, delta: r * weight });
    }
    return out;
  }
}

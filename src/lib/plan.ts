// Generates the landscape site plan used as the site's signature graphic.
// Seeded, so the same drawing comes out of every build.

type Pt = [number, number];

const W = 1600;
const H = 1000;

const rng = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

const f = (n: number) => n.toFixed(1);

// Catmull-Rom through points, as cubic beziers
const smooth = (pts: Pt[], closed = false) => {
  const n = pts.length;
  const at = (i: number) => (closed ? pts[(i + n) % n] : pts[Math.max(0, Math.min(n - 1, i))]);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 0; i < (closed ? n : n - 1); i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    d += `C${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)} ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)} ${f(p2[0])} ${f(p2[1])}`;
  }
  return closed ? `${d}Z` : d;
};

const blobPts = (cx: number, cy: number, rx: number, ry: number, wobble: number, n: number, r: () => number, spin = 0) =>
  Array.from({ length: n }, (_, i): Pt => {
    const a = (i / n) * Math.PI * 2 + spin;
    const k = 1 + (r() - 0.5) * wobble;
    return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k];
  });

// Densely sampled spine of a curve, for building ribbons and hedges along it
const sample = (pts: Pt[], steps = 14) => {
  const out: Pt[] = [];
  const at = (i: number) => pts[Math.max(0, Math.min(pts.length - 1, i))];
  for (let i = 0; i < pts.length - 1; i++) {
    const [p0, p1, p2, p3] = [at(i - 1), at(i), at(i + 1), at(i + 2)];
    for (let s = 0; s < steps; s++) {
      const t = s / steps;
      const q = (a: number, b: number, c: number, d: number) =>
        0.5 * (2 * b + (c - a) * t + (2 * a - 5 * b + 4 * c - d) * t * t + (3 * b - a - 3 * c + d) * t * t * t);
      out.push([q(p0[0], p1[0], p2[0], p3[0]), q(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  out.push(pts[pts.length - 1]);
  return out;
};

const normalAt = (s: Pt[], i: number): Pt => {
  const a = s[Math.max(0, i - 1)];
  const b = s[Math.min(s.length - 1, i + 1)];
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy) || 1;
  return [-dy / len, dx / len];
};

const offset = (s: Pt[], d: number) => s.map((p, i): Pt => {
  const [nx, ny] = normalAt(s, i);
  return [p[0] + nx * d, p[1] + ny * d];
});

const poly = (pts: Pt[]) => `M${pts.map((p) => `${f(p[0])} ${f(p[1])}`).join('L')}`;

const ribbon = (spine: Pt[], width: number) =>
  `${poly(offset(spine, width / 2))}L${poly([...offset(spine, -width / 2)].reverse()).slice(1)}Z`;

// Scalloped canopy, the way trees are drawn on a planting plan
const canopy = (cx: number, cy: number, radius: number, r: () => number) => {
  const n = Math.max(7, Math.round(radius / 3.4));
  const spin = r() * Math.PI;
  const pts = Array.from({ length: n }, (_, i): Pt => {
    const a = (i / n) * Math.PI * 2 + spin;
    return [cx + Math.cos(a) * radius, cy + Math.sin(a) * radius];
  });
  const bump = f(radius * Math.sin(Math.PI / n) * 1.15);
  let d = `M${f(pts[0][0])} ${f(pts[0][1])}`;
  for (let i = 1; i <= n; i++) {
    const p = pts[i % n];
    d += `A${bump} ${bump} 0 0 1 ${f(p[0])} ${f(p[1])}`;
  }
  return `${d}Z`;
};

export type Plan = ReturnType<typeof buildPlan>;

export function buildPlan(seed = 2017) {
  const r = rng(seed);

  const axisPts: Pt[] = [[-40, 800], [300, 742], [620, 620], [900, 560], [1240, 400], [1640, 210]];
  const axis = sample(axisPts);
  const branchPts: Pt[] = [[760, 590], [700, 400], [760, 230], [960, 90], [1040, -40]];
  const branch = sample(branchPts);
  const loopPts: Pt[] = [[900, 560], [1050, 680], [1270, 720], [1440, 640], [1640, 640]];
  const loop = sample(loopPts);

  const court = { x: 760, y: 590, r: 104 };
  const pond = { x: 1190, y: 245, rx: 165, ry: 96 };

  const contours = Array.from({ length: 11 }, (_, i) => {
    const k = 1 + i * 0.3;
    const local = rng(seed + 7);
    return smooth(blobPts(430, 300, 150 * k, 100 * k, 0.16, 11, local, 0.4), true);
  }).concat(Array.from({ length: 6 }, (_, i) => {
    const k = 1 + i * 0.38;
    const local = rng(seed + 19);
    return smooth(blobPts(1400, 860, 130 * k, 80 * k, 0.2, 9, local), true);
  }));

  const lawn = [
    smooth(blobPts(1120, 520, 300, 96, 0.14, 12, r, 0.25), true),
    smooth(blobPts(340, 560, 240, 110, 0.16, 11, r), true),
    smooth(blobPts(1060, 840, 300, 86, 0.14, 11, r), true),
    smooth(blobPts(520, 870, 250, 70, 0.14, 10, r), true),
  ];

  const water = smooth(blobPts(pond.x, pond.y, pond.rx, pond.ry, 0.2, 10, r, 0.3), true);
  const ripples = [0.72, 0.46].map((k) => {
    const local = rng(seed + 3);
    return smooth(blobPts(pond.x + 10, pond.y, pond.rx * k, pond.ry * k, 0.2, 10, local, 0.3), true);
  });

  const hard = [ribbon(axis, 40), ribbon(branch, 22), ribbon(loop, 22)];

  const courtRings = [court.r, court.r * 0.74, court.r * 0.3];
  const courtSpokes = Array.from({ length: 24 }, (_, i) => {
    const a = (i / 24) * Math.PI * 2;
    return `M${f(court.x + Math.cos(a) * court.r * 0.3)} ${f(court.y + Math.sin(a) * court.r * 0.3)}L${f(court.x + Math.cos(a) * court.r)} ${f(court.y + Math.sin(a) * court.r)}`;
  });

  // Paving joints across the main avenue
  const joints = axis.filter((_, i) => i % 2 === 0).map((p, i) => {
    const [nx, ny] = normalAt(axis, i * 2);
    return `M${f(p[0] + nx * 20)} ${f(p[1] + ny * 20)}L${f(p[0] - nx * 20)} ${f(p[1] - ny * 20)}`;
  });

  const beds = [
    ribbon(offset(axis.slice(8, 34), 44), 28),
    ribbon(offset(axis.slice(40, 70), -46), 30),
    ribbon(offset(loop.slice(6, 44), 34), 26),
    ribbon(offset(branch.slice(10, 40), -30), 22),
  ];

  const hedge = [offset(axis, 28).filter((_, i) => i % 3 === 0), offset(axis, -28).filter((_, i) => i % 3 === 0)]
    .flat()
    .filter((p) => Math.hypot(p[0] - court.x, p[1] - court.y) > court.r + 22)
    .map((p) => canopy(p[0], p[1], 8, r));

  // Trees, kept clear of the hard surfaces, the water and each other
  const blocked = (x: number, y: number, rad: number) => {
    const near = (s: Pt[], pad: number) => s.some((p) => Math.hypot(p[0] - x, p[1] - y) < pad + rad);
    return near(axis, 40) || near(branch, 24) || near(loop, 24)
      || Math.hypot(x - court.x, y - court.y) < court.r + rad + 12
      || Math.hypot((x - pond.x) / 1.7, y - pond.y) < pond.ry + rad + 6;
  };
  const trees: { x: number; y: number; r: number; d: string }[] = [];
  let tries = 0;
  while (trees.length < 62 && tries++ < 4000) {
    const rad = 16 + r() * r() * 42;
    const x = r() * (W + 80) - 40;
    const y = r() * (H + 80) - 40;
    if (blocked(x, y, rad)) continue;
    if (trees.some((t) => Math.hypot(t.x - x, t.y - y) < t.r + rad + 3)) continue;
    trees.push({ x, y, r: rad, d: canopy(x, y, rad, r) });
  }

  const boundary = 'M60 70L1540 70L1540 930L60 930Z';

  const notes = [
    { x: 1190, y: 245, tx: 1330, ty: 120, label: 'Aquatic pond' },
    { x: 760, y: 590, tx: 880, ty: 720, label: 'Stone court' },
    { x: 1120, y: 520, tx: 1290, ty: 560, label: 'Lawn' },
    { x: 330, y: 770, tx: 180, ty: 880, label: 'Main avenue' },
    { x: 1060, y: 840, tx: 1250, ty: 900, label: 'Softscape' },
  ];

  return { W, H, contours, lawn, water, ripples, hard, joints, courtRings, court, courtSpokes, beds, hedge, trees, boundary, notes };
}

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import './booking';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;

const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [...scope.querySelectorAll<T>(sel)];

/* ---------- Chrome that works with or without motion ---------- */

const header = document.querySelector<HTMLElement>('[data-hdr]');
const menu = document.querySelector<HTMLElement>('[data-menu]');
const toggle = document.querySelector<HTMLButtonElement>('[data-menu-toggle]');
let lenis: Lenis | undefined;

const setMenu = (open: boolean) => {
  if (!menu || !toggle) return;
  menu.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) lenis?.stop();
  else lenis?.start();
};

toggle?.addEventListener('click', () => setMenu(menu?.hidden ?? false));
addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

let lastY = 0;
const onScroll = () => {
  const y = scrollY;
  header?.classList.toggle('is-stuck', y > 40);
  header?.classList.toggle('is-hidden', y > lastY && y > 500 && menu?.hidden !== false);
  lastY = y;
};
addEventListener('scroll', onScroll, { passive: true });
onScroll();

$$<HTMLElement>('[data-disc]').forEach((list) => {
  const frame = document.querySelector('[data-disc-frame]');
  const label = document.querySelector('[data-disc-label]');
  if (!frame) return;
  const show = (a: HTMLElement) => {
    if (!a.dataset.photo) return;
    $('img', frame).forEach((img) => img.classList.toggle('on', img.dataset.photo === a.dataset.photo));
    if (label) label.textContent = a.dataset.name ?? '';
  };
  $$<HTMLElement>('a', list).forEach((a) => {
    a.addEventListener('pointerenter', () => show(a));
    a.addEventListener('focus', () => show(a));
  });
});

$$('[data-reg-filter]').forEach((bar) => {
  const rows = $$('[data-reg] .reg-row');
  $$<HTMLButtonElement>('button', bar).forEach((btn) => btn.addEventListener('click', () => {
    $$('button', bar).forEach((b) => b.setAttribute('aria-pressed', String(b === btn)));
    rows.forEach((row) => {
      row.hidden = btn.dataset.sector !== 'all' && row.dataset.sector !== btn.dataset.sector;
      row.classList.add('is-in');
      gsap.killTweensOf(row);
      gsap.set(row, { clearProps: 'opacity,transform' });
    });
    ScrollTrigger.refresh();
  }));
});

/* ---------- Motion ---------- */

const setDraw = (els: Element[]) => gsap.set(els, { strokeDasharray: 1, strokeDashoffset: 1 });

const drawn = (plan: Element) => ({
  grid: $$('.pl-grid path', plan),
  contour: $$('.pl-contour path', plan),
  boundary: $$('.pl-boundary', plan),
  lines: $$('.pl-line path, .pl-line circle', plan),
  detail: $$('.pl-detail', plan),
  hedge: $$('.pl-hedge', plan),
  trees: $$('.pl-tree', plan),
  notes: $$('.pl-notes > g', plan),
});

function hero() {
  const plan = document.querySelector('#hero-plan');
  const heroEl = document.querySelector<HTMLElement>('[data-hero]');
  if (!plan || !heroEl) return;
  const p = drawn(plan);
  setDraw([...p.grid, ...p.contour, ...p.boundary, ...p.lines]);
  gsap.set([...p.detail, ...p.hedge], { opacity: 0 });
  gsap.set(p.trees, { scale: 0, opacity: 0 });
  gsap.set(p.notes, { opacity: 0 });

  gsap.timeline({ defaults: { ease: 'power2.inOut' } })
    .to(p.grid, { strokeDashoffset: 0, duration: 1.1, stagger: 0.012 }, 0)
    .to(p.contour, { strokeDashoffset: 0, duration: 1.6, stagger: 0.03 }, 0.15)
    .to(p.boundary, { strokeDashoffset: 0, duration: 1.4 }, 0.3)
    .to(p.lines, { strokeDashoffset: 0, duration: 1.8, stagger: 0.04 }, 0.5)
    .to([...p.detail, ...p.hedge], { opacity: 1, duration: 0.8 }, 1.5)
    .to(p.trees, { scale: 1, opacity: 1, duration: 0.7, stagger: { each: 0.012, from: 'random' }, ease: 'back.out(1.6)' }, 1.4)
    .to(p.notes, { opacity: 1, duration: 0.5, stagger: 0.12 }, 2.3);

  gsap.from('.hero-line > span', { yPercent: 108, duration: 1.3, ease: 'power4.out', stagger: 0.1, delay: 0.15 });
  gsap.from('.hero-fade', { opacity: 0, y: 16, duration: 1, ease: 'power3.out', stagger: 0.08, delay: 0.75 });

  gsap.to(plan, { yPercent: 9, scale: 1.06, ease: 'none', scrollTrigger: { trigger: heroEl, start: 'top top', end: 'bottom top', scrub: true } });

  // Survey crosshair reading the Lucknow site position under the cursor
  const cross = heroEl.querySelector<HTMLElement>('[data-cross]');
  if (cross && finePointer) {
    const [x, y, tag] = [cross.querySelector('.cross-y')!, cross.querySelector('.cross-x')!, cross.querySelector<HTMLElement>('b')!];
    const moveX = gsap.quickSetter(x, 'x', 'px');
    const moveY = gsap.quickSetter(y, 'y', 'px');
    const tagX = gsap.quickSetter(tag, 'x', 'px');
    const tagY = gsap.quickSetter(tag, 'y', 'px');
    heroEl.addEventListener('pointermove', (e) => {
      const b = heroEl.getBoundingClientRect();
      const px = e.clientX - b.left;
      const py = e.clientY - b.top;
      moveX(px); moveY(py);
      tagX(Math.min(px, b.width - 190)); tagY(py);
      tag.textContent = `${(26.8467 + (b.height / 2 - py) * 1e-4).toFixed(4)}°N ${(80.9462 + (px - b.width / 2) * 1e-4).toFixed(4)}°E`;
      cross.classList.add('on');
    });
    heroEl.addEventListener('pointerleave', () => cross.classList.remove('on'));
  }
}

function statement() {
  $$('[data-words]').forEach((el) => {
    const words = (el.textContent ?? '').trim().split(/\s+/);
    el.setAttribute('aria-label', words.join(' '));
    el.innerHTML = words.map((w) => `<span class="w" aria-hidden="true">${w}</span>`).join(' ');
    gsap.fromTo($$('.w', el), { opacity: 0.16 }, {
      opacity: 1, stagger: 0.05, ease: 'none',
      scrollTrigger: { trigger: el, start: 'top 78%', end: 'bottom 52%', scrub: true },
    });
  });
}

function counters() {
  $$('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const n = { v: 0 };
    gsap.to(n, {
      v: end, duration: 1.8, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      onUpdate: () => { el.textContent = `${Math.round(n.v)}${suffix}`; },
    });
  });
}

function ground() {
  const sec = document.querySelector<HTMLElement>('[data-ground]');
  const plan = sec?.querySelector('svg');
  if (!sec || !plan) return;
  const p = drawn(plan);
  const steps = $$('.ground-step', sec);
  const rail = $$('.ground-rail span', sec);
  const fill = (sel: string) => $$(`${sel} path, ${sel} circle`, plan);

  setDraw([...p.contour, ...p.boundary, ...p.lines]);
  gsap.set([...p.detail, ...p.hedge, ...p.notes], { opacity: 0 });
  gsap.set(p.grid, { opacity: 0.4 });
  gsap.set(p.trees, { scale: 0.001, opacity: 0 });
  gsap.set(steps.slice(1), { autoAlpha: 0, y: 24 });

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.6,
      onUpdate: (st) => {
        const active = Math.min(3, Math.floor(st.progress * 4));
        rail.forEach((r, i) => r.classList.toggle('on', i <= active));
      },
    },
  });

  // Each step owns one unit of the timeline
  tl.to(p.boundary, { strokeDashoffset: 0, duration: 0.35 }, 0)
    .to(p.contour, { strokeDashoffset: 0, duration: 0.7, stagger: 0.012 }, 0.05);

  const swap = (i: number, at: number) => {
    tl.to(steps[i - 1], { autoAlpha: 0, y: -24, duration: 0.14 }, at - 0.14)
      .to(steps[i], { autoAlpha: 1, y: 0, duration: 0.14 }, at);
  };

  swap(1, 1);
  tl.to(p.lines, { strokeDashoffset: 0, duration: 0.7, stagger: 0.01 }, 1)
    .to(p.detail, { opacity: 1, duration: 0.25 }, 1.55)
    .to(p.notes, { opacity: 1, duration: 0.2, stagger: 0.05 }, 1.6);

  swap(2, 2);
  tl.to(fill('.pl-fill-hard'), { opacity: 0.85, duration: 0.3, stagger: 0.02 }, 2)
    .to(fill('.pl-fill-lawn'), { opacity: 0.9, duration: 0.3, stagger: 0.03 }, 2.2)
    .to(fill('.pl-fill-water'), { opacity: 0.95, duration: 0.25 }, 2.35)
    .to(fill('.pl-fill-bed'), { opacity: 0.85, duration: 0.25 }, 2.5)
    .to(p.hedge, { opacity: 1, duration: 0.2 }, 2.6);

  swap(3, 3);
  tl.to(p.notes, { opacity: 0, duration: 0.15 }, 3)
    .to(p.trees, { scale: 1, opacity: 1, duration: 0.5, stagger: { each: 0.006, from: 'random' } }, 3.05)
    .to({}, { duration: 0.2 }, 3.8);
}

function field() {
  const sec = document.querySelector<HTMLElement>('[data-field]');
  const track = sec?.querySelector<HTMLElement>('.field-track');
  if (!sec || !track) return;
  const mm = gsap.matchMedia();
  mm.add('(min-width: 821px)', () => {
    gsap.to(track, {
      x: () => -(track.scrollWidth - innerWidth),
      ease: 'none',
      scrollTrigger: { trigger: sec, start: 'top top', end: 'bottom bottom', scrub: 0.5, invalidateOnRefresh: true },
    });
  });
}

function reveals() {
  ScrollTrigger.batch('[data-rise]', {
    start: 'top 92%', once: true,
    onEnter: (els) => {
      els.forEach((el) => el.classList.add('is-in'));
      gsap.fromTo(els, { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.05, clearProps: 'opacity,transform' });
    },
  });
  $$('[data-clip]').forEach((el) => {
    const img = el.querySelector('img');
    gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 90%', once: true } })
      .to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.3, ease: 'power4.inOut' }, 0)
      .to(img, { scale: 1, duration: 1.7, ease: 'power3.out' }, 0);
  });
}

function start() {
  root.classList.add('motion');
  lenis = new Lenis({ lerp: 0.1, anchors: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis?.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  hero();
  statement();
  counters();
  ground();
  field();
  reveals();

  addEventListener('load', () => ScrollTrigger.refresh());
  document.fonts?.ready.then(() => ScrollTrigger.refresh());
}

if (reduced) {
  root.classList.add('no-motion');
  $('#ground-plan .pl-fill path, #ground-plan .pl-fill circle').forEach((el) => { (el as HTMLElement).style.opacity = '0.85'; });
} else {
  start();
}


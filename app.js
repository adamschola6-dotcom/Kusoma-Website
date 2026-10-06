const root = document.documentElement;
const stage = document.querySelector('[data-showcase-stage]');
const phoneRig = document.querySelector('[data-phone-rig]');
const nav = document.querySelector('.nav-links');
const menuToggle = document.querySelector('.menu-toggle');
const form = document.querySelector('[data-waitlist-form]');
const formMessage = document.querySelector('[data-form-message]');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let raf = 0;
let pointerX = 0;
let pointerY = 0;
let isPointerDown = false;

function clamp(value, min = 0, max = 1) { return Math.min(max, Math.max(min, value)); }
function ease(value) { return value * value * (3 - 2 * value); }
function updateScene() {
  raf = 0;
  if (!stage) return;
  const bounds = stage.getBoundingClientRect();
  const viewport = window.innerHeight;
  const travel = Math.max(1, stage.offsetHeight - viewport);
  const progress = clamp((viewport * 0.42 - bounds.top) / travel);
  const eased = ease(progress);
  const x = progress * Math.min(235, window.innerWidth * 0.2);
  const y = Math.sin(progress * Math.PI) * -16;
  const scale = 1 - progress * 0.33;
  const rx = (progress * -10) + pointerY;
  const ry = (progress * 31) + pointerX;
  root.style.setProperty('--progress', progress.toFixed(3));
  root.style.setProperty('--phone-x', `${x.toFixed(2)}px`);
  root.style.setProperty('--phone-y', `${y.toFixed(2)}px`);
  root.style.setProperty('--phone-scale', scale.toFixed(3));
  root.style.setProperty('--phone-rx', `${rx.toFixed(2)}deg`);
  root.style.setProperty('--phone-ry', `${ry.toFixed(2)}deg`);
  root.style.setProperty('--haze', eased.toFixed(3));
  root.style.setProperty('--card-reveal', clamp((progress - 0.45) / 0.55).toFixed(3));
}
function requestSceneUpdate() { if (!raf) raf = requestAnimationFrame(updateScene); }

window.addEventListener('scroll', requestSceneUpdate, { passive: true });
window.addEventListener('resize', requestSceneUpdate, { passive: true });
window.addEventListener('pointermove', (event) => {
  if (isPointerDown && phoneRig) {
    const rect = phoneRig.getBoundingClientRect();
    pointerX = clamp((event.clientX - (rect.left + rect.width / 2)) / 13, -8, 8);
    pointerY = clamp((event.clientY - (rect.top + rect.height / 2)) / -16, -5, 5);
    requestSceneUpdate();
  }
});
phoneRig?.addEventListener('pointerdown', (event) => { isPointerDown = true; phoneRig.setPointerCapture?.(event.pointerId); });
window.addEventListener('pointerup', () => { isPointerDown = false; pointerX *= 0.35; pointerY *= 0.35; requestSceneUpdate(); });

menuToggle?.addEventListener('click', () => {
  const open = nav?.classList.toggle('is-open') ?? false;
  menuToggle.setAttribute('aria-expanded', String(open));
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const email = String(data.get('email') ?? '').trim();
  if (!email) return;
  form.reset();
  if (formMessage) formMessage.textContent = 'Signal received. We’ll keep you close.';
});

if (reducedMotion) {
  root.style.setProperty('--phone-rx', '-4deg');
  root.style.setProperty('--phone-ry', '18deg');
}
updateScene();

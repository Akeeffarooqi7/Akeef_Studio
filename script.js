/* =========================================================
   AKEEF'S STUDIO — interactions
   ========================================================= */

// --- Preloader ---
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  const hero = document.querySelector('.hero');
  setTimeout(() => {
    pre.classList.add('done');
    hero.classList.add('loaded');
  }, 1400);
  document.getElementById('year').textContent = new Date().getFullYear();
});

// --- Custom cursor ---
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursorDot');
let mouseX = 0, mouseY = 0;
let curX = 0, curY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateCursor() {
  curX += (mouseX - curX) * 0.18;
  curY += (mouseY - curY) * 0.18;
  cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor states on interactive elements
document.querySelectorAll('a, button, [data-cursor]').forEach(el => {
  el.addEventListener('mouseenter', () => {
    const state = el.getAttribute('data-cursor');
    if (state === 'view') cursor.classList.add('view');
    else cursor.classList.add('hover');
  });
  el.addEventListener('mouseleave', () => {
    cursor.classList.remove('hover', 'view');
  });
});

// --- Sticky nav shadow on scroll ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
});

// --- Mobile nav ---
const burger = document.getElementById('burger');
const mobileNav = document.getElementById('mobileNav');
burger.addEventListener('click', () => {
  burger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
document.querySelectorAll('.mobile-nav a').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// --- Reveal on scroll ---
const revealTargets = document.querySelectorAll(
  '.section-head, .about-copy, .about-tags, .project, .service, .process-list li, .skill-col, .cta-inner'
);
revealTargets.forEach(el => el.classList.add('reveal-up'));

const io = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

revealTargets.forEach(el => io.observe(el));

// --- Smooth parallax for hero badge ---
const badge = document.querySelector('.hero-badge');
if (badge) {
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < window.innerHeight) {
      badge.style.transform = `translateY(${y * 0.2}px)`;
    }
  });
}

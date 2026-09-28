document.documentElement.classList.add('has-js');

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

if (menuButton && navigation) {
  const closeMenu = () => {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Open menu');
    navigation.classList.remove('is-open');
  };

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open menu' : 'Close menu');
    navigation.classList.toggle('is-open', !isOpen);
  });

  navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menuButton.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (!navigation.contains(event.target) && !menuButton.contains(event.target)) closeMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) closeMenu();
  });
}

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -45px 0px', threshold: 0.08 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('is-visible'));
}

const counters = document.querySelectorAll('[data-count]');
function showFinalCount(element) {
  const value = String(element.dataset.count).padStart(Number(element.dataset.pad || 1), '0');
  element.textContent = value + (element.dataset.suffix || '');
}
function animateCount(element) {
  const target = Number(element.dataset.count);
  const pad = Number(element.dataset.pad || 1);
  const suffix = element.dataset.suffix || '';
  const duration = 1250;
  let startTime;

  function frame(time) {
    if (startTime === undefined) startTime = time;
    if (reducedMotion.matches) return showFinalCount(element);
    const progress = Math.min((time - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased)).padStart(pad, '0') + suffix;
    if (progress < 1) window.requestAnimationFrame(frame);
  }
  window.requestAnimationFrame(frame);
}
if ('IntersectionObserver' in window && !reducedMotion.matches) {
  const countObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });
  counters.forEach((counter) => countObserver.observe(counter));
} else {
  counters.forEach(showFinalCount);
}

const progressBar = document.querySelector('.page-progress');
const backToTop = document.querySelector('.back-to-top');
const aboutPhoto = document.querySelector('.about-photo-frame img');
let scrollTicking = false;

function updateScrollEffects() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight;
  if (progressBar) progressBar.style.width = `${scrollable > 0 ? Math.min(100, window.scrollY / scrollable * 100) : 0}%`;
  if (backToTop) backToTop.classList.toggle('is-visible', window.scrollY > 620);

  if (aboutPhoto && !reducedMotion.matches && window.innerWidth > 760) {
    const bounds = aboutPhoto.parentElement.getBoundingClientRect();
    if (bounds.bottom > 0 && bounds.top < window.innerHeight) {
      const centerDistance = (bounds.top + bounds.height / 2 - window.innerHeight / 2) / window.innerHeight;
      const offset = Math.max(-12, Math.min(12, centerDistance * -22));
      aboutPhoto.style.setProperty('--parallax-y', `${offset.toFixed(1)}px`);
    }
  } else if (aboutPhoto) {
    aboutPhoto.style.setProperty('--parallax-y', '0px');
  }
  scrollTicking = false;
}
function requestScrollUpdate() {
  if (scrollTicking) return;
  scrollTicking = true;
  window.requestAnimationFrame(updateScrollEffects);
}
window.addEventListener('scroll', requestScrollUpdate, { passive: true });
window.addEventListener('resize', requestScrollUpdate);
requestScrollUpdate();

if (backToTop) {
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion.matches ? 'auto' : 'smooth' });
  });
}

const heroVisual = document.querySelector('.hero-visual');
const heroPhoto = document.querySelector('.hero-photo-wrap');
if (heroVisual && heroPhoto) {
  heroVisual.addEventListener('pointermove', (event) => {
    if (!finePointer.matches || reducedMotion.matches || event.pointerType === 'touch') return;
    const bounds = heroPhoto.getBoundingClientRect();
    const x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    heroPhoto.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`);
    heroPhoto.style.setProperty('--tilt-y', `${(x * 4).toFixed(2)}deg`);
    heroPhoto.style.setProperty('--glow-x', `${((x + 1) * 50).toFixed(1)}%`);
    heroPhoto.style.setProperty('--glow-y', `${((y + 1) * 50).toFixed(1)}%`);
  });
  heroVisual.addEventListener('pointerleave', () => {
    heroPhoto.style.setProperty('--tilt-x', '0deg');
    heroPhoto.style.setProperty('--tilt-y', '0deg');
  });
}

const certificateLink = document.querySelector('.achievement-media');
const lightbox = document.querySelector('#certificate-lightbox');
const closeLightbox = lightbox?.querySelector('.lightbox-close');
if (certificateLink && lightbox && closeLightbox && typeof lightbox.showModal === 'function') {
  certificateLink.addEventListener('click', (event) => {
    event.preventDefault();
    lightbox.showModal();
    closeLightbox.focus();
  });
  closeLightbox.addEventListener('click', () => lightbox.close());
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) lightbox.close();
  });
  lightbox.addEventListener('close', () => certificateLink.focus({ preventScroll: true }));
}

if ('IntersectionObserver' in window && navigation) {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = [...navigation.querySelectorAll('a[href^="#"]')];
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-25% 0px -60% 0px' });
  sections.forEach((section) => sectionObserver.observe(section));
}

reducedMotion.addEventListener?.('change', () => {
  if (!reducedMotion.matches) return;
  revealItems.forEach((item) => item.classList.add('is-visible'));
  counters.forEach(showFinalCount);
  if (aboutPhoto) aboutPhoto.style.setProperty('--parallax-y', '0px');
  if (heroPhoto) {
    heroPhoto.style.setProperty('--tilt-x', '0deg');
    heroPhoto.style.setProperty('--tilt-y', '0deg');
  }
});

const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLinks = mobileMenu.querySelectorAll('a');

const currentYear = String(new Date().getFullYear());
document.querySelectorAll('[data-year-top]').forEach(item => { item.textContent = currentYear.slice(0, 2); });
document.querySelectorAll('[data-year-bottom]').forEach(item => { item.textContent = currentYear.slice(2); });
document.querySelectorAll('[data-current-year]').forEach(item => { item.textContent = currentYear; });
const yearArtwork = document.querySelector('.year-interactive');
if (yearArtwork) yearArtwork.setAttribute('aria-label', `Interactive ornamental ${currentYear} artwork. Activate to bloom.`);

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  mobileMenu.setAttribute('aria-hidden', String(!open));
  mobileMenu.classList.toggle('open', open);
  document.body.classList.toggle('menu-open', open);
}

function toggleMenu() {
  setMenu(menuButton.getAttribute('aria-expanded') !== 'true');
}
menuLinks.forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') setMenu(false);
});

const scroller = document.querySelector('.work-scroller');
const previous = document.querySelector('.prev');
const next = document.querySelector('.next');

function updateCarouselButtons() {
  const max = scroller.scrollWidth - scroller.clientWidth - 2;
  previous.disabled = scroller.scrollLeft <= 2;
  next.disabled = scroller.scrollLeft >= max;
}

function moveCarousel(direction) {
  const card = scroller.querySelector('.work-card');
  const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
  scroller.scrollBy({ left: direction * (card.getBoundingClientRect().width + gap), behavior: 'smooth' });
}

previous.addEventListener('click', () => moveCarousel(-1));
scroller.addEventListener('scroll', updateCarouselButtons, { passive: true });
window.addEventListener('resize', updateCarouselButtons);
updateCarouselButtons();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');
if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
}

const backTop = document.querySelector('.back-top');
window.addEventListener('scroll', () => backTop.classList.toggle('show', window.scrollY > 900), { passive: true });
function scrollPageTop() {
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
}

const whatsappButton = document.querySelector('.whatsapp');
const whatsappCard = document.querySelector('.whatsapp-card');

function setWhatsApp(open) {
  whatsappButton.setAttribute('aria-expanded', String(open));
  whatsappButton.setAttribute('aria-label', open ? 'Close WhatsApp chat' : 'Open WhatsApp chat');
  whatsappCard.setAttribute('aria-hidden', String(!open));
  whatsappCard.classList.toggle('open', open);
}

function toggleWhatsApp() {
  setWhatsApp(whatsappButton.getAttribute('aria-expanded') !== 'true');
}

document.addEventListener('click', event => {
  if (!event.target.closest('.whatsapp-widget')) setWhatsApp(false);
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && whatsappButton.getAttribute('aria-expanded') === 'true') {
    setWhatsApp(false);
    whatsappButton.focus();
  }
});

function setFieldError(input, message) {
  const error = document.getElementById(`${input.name}-error`);
  input.setAttribute('aria-invalid', String(Boolean(message)));
  if (error) error.textContent = message;
}

function submitContact(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const status = document.getElementById('form-status');
  const name = form.elements.name;
  const email = form.elements.email;
  const brief = form.elements.brief;
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());

  setFieldError(name, name.value.trim() ? '' : 'Enter your name.');
  setFieldError(email, validEmail ? '' : 'Enter a valid email address.');
  setFieldError(brief, brief.value.trim().length >= 20 ? '' : 'Add at least 20 characters about the project.');

  const firstInvalid = form.querySelector('[aria-invalid="true"]');
  if (firstInvalid) {
    status.textContent = 'Check the highlighted fields and try again.';
    firstInvalid.focus();
    return;
  }

  const subject = encodeURIComponent(`Project enquiry from ${name.value.trim()}`);
  const body = encodeURIComponent([
    `Name: ${name.value.trim()}`,
    `Company: ${form.elements.company.value.trim() || 'Not provided'}`,
    `Email: ${email.value.trim()}`,
    `Phone: ${form.elements.phone.value.trim() || 'Not provided'}`,
    '',
    'Project brief:',
    brief.value.trim()
  ].join('\n'));
  status.textContent = 'Opening your email application…';
  window.location.href = `mailto:info@khoush.com?subject=${subject}&body=${body}`;
}

const yearMark = document.querySelector('.year-mark');
const yearInteractive = document.querySelector('.year-interactive');

function toggleYearBloom() {
  const bloomed = yearInteractive.classList.toggle('bloomed');
  yearInteractive.setAttribute('aria-pressed', String(bloomed));
}

if (yearMark && !reducedMotion) {
  yearMark.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const bounds = yearMark.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    yearMark.style.setProperty('--year-x', `${x * 100}%`);
    yearMark.style.setProperty('--year-y', `${y * 100}%`);
    yearMark.style.setProperty('--year-rx', `${(0.5 - y) * 9}deg`);
    yearMark.style.setProperty('--year-ry', `${(x - 0.5) * 11}deg`);
  });

  yearMark.addEventListener('pointerleave', () => {
    yearMark.style.setProperty('--year-x', '50%');
    yearMark.style.setProperty('--year-y', '50%');
    yearMark.style.setProperty('--year-rx', '0deg');
    yearMark.style.setProperty('--year-ry', '0deg');
  });
}

const tiltCards = document.querySelectorAll('.tilt-card');

function resetCardTilt(card) {
  card.style.setProperty('--spot-x', '50%');
  card.style.setProperty('--spot-y', '50%');
  card.style.setProperty('--tilt-x', '0deg');
  card.style.setProperty('--tilt-y', '0deg');
}

if (!reducedMotion) {
  tiltCards.forEach(card => {
    card.addEventListener('pointermove', event => {
      if (event.pointerType === 'touch') return;
      const bounds = card.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
      const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));

      card.style.setProperty('--spot-x', `${x * 100}%`);
      card.style.setProperty('--spot-y', `${y * 100}%`);
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 5}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 6}deg`);
    });

    card.addEventListener('pointerleave', () => resetCardTilt(card));
    card.addEventListener('focusout', () => resetCardTilt(card));
  });
}

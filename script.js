const menuButton = document.querySelector('.menu-button');
const mobileMenu = document.querySelector('.mobile-menu');
const menuLinks = mobileMenu.querySelectorAll('a');

const currentYear = String(new Date().getFullYear());
document.querySelectorAll('[data-current-year]').forEach(item => { item.textContent = currentYear; });

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
next.addEventListener('click', () => moveCarousel(1));
scroller.addEventListener('scroll', updateCarouselButtons, { passive: true });
window.addEventListener('resize', updateCarouselButtons);
updateCarouselButtons();

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

document.querySelectorAll('.mobile-card-slider').forEach((slider, sliderIndex) => {
  const cards = [...slider.children];
  const navigation = document.createElement('div');
  const progress = document.createElement('p');
  const swipeLabel = document.createElement('span');
  const counter = document.createElement('b');
  const actions = document.createElement('div');
  const previousButton = document.createElement('button');
  const nextButton = document.createElement('button');

  navigation.className = 'mobile-slider-nav';
  navigation.setAttribute('aria-label', `${slider.getAttribute('aria-label') || 'Card carousel'} navigation`);
  progress.className = 'mobile-slider-progress';
  swipeLabel.textContent = 'Swipe';
  counter.setAttribute('aria-live', 'polite');
  actions.className = 'mobile-slider-actions';
  previousButton.type = 'button';
  previousButton.textContent = '←';
  previousButton.setAttribute('aria-label', `Show previous item in carousel ${sliderIndex + 1}`);
  nextButton.type = 'button';
  nextButton.textContent = '→';
  nextButton.setAttribute('aria-label', `Show next item in carousel ${sliderIndex + 1}`);

  progress.append(swipeLabel, counter);
  actions.append(previousButton, nextButton);
  navigation.append(progress, actions);
  slider.insertAdjacentElement('beforebegin', navigation);

  function currentCardIndex() {
    const sliderLeft = slider.getBoundingClientRect().left;
    let closestIndex = 0;
    let closestDistance = Infinity;
    cards.forEach((card, index) => {
      const distance = Math.abs(card.getBoundingClientRect().left - sliderLeft);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    return closestIndex;
  }

  function updateMobileSliderNavigation() {
    const index = currentCardIndex();
    counter.textContent = `${String(index + 1).padStart(2, '0')} / ${String(cards.length).padStart(2, '0')}`;
    previousButton.disabled = index === 0;
    nextButton.disabled = index === cards.length - 1;
  }

  function moveMobileSlider(direction) {
    const currentIndex = currentCardIndex();
    const nextIndex = Math.min(cards.length - 1, Math.max(0, currentIndex + direction));
    const sliderLeft = slider.getBoundingClientRect().left;
    const cardLeft = cards[nextIndex].getBoundingClientRect().left;
    slider.scrollBy({ left: cardLeft - sliderLeft, behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  previousButton.addEventListener('click', () => moveMobileSlider(-1));
  nextButton.addEventListener('click', () => moveMobileSlider(1));
  slider.addEventListener('scroll', updateMobileSliderNavigation, { passive: true });
  window.addEventListener('resize', updateMobileSliderNavigation);
  updateMobileSliderNavigation();
});

const growthCarousel = document.querySelector('[data-growth-carousel]');
if (growthCarousel) {
  const growthTrack = growthCarousel.querySelector('.growth-track');
  const growthSlides = [...growthCarousel.querySelectorAll('.growth-slide')];
  const growthCurrent = growthCarousel.querySelector('[data-growth-current]');
  let growthIndex = 0;
  let growthTimer;

  function showGrowthSlide(index) {
    growthIndex = (index + growthSlides.length) % growthSlides.length;
    growthTrack.style.transform = `translateX(-${growthIndex * 100}%)`;
    growthCurrent.textContent = String(growthIndex + 1).padStart(2, '0');
    growthSlides.forEach((slide, slideIndex) => {
      const active = slideIndex === growthIndex;
      slide.classList.toggle('is-active', active);
      slide.setAttribute('aria-hidden', String(!active));
      slide.tabIndex = active ? 0 : -1;
    });
  }

  function stopGrowthAutoplay() {
    window.clearInterval(growthTimer);
  }

  function startGrowthAutoplay() {
    if (reducedMotion) return;
    stopGrowthAutoplay();
    growthTimer = window.setInterval(() => showGrowthSlide(growthIndex + 1), 5600);
  }

  window.moveGrowthCarousel = direction => {
    showGrowthSlide(growthIndex + direction);
    startGrowthAutoplay();
  };
  growthCarousel.addEventListener('mouseenter', stopGrowthAutoplay);
  growthCarousel.addEventListener('mouseleave', startGrowthAutoplay);
  growthCarousel.addEventListener('focusin', stopGrowthAutoplay);
  growthCarousel.addEventListener('focusout', startGrowthAutoplay);
  showGrowthSlide(0);
  startGrowthAutoplay();
}

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

const campaignMark = document.querySelector('.campaign-mark');
const campaignInteractive = document.querySelector('.campaign-interactive');

function toggleCampaignSignal() {
  if (!campaignInteractive) return;
  const activated = campaignInteractive.classList.toggle('activated');
  campaignInteractive.setAttribute('aria-pressed', String(activated));
}

if (campaignMark && !reducedMotion) {
  campaignMark.addEventListener('pointermove', event => {
    if (event.pointerType === 'touch') return;
    const bounds = campaignMark.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));
    campaignMark.style.setProperty('--signal-x', `${x * 100}%`);
    campaignMark.style.setProperty('--signal-y', `${y * 100}%`);
    campaignMark.style.setProperty('--signal-rx', `${(0.5 - y) * 7}deg`);
    campaignMark.style.setProperty('--signal-ry', `${(x - 0.5) * 9}deg`);
  });

  campaignMark.addEventListener('pointerleave', () => {
    campaignMark.style.setProperty('--signal-x', '50%');
    campaignMark.style.setProperty('--signal-y', '50%');
    campaignMark.style.setProperty('--signal-rx', '0deg');
    campaignMark.style.setProperty('--signal-ry', '0deg');
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

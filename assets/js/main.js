/*
 * Fawpearl Health Services — site script
 *
 * Small, independent features. Each one only runs if its element is on the page.
 */

/* ---------- Settings you may want to change ---------- */

// Opening hours, used for the "Open today" line in the top bar.
// Days: 0 = Sunday … 6 = Saturday. Use null for closed days.
const HOURS = {
  timeZone: 'America/New_York',
  days: {
    0: null,
    1: ['08:00', '21:00'],
    2: ['08:00', '21:00'],
    3: ['08:00', '21:00'],
    4: ['08:00', '21:00'],
    5: ['08:00', '21:00'],
    6: ['10:00', '17:00'],
  },
};

/* ---------- Mobile menu ---------- */

const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.getElementById('site-nav');

if (menuToggle && siteNav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.focus();
    }
  });
}

/* ---------- Header shadow after scrolling ---------- */

const header = document.querySelector('.site-header');

if (header) {
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 8);
  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();
}

/* ---------- "Open today" line in the top bar ---------- */

const hoursText = document.querySelector('[data-hours-today]');

if (hoursText) {
  const format = (time) => {
    const [h, m] = time.split(':').map(Number);
    const hour = h % 12 === 0 ? 12 : h % 12;
    return `${hour}:${String(m).padStart(2, '0')} ${h >= 12 ? 'pm' : 'am'}`;
  };
  const weekday = new Intl.DateTimeFormat('en-US', { weekday: 'short', timeZone: HOURS.timeZone }).format(new Date());
  const today = HOURS.days[['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(weekday)];

  hoursText.textContent = today
    ? `Open today ${format(today[0])} – ${format(today[1])}`
    : 'Closed today. Book online any time.';
}

/* ---------- Current year in the footer ---------- */

document.querySelectorAll('[data-year]').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

/* ---------- Fade sections in as they scroll into view ---------- */

const revealItems = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!('IntersectionObserver' in window) || reduceMotion) {
  revealItems.forEach((item) => item.classList.add('is-in'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
  );
  revealItems.forEach((item, i) => {
    item.style.transitionDelay = `${(i % 4) * 70}ms`;
    observer.observe(item);
  });
  // Safety net: never leave content hidden.
  setTimeout(() => revealItems.forEach((item) => item.classList.add('is-in')), 2500);
}

/* ---------- Hero video: keep it still for people who prefer less motion ---------- */

const heroVideo = document.querySelector('.hero-video');

if (heroVideo && reduceMotion) {
  heroVideo.removeAttribute('autoplay');
  heroVideo.pause();
}

/* ---------- Booking page: show the chosen visit in step 2 ---------- */

const chosenVisit = document.querySelector('.chosen-visit');

document.querySelectorAll('.visit-option input').forEach((input) => {
  input.addEventListener('change', () => {
    if (chosenVisit && input.checked) chosenVisit.textContent = input.value;
  });
});

/* ---------- Contact form ---------- */
// The form sends to the address in its action="" attribute (for example a
// Formspree form). See README.md for setup.

const contactForm = document.querySelector('[data-contact-form]');

if (contactForm) {
  const status = contactForm.querySelector('.form-status');
  const button = contactForm.querySelector('button[type="submit"]');

  const say = (message, type) => {
    status.hidden = false;
    status.textContent = message;
    status.className = `form-status is-${type}`;
  };

  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    if (contactForm.action.includes('YOUR-FORM-ID')) {
      say('Online messages are not set up yet. Please call or email us instead.', 'error');
      return;
    }

    button.disabled = true;
    say('Sending…', 'success');
    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error();
      contactForm.reset();
      say('Thank you. We will reply within one business day.', 'success');
    } catch {
      say('Your message could not be sent. Please call or email us instead.', 'error');
    } finally {
      button.disabled = false;
    }
  });
}

/* ---------- Insurance logo carousel ---------- */
// Arrows move one logo at a time and wrap around; it also slides by itself
// every few seconds, pausing while someone hovers or uses the arrows.
const CAROUSEL_SPEED = 3000; // milliseconds between automatic slides (0 = off)

document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const track = carousel.querySelector('.carousel-track');
  const step = () => {
    const item = track.querySelector('li');
    return item ? item.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 16) : track.clientWidth;
  };
  const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
  const move = (dir) => {
    if (dir > 0 && atEnd()) track.scrollTo({ left: 0 });
    else if (dir < 0 && track.scrollLeft <= 4) track.scrollTo({ left: track.scrollWidth });
    else track.scrollBy({ left: dir * step() });
  };
  const update = () => carousel.classList.toggle('is-static', track.scrollWidth <= track.clientWidth + 4);

  carousel.querySelector('.carousel-prev').addEventListener('click', () => move(-1));
  carousel.querySelector('.carousel-next').addEventListener('click', () => move(1));
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  update();

  let paused = false;
  ['mouseenter', 'focusin', 'touchstart'].forEach((e) => carousel.addEventListener(e, () => { paused = true; }, { passive: true }));
  ['mouseleave', 'focusout'].forEach((e) => carousel.addEventListener(e, () => { paused = false; }));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (CAROUSEL_SPEED && !reduceMotion) {
    setInterval(() => {
      if (!paused && !document.hidden && !carousel.classList.contains('is-static')) move(1);
    }, CAROUSEL_SPEED);
  }
});

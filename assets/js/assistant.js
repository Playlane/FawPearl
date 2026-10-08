/*
 * Fawpearl virtual assistant
 *
 * A friendly help bubble with ready-made answers. It does not use AI, does
 * not send or store anything a visitor types, and never gives medical advice.
 *
 * To change what it says, edit TOPICS below. Each topic has:
 *   label     – the button text
 *   keywords  – words that match a typed question
 *   answer    – the reply (simple HTML is allowed, e.g. links)
 */

const ASSISTANT = {
  name: 'Fawpearl Assistant',
  greeting:
    "Hi, I'm the Fawpearl assistant. I can help you book, check insurance or find information. What would you like to do?",
  fallback:
    'I\'m not sure about that one. You can call us at <a href="tel:+12405932260">+1 (240) 593-2260</a> or <a href="contact.html">send us a message</a> and we\'ll help.',
};

// Shown immediately if a visitor mentions self-harm or a crisis.
const CRISIS = {
  keywords: ['suicide', 'suicidal', 'kill myself', 'end my life', 'self harm', 'self-harm', 'hurt myself', 'harm myself', 'overdose', 'crisis', 'emergency', 'want to die'],
  answer:
    'If you are in danger or thinking about harming yourself, please get help now: <strong>call or text <a href="tel:988">988</a></strong> (Suicide &amp; Crisis Lifeline) or <strong>call <a href="tel:911">911</a></strong>. This chat is not monitored for emergencies.',
};

const TOPICS = [
  {
    label: 'Book an appointment',
    keywords: ['book', 'appointment', 'schedule', 'visit', 'new patient', 'start', 'sign up'],
    answer:
      'Two easy ways to book: <a href="https://www.zocdoc.com/practice/fawpearl-health-services-188732" target="_blank" rel="noopener">Book online with Zocdoc →</a> or <a href="https://www.therapyportal.com/p/fawpearl1/appointments/availability/#AvailabilityScreen=availability&amp;AvailabilityClinician=1028716&amp;AvailabilityLocation=676233&amp;AvailabilityApptType=2&amp;AvailabilityIsExistingPatient=false" target="_blank" rel="noopener">Schedule an appointment in our patient portal →</a> New patients start with an <strong>Initial Psychiatric Evaluation</strong>.',
  },
  {
    label: 'Do you take my insurance?',
    keywords: ['insurance', 'insured', 'coverage', 'aetna', 'cigna', 'blue', 'horizon', 'carefirst', 'bcbs', 'oscar', 'anthem', 'oxford', 'quest', 'medicare', 'medicaid', 'united', 'tricare', 'copay'],
    answer:
      'We accept Oscar, Horizon BCBS, Cigna, CareFirst, Blue Cross Blue Shield of Massachusetts, Anthem BCBS, UnitedHealthcare, Oxford and Quest Behavioral Health. For other plans, we\'re happy to check your coverage before your first visit. Call <a href="tel:+12405932260">+1 (240) 593-2260</a> or email <a href="mailto:info@fawpearl.org">info@fawpearl.org</a> with your plan details. <a href="fees.html">See fees &amp; insurance →</a>',
  },
  {
    label: 'Prices',
    keywords: ['price', 'cost', 'fee', 'how much', 'self pay', 'self-pay', 'pay'],
    answer:
      'Self-pay rates start at $90. An Initial Psychiatric Evaluation is $180 and a medication follow-up is $100. <a href="fees.html">See all prices →</a>',
  },
  {
    label: 'Opening hours',
    keywords: ['hours', 'open', 'close', 'time', 'weekend', 'saturday', 'evening'],
    answer: 'We\'re open Monday to Friday 8:00 am – 9:00 pm and Saturday 10:00 am – 5:00 pm (Eastern time). Closed Sundays.',
  },
  {
    label: 'Services',
    keywords: ['service', 'treat', 'therapy', 'medication', 'depression', 'anxiety', 'trauma', 'evaluation', 'psychiatr'],
    answer:
      'We offer psychiatric evaluations, medication management, virtual therapy and crisis consultation, all by secure video. <a href="services.html">See our services →</a>',
  },
  {
    label: 'Care for a facility',
    keywords: ['facility', 'assisted living', 'group home', 'nursing', 'residential', 'resident', 'snf'],
    answer:
      'We provide psychiatric care for residential homes, group homes, assisted living and skilled nursing facilities. <a href="contact.html">Contact us</a> and we\'ll arrange an intake call with your team.',
  },
  {
    label: 'Existing patients',
    keywords: ['portal', 'log in', 'login', 'existing', 'reschedule', 'cancel', 'message my'],
    answer:
      'Existing patients can sign in to the <a href="https://www.therapyportal.com/p/fawpearl1/">Patient Portal</a> to message us, manage visits and complete forms.',
  },
  {
    label: 'How do video visits work?',
    keywords: ['video', 'virtual', 'online', 'telehealth', 'zoom', 'in person', 'office', 'location'],
    answer:
      'All visits are by secure video. After booking you receive a link. Join from your phone, tablet or computer, from home or your facility.',
  },
];

/* ---------- You shouldn't need to change anything below ---------- */

// The site's home folder, worked out from where this script lives, so links
// work from pages in sub-folders (such as specialties/) too.
const SITE_ROOT = new URL('../../', document.currentScript.src);
const fixLinks = (el) => {
  el.querySelectorAll('a[href], img[src]').forEach((node) => {
    const attr = node.tagName === 'IMG' ? 'src' : 'href';
    const value = node.getAttribute(attr);
    if (!/^(https?:|tel:|mailto:|#|data:)/.test(value)) node.setAttribute(attr, new URL(value, SITE_ROOT).href);
  });
};

(() => {
  const root = document.createElement('div');
  root.className = 'assistant';
  root.innerHTML = `
    <button class="assistant-toggle" type="button" aria-expanded="false" aria-controls="assistant-panel">
      <svg class="icon" aria-hidden="true"><use href="#i-chat"></use></svg>
      <span>Need help?</span>
    </button>
    <section class="assistant-panel" id="assistant-panel" role="dialog" aria-label="${ASSISTANT.name}" hidden>
      <header class="assistant-head">
        <img src="assets/images/favicon.png" alt="" width="36" height="36">
        <div><strong>${ASSISTANT.name}</strong><small>Answers in seconds · Not for emergencies</small></div>
        <button class="assistant-close" type="button" aria-label="Close">×</button>
      </header>
      <div class="assistant-log" aria-live="polite"></div>
      <div class="assistant-chips"></div>
      <form class="assistant-form">
        <label class="screen-reader-text" for="assistant-input">Type your question</label>
        <input id="assistant-input" type="text" autocomplete="off" placeholder="Type a question…">
        <button type="submit" aria-label="Send"><svg class="icon" aria-hidden="true"><use href="#i-arrow"></use></svg></button>
      </form>
      <p class="assistant-note">Please don't share personal or medical details here.</p>
    </section>`;
  fixLinks(root);
  document.body.appendChild(root);

  const toggle = root.querySelector('.assistant-toggle');
  const panel = root.querySelector('.assistant-panel');
  const log = root.querySelector('.assistant-log');
  const chips = root.querySelector('.assistant-chips');
  const form = root.querySelector('.assistant-form');
  const input = root.querySelector('#assistant-input');

  const say = (html, from = 'bot') => {
    const bubble = document.createElement('div');
    bubble.className = `assistant-msg is-${from}`;
    if (from === 'bot') { bubble.innerHTML = html; fixLinks(bubble); }
    else bubble.textContent = html;
    log.appendChild(bubble);
    log.scrollTop = log.scrollHeight;
  };

  const reply = (text) => {
    const q = text.toLowerCase();
    if (CRISIS.keywords.some((k) => q.includes(k))) return CRISIS.answer;
    const match = TOPICS.find((t) => t.keywords.some((k) => q.includes(k)));
    return match ? match.answer : ASSISTANT.fallback;
  };

  TOPICS.forEach((topic) => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.textContent = topic.label;
    chip.addEventListener('click', () => {
      say(topic.label, 'user');
      say(topic.answer);
    });
    chips.appendChild(chip);
  });

  const open = () => {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    root.classList.add('is-open');
    if (!log.children.length) say(ASSISTANT.greeting);
    input.focus();
  };
  const close = () => {
    panel.hidden = true;
    toggle.setAttribute('aria-expanded', 'false');
    root.classList.remove('is-open');
    toggle.focus();
  };

  toggle.addEventListener('click', () => (panel.hidden ? open() : close()));
  root.querySelector('.assistant-close').addEventListener('click', close);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !panel.hidden) close();
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    say(text, 'user');
    input.value = '';
    setTimeout(() => say(reply(text)), 250);
  });
})();

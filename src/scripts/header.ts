/**
 * Header behaviour: drop-down panels, mobile menu, scroll shadow and the
 * "Open today" line in the utility bar.
 */
import { todayStatus } from './hours';

export function initHeader(): void {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;

  // Drop-down panels: open on click (and hover on devices with a mouse).
  const triggers = Array.from(header.querySelectorAll<HTMLButtonElement>('[data-menu-trigger]'));
  const panelFor = (t: HTMLButtonElement) => document.getElementById(t.getAttribute('aria-controls') ?? '');
  const close = (t: HTMLButtonElement) => {
    t.setAttribute('aria-expanded', 'false');
    panelFor(t)?.setAttribute('hidden', '');
  };
  const closeAll = (except?: HTMLButtonElement) => triggers.forEach((t) => t !== except && close(t));
  const open = (t: HTMLButtonElement) => {
    closeAll(t);
    t.setAttribute('aria-expanded', 'true');
    panelFor(t)?.removeAttribute('hidden');
  };

  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  let hoverTimer: number | undefined;

  triggers.forEach((t) => {
    t.addEventListener('click', () => (t.getAttribute('aria-expanded') === 'true' ? close(t) : open(t)));
    if (canHover) {
      const item = t.closest('li');
      item?.addEventListener('mouseenter', () => {
        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(() => open(t), 80);
      });
      item?.addEventListener('mouseleave', () => {
        window.clearTimeout(hoverTimer);
        hoverTimer = window.setTimeout(() => close(t), 160);
      });
    }
  });

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof Node) || !header.querySelector('.nav')?.contains(e.target)) closeAll();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const openTrigger = triggers.find((t) => t.getAttribute('aria-expanded') === 'true');
    if (openTrigger) {
      close(openTrigger);
      openTrigger.focus();
    }
    closeMobile();
  });

  // Mobile menu.
  const mobile = header.querySelector<HTMLElement>('[data-mobile-menu]');
  const toggle = header.querySelector<HTMLButtonElement>('[data-mobile-toggle]');
  const closeBtn = header.querySelector<HTMLButtonElement>('[data-mobile-close]');
  function openMobile() {
    mobile?.removeAttribute('hidden');
    toggle?.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    closeBtn?.focus();
  }
  function closeMobile() {
    if (!mobile || mobile.hasAttribute('hidden')) return;
    mobile.setAttribute('hidden', '');
    toggle?.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    toggle?.focus();
  }
  toggle?.addEventListener('click', openMobile);
  closeBtn?.addEventListener('click', closeMobile);
  mobile?.querySelectorAll('a').forEach((a) => a.addEventListener('click', closeMobile));

  // Shadow once the page scrolls.
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 4);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // "Open today" text.
  const status = document.querySelector<HTMLElement>('[data-hours]');
  const text = status?.querySelector<HTMLElement>('[data-hours-text] span');
  if (status && text) {
    try {
      const { tz, hours } = JSON.parse(status.dataset.hours ?? '{}');
      text.textContent = todayStatus(hours, tz);
    } catch {
      /* keep the server-rendered text */
    }
  }
}

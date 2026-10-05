/**
 * Fades sections in as they scroll into view. Anything already on screen is
 * shown straight away, and everything is shown if the observer is missing.
 */
export function initReveal(): void {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  const showAll = () => items.forEach((el) => el.classList.add('is-visible'));

  if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    showAll();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
  );
  items.forEach((el) => observer.observe(el));
  window.setTimeout(showAll, 2500);
}

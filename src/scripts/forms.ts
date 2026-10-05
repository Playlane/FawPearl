/**
 * Sends any <form data-form="..."> to the form endpoint as JSON and shows
 * the result in its [data-form-status] element. Works for the callback,
 * referral and contact forms.
 */
export function initForms(): void {
  document.querySelectorAll<HTMLFormElement>('form[data-form]').forEach((form) => {
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const button = form.querySelector<HTMLButtonElement>('button[type="submit"]');

    const say = (text: string, state: 'info' | 'error' | 'success') => {
      if (!status) return;
      status.hidden = false;
      status.textContent = text;
      status.dataset.state = state;
    };

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const data: Record<string, string | string[]> = { formType: form.dataset.form ?? 'contact' };
      new FormData(form).forEach((value, key) => {
        const v = String(value).trim();
        const existing = data[key];
        if (existing === undefined) data[key] = v;
        else data[key] = Array.isArray(existing) ? [...existing, v] : [existing, v];
      });

      if (button) button.disabled = true;
      say('Sending…', 'info');
      try {
        const response = await fetch(form.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(data),
        });
        const body = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(typeof body.error === 'string' ? body.error : '');
        form.reset();
        say(form.dataset.success ?? 'Thank you. We will be in touch soon.', 'success');
      } catch (err) {
        const message = err instanceof Error && err.message ? err.message : '';
        say(message || 'Your message could not be sent. Please call or email us instead.', 'error');
      } finally {
        if (button) button.disabled = false;
      }
    });
  });
}

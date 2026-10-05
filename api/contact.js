// Vercel serverless function: receives the callback, referral and contact
// forms and emails them to the practice through Resend (https://resend.com).
//
// Environment variables (Vercel → Project → Settings → Environment Variables):
//   RESEND_API_KEY  API key from Resend
//   CONTACT_TO      Where messages go (default info@fawpearl.org)
//   CONTACT_FROM    A sender on a domain verified in Resend, e.g. "Fawpearl Website <website@fawpearl.org>"
//
// Patients may include health details, so confirm your email setup meets your
// HIPAA obligations, or point the forms at a HIPAA-ready form service instead
// (change formEndpoint in src/data/site.ts).

const SUBJECTS = {
  callback: 'Callback request',
  referral: 'New patient referral',
  contact: 'Website message',
};

const LABELS = {
  firstName: 'First name',
  lastName: 'Last name',
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  organization: 'Organization',
  role: 'Relationship',
  support: 'Support wanted',
  careFor: 'Care is for',
  state: 'State',
  payment: 'Payment',
  setting: 'Care setting',
  service: 'Type of care',
  message: 'Message',
  consent: 'Consent to contact',
};

const clean = (value, max = 500) =>
  String(Array.isArray(value) ? value.join(', ') : value ?? '')
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, ' ')
    .trim()
    .slice(0, max);

const escapeHtml = (s) =>
  s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Use POST to send a form.' });
  }

  const body = req.body && typeof req.body === 'object' ? req.body : {};

  // Honeypot: people never fill this hidden field, bots often do.
  if (body.company) return res.status(200).json({ ok: true });

  const type = SUBJECTS[body.formType] ? body.formType : 'contact';
  const email = clean(body.email, 200);
  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ error: 'Please enter a valid email address so we can reply.' });
  }

  const key = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;
  const to = process.env.CONTACT_TO || 'info@fawpearl.org';
  if (!key || !from) {
    return res.status(503).json({ error: 'Online forms are not set up yet. Please call or email us instead.' });
  }

  const rows = Object.keys(LABELS)
    .filter((k) => body[k] !== undefined && clean(body[k]) !== '')
    .map((k) => [LABELS[k], clean(body[k], k === 'message' ? 4000 : 500)]);

  const who = clean(body.name) || [clean(body.firstName), clean(body.lastName)].filter(Boolean).join(' ') || email;
  const text = `${SUBJECTS[type]} from the website\n\n${rows.map(([l, v]) => `${l}: ${v}`).join('\n')}`;
  const html = `<p><strong>${SUBJECTS[type]} from the website</strong></p><table cellpadding="6">${rows
    .map(([l, v]) => `<tr><td valign="top"><strong>${escapeHtml(l)}</strong></td><td>${escapeHtml(v).replace(/\n/g, '<br>')}</td></tr>`)
    .join('')}</table>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from, to: [to], reply_to: email, subject: `${SUBJECTS[type]}: ${who}`, text, html }),
    });
    if (!r.ok) {
      console.error('Resend error', r.status, await r.text());
      return res.status(502).json({ error: 'Your message could not be sent. Please call or email us instead.' });
    }
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Form error', err);
    return res.status(502).json({ error: 'Your message could not be sent. Please call or email us instead.' });
  }
}

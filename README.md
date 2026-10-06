# Fawpearl Health Services website

A simple website made of plain HTML, CSS and JavaScript. There is no build
step: what you see in this folder is exactly what goes online.

## Files

```
index.html        Home
about.html        About
services.html     Services (including care facilities)
book.html         Book online
fees.html         Fees & Insurance
faqs.html         FAQs
contact.html      Contact (with message form)
404.html          "Page not found"

assets/css/style.css    All styling
assets/js/main.js       Menu, opening hours, contact form, small effects
assets/images/          Logo, photos, favicon
assets/video/           Homepage video (hero.mp4 and hero.webm)
```

## Making changes

**Text** – open the page's `.html` file and edit the words between the tags.
Each section starts with a comment such as `<!-- ===== How it works ===== -->`
so it is easy to find.

**Phone number, email or booking links** – these appear on several pages. Use
your editor's *Find in files / Replace all* (in VS Code: `Ctrl+Shift+H`):

| What | Search for |
| --- | --- |
| Phone | `+1 (301) 532-5849` and `tel:+13015325849` |
| Email | `info@fawpearl.org` |
| "Schedule an appointment" (TherapyPortal) | `https://www.therapyportal.com/p/fawpearl1/` |
| Zocdoc link | `https://www.zocdoc.com/about/request/` |
| Patient portal | `https://www.therapyportal.com/p/fawpearl1/` |
| Privacy policy | `https://fawpearl.org/privacy-policy/` |

**Opening hours** – edit the `HOURS` list at the top of `assets/js/main.js`
(used for "Open today" in the top bar), and the hours table in `contact.html`.

**Colours and fonts** – change the values in `:root` at the top of
`assets/css/style.css`. For example `--deep` is the dark logo blue and `--accent`
the orange button colour.

**Photos** – replace a file in `assets/images/` with one of the same name.
Add Abimbola's headshot as `assets/images/provider.jpg` and change
`provider-placeholder.svg` to `provider.jpg` in `index.html` and `about.html`.

**Homepage video** – replace `assets/video/hero.mp4` (and `hero.webm`, or
delete that line in `index.html`). Keep videos short, silent and under about
2 MB. `assets/images/hero-poster.jpg` is shown while the video loads.

**Menu** – the menu is near the top of every page, inside
`<nav id="site-nav">`. If you add or rename a page, update it on each page.

**Icons** – each page starts with a small icon library (`<symbol id="i-...">`).
Use an icon with `<svg class="icon" aria-hidden="true"><use href="#i-phone"></use></svg>`.

## Scheduling, calendar and EHR (TherapyNotes)

"Schedule an appointment" sends new patients to your TherapyPortal, which is part of
TherapyNotes, the EHR you already use.

1. **Let new patients request a time:** in TherapyNotes go to *Settings → Client Portal*
   and turn on new patient appointment requests. Requests appear in TherapyNotes for you
   to accept; nothing is booked until you do.
2. **Sync to your calendar:** in TherapyNotes open *Settings → Calendar Sync* and connect
   Google, Outlook or Apple Calendar. Appointments show in your calendar (client initials
   only). The sync is one-way: TherapyNotes → your calendar.

## Insurance logos

The "Insurance we accept" carousel is near the top of `index.html`. To add a plan,
save its logo in `assets/images/insurance/` and copy one `<li>` line inside
`<ul class="carousel-track">`:

```html
<li><img src="assets/images/insurance/aetna.png" alt="Aetna" loading="lazy"></li>
```

It shows 4 logos at a time on computers, 2 on tablets and 1 on phones, and slides on
its own when there are more. Change `CAROUSEL_SPEED` in `assets/js/main.js` to make it
faster or slower (0 turns automatic sliding off).

## Virtual assistant

The "Need help?" bubble on every page is `assets/js/assistant.js`. Edit the `TOPICS`
list at the top to change the buttons and answers. It uses ready-made answers only:
no AI, nothing typed is stored or sent anywhere, and crisis words (e.g. "suicide")
always show 988 and 911.

## Contact form

The form on `contact.html` sends messages through [Formspree](https://formspree.io)
(free plan available):

1. Create a Formspree account and a new form, with your email as the recipient.
2. Copy the form ID (it looks like `xyzabcd`).
3. In `contact.html`, replace `YOUR-FORM-ID` in
   `action="https://formspree.io/f/YOUR-FORM-ID"` with your ID.

Until then the form asks visitors to call or email instead. Patients may type
health details into the form, so check that your form service and email meet
your HIPAA obligations (Formspree offers a HIPAA plan), or remove the form and
keep phone and email only.

## Putting it online

**GitHub Pages (free)**

1. Upload these files to the repository (keep `index.html` at the top level).
2. In the repository, go to **Settings → Pages**.
3. Under *Build and deployment*, choose **Deploy from a branch**, branch
   **main**, folder **/ (root)**, then **Save**.
4. After a minute the site is live at `https://<account>.github.io/<repository>/`.
5. To use fawpearl.org, enter it under **Custom domain** on the same page and
   follow GitHub's DNS instructions (at Namecheap: *Domain List → Manage →
   Advanced DNS*).

**Vercel or Netlify** – import the GitHub repository. No build settings are
needed; leave the build command empty.

**Your existing hosting (cPanel)** – upload the files into `public_html`.

## Before going live

- [ ] Replace the Zocdoc sign-up link with Fawpearl's own Zocdoc profile link
- [ ] Turn on New Patient Requests and Calendar Sync in TherapyNotes (see below)
- [ ] Add your insurance logos (see below)
- [ ] Add Abimbola's headshot
- [ ] Set up the contact form (see above)
- [ ] Make sure the privacy policy link points to your policy
- [ ] List the insurance plans you accept in `fees.html` (see the comment there)

Sample photo: Pixabay licence. Video: supplied by Fawpearl.

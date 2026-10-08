# Fawpearl Health Services website

A simple website made of plain HTML, CSS and JavaScript. There is no build
step: what you see in this folder is exactly what goes online.

## Files

```
index.html        Home
about.html        About
services.html     Services (including care facilities)
fees.html         Fees & Insurance
faqs.html         FAQs
contact.html      Contact (with message form)
404.html          "Page not found"

assets/css/style.css    All styling
assets/js/main.js       Menu, opening hours, contact form, small effects
assets/images/          Logo, photos, favicon
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
| "Schedule an appointment" (TherapyPortal availability) | `https://www.therapyportal.com/p/fawpearl1/appointments/availability/#AvailabilityScreen=availability&AvailabilityClinician=1028716&AvailabilityLocation=676233&AvailabilityApptType=2&AvailabilityIsExistingPatient=false` |
| Patient Portal (existing patients) | `https://www.therapyportal.com/p/fawpearl1/` |
| "Book online" (Zocdoc) | `https://www.zocdoc.com/practice/fawpearl-health-services-188732` |
| Zocdoc link | `https://www.zocdoc.com/about/request/` |
| Patient portal | `https://www.therapyportal.com/p/fawpearl1/` |
| Privacy policy | `https://fawpearl.org/privacy-policy/` |

**Opening hours** – edit the `HOURS` list at the top of `assets/js/main.js`
(used for "Open today" in the top bar), and the hours table in `contact.html`.

**Colours and fonts** – change the values in `:root` at the top of
`assets/css/style.css`. For example `--deep` is the dark navy and `--accent`
the Cigna-blue button colour.

**Photos** – replace a file in `assets/images/` with one of the same name.
Add Abimbola's headshot as `assets/images/provider.jpg` and change
`provider-placeholder.svg` to `provider.jpg` in `index.html` and `about.html`.

**Logo** – the header and footer show the Sprig logo mark (`assets/images/fawpearl-sprig.svg`, and
`fawpearl-sprig-light.svg` for the dark footer)
with the name written beside it as text. To change the wording, edit the `brand-name`
line in each page; to change its size, edit `.brand-name` in `assets/css/style.css`.

**Specialties** – the "Our specialties" tiles are in `index.html`. Copy or delete one
`<li class="spec-tile">` line to add or remove a condition.

**Homepage photo** – replace `assets/images/hero.jpg` and `assets/images/hero.webp`
(keep the names). Landscape photos about 1600 px wide work best.

**Menu** – the menu is near the top of every page, inside
`<nav id="site-nav">`. If you add or rename a page, update it on each page.

**Icons** – each page starts with a small icon library (`<symbol id="i-...">`).
Use an icon with `<svg class="icon" aria-hidden="true"><use href="#i-phone"></use></svg>`.

## Scheduling, calendar and EHR (TherapyNotes)

"Book online" opens Zocdoc directly. "Schedule an appointment" opens your TherapyPortal availability calendar (new patient, video),
which is part of TherapyNotes, the EHR you already use. Both open in a new tab.

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

- [ ] Turn on New Patient Requests and Calendar Sync in TherapyNotes (see below)
- [ ] Add your insurance logos (see below)
- [ ] Add Abimbola's headshot
- [ ] Set up the contact form (see above)
- [ ] Make sure the privacy policy link points to your policy
- [ ] List the insurance plans you accept in `fees.html` (see the comment there)

Sample photo: Pixabay licence. Video: supplied by Fawpearl.

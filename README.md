# Fawpearl Health Services website

The website for [Fawpearl Health Services](https://fawpearl.org): virtual psychiatric care, online booking, care for residential and long-term care facilities, and patient referrals.

Built with [Astro](https://astro.build). Pages are plain HTML at the end, so the site is fast, secure and cheap to host.

## Quick start

```bash
npm install
npm run dev      # local preview at http://localhost:4321
npm run build    # production build in dist/
```

Requires Node.js 22.12 or newer.

## Where to change things

Most edits are in **`src/data/`**. Change a value there and every page that uses it updates.

| What | File |
| --- | --- |
| Phone, email, hours, time zone | `src/data/site.ts` |
| Booking links (Tebra, Zocdoc, patient portal) | `src/data/site.ts` → `booking` |
| Insurance plans accepted | `src/data/site.ts` → `insurance.plans` |
| States where you can see patients | `src/data/site.ts` → `statesServed` |
| Provider name, bio, photo | `src/data/site.ts` → `provider` |
| Services, prices, visit descriptions | `src/data/services.ts` |
| Conditions (each gets its own page) | `src/data/conditions.ts` |
| Care settings, benefits, steps, values, FAQs | `src/data/content.ts` |
| Main menu, top links, footer links | `src/data/navigation.ts` |
| Colors, fonts, spacing, corner radius | `src/styles/tokens.css` |
| Blog posts | add a Markdown file to `src/content/blog/` |
| Photos | replace files in `public/images/` (keep the names) |
| Logo | `src/components/Logo.astro` (set `logoSrc` to your logo file) |

### Adding a service
Add an entry to the `services` list in `src/data/services.ts`. It automatically gets a page at `/services/<slug>`, a row in the pricing table, a card on the homepage and a place in the menu.

### Adding a blog post
Create `src/content/blog/my-post.md`:

```md
---
title: My post title
description: One sentence shown on cards and in search results.
date: 2026-10-05
category: Wellness
---

Write the post here in Markdown.
```

## Project structure

```
api/contact.js            Form handler (Vercel serverless function)
public/                   Images, favicon, robots.txt
src/
  components/             Reusable sections (Header, CareFinder, ProviderCard, ...)
  content/blog/           Blog posts in Markdown
  data/                   All editable content and settings
  layouts/BaseLayout.astro  Page shell: head tags, header, footer, callback pop-up
  pages/                  One file per page; [slug].astro files generate many pages
  scripts/                Small browser scripts (menu, forms, opening hours)
  styles/                 Design tokens and base styles
```

## Pages

`/` home · `/book` booking · `/services` and `/services/<service>` · `/conditions` and `/conditions/<condition>` · `/facilities` care settings · `/refer` refer a patient · `/insurance` insurance & pricing · `/provider` · `/about` · `/faqs` · `/contact` · `/blog`

Old WordPress addresses (`/prices`, `/book-online`, `/schedule-appointment`, `/meet-the-team`, `/insurance-and-fees`, `/fees-insurance`) redirect to their new pages. Add more in `astro.config.mjs`.

## Deploying on Vercel

1. In Vercel, choose **Add New → Project** and import this GitHub repository. Vercel detects Astro automatically.
2. Under **Settings → Environment Variables**, add the values from `.env.example` so the forms can send email (see below).
3. Under **Settings → Domains**, add `fawpearl.org` and follow the DNS steps shown (at Namecheap: **Domain List → Manage → Advanced DNS**).

Every push to `main` then redeploys the site automatically. The GitHub Actions workflow in `.github/workflows/ci.yml` also builds each change so mistakes are caught early.

## Forms

The callback pop-up, the referral form and the contact form post to `api/contact.js`, which emails each submission through [Resend](https://resend.com). Set these environment variables in Vercel:

- `RESEND_API_KEY`: your Resend API key
- `CONTACT_TO`: where messages go (defaults to info@fawpearl.org)
- `CONTACT_FROM`: a sender on a domain verified in Resend, e.g. `Fawpearl Website <website@fawpearl.org>`

Until these are set, the forms ask visitors to call or email instead.

**Privacy:** people may type health details into forms even though the forms ask them not to. Before going live, confirm your email setup meets your HIPAA obligations, or switch to a HIPAA-ready form service by changing `formEndpoint` in `src/data/site.ts`.

## Before going live

- [ ] Replace the Tebra and Zocdoc sign-up links in `src/data/site.ts` with Fawpearl's own booking links
- [ ] Add the states where Fawpearl is licensed to `statesServed`
- [ ] Add insurance plans you accept, or leave empty to show the "we'll check your coverage" message
- [ ] Confirm the conditions list in `src/data/conditions.ts` matches what you treat
- [ ] Add a real headshot at `public/images/` and update `provider.photo`
- [ ] Add the Fawpearl logo (see `src/components/Logo.astro`)
- [ ] Set up the form environment variables
- [ ] Make sure `legal.privacyUrl` points to your privacy policy

## Photo credits

The sample photos in `public/images/` are free images from Pixabay (via github.com/yavuzceliker/sample-images), used under the Pixabay Content License. Replace them with your own whenever you like.

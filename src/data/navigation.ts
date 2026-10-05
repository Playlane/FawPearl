/**
 * Site menus. The main menu follows the same structure as large care
 * networks: Get care (mega menu), Insurance & pricing, Care settings,
 * Refer a patient and Our provider.
 */
import { conditions } from './conditions';
import { careSettings } from './content';
import { servicesBy, firstVisit } from './services';
import { site } from './site';

export interface NavLink {
  label: string;
  href: string;
  note?: string;
  external?: boolean;
}

export interface NavColumn {
  heading: string;
  href?: string;
  links: NavLink[];
}

export interface NavItem {
  label: string;
  href: string;
  /** Text for the link to the section's overview page. */
  allLabel?: string;
  /** Columns shown in the drop-down panel. */
  columns?: NavColumn[];
  /** Highlight card shown on the right of a mega menu. */
  feature?: { eyebrow: string; title: string; text: string; href: string; cta: string };
}

const serviceLink = (s: { name: string; slug: string }): NavLink => ({ label: s.name, href: `/services/${s.slug}` });

export const mainNav: NavItem[] = [
  {
    label: 'Get care',
    href: '/services',
    allLabel: 'See all services',
    columns: [
      {
        heading: 'Psychiatry & medication',
        href: '/services#psychiatry',
        links: servicesBy('psychiatry').map(serviceLink),
      },
      {
        heading: 'Therapy & support',
        href: '/services#therapy',
        links: [...servicesBy('therapy'), ...servicesBy('support')].map(serviceLink),
      },
      {
        heading: 'Conditions we treat',
        href: '/conditions',
        links: [
          ...conditions.slice(0, 6).map((c) => ({ label: c.name, href: `/conditions/${c.slug}` })),
          { label: 'All conditions', href: '/conditions' },
        ],
      },
    ],
    feature: {
      eyebrow: 'New patient?',
      title: `Start with an ${firstVisit.name}`,
      text: `$${firstVisit.price} self-pay · Secure video`,
      href: `/book?care=${firstVisit.slug}`,
      cta: 'Book this visit',
    },
  },
  {
    label: 'Insurance & pricing',
    href: '/insurance',
    allLabel: 'Insurance & pricing overview',
    columns: [
      {
        heading: 'Paying for care',
        links: [
          { label: 'Self-pay rates', href: '/insurance#rates' },
          { label: 'Insurance coverage', href: '/insurance#insurance' },
          { label: 'Payment policies', href: '/insurance#policies' },
        ],
      },
    ],
  },
  {
    label: 'Care settings',
    href: '/facilities',
    allLabel: 'All care settings',
    columns: [
      {
        heading: 'Where we provide care',
        links: careSettings.map((c) => ({ label: c.name, href: `/facilities#${c.id}` })),
      },
    ],
  },
  { label: 'Refer a patient', href: '/refer' },
  { label: 'Our provider', href: '/provider' },
];

/** Small links in the top utility bar. */
export const utilityNav: NavLink[] = [
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'FAQs', href: '/faqs' },
  { label: 'Contact', href: '/contact' },
];

export const footerNav: NavColumn[] = [
  {
    heading: 'Get care',
    links: [
      { label: 'Book online', href: '/book' },
      ...servicesBy('psychiatry').map(serviceLink),
      ...servicesBy('therapy').map(serviceLink),
      { label: 'All services', href: '/services' },
    ],
  },
  {
    heading: 'Conditions',
    links: [
      ...conditions.slice(0, 5).map((c) => ({ label: c.name, href: `/conditions/${c.slug}` })),
      { label: 'All conditions', href: '/conditions' },
    ],
  },
  {
    heading: 'Practice',
    links: [
      { label: 'About us', href: '/about' },
      { label: 'Our provider', href: '/provider' },
      { label: 'Care settings', href: '/facilities' },
      { label: 'Refer a patient', href: '/refer' },
      { label: 'Insurance & pricing', href: '/insurance' },
      { label: 'Blog', href: '/blog' },
    ],
  },
  {
    heading: 'Patients',
    links: [
      { label: 'Patient portal', href: site.booking.portal.url, external: true },
      { label: 'FAQs', href: '/faqs' },
      { label: 'Contact us', href: '/contact' },
      { label: 'Privacy policy', href: site.legal.privacyUrl, external: true },
    ],
  },
];

/**
 * Practice-wide settings. Change phone numbers, hours, booking links and
 * prices here and every page updates.
 */

export const site = {
  name: 'Fawpearl Health Services',
  shortName: 'Fawpearl',
  tagline: 'Virtual care, real NP healing',
  description:
    'Compassionate, confidential virtual psychiatric care from a board-certified Psychiatric Nurse Practitioner: evaluations, medication management, therapy and facility psychiatry.',
  url: 'https://fawpearl.org',

  phone: { display: '(301) 532-5849', tel: '+13015325849' },
  email: 'info@fawpearl.org',

  /** Shown in the top bar and footer. Days use 0 = Sunday … 6 = Saturday. */
  timezone: 'America/New_York',
  hours: [
    { label: 'Monday – Friday', days: [1, 2, 3, 4, 5], open: '08:00', close: '21:00' },
    { label: 'Saturday', days: [6], open: '10:00', close: '17:00' },
    { label: 'Sunday', days: [0], open: null, close: null },
  ],

  acceptingNewPatients: true,

  /**
   * Two-letter codes of the states where Fawpearl is licensed to see patients,
   * e.g. ['MD', 'DC']. When this list has states, the care finder tells people
   * in other states that care isn't available there yet. Leave empty to skip
   * that check.
   */
  statesServed: [] as string[],

  /** Where the booking buttons go. Replace with Fawpearl's own booking links once listed. */
  booking: {
    scheduler: {
      label: 'Schedule an appointment',
      note: 'Pick a time in our online scheduler (Tebra) and complete your intake.',
      url: 'https://www.tebra.com/care/join/',
    },
    zocdoc: {
      label: 'Book online with Zocdoc',
      note: 'See our Zocdoc profile, check availability and book there.',
      url: 'https://www.zocdoc.com/about/request/',
    },
    portal: {
      label: 'Patient portal',
      note: 'Existing patients: message us, manage visits and complete forms.',
      url: 'https://www.therapyportal.com/p/fawpearl1/',
    },
  },

  /** Form submissions are posted here (see api/contact.js). */
  formEndpoint: '/api/contact',

  insurance: {
    /** Plan names you accept, e.g. ['Aetna', 'CareFirst BlueCross BlueShield']. Empty shows a "we'll check your coverage" message. */
    plans: [] as string[],
    note: 'Call or email us with your plan details and we will check your coverage before your first visit.',
  },

  payment: [
    'No membership or subscription fees: you pay per visit.',
    'Self-pay rates are listed for every visit type.',
    "Please give at least 24 hours' notice to cancel or reschedule.",
    'A Good Faith Estimate of expected charges is available on request.',
  ],

  legal: {
    privacyUrl: 'https://fawpearl.org/privacy-policy/',
  },

  crisis:
    'If you are in crisis or thinking about harming yourself, call or text 988 (Suicide & Crisis Lifeline) or call 911. Our forms, inbox and scheduler are not monitored for emergencies.',
} as const;

export const provider = {
  name: 'Abimbola Shadare',
  credentials: 'PMHNP-BC',
  title: 'Licensed, Board-Certified Psychiatric Nurse Practitioner',
  photo: '/images/provider-placeholder.svg',
  summary:
    'Compassionate, culturally competent psychiatric care with more than 8 years of nursing experience.',
  bio: [
    'Abimbola Shadare leads Fawpearl Health Services and brings more than 8 years of nursing experience to every visit. She provides psychiatric evaluations, medication management, counseling and crisis intervention, using evidence-based, client-centered approaches.',
    "Her care is compassionate, confidential and culturally competent. She takes time to understand each person's story and builds treatment plans that fit their goals, whether they are seen at home or in a residential, group home, assisted living or skilled nursing setting.",
  ],
  focus: ['Depression', 'Anxiety', 'Trauma & PTSD', 'Medication management', 'Facility psychiatry'],
  visitTypes: ['Secure video'],
};

/** Opening-hours helper shared by the server render and the browser script. */
export function formatTime(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`;
}

export function hoursText(row: { open: string | null; close: string | null }): string {
  return row.open && row.close ? `${formatTime(row.open)} – ${formatTime(row.close)}` : 'Closed';
}

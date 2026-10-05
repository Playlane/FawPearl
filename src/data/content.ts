/**
 * Smaller content lists: care settings, benefits, steps, values and FAQs.
 */

export const careSettings = [
  {
    id: 'home',
    name: 'At home',
    icon: 'home',
    text: 'Secure video visits from your phone, tablet or computer, wherever you feel comfortable.',
  },
  {
    id: 'residential-homes',
    name: 'Residential homes',
    icon: 'house-heart',
    text: 'Comprehensive psychiatric care for individuals living in residential care homes.',
  },
  {
    id: 'group-homes',
    name: 'Group homes',
    icon: 'people',
    text: 'Psychiatric assessments, treatment planning and ongoing support for people living in group homes.',
  },
  {
    id: 'assisted-living',
    name: 'Assisted living',
    icon: 'building',
    text: 'Mental health care and medication management for residents of assisted living communities.',
  },
  {
    id: 'skilled-nursing',
    name: 'Skilled nursing facilities',
    icon: 'cross',
    text: 'Evaluation, medication management and psychiatric care for skilled nursing residents.',
  },
];

export const benefits = [
  { icon: 'tag', title: 'No membership fees', text: 'Pay per visit, with clear self-pay rates.' },
  { icon: 'clock', title: 'Evening & Saturday visits', text: 'Weekdays until 9 pm, Saturdays 10 am – 5 pm.' },
  { icon: 'badge', title: 'Board-certified care', text: 'Every visit is with a board-certified PMHNP.' },
  { icon: 'video', title: 'Secure video visits', text: 'Private, encrypted visits from home or your facility.' },
];

export const steps = [
  { title: 'Book your session', text: 'Choose your visit and pick a time online in a few minutes.' },
  { title: 'Meet your provider', text: 'Connect by secure video with a provider focused on your needs.' },
  { title: 'Build your care plan', text: 'Agree on a plan tailored to your goals and daily life.' },
  { title: 'Start healing', text: 'Follow-ups keep your plan on track as you feel better.' },
];

export const values = [
  { icon: 'ear', title: 'Listen first', text: 'We take time to understand your story before recommending anything.' },
  { icon: 'compass', title: 'Tailored plans', text: 'Care built around your goals, culture and daily life.' },
  { icon: 'lock', title: 'Confidential & safe', text: 'A judgment-free space, protected by secure technology.' },
  { icon: 'check', title: 'Evidence-based', text: 'Treatment grounded in research and clinical best practice.' },
];

export const mission =
  'To provide caring, accessible mental health support that helps people heal, grow and find hope again.';
export const vision =
  'A supportive community where everyone feels understood and no one faces mental health challenges alone.';

export const faqs: { group: string; q: string; a: string }[] = [
  {
    group: 'Getting started',
    q: 'How do I book my first appointment?',
    a: 'Choose Book online, pick Initial Psychiatric Evaluation and choose a time. You will receive a confirmation with your secure video link.',
  },
  {
    group: 'Getting started',
    q: 'Are visits in person or online?',
    a: 'All visits take place by secure video. You can join from a phone, tablet or computer, at home or at your care facility.',
  },
  {
    group: 'Getting started',
    q: 'What should I prepare for my first visit?',
    a: 'A quiet, private space, a stable internet connection, a list of your current medications and any questions you have.',
  },
  {
    group: 'Insurance & payment',
    q: 'Do you accept insurance?',
    a: 'Call or email us with your plan details and we will check your coverage. Our self-pay rates are listed on the Insurance & pricing page.',
  },
  {
    group: 'Insurance & payment',
    q: 'Are there membership or subscription fees?',
    a: 'No. You pay per visit, and every visit type has a clear self-pay rate.',
  },
  {
    group: 'Insurance & payment',
    q: 'What is your cancellation policy?',
    a: "Please give at least 24 hours' notice if you need to cancel or reschedule.",
  },
  {
    group: 'Care & facilities',
    q: 'Can you work with our care facility?',
    a: 'Yes. We provide psychiatric services for residential homes, group homes, assisted living communities and skilled nursing facilities. Use Refer a patient or contact us to set this up.',
  },
  {
    group: 'Care & facilities',
    q: 'Can I refer a patient or loved one?',
    a: 'Yes. Use the Refer a patient form and we will reach out to arrange an intake.',
  },
  {
    group: 'Care & facilities',
    q: 'What if I am in crisis?',
    a: 'If you are in danger or thinking about harming yourself, call or text 988 or call 911 right away. Our scheduler and inbox are not monitored for emergencies.',
  },
];

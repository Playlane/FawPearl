/**
 * Services and visit types. Each entry becomes a page at /services/<slug>,
 * a choice in the care finder and a row in the pricing table.
 */

export type ServiceCategory = 'psychiatry' | 'therapy' | 'support';

export interface Service {
  slug: string;
  name: string;
  category: ServiceCategory;
  /** Self-pay price per session, in US dollars. */
  price: number;
  icon: string;
  /** One line used on cards. */
  short: string;
  /** Opening paragraph on the service page. */
  intro: string;
  expect: string[];
  goodFor: string[];
  /** Marks the recommended first visit for new patients. */
  firstVisit?: boolean;
}

export const categories: Record<ServiceCategory, { label: string; blurb: string }> = {
  psychiatry: {
    label: 'Psychiatry & medication',
    blurb: 'Evaluation, diagnosis and medication management with a board-certified PMHNP.',
  },
  therapy: {
    label: 'Therapy',
    blurb: 'One-on-one virtual sessions to work through what you are carrying.',
  },
  support: {
    label: 'Consultation & care coordination',
    blurb: 'Guidance for families and care teams, and help keeping care on track.',
  },
};

export const services: Service[] = [
  {
    slug: 'psychiatric-evaluation',
    name: 'Initial Psychiatric Evaluation',
    category: 'psychiatry',
    price: 180,
    icon: 'clipboard',
    firstVisit: true,
    short: 'A thorough first visit that ends with a clear, personal care plan.',
    intro:
      'Your first visit is an unhurried conversation about your symptoms, history, goals and what has or has not helped before. Together we agree on a diagnosis, if one fits, and a care plan you understand.',
    expect: [
      'A review of your mood, sleep, stress, health history and current medications',
      'Time to talk about what matters most to you',
      'A clear explanation of any diagnosis and your treatment options',
      'A written plan, which may include medication, therapy or both',
    ],
    goodFor: ['New patients', 'A second opinion', 'Restarting care after a break'],
  },
  {
    slug: 'medication-management',
    name: 'Medication Management',
    category: 'psychiatry',
    price: 100,
    icon: 'pill',
    short: 'Careful prescribing and regular follow-ups so treatment keeps working.',
    intro:
      'Medication can be one part of feeling better. Follow-up visits check how you are doing, review side effects and adjust your plan so it keeps working for you.',
    expect: [
      'A check-in on symptoms, sleep, energy and side effects',
      'Adjustments to dose or medication when needed',
      'Prescriptions sent to your pharmacy',
      'Coordination with your other providers when helpful',
    ],
    goodFor: ['Current patients', 'Ongoing treatment for depression, anxiety and more'],
  },
  {
    slug: 'virtual-psychotherapy',
    name: 'Virtual Psychotherapy',
    category: 'therapy',
    price: 140,
    icon: 'chat',
    short: 'One-on-one therapy sessions by secure video.',
    intro:
      'Individual sessions help you understand patterns, build coping skills and work through emotional and behavioral challenges, all from somewhere you feel comfortable.',
    expect: [
      'A private, judgment-free space to talk',
      'Practical, evidence-based coping skills',
      'Goals you set together and review over time',
    ],
    goodFor: ['Stress and life changes', 'Anxiety and low mood', 'Building resilience'],
  },
  {
    slug: 'crisis-consultation',
    name: 'Crisis Consultation & Stabilization',
    category: 'psychiatry',
    price: 160,
    icon: 'shield',
    short: 'Prompt assessment and support when symptoms escalate.',
    intro:
      'When things feel like they are getting worse, a prompt consultation helps assess what is happening and put a plan in place for the next few days and weeks. This is not an emergency service.',
    expect: [
      'A focused assessment of current symptoms and safety',
      'A short-term stabilization plan',
      'Clear next steps and follow-up',
    ],
    goodFor: ['Worsening symptoms', 'Facility residents in distress', 'Support after a hospital stay'],
  },
  {
    slug: 'behavioral-health-consultation',
    name: 'Behavioral Health Consultation',
    category: 'support',
    price: 130,
    icon: 'compass',
    short: 'Guidance for families and care teams on behavioral health needs.',
    intro:
      'Families and facility staff often need a clear, practical view of what is happening and how to help. A consultation gives you a professional assessment and concrete recommendations.',
    expect: [
      'A review of the concerns you are seeing',
      'Practical strategies for home or facility staff',
      'Recommendations for treatment and follow-up',
    ],
    goodFor: ['Families', 'Care facility teams', 'Case managers'],
  },
  {
    slug: 'virtual-case-management',
    name: 'Virtual Case Management',
    category: 'support',
    price: 90,
    icon: 'link',
    short: 'Care coordination that keeps everyone on the same page.',
    intro:
      'Case management connects the pieces of care: providers, pharmacies, facilities and family. It helps make sure the plan is followed and nothing falls through the cracks.',
    expect: [
      'Coordination with other providers and facilities',
      'Follow-through on referrals and paperwork',
      'Regular check-ins on progress',
    ],
    goodFor: ['Complex care needs', 'Facility residents', 'Families supporting a loved one'],
  },
];

export const firstVisit = services.find((s) => s.firstVisit) ?? services[0];

export const servicesBy = (category: ServiceCategory) => services.filter((s) => s.category === category);

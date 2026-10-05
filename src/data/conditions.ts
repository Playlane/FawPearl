/**
 * Conditions shown in the "Care for every mind" grid, the Get care menu and
 * at /conditions/<slug>. Remove or add entries to match the conditions
 * Fawpearl treats.
 */

export interface Condition {
  slug: string;
  name: string;
  icon: string;
  summary: string;
  signs: string[];
  howWeHelp: string;
}

export const conditions: Condition[] = [
  {
    slug: 'depression',
    name: 'Depression',
    icon: 'cloud',
    summary:
      'Depression is more than a bad week. It can drain your energy, change your sleep and appetite, and make it hard to enjoy things you used to love.',
    signs: [
      'Low or empty mood most days',
      'Losing interest in things you used to enjoy',
      'Changes in sleep or appetite',
      'Tiredness, slowed thinking or trouble concentrating',
      'Feeling hopeless, guilty or worthless',
    ],
    howWeHelp:
      'We start with a full evaluation, then build a plan that may include medication, therapy or both, with regular follow-ups to make sure it is working.',
  },
  {
    slug: 'anxiety',
    name: 'Anxiety',
    icon: 'wave',
    summary:
      'Anxiety can show up as constant worry, a racing mind, panic or physical tension that gets in the way of work, sleep and relationships.',
    signs: [
      'Worry that is hard to switch off',
      'Restlessness, irritability or feeling on edge',
      'Panic attacks or a racing heart',
      'Avoiding situations because of fear',
      'Trouble falling or staying asleep',
    ],
    howWeHelp:
      'Treatment often combines practical coping skills from therapy with medication when it helps, adjusted over time as you feel calmer.',
  },
  {
    slug: 'trauma-ptsd',
    name: 'Trauma & PTSD',
    icon: 'shield',
    summary:
      'After a frightening or painful experience, it is common to feel unsafe, on guard or stuck. Trauma-informed care helps you move forward at your own pace.',
    signs: [
      'Unwanted memories, flashbacks or nightmares',
      'Avoiding reminders of what happened',
      'Feeling jumpy, tense or easily startled',
      'Feeling numb or disconnected from others',
    ],
    howWeHelp:
      'We create a safe, unhurried space, focus on stabilization and coping, and consider medication for symptoms like sleep problems or anxiety.',
  },
  {
    slug: 'adhd',
    name: 'ADHD',
    icon: 'spark',
    summary:
      'ADHD can make it hard to focus, stay organized or manage time, and it often continues into adulthood.',
    signs: [
      'Trouble keeping attention on tasks',
      'Losing things or missing deadlines',
      'Restlessness or acting before thinking',
      'Feeling overwhelmed by planning and organization',
    ],
    howWeHelp:
      'A careful evaluation looks at your history and current challenges, then treatment may include medication and practical strategies.',
  },
  {
    slug: 'bipolar-disorder',
    name: 'Bipolar Disorder',
    icon: 'balance',
    summary:
      'Bipolar disorder involves shifts between periods of low mood and periods of unusually high energy or mood. Steady treatment helps keep life on an even keel.',
    signs: [
      'Periods of very high energy, little need for sleep or racing thoughts',
      'Periods of depression',
      'Impulsive decisions during high periods',
      'Mood changes that affect work or relationships',
    ],
    howWeHelp:
      'We focus on accurate diagnosis, mood-stabilizing treatment and regular follow-ups to spot changes early.',
  },
  {
    slug: 'sleep-problems',
    name: 'Sleep problems',
    icon: 'moon',
    summary:
      'Poor sleep and mental health affect each other. Trouble sleeping can be a sign of stress, depression or anxiety, and can make them harder to manage.',
    signs: [
      'Trouble falling or staying asleep',
      'Waking too early and not getting back to sleep',
      'Feeling tired during the day',
      'Worry or racing thoughts at bedtime',
    ],
    howWeHelp:
      'We look for what is driving the sleep problem and treat it with sleep habits, therapy skills and medication when appropriate.',
  },
  {
    slug: 'grief-loss',
    name: 'Grief & loss',
    icon: 'heart',
    summary:
      'Grief can be overwhelming after the loss of a loved one, a relationship, health or independence. Support helps you carry it.',
    signs: [
      'Deep sadness or longing that does not ease',
      'Trouble sleeping, eating or concentrating',
      'Withdrawing from people or activities',
      'Feeling stuck months after a loss',
    ],
    howWeHelp:
      'Therapy gives you space to grieve and adjust, and we check for depression or anxiety that may need treatment of their own.',
  },
  {
    slug: 'mood-behavior-changes',
    name: 'Mood & behavior changes',
    icon: 'people',
    summary:
      'In residential and long-term care settings, changes in mood, sleep or behavior are common and often treatable. Care teams and families do not have to manage them alone.',
    signs: [
      'New agitation, withdrawal or irritability',
      'Changes in sleep or appetite',
      'Confusion or distress that affects daily care',
      'Concerns from family or facility staff',
    ],
    howWeHelp:
      'We assess residents by secure video, review medications and work with staff and families on a practical plan.',
  },
];

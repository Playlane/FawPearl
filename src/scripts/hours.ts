/**
 * Works out today's opening hours in the practice's time zone.
 */
export interface HoursRow {
  label: string;
  days: number[];
  open: string | null;
  close: string | null;
}

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function fmt(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const suffix = h >= 12 ? 'pm' : 'am';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return m ? `${hour}:${String(m).padStart(2, '0')} ${suffix}` : `${hour} ${suffix}`;
}

/** Day of week (0–6) and minutes since midnight in the given time zone. */
function nowIn(tz: string, date = new Date()): { day: number; minutes: number } {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '';
  const day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  return { day, minutes: Number(get('hour')) * 60 + Number(get('minute')) };
}

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

const rowFor = (hours: HoursRow[], day: number) => hours.find((r) => r.days.includes(day));

export function todayStatus(hours: HoursRow[], tz: string, date = new Date()): string {
  const { day, minutes } = nowIn(tz, date);
  const today = rowFor(hours, day);

  if (today?.open && today.close) {
    const open = toMinutes(today.open);
    const close = toMinutes(today.close);
    if (minutes < open) return `Opens today at ${fmt(today.open)}`;
    if (minutes < close) return `Open now until ${fmt(today.close)}`;
  }

  for (let i = 1; i <= 7; i++) {
    const next = (day + i) % 7;
    const row = rowFor(hours, next);
    if (row?.open) {
      const when = i === 1 ? 'tomorrow' : DAY_NAMES[next];
      return `Closed now · Opens ${when} at ${fmt(row.open)}`;
    }
  }
  return 'Book online any time';
}

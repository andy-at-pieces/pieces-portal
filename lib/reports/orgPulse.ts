export type OrgPulseTone = 'positive' | 'neutral' | 'caution';

export type OrgPulseTrend = 'up' | 'down' | 'flat';

export type OrgPulseSignal = {
  id: string;
  label: string;
  state: string;
  tone: OrgPulseTone;
  driver: string;
  trend: OrgPulseTrend;
  /** Team-level summary — no individual names at this tier. */
  expandedSummary: string;
};

/** Manager-tab pulse signals from Workstream Activity patterns (not surveys). */
export const ENGINEERING_ORG_PULSE: OrgPulseSignal[] = [
  {
    id: 'engagement',
    label: 'Engagement trend',
    state: 'Rising',
    tone: 'positive',
    driver: 'Cross-team Slack threads up 22% vs March',
    trend: 'up',
    expandedSummary:
      'Interaction volume across shared channels and DMs is running above this team\'s 90-day baseline. Most of the lift is cross-squad threads tied to the Auth Refactor and Data Platform workstreams — coordination is up, not broadcast noise. No single channel accounts for more than a third of the increase.',
  },
  {
    id: 'meeting-load',
    label: 'Meeting load shift',
    state: 'Steady',
    tone: 'neutral',
    driver: 'Total meeting time within 3% of March',
    trend: 'flat',
    expandedSummary:
      'Calendar blocks are essentially flat month over month. Recurring ceremonies held steady; ad-hoc syncs ticked up slightly but were offset by shorter default durations on two standing meetings. The mix still skews toward afternoons — worth watching if focus blocks keep shrinking.',
  },
  {
    id: 'after-hours',
    label: 'After-hours activity',
    state: 'Elevated',
    tone: 'caution',
    driver: 'Off-hours work blocks up 18% vs the team baseline',
    trend: 'up',
    expandedSummary:
      'More sustained activity is showing up outside the team\'s typical working window — evenings and early mornings, spread across several contributors rather than one outlier. Pieces treats this as a workload and sustainability signal, not a productivity score. It often precedes meeting-heavy weeks or deadline pressure; a useful cue for capacity check-ins, not performance review.',
  },
];

export function getManagerOrgPulse(): OrgPulseSignal[] {
  return ENGINEERING_ORG_PULSE;
}

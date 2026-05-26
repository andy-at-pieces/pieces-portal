import { getKpiById } from './kpis';
import type { KpiId, PulsePreview, RoleOption } from './types';

type PulsePreviewInput = {
  role: RoleOption;
  selectedKpiIds: KpiId[];
  targets: Partial<Record<KpiId, string>>;
};

const KPI_NARRATIVE: Partial<
  Record<KpiId, (target: string) => string>
> = {
  focus: (target) =>
    `You logged <strong class="text-ink font-semibold">4h 48m</strong> of sustained focus yesterday — tracking toward your <strong class="text-ink font-semibold">${target}</strong> target with fewer context switches than last week.`,
  primary: (target) =>
    `<strong class="text-ink font-semibold">62%</strong> of working time landed on the quarter&apos;s strategic initiative, above your <strong class="text-ink font-semibold">${target}</strong> bar for primary project share.`,
  review: (target) =>
    `Review and mentorship work consumed <strong class="text-ink font-semibold">11h</strong> this week, inside your <strong class="text-ink font-semibold">${target}</strong> band — healthy multiplier time without crowding IC delivery.`,
  concentration: (target) =>
    `Knowledge concentration on the auth refactor held at <strong class="text-ink font-semibold">0.32</strong>, under your <strong class="text-ink font-semibold">${target}</strong> threshold — context is spreading across the team.`,
  ai: (target) =>
    `<strong class="text-ink font-semibold">44%</strong> of shipped output touched approved AI tooling, meeting your <strong class="text-ink font-semibold">${target}</strong> adoption target.`,
  context: (target) =>
    `Pieces reclaimed an estimated <strong class="text-ink font-semibold">6.5h</strong> from search and handoff recall this month — pacing toward <strong class="text-ink font-semibold">${target}</strong>.`,
};

const ROLE_TAGS: Record<string, string[]> = {
  'engineering-staff-engineering': [
    'Enterprise Reporting',
    'Auth Refactor',
    'Data Platform',
    'Team User Service',
  ],
  'go-to-market-revenue': ['Pipeline Q2', 'Enterprise deals', 'Product marketing'],
  'customer-success-team': ['Renewals', 'Onboarding', 'Health checks'],
};

function headlineForRole(role: RoleOption, selectedKpiIds: KpiId[]): string {
  if (selectedKpiIds.includes('primary') && selectedKpiIds.includes('focus')) {
    return 'Shipped the auth refactor milestone while protecting deep-work blocks on the strategic initiative.';
  }
  if (selectedKpiIds.includes('primary')) {
    return 'Advanced the strategic initiative and kept stakeholder threads moving without losing delivery momentum.';
  }
  if (selectedKpiIds.length > 0) {
    return `Strong week for ${role.title.toLowerCase()} priorities — patterns align with the KPIs you configured for this role.`;
  }
  return "Select KPIs in step one to preview how Pieces will frame your team's weekly pulse.";
}

export function generatePulsePreview({
  role,
  selectedKpiIds,
  targets,
}: PulsePreviewInput): PulsePreview {
  const headline = headlineForRole(role, selectedKpiIds);

  if (selectedKpiIds.length === 0) {
    return {
      headline: 'Your weekly pulse will appear here once KPIs are selected.',
      narrative: [
        'Pieces drafts a one-sentence headline and a short narrative from Workstream Activity — the same format as individual standup updates.',
      ],
      tags: ROLE_TAGS[role.id]?.slice(0, 2) ?? ['Your projects'],
    };
  }

  const narrative: string[] = [];
  for (const id of selectedKpiIds.slice(0, 2)) {
    const kpi = getKpiById(id);
    const target = targets[id] ?? kpi.defaultTarget;
    const line = KPI_NARRATIVE[id]?.(target);
    if (line) narrative.push(line);
  }

  if (selectedKpiIds.length > 2) {
    const third = selectedKpiIds[2];
    const kpi = getKpiById(third);
    const target = targets[third] ?? kpi.defaultTarget;
    const line = KPI_NARRATIVE[third]?.(target);
    if (line) narrative.push(line);
  } else if (narrative.length === 1) {
    narrative.push(
      '<strong class="text-ink font-semibold">Open threads:</strong> pipeline migration timeline with platform, and benchmarking notes awaiting your review — surfaced from yesterday&apos;s memory, not a form.',
    );
  }

  const tags = (ROLE_TAGS[role.id] ?? ['Strategic initiative']).slice(
    0,
    Math.min(4, 2 + selectedKpiIds.length),
  );

  return { headline, narrative, tags };
}

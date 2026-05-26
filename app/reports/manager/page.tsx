import { Card, MetricCard, PageHeader, SectionLabel } from '@/components/ui';
import AIUtilizationScoreCard from '@/components/reports/AIUtilizationScoreCard';
import Heatmap from '@/components/Heatmap';
import OrgPulse from '@/components/reports/OrgPulse';
import SignalsList from '@/components/SignalsList';
import TeamTable from '@/components/TeamTable';
import { formatScore } from '@/lib/scores/aiUtilization';
import { getManagerTeamAIUtilizationScore } from '@/lib/reports/aiUtilizationRollups';

export const metadata = { title: 'Manager Reports · Pieces Enterprise' };

export default function ManagerReports() {
  const { teamAverage, aiTouchedOutputPct } = getManagerTeamAIUtilizationScore();

  return (
    <div data-tour-page="manager">
      <PageHeader
        kicker="Manager Reporting"
        title="Engineering · April"
        subtitle="Where your team's time went, which projects are moving, and who might need a conversation. Signals, not verdicts."
        meta={
          <div>
            <div className="font-mono text-xs text-ink-400 uppercase tracking-wider">8 direct reports</div>
            <div className="font-display font-bold text-2xl text-ink mt-1">3 signals</div>
          </div>
        }
      />

      {/* Headline metrics */}
      <div data-tour="manager-metrics" className="grid grid-cols-3 gap-3">
        <MetricCard label="Team Focus Avg" value="5.9" unit="h/day" delta="↑ 0.4h vs March" tone="pos" />
        <MetricCard label="Active Projects" value="7" delta="1 appears stalled" tone="warn" />
        <AIUtilizationScoreCard
          total={teamAverage}
          caption={`Team avg ${formatScore(teamAverage, { decimals: 1 })}.`}
          secondaryLabel="AI-touched output"
          secondaryValue={`${aiTouchedOutputPct}%`}
        />
      </div>

      <OrgPulse />

      {/* Signals */}
      <SectionLabel note="3 signals this week">What&apos;s worth a conversation</SectionLabel>
      <Card padding="none" className="overflow-hidden">
        <div data-tour="manager-signals" className="px-5">
          <SignalsList />
        </div>
      </Card>

      {/* Heatmap */}
      <SectionLabel note="Aggregated contributions per project">
        Project activity · Last 14 days
      </SectionLabel>
      <Card padding="lg">
        <Heatmap />
      </Card>

      {/* Team table */}
      <SectionLabel note="Click a name for the workflow view">Team, at a glance</SectionLabel>
      <Card padding="none" className="overflow-hidden">
        <TeamTable />
      </Card>
    </div>
  );
}

import { Card, MetricCard, PageHeader, SectionLabel } from '@/components/ui';
import StandupCard from '@/components/StandupCard';
import TimeAllocation from '@/components/TimeAllocation';
import { formatBreakdownCaption } from '@/lib/scores/aiUtilization';
import { getIndividualAIUtilizationScore } from '@/lib/reports/aiUtilizationRollups';

export const metadata = { title: 'Individual Reports · Pieces Enterprise' };

export default function IndividualReports() {
  const { score } = getIndividualAIUtilizationScore();
  return (
    <div data-tour-page="individual">
      <PageHeader
        kicker="Individual Reporting"
        title="Good evening, Andy"
        subtitle="Your automatic standup, generated from yesterday's Workstream Activity. Nothing typed, nothing forgotten. What you see here is yours alone."
        meta={
          <div>
            <div className="font-mono text-xs text-ink-400 uppercase tracking-wider">Monday · April 22</div>
            <div className="font-display font-bold text-2xl text-ink mt-1">6h 42m focus</div>
          </div>
        }
      />

      <div data-tour="standup">
        <StandupCard />
      </div>

      <SectionLabel note="Set by Mack · Updated weekly">Your North Star KPIs</SectionLabel>
      <div className="grid grid-cols-4 gap-3">
        <MetricCard label="Focus Time / Day" value="6.4" unit="h" delta="↑ 0.8h vs last month" tone="pos" />
        <MetricCard label="Fragmentation Index" value="0.31" delta="↓ 0.09 vs last month" tone="pos" />
        <MetricCard label="Primary Project Share" value="58" unit="%" delta="↓ 4% vs last month" tone="warn" />
        <MetricCard
          label="AI Tool Utilization"
          value="42"
          unit="%"
          delta="↑ 11% vs last month"
          tone="pos"
          footnote={`Score ${score.total}/10 · ${formatBreakdownCaption(score)}`}
        />
      </div>

      <SectionLabel note="32 working days · 164h tracked via LTM-2.7">
        Where your month went
      </SectionLabel>
      <Card padding="lg">
        <TimeAllocation />
      </Card>
    </div>
  );
}

import { Card, PageHeader, SectionLabel } from '@/components/ui';
import ExecHero from '@/components/ExecHero';
import DepartmentList from '@/components/DepartmentList';
import AIAdoption from '@/components/AIAdoption';

export const metadata = { title: 'Executive Reports · Pieces Enterprise' };

export default function ExecutiveReports() {
  return (
    <div data-tour-page="executive">
      <PageHeader
        kicker="Executive Reporting"
        title="The one page · April 2026"
        subtitle="What a CEO needs to see this month. High-level by design. Pieces Inc · 142 employees."
        meta={
          <div>
            <div className="font-mono text-xs text-ink-400 uppercase tracking-wider">Generated · Apr 22</div>
            <div className="font-display font-bold text-2xl text-ink mt-1">09:14 EDT</div>
          </div>
        }
      />

      <div data-tour="exec-hero">
        <ExecHero />
      </div>

      <SectionLabel note="Vs. Q1 baseline">Headline metrics</SectionLabel>
      <div className="grid grid-cols-4 gap-3">
        <BigMetric label="Efficiency Index" value="+14" suffix="%" note="Focus time per working hour, company-wide, vs Q1." />
        <BigMetric label="AI Spend at Risk" value="$11.2" suffix="k/mo" note={<>Licensed AI tools with <strong className="text-ink-700 font-semibold">&lt;5% presence</strong> in employee output.</>} />
        <BigMetric label="Context Savings" value="31" suffix="h" note="Reclaimed per employee per month from prior-work search." />
        <BigMetric label="Concentration Risk" value="2" note={<>Initiatives where <strong className="text-ink-700 font-semibold">&gt;70%</strong> of activity sits with one person.</>} />
      </div>

      <SectionLabel note="Focus vs. fragmentation · April">
        How departments are operating
      </SectionLabel>
      <Card padding="lg">
        <DepartmentList />
      </Card>

      <SectionLabel note="Is the investment showing up in work?">
        AI adoption · actual vs. licensed
      </SectionLabel>
      <AIAdoption />
    </div>
  );
}

function BigMetric({
  label,
  value,
  suffix,
  note,
}: {
  label: string;
  value: string;
  suffix?: string;
  note: React.ReactNode;
}) {
  return (
    <Card padding="lg">
      <div className="text-[11px] font-medium text-ink-500 mb-3">{label}</div>
      <div className="font-display font-bold text-[40px] text-ink leading-none tracking-tight">
        {value}
        {suffix && (
          <span className="text-lg text-ink-500 font-semibold ml-0.5">{suffix}</span>
        )}
      </div>
      <div className="text-xs text-ink-500 mt-3 leading-relaxed">{note}</div>
    </Card>
  );
}

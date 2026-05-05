import { Card, PageHeader, SectionLabel } from '@/components/ui';
import { Lock, ShieldCheck } from 'lucide-react';
import TourTrigger from '@/components/TourTrigger';

export const metadata = { title: 'Benchmarks · Pieces Enterprise' };

const benchmarks = [
  { label: 'New-hire ramp time', value: '-38', suffix: '%', note: 'From 29 days to 18. New hires use shared Workstream Activity to get up to speed.' },
  { label: 'Standup prep time', value: '-92', suffix: '%', note: 'From 11 min/day writing to 50 seconds reviewing auto-generated Standup Updates.' },
  { label: 'Context remembered', value: '+64', suffix: '%', note: 'Self-reported recall of key decisions from calls 2+ weeks old, against a control group.' },
  { label: 'Quarterly report effort', value: '-87', suffix: '%', note: 'The Disney pattern. Reports auto-drafted from Jira templates + LTM, reviewed in minutes.' },
  { label: 'Underused AI spend identified', value: '$11', suffix: 'k/mo', note: 'Seats appearing in less than 5% of employee output across 12 weeks.' },
  { label: 'Reported focus gain', value: '+14', suffix: '%', note: 'Sustained uninterrupted work time across the organization vs. baseline week.' },
];

export default function BenchmarksPage() {
  return (
    <div className="max-w-[1240px] mx-auto px-8 py-8">
      <PageHeader
        kicker="Enterprise Benchmarking"
        title="Before & After"
        subtitle="The quantifiable case for Pieces, built from pre/post surveys and real workflow data. For enterprise buyers, procurement conversations, and the champions defending renewal."
        meta={
          <div>
            <div className="font-mono text-xs text-ink-400 uppercase tracking-wider">Tenant · pieces.app</div>
            <div className="font-display font-bold text-2xl text-ink mt-1">12 weeks in</div>
          </div>
        }
      />

      {/* Hero before / after */}
      <div data-tour="bench-hero" className="grid grid-cols-2 rounded-card border border-surface-200 overflow-hidden">
        <div className="p-9 bg-surface-50">
          <div className="text-[10px] font-semibold tracking-[0.1em] text-ink-400 uppercase mb-4">
            Before · Week 0 baseline
          </div>
          <div className="flex items-baseline">
            <span className="font-display font-bold text-[56px] text-ink leading-none tracking-tight">47</span>
            <span className="text-sm text-ink-500 font-medium ml-2">min/day</span>
          </div>
          <div className="text-sm text-ink-500 mt-3 max-w-[340px] leading-relaxed">
            Average time spent hunting for prior work, context, and &quot;what was I doing before that
            meeting&quot;
          </div>
        </div>

        <div className="p-9 bg-ink-900 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-lime/15 blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="text-[10px] font-semibold tracking-[0.1em] text-lime uppercase mb-4">
              After · Week 12
            </div>
            <div className="flex items-baseline">
              <span className="font-display font-bold text-[56px] text-lime leading-none tracking-tight">9</span>
              <span className="text-sm text-surface-300 font-medium ml-2">min/day</span>
            </div>
            <div className="text-sm text-surface-300 mt-3 max-w-[340px] leading-relaxed">
              With Pieces surfacing prior context automatically.{' '}
              <strong className="text-lime font-semibold">
                -81% · reclaiming 31 hrs per employee per month.
              </strong>
            </div>
          </div>
        </div>
      </div>

      <SectionLabel note="Pre/post methodology · Per-person telemetry">
        Measured across the organization
      </SectionLabel>
      <div className="grid grid-cols-3 gap-3">
        {benchmarks.map((b) => (
          <Card key={b.label} padding="lg">
            <div className="text-[11px] font-medium text-ink-500 mb-3">{b.label}</div>
            <div className="font-display font-bold text-[40px] text-ink leading-none tracking-tight">
              {b.value}
              <span className="text-lg text-ink-500 font-semibold ml-0.5">{b.suffix}</span>
            </div>
            <div className="text-xs text-ink-500 mt-3 leading-relaxed">{b.note}</div>
          </Card>
        ))}
      </div>

      <SectionLabel note="Why Pieces clears where Copilot sometimes doesn't">
        Security posture, for the deck
      </SectionLabel>
      <div className="grid grid-cols-2 gap-3">
        <Card padding="lg">
          <div className="w-10 h-10 rounded-lg bg-accent-greenSoft text-accent-green grid place-items-center mb-3">
            <Lock className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div className="font-display font-semibold text-[15px] text-ink mb-1.5">
            OS-level, local by default
          </div>
          <div className="text-[13px] text-ink-500 leading-relaxed">
            LTM-2.7 captures context on-device. 90% runs offline. Nothing leaves the endpoint unless the
            admin explicitly routes summaries through the Team User Service. For security-first
            enterprises currently defaulting to Microsoft Copilot, this is the differentiator.
          </div>
        </Card>
        <Card padding="lg">
          <div className="w-10 h-10 rounded-lg bg-accent-blueSoft text-accent-blue grid place-items-center mb-3">
            <ShieldCheck className="w-5 h-5" strokeWidth={1.75} />
          </div>
          <div className="font-display font-semibold text-[15px] text-ink mb-1.5">
            Templated, not raw
          </div>
          <div className="text-[13px] text-ink-500 leading-relaxed">
            Org-wide reporting uses structured, templated summaries. Not raw memories, documents, or
            message contents. SOC 2 compliant. Auth0 with MFA. BYOK and BYOM supported. Domain capture
            gates enterprise seat allocation. Air-gap deployment available.
          </div>
        </Card>
      </div>

      <TourTrigger />
    </div>
  );
}

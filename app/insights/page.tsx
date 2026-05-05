'use client';

import { useState } from 'react';
import { Card, PageHeader, SectionLabel } from '@/components/ui';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import TourTrigger from '@/components/TourTrigger';

const initialKpis = [
  { id: 'focus', name: 'Focus Time per Day', desc: 'Sustained, uninterrupted work blocks. Low fragmentation means shipping time, not switching time.', meta: 'Suggested · 5h/day · Measured weekly', selected: true },
  { id: 'primary', name: 'Primary Project Share', desc: 'Percent of working time on the strategic initiative for the quarter. Rising share means focus on what matters.', meta: 'Suggested · 55%+ · Measured monthly', selected: true },
  { id: 'review', name: 'Review & Mentorship Load', desc: 'Time spent in PRs, design review, and mentoring. Balances IC output against team multiplier effects.', meta: 'Suggested · 8 to 15h/week', selected: false },
  { id: 'concentration', name: 'Knowledge Concentration', desc: 'Lower is better. High values indicate critical context sitting with one person, a risk to shared ownership.', meta: 'Suggested · < 0.4 · Team-shared', selected: true },
  { id: 'ai', name: 'AI Utilization Ratio', desc: 'Percent of output touched by AI tooling. Tracks adoption of approved AI spend, not seat counts.', meta: 'Suggested · 40%+ · Measured weekly', selected: false },
  { id: 'context', name: 'Context Savings', desc: 'Time reclaimed from searching for prior work, meeting recall, and handoffs. A Pieces-unique benchmark.', meta: 'Suggested · 20+ hrs/month', selected: false },
];

export default function InsightsPage() {
  const [kpis, setKpis] = useState(initialKpis);
  const [step, setStep] = useState(2);

  const toggleKpi = (id: string) => {
    setKpis((ks) => ks.map((k) => (k.id === id ? { ...k, selected: !k.selected } : k)));
  };

  const selectedCount = kpis.filter((k) => k.selected).length;

  return (
    <div className="max-w-[1240px] mx-auto px-8 py-8">
      <PageHeader
        kicker="Configuration"
        title="KPIs & North Stars"
        subtitle="Set what matters, per role and per team. Pieces drafts suggestions from role and past activity. You customize from there. Every employee always sees their own KPIs."
        meta={
          <div>
            <div className="font-mono text-xs text-ink-400 uppercase tracking-wider">Step {step} of 4</div>
            <div className="font-display font-bold text-2xl text-ink mt-1">Engineering</div>
          </div>
        }
      />

      <div data-tour="insights-stepper" className="flex border-b border-surface-200 mb-7">
        {['Choose Role', 'Select KPIs', 'Set Targets', 'Review & Publish'].map((label, i) => {
          const n = i + 1;
          const isActive = n === step;
          const isDone = n < step;
          return (
            <button
              key={label}
              onClick={() => setStep(n)}
              className={`relative px-5 py-3 text-sm font-medium flex items-center gap-2.5 transition-colors ${
                isActive ? 'text-ink' : 'text-ink-400 hover:text-ink-700'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full grid place-items-center text-[10px] font-semibold ${
                  isActive
                    ? 'bg-ink-900 text-white'
                    : isDone
                    ? 'bg-accent-greenSoft text-accent-green'
                    : 'bg-surface-100 text-ink-400'
                }`}
              >
                {isDone ? <Check className="w-3 h-3" strokeWidth={3} /> : n}
              </span>
              {label}
              {isActive && <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-ink" />}
            </button>
          );
        })}
      </div>

      {step === 2 && (
        <>
          <SectionLabel note="Suggestions drawn from 14 Staff Engineers at Pieces + benchmark data">
            Configuring · Staff Engineering
          </SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {kpis.map((kpi) => (
              <button
                key={kpi.id}
                onClick={() => toggleKpi(kpi.id)}
                className={`text-left rounded-card border p-5 transition-colors relative ${
                  kpi.selected
                    ? 'border-ink-900 bg-surface-50'
                    : 'border-surface-200 bg-white hover:border-surface-400'
                }`}
              >
                {kpi.selected && (
                  <span className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-ink-900 grid place-items-center">
                    <Check className="w-3 h-3 text-white" strokeWidth={3} />
                  </span>
                )}
                <div className="font-display font-semibold text-[15px] text-ink mb-1.5 pr-8">
                  {kpi.name}
                </div>
                <div className="text-[13px] text-ink-500 leading-relaxed">{kpi.desc}</div>
                <div className="text-[10px] font-mono text-ink-400 mt-3">{kpi.meta}</div>
              </button>
            ))}
          </div>

          <div className="rounded-card bg-ink-900 border border-ink-700 p-6 mt-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-lime/10 blur-2xl pointer-events-none" />
            <div className="relative">
              <div className="text-[11px] font-semibold tracking-[0.1em] text-lime uppercase mb-3">
                North Star · How your team will see it
              </div>
              <div className="font-display font-medium text-lg text-white leading-snug max-w-[700px]">
                &quot;Stay focused on the strategic initiative, protect deep work, and keep critical context
                shared across the team.&quot;
              </div>
              <div className="text-[12px] text-surface-300 mt-3">
                {selectedCount} KPIs selected · Pieces will generate weekly pulse reports and flag drift
                automatically.
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-7 pt-5 border-t border-surface-200">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              className="px-4 py-2 rounded-lg border border-surface-300 bg-white text-sm font-medium text-ink-700 hover:border-ink-400 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
            <button
              onClick={() => setStep(Math.min(4, step + 1))}
              className="px-4 py-2 rounded-lg bg-ink-900 hover:bg-black text-white text-sm font-medium transition-colors flex items-center gap-2"
            >
              Continue to Targets <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}

      {step !== 2 && (
        <Card padding="lg" className="text-center py-16 text-ink-400 text-sm">
          Step {step} placeholder — wire up after KPI selection is reviewed by the team.
        </Card>
      )}

      <TourTrigger />
    </div>
  );
}

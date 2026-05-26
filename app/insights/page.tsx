'use client';

import { useMemo, useState } from 'react';
import FutureFeatureOverlay from '@/components/FutureFeatureOverlay';
import { PageHeader, SectionLabel } from '@/components/ui';
import PulsePreviewCard from '@/components/insights/PulsePreviewCard';
import TimeBreakdownSection from '@/components/insights/TimeBreakdownSection';
import TourTrigger from '@/components/TourTrigger';
import HelpsAnswerLine from '@/components/framing/HelpsAnswerLine';
import { PAGE_PRIMARY_QUESTION } from '@/lib/framing/fiveQuestions';
import {
  applyRoleKpiDefaults,
  createInitialKpiSelections,
  DEFAULT_ROLE_ID,
  formatRoleLabel,
  generatePulsePreview,
  getNorthStarStatement,
  getRoleById,
  kpiMetaLine,
  KPI_CATALOG,
  ROLE_OPTIONS,
} from '@/lib/insights';
import type { InsightsRole } from '@/lib/insights/timeBreakdown';
import type { KpiId, KpiSelection, RoleId } from '@/lib/insights';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';

const WIZARD_STEPS = ['Set up the role', 'Preview & publish'] as const;

function roleIdToTimeBreakdownRole(roleId: RoleId): InsightsRole {
  if (roleId === 'engineering-staff-engineering') return 'engineering';
  if (roleId === 'go-to-market-revenue') return 'go-to-market';
  return 'customer-success';
}

function parsePrimaryShareNorthStar(selections: KpiSelection[]): number | undefined {
  const primary = selections.find((s) => s.id === 'primary' && s.selected);
  if (!primary) return undefined;
  const match = primary.target.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : undefined;
}

export default function InsightsPage() {
  const [step, setStep] = useState(1);
  const [roleId, setRoleId] = useState<RoleId>(DEFAULT_ROLE_ID);
  const [selections, setSelections] = useState<KpiSelection[]>(() =>
    createInitialKpiSelections(DEFAULT_ROLE_ID)
  );

  const role = getRoleById(roleId);
  const roleLabel = formatRoleLabel(role);
  const timeBreakdownRole = roleIdToTimeBreakdownRole(roleId);

  const selectionById = useMemo(
    () => new Map(selections.map((s) => [s.id, s])),
    [selections]
  );

  const selected = selections.filter((s) => s.selected);
  const selectedCount = selected.length;
  const selectedKpiIds = selected.map((s) => s.id);
  const targets = useMemo(
    () =>
      Object.fromEntries(selections.map((s) => [s.id, s.target])) as Partial<
        Record<KpiId, string>
      >,
    [selections]
  );

  const pulsePreview = useMemo(
    () =>
      generatePulsePreview({
        role,
        selectedKpiIds,
        targets,
      }),
    [role, selectedKpiIds, targets]
  );

  const northStar = getNorthStarStatement(roleId, selectedKpiIds);
  const kpiContext = useMemo(
    () => ({ primaryShareNorthStar: parsePrimaryShareNorthStar(selections) }),
    [selections]
  );

  const handleRoleChange = (id: RoleId) => {
    setRoleId(id);
    setSelections(applyRoleKpiDefaults(id));
  };

  const toggleKpi = (id: KpiId) => {
    setSelections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, selected: !s.selected } : s))
    );
  };

  const setTarget = (id: KpiId, target: string) => {
    setSelections((prev) =>
      prev.map((s) => (s.id === id ? { ...s, target } : s))
    );
  };

  return (
    <div className="max-w-[1240px] mx-auto px-8 py-8">
      <FutureFeatureOverlay className="min-h-[480px]">
      <PageHeader
        kicker="Configuration"
        title="KPIs & North Stars"
        subtitle={
          <>
            Tell Pieces what success looks like for each role. The system learns from your team&apos;s
            patterns and drafts the rest. Every employee sees their own.{' '}
            <HelpsAnswerLine questionId={PAGE_PRIMARY_QUESTION.insights} />
          </>
        }
        meta={
          <div>
            <div className="font-mono text-xs text-ink-400 uppercase tracking-wider">
              Step {step} of {WIZARD_STEPS.length}
            </div>
            <div className="font-display font-bold text-2xl text-ink mt-1">{roleLabel}</div>
          </div>
        }
      />

      <div data-tour="insights-stepper" className="flex border-b border-surface-200 mb-7">
        {WIZARD_STEPS.map((label, i) => {
          const n = i + 1;
          const isActive = n === step;
          const isDone = n < step;
          return (
            <button
              key={label}
              type="button"
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
              {isActive && (
                <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-ink" />
              )}
            </button>
          );
        })}
      </div>

      {step === 1 && (
        <>
          <div className="grid grid-cols-3 gap-3">
            {ROLE_OPTIONS.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleRoleChange(option.id)}
                className={`text-left rounded-card border p-5 transition-colors ${
                  roleId === option.id
                    ? 'border-ink-900 bg-surface-50'
                    : 'border-surface-200 bg-white hover:border-surface-400'
                }`}
              >
                <div className="font-display font-semibold text-[15px] text-ink">
                  {option.department}
                </div>
                <div className="text-[13px] text-ink-500 mt-1">{option.title}</div>
              </button>
            ))}
          </div>

          <SectionLabel note={`Suggestions for ${role.title}`}>
            KPIs · {roleLabel}
          </SectionLabel>
          <div className="grid grid-cols-2 gap-3">
            {KPI_CATALOG.map((kpi) => {
              const sel = selectionById.get(kpi.id)!;
              return (
                <div
                  key={kpi.id}
                  className={`rounded-card border p-5 transition-colors relative ${
                    sel.selected
                      ? 'border-ink-900 bg-surface-50'
                      : 'border-surface-200 bg-white'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleKpi(kpi.id)}
                    className="text-left w-full"
                  >
                    {sel.selected && (
                      <span className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-ink-900 grid place-items-center">
                        <Check className="w-3 h-3 text-white" strokeWidth={3} />
                      </span>
                    )}
                    <div className="font-display font-semibold text-[15px] text-ink mb-1.5 pr-8">
                      {kpi.name}
                    </div>
                    <div className="text-[13px] text-ink-500 leading-relaxed">{kpi.desc}</div>
                    <div className="text-[10px] font-mono text-ink-400 mt-3">
                      {kpiMetaLine(kpi, sel.target)}
                    </div>
                  </button>
                  {sel.selected && (
                    <div
                      className="mt-3 pt-3 border-t border-surface-200 flex items-center justify-between gap-3"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="text-xs text-ink-500">Target</span>
                      <input
                        value={sel.target}
                        onChange={(e) => setTarget(kpi.id, e.target.value)}
                        aria-label={`Target for ${kpi.name}`}
                        className="w-36 rounded-md border border-surface-300 px-2.5 py-1.5 text-sm font-mono text-ink focus:outline-none focus:border-ink-400"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex justify-end mt-7 pt-5 border-t border-surface-200">
            <button
              type="button"
              disabled={selectedCount === 0}
              onClick={() => setStep(2)}
              className="px-4 py-2 rounded-lg bg-ink-900 hover:bg-black disabled:opacity-40 text-white text-sm font-medium flex items-center gap-2"
            >
              Preview & publish <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <PulsePreviewCard preview={pulsePreview} />

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              disabled={selectedCount === 0}
              onClick={() =>
                window.alert(`Published ${selectedCount} KPIs for ${roleLabel}.`)
              }
              className="px-4 py-2 rounded-lg bg-ink-900 hover:bg-black disabled:opacity-40 text-white text-sm font-medium"
            >
              Publish configuration
            </button>
          </div>

          <div className="rounded-card bg-ink-900 border border-ink-700 px-5 py-4 mt-4">
            <div className="text-[10px] font-semibold tracking-[0.1em] text-lime uppercase mb-2">
              North Star
            </div>
            <div className="font-display font-medium text-[15px] text-white leading-snug">
              &quot;{northStar}&quot;
            </div>
          </div>

          <div className="flex justify-start mt-7 pt-5 border-t border-surface-200">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="px-4 py-2 rounded-lg border border-surface-300 bg-white text-sm font-medium text-ink-700 flex items-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back
            </button>
          </div>
        </>
      )}

      <TimeBreakdownSection role={timeBreakdownRole} kpiContext={kpiContext} />

      <TourTrigger />
      </FutureFeatureOverlay>
    </div>
  );
}

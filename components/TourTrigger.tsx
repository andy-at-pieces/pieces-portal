'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { HelpCircle, X } from 'lucide-react';

type Step = {
  page: string;
  selector: string | null;
  title: string;
  text: string;
  label: string;
  dir: 'right' | 'left' | 'top' | 'bottom' | null;
};

const steps: Step[] = [
  {
    page: '/reports/manager',
    selector: null,
    title: 'Welcome to Pieces Enterprise Reporting',
    text: 'A new admin surface inside your portal that rolls up Workstream Activity and Single-Click Summaries into three tiers of reporting. Here is a quick tour, under a minute.',
    label: 'Intro',
    dir: null,
  },
  {
    page: '/reports/manager',
    selector: '[data-tour="manager-metrics"]',
    title: 'Manager headline metrics',
    text: 'Three numbers a manager scans in 10 seconds: team focus, active projects, and AI utilization. Each card drills into the underlying activity.',
    label: 'Manager View',
    dir: 'bottom',
  },
  {
    page: '/reports/manager',
    selector: '[data-tour="manager-signals"]',
    title: 'Signals, not surveillance',
    text: 'The core value prop. Pieces surfaces patterns worth a conversation. A stalled project. Someone stretched thin. Strong cross-project momentum. Every signal is a question, never a verdict.',
    label: 'Signals',
    dir: 'top',
  },
  {
    page: '/reports/individual',
    selector: '[data-tour="standup"]',
    title: 'Single-Click Summaries as the daily hook',
    text: 'The morning standup is auto-generated from LTM-2.7 memory. No prompts. No manual write-up. This drives daily adoption. Quarterly reports drive retention.',
    label: 'Individual View',
    dir: 'bottom',
  },
  {
    page: '/reports/executive',
    selector: '[data-tour="exec-hero"]',
    title: 'Executive view · the one page',
    text: 'Deliberately high-level. No individual names. No app usage. Narrative headline, four metrics, department comparison, AI ROI. The page a CEO takes into a board meeting.',
    label: 'Executive View',
    dir: 'bottom',
  },
  {
    page: '/insights',
    selector: '[data-tour="insights-stepper"]',
    title: 'KPI configuration',
    text: 'Per-role North Stars, drafted by Pieces from role + benchmark data, customizable by managers. Employees always see what they are being measured on.',
    label: 'Insights',
    dir: 'bottom',
  },
  {
    page: '/benchmarks',
    selector: '[data-tour="bench-hero"]',
    title: 'Benchmarks for the renewal conversation',
    text: 'Pre/post telemetry that defends the spend. Built for the CFO, procurement, and the internal champion who has to explain ROI.',
    label: 'Benchmarks',
    dir: 'bottom',
  },
];

export default function TourTrigger() {
  const [active, setActive] = useState(false);
  const [idx, setIdx] = useState(0);
  const [pos, setPos] = useState<{ spotlight: any; card: any } | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const cardRef = useRef<HTMLDivElement>(null);

  // Auto-launch on first visit (only on /reports/manager)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const seen = window.localStorage.getItem('pieces-tour-seen');
    if (!seen && pathname === '/reports/manager') {
      const t = setTimeout(() => {
        setActive(true);
        setIdx(0);
      }, 600);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  const positionStep = useCallback(() => {
    if (!active) return;
    const step = steps[idx];
    if (!step) return;

    if (!step.selector) {
      setPos({
        spotlight: null,
        card: { left: '50%', top: '50%', transform: 'translate(-50%, -50%)' },
      });
      return;
    }

    const el = document.querySelector(step.selector) as HTMLElement | null;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const pad = 8;
    const cardW = 360;
    const cardH = cardRef.current?.offsetHeight ?? 200;
    const gap = 18;

    let cardLeft = 0;
    let cardTop = 0;

    if (step.dir === 'right') {
      cardLeft = r.right + gap;
      cardTop = Math.max(20, r.top);
    } else if (step.dir === 'left') {
      cardLeft = Math.max(20, r.left - cardW - gap);
      cardTop = Math.max(20, r.top);
    } else if (step.dir === 'bottom') {
      cardLeft = Math.max(20, Math.min(window.innerWidth - cardW - 20, r.left));
      cardTop = r.bottom + gap;
    } else if (step.dir === 'top') {
      cardLeft = Math.max(20, Math.min(window.innerWidth - cardW - 20, r.left));
      cardTop = Math.max(20, r.top - cardH - gap);
    }

    setPos({
      spotlight: {
        top: r.top - pad,
        left: r.left - pad,
        width: r.width + pad * 2,
        height: r.height + pad * 2,
      },
      card: { left: cardLeft, top: cardTop },
    });

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [active, idx]);

  useEffect(() => {
    if (!active) return;
    const step = steps[idx];
    if (step.page && step.page !== pathname) {
      router.push(step.page);
      // wait for nav before positioning
      const t = setTimeout(positionStep, 350);
      return () => clearTimeout(t);
    }
    const t = setTimeout(positionStep, 100);
    return () => clearTimeout(t);
  }, [active, idx, pathname, router, positionStep]);

  useEffect(() => {
    if (!active) return;
    const handler = () => positionStep();
    window.addEventListener('resize', handler);
    window.addEventListener('scroll', handler, true);
    return () => {
      window.removeEventListener('resize', handler);
      window.removeEventListener('scroll', handler, true);
    };
  }, [active, positionStep]);

  const close = () => {
    setActive(false);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('pieces-tour-seen', '1');
    }
  };

  const next = () => {
    if (idx >= steps.length - 1) return close();
    setIdx(idx + 1);
  };

  const start = () => {
    setIdx(0);
    setActive(true);
    if (pathname !== '/reports/manager') router.push('/reports/manager');
  };

  return (
    <>
      {/* Floating trigger */}
      <button
        onClick={start}
        className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-white border border-surface-300 shadow-lg text-sm font-medium text-ink-700 hover:border-ink-400 hover:text-ink transition-all flex items-center gap-2"
      >
        <HelpCircle className="w-4 h-4" strokeWidth={1.75} />
        Replay tour
      </button>

      {/* Overlay */}
      {active && (
        <div className="fixed inset-0 z-50 bg-black/55 backdrop-blur-[2px] animate-in fade-in duration-200">
          {/* Spotlight */}
          {pos?.spotlight && (
            <div
              className="absolute rounded-card pointer-events-none transition-all duration-300 ease-out"
              style={{
                ...pos.spotlight,
                boxShadow:
                  '0 0 0 3px #deff83, 0 0 0 9999px rgba(0, 0, 0, 0.55)',
              }}
            />
          )}

          {/* Card */}
          <div
            ref={cardRef}
            className="absolute w-[360px] rounded-card border border-surface-200 bg-white p-5 shadow-2xl transition-all duration-300 ease-out"
            style={pos?.card || {}}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-semibold tracking-[0.1em] text-ink-400 uppercase">
                {steps[idx].label}
                <span className="ml-2 font-mono text-ink-300">
                  {idx + 1} / {steps.length}
                </span>
              </div>
              <button
                onClick={close}
                className="text-ink-300 hover:text-ink-500 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <h4 className="font-display font-semibold text-[16px] text-ink mb-2 tracking-tight">
              {steps[idx].title}
            </h4>
            <p className="text-[13px] text-ink-500 leading-relaxed mb-4">
              {steps[idx].text}
            </p>
            <div className="flex items-center justify-between">
              <button
                onClick={close}
                className="text-xs text-ink-400 hover:text-ink-700 transition-colors"
              >
                Skip tour
              </button>
              <button
                onClick={next}
                className="px-3.5 py-1.5 rounded-md bg-ink-900 hover:bg-black text-white text-xs font-semibold transition-colors"
              >
                {idx === steps.length - 1 ? 'Got it ✓' : idx === 0 ? 'Start →' : 'Next →'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

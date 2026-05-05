'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Download, Calendar } from 'lucide-react';
import TourTrigger from '@/components/TourTrigger';

const tabs = [
  { label: 'Individual', href: '/reports/individual' },
  { label: 'Manager / Team', href: '/reports/manager' },
  { label: 'Executive', href: '/reports/executive' },
];

export default function ReportsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="max-w-[1240px] mx-auto px-8 py-8">
      {/* Tier tabs + period selector */}
      <div className="flex items-end justify-between mb-8 border-b border-surface-200">
        <div className="flex">
          {tabs.map((tab) => {
            const active = pathname === tab.href || (pathname === '/reports' && tab.href === '/reports/manager');
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={`relative px-5 py-3 text-sm font-medium transition-colors ${
                  active
                    ? 'text-ink'
                    : 'text-ink-500 hover:text-ink'
                }`}
              >
                {tab.label}
                {active && (
                  <span className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-ink" />
                )}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2 pb-2">
          <PeriodSelector />
          <button className="px-3 py-1.5 rounded-lg border border-surface-300 bg-white text-sm font-medium text-ink-700 hover:border-ink-400 transition-colors flex items-center gap-2">
            <Download className="w-3.5 h-3.5" strokeWidth={2} />
            Export
          </button>
        </div>
      </div>

      {children}

      <TourTrigger />
    </div>
  );
}

function PeriodSelector() {
  const periods = ['Day', 'Week', 'Month', 'Quarter'];
  return (
    <div className="inline-flex p-0.5 rounded-lg border border-surface-300 bg-white text-sm">
      {periods.map((p) => (
        <button
          key={p}
          className={`px-3 py-1 rounded-md text-xs font-medium transition-colors ${
            p === 'Month'
              ? 'bg-surface-100 text-ink'
              : 'text-ink-500 hover:text-ink'
          }`}
        >
          {p}
        </button>
      ))}
    </div>
  );
}

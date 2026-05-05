'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Users,
  Cpu,
  Database,
  CreditCard,
  Settings,
  ScrollText,
  Activity,
  HelpCircle,
  ChevronDown,
  Bell,
  LogOut,
  BarChart3,
  Lightbulb,
  Target,
} from 'lucide-react';

const navSections = [
  {
    items: [
      { label: 'Home', href: '/', icon: Home, active: false },
      { label: 'Members', href: '/members', icon: Users, active: false },
      { label: 'Models', href: '/models', icon: Cpu, active: false },
      { label: 'Long Term Memory', href: '/ltm', icon: Database, active: false },
      { label: 'Billing', href: '/billing', icon: CreditCard, active: false },
      { label: 'Settings', href: '/settings', icon: Settings, active: false },
      { label: 'Audit Log', href: '/audit', icon: ScrollText, active: false },
      { label: 'My activity', href: '/my-activity', icon: Activity, active: false },
    ],
  },
  {
    label: 'REPORTING',
    items: [
      { label: 'Reports', href: '/reports', icon: BarChart3, active: false },
      { label: 'Insights', href: '/insights', icon: Lightbulb, active: false },
      { label: 'Benchmarks', href: '/benchmarks', icon: Target, active: false },
    ],
  },
  {
    items: [
      { label: 'Support', href: '/support', icon: HelpCircle, active: false },
    ],
  },
];

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen flex bg-white">
      {/* Sidebar */}
      <aside className="w-[260px] flex flex-col border-r border-surface-200 bg-surface-50 sticky top-0 h-screen">
        {/* Org switcher */}
        <div className="px-4 pt-4 pb-3 border-b border-surface-200">
          <button className="w-full flex items-center gap-3 px-2 py-2 hover:bg-white rounded-lg transition-colors">
            <div className="w-9 h-9 rounded-md bg-ink-900 text-white flex items-center justify-center font-display font-bold text-sm">
              T
            </div>
            <div className="flex-1 text-left min-w-0">
              <div className="text-sm font-semibold text-ink truncate">Test org (Andy&apos;s)</div>
              <div className="text-xs text-ink-400">Enterprise</div>
            </div>
            <ChevronDown className="w-4 h-4 text-ink-400 flex-shrink-0" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-3 overflow-y-auto">
          {navSections.map((section, idx) => (
            <div key={idx} className={idx > 0 ? 'mt-5' : ''}>
              {section.label && (
                <div className="px-3 pb-2 text-[10px] font-semibold tracking-[0.08em] text-ink-400">
                  {section.label}
                </div>
              )}
              {section.items.map((item) => {
                const Icon = item.icon;
                const active =
                  pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? 'bg-white text-ink shadow-[0_0_0_1px_rgba(0,0,0,0.06)]'
                        : 'text-ink-500 hover:bg-white hover:text-ink'
                    }`}
                  >
                    <Icon className="w-[18px] h-[18px]" strokeWidth={1.75} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Sign out */}
        <div className="px-3 py-3 border-t border-surface-200">
          <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-ink-500 hover:bg-white hover:text-ink transition-colors">
            <LogOut className="w-[18px] h-[18px]" strokeWidth={1.75} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-[68px] flex items-center justify-between px-8 border-b border-surface-200 bg-white sticky top-0 z-20">
          <PageTitle pathname={pathname} />
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-surface-100 transition-colors">
              <Bell className="w-5 h-5 text-ink-500" strokeWidth={1.75} />
              <span className="absolute -top-0.5 -right-0.5 min-w-[20px] h-[20px] rounded-full bg-accent-red text-white text-[10px] font-semibold flex items-center justify-center px-1">
                24
              </span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-white">
          {children}
        </main>
      </div>
    </div>
  );
}

function PageTitle({ pathname }: { pathname: string }) {
  const titleMap: Record<string, string> = {
    '/': 'Home',
    '/reports': 'Reports',
    '/reports/manager': 'Reports',
    '/reports/individual': 'Reports',
    '/reports/executive': 'Reports',
    '/insights': 'Insights',
    '/benchmarks': 'Benchmarks',
  };
  const title = titleMap[pathname] || pathname.split('/').filter(Boolean)[0]?.replace(/^\w/, c => c.toUpperCase()) || 'Home';
  return <h1 className="text-2xl font-bold text-ink tracking-tight">{title}</h1>;
}

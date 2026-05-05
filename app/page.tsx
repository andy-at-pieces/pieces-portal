import Link from 'next/link';
import {
  Monitor,
  Download,
  ExternalLink,
  Users,
  Cpu,
  CreditCard,
  ScrollText,
  BarChart3,
  Lightbulb,
  Target,
  Info,
} from 'lucide-react';

const manageItems = [
  {
    icon: Users,
    title: 'Members & invites',
    desc: 'Invite & manage roles',
    href: '/members',
  },
  {
    icon: Cpu,
    title: 'Models and credentials',
    desc: 'API keys, providers & model access',
    href: '/models',
  },
  {
    icon: CreditCard,
    title: 'Billing',
    desc: 'Plans & payment',
    href: '/billing',
  },
  {
    icon: ScrollText,
    title: 'Activity',
    desc: 'Org-wide audit log',
    href: '/audit',
  },
];

const reportingItems = [
  {
    icon: BarChart3,
    title: 'Reports',
    desc: 'Individual, manager, and executive reporting',
    href: '/reports',
    badge: 'New',
  },
  {
    icon: Lightbulb,
    title: 'Insights',
    desc: 'KPI configuration and team North Stars',
    href: '/insights',
    badge: 'New',
  },
  {
    icon: Target,
    title: 'Benchmarks',
    desc: 'Pre/post telemetry for the ROI conversation',
    href: '/benchmarks',
    badge: 'New',
  },
];

export default function HomePage() {
  return (
    <div className="max-w-[1100px] mx-auto px-8 py-8">
      {/* SETUP section */}
      <SectionLabel>Setup</SectionLabel>
      <div className="rounded-card border border-surface-200 bg-surface-50/40 p-6 mb-10">
        <div className="flex items-center gap-2 mb-2">
          <Monitor className="w-5 h-5 text-ink-700" strokeWidth={1.75} />
          <h2 className="text-lg font-semibold text-ink">Get up and running with Pieces</h2>
        </div>
        <p className="text-sm text-ink-500 mb-4">
          PiecesOS runs in the background; the desktop app is where you browse and act on your memories.
        </p>

        <div className="rounded-lg bg-accent-blueSoft border border-accent-blue/20 px-4 py-3 mb-4 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-accent-blue mt-0.5 flex-shrink-0" strokeWidth={2} />
          <p className="text-sm text-ink-700">
            Sign in with <span className="font-semibold">andy@pieces.app</span> in Desktop &amp; PiecesOS to stay in sync.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button className="bg-ink-900 hover:bg-black text-white px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <ExternalLink className="w-4 h-4" strokeWidth={2} />
            Open Pieces Desktop
          </button>
          <span className="text-sm text-ink-400">or</span>
          <button className="bg-white border border-surface-300 hover:border-ink-400 text-ink px-4 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
            <Download className="w-4 h-4" strokeWidth={2} />
            Download for Windows
          </button>
        </div>

        <div className="mt-5 text-xs text-ink-400">
          Other platforms: Mac · Linux
        </div>
      </div>

      {/* MANAGE section */}
      <SectionLabel>Manage</SectionLabel>
      <div className="space-y-2 mb-10">
        {manageItems.map((item) => (
          <ManageRow key={item.href} {...item} />
        ))}
      </div>

      {/* REPORTING section (new) */}
      <SectionLabel>Reporting</SectionLabel>
      <div className="space-y-2 mb-10">
        {reportingItems.map((item) => (
          <ManageRow key={item.href} {...item} />
        ))}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[11px] font-semibold tracking-[0.1em] text-ink-400 uppercase mb-3">
      {children}
    </div>
  );
}

function ManageRow({
  icon: Icon,
  title,
  desc,
  href,
  badge,
}: {
  icon: any;
  title: string;
  desc: string;
  href: string;
  badge?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center gap-4 px-5 py-4 rounded-card border border-surface-200 bg-white hover:bg-surface-50 hover:border-surface-300 transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-surface-100 flex items-center justify-center flex-shrink-0">
        <Icon className="w-[18px] h-[18px] text-ink-700" strokeWidth={1.75} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-[15px] font-semibold text-ink">{title}</span>
          {badge && (
            <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-lime text-limeDark tracking-wide uppercase">
              {badge}
            </span>
          )}
        </div>
        <div className="text-sm text-ink-500 mt-0.5">{desc}</div>
      </div>
      <ExternalLink className="w-4 h-4 text-ink-300 group-hover:text-ink-500 transition-colors" strokeWidth={1.75} />
    </Link>
  );
}

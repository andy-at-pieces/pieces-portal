import { Sparkles, Clock } from 'lucide-react';
import type { PulsePreview } from '@/lib/insights';

export default function PulsePreviewCard({ preview }: { preview: PulsePreview }) {
  return (
    <div className="rounded-card border border-surface-200 bg-white p-7 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-lime" />

      <div className="flex items-center gap-3 mb-4">
        <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-lime/30 text-limeDark text-[10px] font-semibold tracking-wider uppercase">
          <Sparkles className="w-3 h-3" strokeWidth={2.5} />
          Weekly Pulse · Preview
        </div>
        <div className="flex items-center gap-1.5 text-xs text-ink-400 font-mono">
          <Clock className="w-3 h-3" strokeWidth={2} />
          Sample from configured KPIs
        </div>
      </div>

      <h2 className="font-display font-semibold text-[22px] text-ink leading-snug tracking-tight max-w-[760px] mb-4">
        {preview.headline}
      </h2>

      <div className="text-sm text-ink-500 leading-relaxed max-w-[780px] space-y-3">
        {preview.narrative.map((paragraph, i) => (
          <p key={i} dangerouslySetInnerHTML={{ __html: paragraph }} />
        ))}
      </div>

      <div className="flex gap-1.5 mt-5 flex-wrap">
        {preview.tags.map((tag, i) => (
          <Chip key={tag} lime={i === 0}>
            {tag}
          </Chip>
        ))}
      </div>
    </div>
  );
}

function Chip({ children, lime }: { children: React.ReactNode; lime?: boolean }) {
  return (
    <span
      className={`px-2 py-1 rounded text-[10px] font-mono font-medium ${
        lime
          ? 'bg-lime/40 text-limeDark border border-lime'
          : 'bg-surface-100 text-ink-700 border border-surface-200'
      }`}
    >
      {children}
    </span>
  );
}

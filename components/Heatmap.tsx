const projects = [
  { name: 'Enterprise Reporting', levels: [3, 4, 3, 4, 4, 2, 0, 4, 4, 3, 4, 4, 3, 2] },
  { name: 'Team User Service', levels: [2, 3, 2, 3, 4, 1, 0, 3, 4, 3, 3, 4, 4, 3] },
  { name: 'Domain Capture', levels: [1, 2, 2, 3, 3, 1, 0, 2, 2, 3, 3, 3, 2, 1] },
  { name: 'Server Pipelines', levels: [0, 1, 1, 2, 2, 1, 0, 2, 2, 2, 3, 3, 3, 2] },
  { name: 'Audit Logs', levels: [2, 3, 2, 2, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0] },
  { name: 'Copilot · Reports', levels: [1, 2, 2, 2, 3, 2, 0, 3, 3, 3, 4, 3, 4, 3] },
  { name: 'Auth Refactor', levels: [3, 3, 2, 2, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0] },
];

const levelClasses: Record<number, string> = {
  0: 'bg-surface-100',
  1: 'bg-ink-700/15',
  2: 'bg-ink-700/35',
  3: 'bg-ink-700/60',
  4: 'bg-ink-700',
};

export default function Heatmap() {
  return (
    <div>
      <div className="grid grid-cols-[170px_repeat(14,1fr)] gap-[3px] items-center">
        {projects.map((p) => (
          <ProjectRow key={p.name} name={p.name} levels={p.levels} />
        ))}
      </div>
      <div className="grid grid-cols-[170px_repeat(14,1fr)] gap-[3px] mt-2">
        <div />
        <div className="col-span-14 flex justify-between text-[10px] font-mono text-ink-400">
          <span>Apr 9</span>
          <span>Apr 15</span>
          <span>Apr 22</span>
        </div>
      </div>
    </div>
  );
}

function ProjectRow({ name, levels }: { name: string; levels: number[] }) {
  return (
    <>
      <div className="text-sm font-medium text-ink-700 pr-2">{name}</div>
      {levels.map((l, i) => (
        <div
          key={i}
          className={`aspect-square rounded-[3px] ${levelClasses[l]} hover:scale-125 transition-transform cursor-pointer`}
          title={`${name} · level ${l}`}
        />
      ))}
    </>
  );
}

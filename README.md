# Pieces for Enterprise · Reporting Prototype

A Next.js prototype that slots **Reports**, **Insights**, and **Benchmarks** into the existing Pieces enterprise portal at `portal.pieces.app`.

Built on the architecture decisions from the April 22 meeting:
- Templated reports routed through the **Team User Service** (not real-time peer-to-peer)
- Three reporting tiers: **Individual / Manager / Executive**
- KPI configuration per role (the Tsavo / Gavin North Star pattern)
- Pre/post benchmarking for the enterprise sale

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The first-run coachmark tour auto-launches when you land on `/reports/manager`. To replay, click the floating "Replay tour" button. To reset state, clear the `pieces-tour-seen` key from localStorage.

## Deploy to Vercel

```bash
npx vercel
```

Or connect this repo to a Vercel project — no environment variables required.

## Structure

```
app/
  page.tsx                      # Portal home (matches current portal.pieces.app)
  reports/
    layout.tsx                  # Tier tabs + period selector
    page.tsx                    # Redirects to /reports/manager
    individual/page.tsx         # Individual view + auto-standup
    manager/page.tsx            # Manager view + signals + heatmap
    executive/page.tsx          # Executive one-pager
  insights/page.tsx             # KPI configuration flow
  benchmarks/page.tsx           # Pre/post benchmarking
  layout.tsx                    # Root layout (loads fonts, mounts Shell)
  globals.css

components/
  Shell.tsx                     # Sidebar + topbar + org switcher
  ui.tsx                        # PageHeader, SectionLabel, Card, MetricCard
  StandupCard.tsx               # Auto-generated standup (lime accent)
  TimeAllocation.tsx            # Time-by-project bar list
  SignalsList.tsx               # Manager signals
  Heatmap.tsx                   # 14-day project activity grid
  TeamTable.tsx                 # Direct reports table
  ExecHero.tsx                  # Dark exec brief card with lime accent
  DepartmentList.tsx            # Focus / fragmentation comparison
  AIAdoption.tsx                # AI tool adoption tiles
  TourTrigger.tsx               # First-run coachmark tour
```

## Brand notes

- Light theme matching `portal.pieces.app` (white background, light gray sidebar)
- Black primary buttons, surface-100 secondary
- **Electric Lime `#DEFF83`** is reserved for: the standup top rail, the New badge on home, exec hero accents, the lime KPI selection ring, and the after-state on the benchmark hero
- DM Sans for display, Inter for body, DM Mono for data
- No em dashes (per Pieces brand)

## Notes for the team picking this up

1. Names in the team table are real Pieces teammates. Swap before any external share.
2. The KPI flow only wires up step 2 (Select KPIs). Steps 1, 3, 4 are placeholders.
3. The signals, metrics, and benchmark numbers are illustrative. Replace with real data when the Team User Service pipeline is ready.
4. The Pieces "P" mark in `Shell.tsx` is currently a text placeholder. Drop in the official SVG.
5. Sidebar shows `Members`, `Models`, `LTM`, `Billing`, etc. as inert links so the team can see how the new sections sit alongside existing portal IA.

## Architecture grounding

Per the meeting:
- `LTM-2.7` captures workflow context on-device
- `PiecesOS` runs the background service
- The **Team User Service** is the architectural hub for enterprise reporting (standups + summaries)
- Data centralization is the prerequisite for everything else (Ali's track)
- Pipelines are migrating from client SDK to server-side (Musa's track)
- Domain capture gates enterprise tenant setup (Brian's track)

export type SOPStep = {
  number: string;
  title: string;
  description: string;
  estimatedTime: string;
  toolsObserved: string[];
};

export type SOP = {
  id: string;
  title: string;
  project: string;
  description: string;
  stepCount: number;
  estimatedTotal: string;
  lastUpdated: string;
  isOpen: boolean;
  steps: SOPStep[];
};

export const MOCK_SOPS: SOP[] = [
  {
    id: 'quarterly-report-assembly',
    title: 'Quarterly Report Assembly',
    project: 'Enterprise Reporting',
    description:
      'How Andy prepares and delivers quarterly progress reports from Jira data, organizational memory, and stakeholder input.',
    stepCount: 6,
    estimatedTotal: '~2h 15m',
    lastUpdated: 'Apr 22',
    isOpen: true,
    steps: [
      {
        number: '01',
        title: 'Pull Jira project data',
        description:
          'Pieces detects this step begins with a Jira filter query scoped to the active quarter. Andy exports an open-item and closed-item list, then pastes both into a working Notion doc titled with the quarter. Standard starting point before any drafting begins.',
        estimatedTime: '~15 min',
        toolsObserved: ['Jira', 'Notion'],
      },
      {
        number: '02',
        title: 'Query organizational memory for context',
        description:
          'Using the Pieces copilot, Andy queries long-term memory for relevant decisions, call summaries, and stakeholder notes from the quarter. Typical query: "What did we decide about [project] in Q1?" Output is a bullet list of recalled context pasted below the Jira export.',
        estimatedTime: '~20 min',
        toolsObserved: ['Pieces', 'Copilot'],
      },
      {
        number: '03',
        title: 'Draft the narrative section',
        description:
          'Opens the Notion doc and writes a 2-3 paragraph narrative summarizing what shipped, what stalled, and why. Pieces observes this block as 25-40 minutes of uninterrupted Notion focus. The draft references the recalled memory from Step 2 directly.',
        estimatedTime: '~35 min',
        toolsObserved: ['Notion'],
      },
      {
        number: '04',
        title: 'Align with stakeholders via async review',
        description:
          'Shares the draft doc in Slack with Tsavo Knott and Mack Myers for async comments. Pieces captures the Slack share event and subsequent incoming edits over the following 24 hours. Andy typically returns once for a single review pass.',
        estimatedTime: '~20 min',
        toolsObserved: ['Slack', 'Notion'],
      },
      {
        number: '05',
        title: 'Incorporate feedback and finalize',
        description:
          'Second Notion session integrating stakeholder comments. Pieces observes 2-3 rounds of tracked changes resolved in under 30 minutes. Output is a final locked doc.',
        estimatedTime: '~25 min',
        toolsObserved: ['Notion'],
      },
      {
        number: '06',
        title: 'Export and distribute',
        description:
          'Final doc exported to PDF or pasted into the client-facing format (slide or email). Distributed via Gmail to the primary stakeholder list. Pieces captures the Gmail send event as the close of this SOP pattern.',
        estimatedTime: '~10 min',
        toolsObserved: ['Notion', 'Gmail'],
      },
    ],
  },
  {
    id: 'engineering-sync-prep',
    title: 'Engineering Sync Prep',
    project: 'Team User Service',
    description:
      'How Andy prepares for team engineering standups and stakeholder syncs — gathering context, open threads, and blockers before joining Google Meet.',
    stepCount: 4,
    estimatedTotal: '~35 min',
    lastUpdated: 'Apr 18',
    isOpen: false,
    steps: [],
  },
  {
    id: 'new-hire-context-handoff',
    title: 'New Hire Context Handoff',
    project: 'Reports Onboarding',
    description:
      'The observed pattern for onboarding new contributors — surfacing relevant Workstream Activity, sharing project context, and scheduling the first sync.',
    stepCount: 5,
    estimatedTotal: '~1h 10m',
    lastUpdated: 'Apr 15',
    isOpen: false,
    steps: [],
  },
  {
    id: 'domain-capture-review',
    title: 'Domain Capture Review Cycle',
    project: 'Domain Capture',
    description:
      "How Brian Powell's domain capture issue reviews are conducted — including the lookup pattern, cross-referencing tenant setup docs, and flagging blockers.",
    stepCount: 4,
    estimatedTotal: '~45 min',
    lastUpdated: 'Apr 9',
    isOpen: false,
    steps: [],
  },
];

export function getMockSops(): SOP[] {
  return MOCK_SOPS;
}

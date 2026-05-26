'use client';

import { useState } from 'react';
import { Card, SectionLabel } from '@/components/ui';
import SOPCard from '@/components/reports/SOPCard';
import SOPDrawer from '@/components/reports/SOPDrawer';
import { getMockSops, type SOP } from '@/lib/reports/sopData';

export default function SOPSection() {
  const sops = getMockSops();
  const [activeSop, setActiveSop] = useState<SOP | null>(null);

  const handleOpen = (sop: SOP) => {
    if (sop.isOpen) setActiveSop(sop);
  };

  return (
    <>
      <SectionLabel note="Observed from Workstream Activity">
        Standard Operating Procedures · How this person works
      </SectionLabel>
      <p className="text-xs text-ink-500 -mt-2 mb-3 leading-relaxed">
        Auto-generated from Workstream Activity. Updated when Pieces detects a change in pattern.
      </p>
      <Card padding="none" className="overflow-hidden border border-surface-200">
        {sops.map((sop) => (
          <SOPCard key={sop.id} sop={sop} onOpen={handleOpen} />
        ))}
      </Card>
      <SOPDrawer sop={activeSop} onClose={() => setActiveSop(null)} />
    </>
  );
}

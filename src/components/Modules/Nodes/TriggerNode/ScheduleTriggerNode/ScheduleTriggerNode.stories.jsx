import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import FlowNode from '../../../../FlowNode/FlowNode';
import TriggerConfigPanel from '../../../../RHSDrawer/TriggerConfigPanel';

export default {
  title: 'Agent Builder/Modules/Nodes/TriggerNode/ScheduleTriggerNode',
  parameters: { layout: 'centered' },
};

export const LHSPreview = {
  render: () => (
    <div className="lhs-drawer" style={{ padding: '12px 24px' }}>
      <CardRow label="Schedule-based" icon="schedule" action="drag" />
    </div>
  ),
};

export const CanvasPreview = {
  render: () => (
    <FlowNode
      type="trigger"
      title="Trigger"
      stepNumber={1}
      description="When a new review is received or updated"
      subtitle="Schedule-based: Run every Monday at 9am"
      hasToggle
      toggleEnabled
      onToggle={() => {}}
      onMoreClick={() => {}}
      onAddClick={() => {}}
      onDelete={() => {}}
    />
  ),
};

export const RHSPreview = {
  render: () => (
    <TriggerConfigPanel
      triggerName="Schedule-based"
      description="Schedule-based"
    />
  ),
};

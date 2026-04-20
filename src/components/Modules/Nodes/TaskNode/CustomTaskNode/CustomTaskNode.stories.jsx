import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import FlowNode from '../../../../FlowNode/FlowNode';
import CustomTaskPanel from '../../../../RHSDrawer/CustomTaskPanel';

export default {
  title: 'Agent Builder/Modules/Nodes/TaskNode/CustomTaskNode',
  parameters: { layout: 'centered' },
};

export const LHSPreview = {
  render: () => (
    <div className="lhs-drawer" style={{ padding: '12px 24px' }}>
      <CardRow label="Custom" icon="dashboard_customize" action="drag" />
    </div>
  ),
};

export const CanvasPreview = {
  render: () => (
    <FlowNode
      type="task"
      title="Task"
      stepNumber={2}
      description="Identify relevant mentions in the review"
      subtitle="Custom: Custom AI task"
      hasAiIcon
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
    <div style={{ height: 700 }}>
      <CustomTaskPanel
        taskName="Identify relevant mentions in the review"
        description="Extract product or service-specific feedback from the review"
      />
    </div>
  ),
};

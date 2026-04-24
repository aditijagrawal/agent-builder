import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import CanvasCard from '../../../../Molecules/Canvas/CanvasCard/CanvasCard';
import ConfigModal from '../../../ExpandedConfigModal/ConfigModal/ConfigModal';


export default {
  title: 'Agent Builder/Modules/Nodes/Task/CustomTask',
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
    <CanvasCard
      nodeType="task"
      label="Task"
      hasAiIcon
      hasToggle
      toggleEnabled
      stepNumber={2}
      title="Identify relevant mentions in the review"
      description="LLM: Extract product or service-specific feedback from the review"
    />
  ),
};

export const ExpandedRHS = {
  render: () => <ConfigModal />,
};

export const RHSPreview = {
  render: () => null,
};

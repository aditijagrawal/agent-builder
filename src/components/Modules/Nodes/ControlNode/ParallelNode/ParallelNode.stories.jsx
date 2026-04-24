import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import CanvasCard from '../../../../Molecules/Canvas/CanvasCard/CanvasCard';
import ConfigModal from '../../../ExpandedConfigModal/ConfigModal/ConfigModal';

export default {
  title: 'Agent Builder/Modules/Nodes/Control/Parallel',
  parameters: { layout: 'centered' },
};


export const LHSPreview = {
  render: () => (
    <div className="lhs-drawer" style={{ padding: '12px 24px' }}>
      <CardRow label="Parallel tasks" icon="splitscreen_add" action="drag" />
    </div>
  ),
};

export const CanvasPreview = {
  render: () => (
    <CanvasCard
      nodeType="parallel"
      label="Parallel tasks"
      hasToggle
      toggleEnabled
      hasAddButton
      stepNumber={3}
      title="Run tasks simultaneously"
      description="Execute multiple branches in parallel"
    />
  ),
};

export const ExpandedRHS = {
  render: () => <ConfigModal />,
};

export const RHSPreview = {
  render: () => null,
};

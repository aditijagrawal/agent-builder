import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import CanvasCard from '../../../../Molecules/Canvas/CanvasCard/CanvasCard';
import ConfigModal from '../../../ExpandedConfigModal/ConfigModal/ConfigModal';

export default {
  title: 'Agent Builder/Modules/Nodes/Control/Loop',
  parameters: { layout: 'centered' },
};


export const LHSPreview = {
  render: () => (
    <div className="lhs-drawer" style={{ padding: '12px 24px' }}>
      <CardRow label="Loop" icon="repeat" action="drag" />
    </div>
  ),
};

export const CanvasPreview = {
  render: () => (
    <CanvasCard
      nodeType="loop"
      label="Loop"
      hasToggle
      toggleEnabled
      stepNumber={4}
      title="Repeat until condition is met"
      description="Iterate over a set of steps until the exit condition is true"
    />
  ),
};

export const ExpandedRHS = {
  render: () => <ConfigModal />,
};

export const RHSPreview = {
  render: () => null,
};

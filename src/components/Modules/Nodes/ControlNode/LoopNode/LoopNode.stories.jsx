import React, { useState } from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import CanvasNodeHeader from '../../../../Molecules/CanvasNodeHeader/CanvasNodeHeader';
import CanvasNodeBody from '../../../../Molecules/CanvasNodeBody/CanvasNodeBody';
import ConfigModal from '../../../ExpandedConfigModal/ConfigModal/ConfigModal';

export default {
  title: 'Agent Builder/Modules/Nodes/ControlNode/LoopNode',
  parameters: { layout: 'centered' },
};

const cardStyle = {
  width: 400,
  padding: 20,
  background: '#fff',
  borderRadius: 8,
  boxShadow: '0 2px 12px rgba(33,33,33,0.06)',
  display: 'flex',
  flexDirection: 'column',
  gap: 20,
};

export const LHSPreview = {
  render: () => (
    <div className="lhs-drawer" style={{ padding: '12px 24px' }}>
      <CardRow label="Loop" icon="repeat" action="drag" />
    </div>
  ),
};

export const CanvasPreview = {
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <div style={cardStyle}>
        <CanvasNodeHeader
          nodeType="loop"
          label="Loop"
          hasToggle
          toggleEnabled={on}
          onToggleChange={setOn}
          onDelete={() => {}}
        />
        <CanvasNodeBody
          nodeType="loop"
          stepNumber={4}
          title="Repeat until condition is met"
          description="Iterate over a set of steps until the exit condition is true"
        />
      </div>
    );
  },
};

export const ExpandedRHS = {
  render: () => <ConfigModal />,
};

export const RHSPreview = {
  render: () => (
    <div style={{ padding: 24, color: '#9e9e9e', fontFamily: 'sans-serif', fontSize: 14 }}>
      LoopNode RHS Preview — not yet implemented
    </div>
  ),
};

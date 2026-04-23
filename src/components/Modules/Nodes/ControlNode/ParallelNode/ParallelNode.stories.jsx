import React, { useState } from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import CanvasNodeHeader from '../../../../Molecules/CanvasNodeHeader/CanvasNodeHeader';
import CanvasNodeBody from '../../../../Molecules/CanvasNodeBody/CanvasNodeBody';
import ConfigModal from '../../../ExpandedConfigModal/ConfigModal/ConfigModal';

export default {
  title: 'Agent Builder/Modules/Nodes/ControlNode/ParallelNode',
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
      <CardRow label="Parallel tasks" icon="splitscreen_add" action="drag" />
    </div>
  ),
};

export const CanvasPreview = {
  render: () => {
    const [on, setOn] = useState(true);
    return (
      <div style={cardStyle}>
        <CanvasNodeHeader
          nodeType="parallel"
          label="Parallel tasks"
          hasToggle
          toggleEnabled={on}
          onToggleChange={setOn}
          hasAddButton
          onAddClick={() => {}}
          onDelete={() => {}}
        />
        <CanvasNodeBody
          nodeType="parallel"
          stepNumber={3}
          title="Run tasks simultaneously"
          description="Execute multiple branches in parallel"
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
      ParallelNode RHS Preview — not yet implemented
    </div>
  ),
};

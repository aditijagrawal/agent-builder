import React from 'react';
import StartNode from '../../../Molecules/Canvas/StartNode/StartNode';
import ConfigModal from '../../ExpandedConfigModal/ConfigModal/ConfigModal';
import RHS from '../../../Organisms/Panels/RHS/RHS';

export default {
  title: 'Agent Builder/Modules/Nodes/Start',
  parameters: { layout: 'centered' },
};

export const LHSPreview = {
  render: () => (
    <div style={{ padding: 24, color: '#9e9e9e', fontFamily: 'sans-serif', fontSize: 14 }}>
      AgentDetailsNode LHS Preview — not yet implemented
    </div>
  ),
};

export const CanvasPreview = {
  render: () => (
    <StartNode
      title="Review response agent replying autonomously"
      subtitle="All locations"
    />
  ),
};

export const ExpandedRHS = {
  render: () => <ConfigModal />,
};

export const RHSPreview = {
  render: () => (
    <div style={{ width: 390, height: '100vh' }}>
      <RHS variant="agentDetails" title="Agent details" onClose={() => {}} onSave={() => {}} />
    </div>
  ),
};

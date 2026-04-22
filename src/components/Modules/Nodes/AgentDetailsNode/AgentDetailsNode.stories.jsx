import React from 'react';
import StartNode from '../../../StartNode/StartNode';
import RHSSidePanel from '../../../Organisms/Panels/RHSSidePanel/RHSSidePanel';
import ConfigModal from '../../ExpandedConfigModal/ConfigModal/ConfigModal';

export default {
  title: 'Agent Builder/Modules/Nodes/AgentDetailsNode',
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
    <RHSSidePanel variant="agentDetails" onClose={() => {}} onSave={() => {}} />
  ),
};

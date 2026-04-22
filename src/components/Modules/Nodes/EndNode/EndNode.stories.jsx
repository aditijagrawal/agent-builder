import React from 'react';
import FlowNode from '../../../FlowNode/FlowNode';
import ConfigModal from '../../ExpandedConfigModal/ConfigModal/ConfigModal';

export default {
  title: 'Agent Builder/Modules/Nodes/EndNode',
  parameters: { layout: 'centered' },
};

export const LHSPreview = {
  render: () => (
    <div style={{ padding: 24, color: '#9e9e9e', fontFamily: 'sans-serif', fontSize: 14 }}>
      EndNode LHS Preview — not yet implemented
    </div>
  ),
};

export const CanvasPreview = {
  render: () => <FlowNode type="end" />,
};

export const ExpandedRHS = {
  render: () => <ConfigModal />,
};

export const RHSPreview = {
  render: () => (
    <div style={{ padding: 24, color: '#9e9e9e', fontFamily: 'sans-serif', fontSize: 14 }}>
      EndNode has no RHS configuration
    </div>
  ),
};

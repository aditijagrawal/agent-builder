import React from 'react';
import StartNode from '../../../StartNode/StartNode';
import RHSDrawer from '../../../RHSDrawer/RHSDrawer';

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

export const RHSPreview = {
  render: () => (
    <RHSDrawer
      agentName="Review response agent 1"
      goals="Respond to customer reviews promptly and professionally."
      outcomes="Improved customer satisfaction scores."
      locations={[
        { id: '1001', name: 'Mountain view, CA' },
        { id: '1002', name: 'Seattle, WA' },
        { id: '1004', name: 'Chicago, IL' },
      ]}
      moreLocationsCount={100}
    />
  ),
};

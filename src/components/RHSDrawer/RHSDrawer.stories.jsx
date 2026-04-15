import React, { useState } from 'react';
import RHSDrawer from './RHSDrawer';
import TriggerConfigPanel from './TriggerConfigPanel';
import CustomTaskPanel from './CustomTaskPanel';
import BranchConfigPanel from './BranchConfigPanel';

export default {
  title: 'Agent Builder/Modules/RHSPanel',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

/* ─── Shared helpers ─── */

function StoryStage({ children, width = 1160, height = 760 }) {
  return (
    <div style={{ position: 'relative', width, height }}>
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0 }}>{children}</div>
    </div>
  );
}

/* ─── Agent Details Panel ─── */

function AgentDetailsStory(args) {
  const [state, setState] = useState({ ...args });
  return (
    <StoryStage>
      <RHSDrawer
        {...state}
        onChange={(field, value) => setState((prev) => ({ ...prev, [field]: value }))}
      />
    </StoryStage>
  );
}

export const AgentDetailsEmpty = {
  name: 'AgentDetails — Empty',
  render: (args) => <AgentDetailsStory {...args} />,
  args: {
    agentName: '',
    goals: '',
    outcomes: '',
    locations: [],
    moreLocationsCount: 0,
  },
};

export const AgentDetailsFilled = {
  name: 'AgentDetails — Filled',
  render: (args) => <AgentDetailsStory {...args} />,
  args: {
    agentName: 'Review response agent 1',
    goals: 'Respond to customer reviews promptly and professionally, maintaining brand voice and addressing specific customer feedback.',
    outcomes: 'Improved customer satisfaction scores, faster response times, and consistent brand messaging across all review platforms.',
    locations: [
      { id: '1001', name: 'Mountain view, CA' },
      { id: '1002', name: 'Seattle, WA' },
      { id: '1004', name: 'Chicago, IL' },
    ],
    moreLocationsCount: 1,
  },
};

/* ─── Trigger Config Panel ─── */

function TriggerStory(args) {
  const [state, setState] = useState({ ...args });
  const [isExpanded, setIsExpanded] = useState(Boolean(args.isExpandedView));
  return (
    <StoryStage>
      <TriggerConfigPanel
        {...state}
        isExpandedView={isExpanded}
        onToggleExpandedView={() => setIsExpanded((prev) => !prev)}
        onChange={(field, value) => setState((prev) => ({ ...prev, [field]: value }))}
      />
    </StoryStage>
  );
}

export const TriggerEmpty = {
  name: 'Trigger — Empty',
  render: (args) => <TriggerStory {...args} />,
  args: {
    triggerName: '',
    description: '',
    conditions: [{ field: '', operator: '', value: '' }],
    isExpandedView: false,
  },
};

export const TriggerFilled = {
  name: 'Trigger — Filled',
  render: (args) => <TriggerStory {...args} />,
  args: {
    triggerName: 'Schedule-based',
    description: 'Schedule-based',
    conditions: [
      { field: 'Review source', operator: 'is equal to', value: 'Google' },
      { logic: 'OR', field: 'Review source', operator: 'is equal to', value: 'Birdeye' },
    ],
    isExpandedView: false,
  },
};

/* ─── Branch Config Panel ─── */

function BranchStory(args) {
  const [state, setState] = useState({ ...args });
  const [isExpanded, setIsExpanded] = useState(Boolean(args.isExpandedView));
  return (
    <StoryStage>
      <BranchConfigPanel
        {...state}
        isExpandedView={isExpanded}
        onToggleExpandedView={() => setIsExpanded((prev) => !prev)}
        onChange={(field, value) => setState((prev) => ({ ...prev, [field]: value }))}
      />
    </StoryStage>
  );
}

export const BranchEmpty = {
  name: 'Branch — Empty',
  render: (args) => <BranchStory {...args} />,
  args: {
    branchName: '',
    description: '',
    basedOn: 'Conditions',
    conditionGroups: [[{ field: '', operator: 'is equal to', value: '' }]],
    isExpandedView: false,
  },
};

export const BranchFilled = {
  name: 'Branch — Filled',
  render: (args) => <BranchStory {...args} />,
  args: {
    branchName: 'Legal',
    description: 'Route reviews related to legal or compliance matters.',
    basedOn: 'Conditions',
    conditionGroups: [
      [{ field: '1.Review.sentiment', operator: 'is equal to', value: 'Negative' }],
      [{ field: '3.identified_team', operator: 'is equal to', value: 'Legal' }],
    ],
    isExpandedView: false,
  },
};

/* ─── All Panels side-by-side ─── */

export const AllPanels = {
  name: 'All Panels (Overview)',
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <RHSDrawer
        agentName="Review response agent 1"
        goals="Respond to customer reviews promptly."
        outcomes="Improved customer satisfaction."
        locations={[{ id: '1001', name: 'Mountain view, CA' }]}
        moreLocationsCount={2}
      />
      <TriggerConfigPanel
        triggerName="Schedule-based"
        description="Schedule-based"
        conditions={[{ field: 'Review source', operator: 'is equal to', value: 'Google' }]}
        isExpandedView={false}
      />
      <div style={{ height: 700 }}>
        <BranchConfigPanel
          branchName="Legal"
          description="Route to legal team."
          conditionGroups={[[{ field: '1.Review.sentiment', operator: 'is equal to', value: 'Negative' }]]}
          isExpandedView={false}
        />
      </div>
    </div>
  ),
};

import React from 'react';
import RHSDrawer from './RHSDrawer';
import TriggerConfigPanel from './TriggerConfigPanel';
import CustomTaskPanel from './CustomTaskPanel';
import BranchConfigPanel from './BranchConfigPanel';
import LocationsDrawer from './LocationsDrawer';

export default {
  title: 'Components/RHSDrawer',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

/* ─── Agent Details (Start Node) ─── */
export const AgentDetails = {
  render: (args) => <RHSDrawer {...args} />,
  args: {
    agentName: 'Review response agent 1',
    goals:
      'Executes rule-based logic to rotate through qualifying templates and publish them automatically. If technical restrictions prevent immediate posting, the response is queued as a suggestion for manual review',
    outcomes:
      'Ensure safe, effortless engagement by relying exclusively on your pre-approved templates. Eliminate manual effort and operational overhead by autonomously responding across platforms',
    locations: [
      { id: '1001', name: 'Mountain view, CA' },
      { id: '1002', name: 'Seattle, WA' },
      { id: '1004', name: 'Chicago, IL' },
    ],
    moreLocationsCount: 1,
  },
};

export const AgentDetailsEmpty = {
  render: (args) => <RHSDrawer {...args} />,
  args: {
    agentName: '',
    goals: '',
    outcomes: '',
    locations: [],
    moreLocationsCount: 0,
  },
};

/* ─── Locations Drawer ─── */
export const Locations = {
  render: (args) => (
    <div style={{ height: 700 }}>
      <LocationsDrawer {...args} />
    </div>
  ),
  args: {
    selectedIds: ['1001', '1002', '1004', '1011'],
    onBack: () => console.log('Back clicked'),
    onSave: (selected) => console.log('Save locations:', selected),
  },
};

export const LocationsEmpty = {
  render: (args) => (
    <div style={{ height: 700 }}>
      <LocationsDrawer {...args} />
    </div>
  ),
  args: {
    selectedIds: [],
    onBack: () => console.log('Back clicked'),
    onSave: (selected) => console.log('Save locations:', selected),
  },
};

/* ─── Trigger Configuration ─── */
export const TriggerConfig = {
  render: (args) => <TriggerConfigPanel {...args} />,
  args: {
    triggerName: 'Schedule-based',
    description: 'Schedule-based',
    conditions: [
      { field: '', operator: '', value: '' },
      { field: '', operator: '', value: '' },
      { field: '', operator: '', value: '' },
    ],
  },
};

export const TriggerConfigFilled = {
  render: (args) => <TriggerConfigPanel {...args} />,
  args: {
    triggerName: 'When a new review is received or updated',
    description: 'Agent triggers on new or updated reviews across all sources and locations',
    conditions: [
      { field: 'Source', operator: 'is', value: 'Google' },
      { field: 'Rating', operator: 'is greater than', value: '3' },
    ],
  },
};

/* ─── Custom Task ─── */
export const CustomTask = {
  render: (args) => <CustomTaskPanel {...args} />,
  args: {
    taskName: 'Identify relevant mentions in the review',
    description: 'Extract product or service-specific feedback from the review',
    llmModel: 'Fast',
    systemPrompt: '',
    userPrompt: '',
  },
};

export const CustomTaskFilled = {
  render: (args) => <CustomTaskPanel {...args} />,
  args: {
    taskName: 'Generate response',
    description: 'Generate a contextual response based on the review content',
    llmModel: 'Powerful',
    systemPrompt: 'You are a helpful customer service agent. Respond professionally to customer reviews.',
    userPrompt: 'Write a response to this review: {{review_text}}',
  },
};

/* ─── Branch Configuration ─── */
export const BranchConfig = {
  render: (args) => (
    <div style={{ height: 700 }}>
      <BranchConfigPanel {...args} />
    </div>
  ),
  args: {
    branchName: 'Legal',
    description: 'Route reviews related to legal or compliance matters.',
    basedOn: 'Conditions',
    conditionGroups: [
      [{ field: '1.Review.sentiment', operator: 'is equal to', value: 'Negative' }],
      [{ field: '3.identified_team', operator: 'is equal to', value: 'Legal' }],
    ],
  },
};

export const BranchConfigEmpty = {
  render: (args) => (
    <div style={{ height: 600 }}>
      <BranchConfigPanel {...args} />
    </div>
  ),
  args: {
    branchName: '',
    description: '',
    basedOn: 'Conditions',
    conditionGroups: [
      [{ field: '', operator: 'is equal to', value: '' }],
    ],
  },
};

/* ─── All Panels Side by Side ─── */
export const AllPanels = {
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <RHSDrawer
        agentName="Review response agent 1"
        goals="Respond to customer reviews promptly and professionally."
        outcomes="Improved customer satisfaction scores."
        locations={[
          { id: '1001', name: 'Mountain view, CA' },
          { id: '1002', name: 'Seattle, WA' },
          { id: '1004', name: 'Chicago, IL' },
        ]}
        moreLocationsCount={1}
      />
      <TriggerConfigPanel
        triggerName="Schedule-based"
        description="Schedule-based"
      />
      <div style={{ height: 600 }}>
        <CustomTaskPanel
          taskName="Identify mentions"
          description="Extract feedback from the review"
        />
      </div>
      <div style={{ height: 700 }}>
        <BranchConfigPanel
          branchName=""
          description=""
          conditionGroups={[
            [{ field: '', operator: 'is equal to', value: '' }],
          ]}
        />
      </div>
    </div>
  ),
};

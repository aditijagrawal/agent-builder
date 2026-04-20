import React from 'react';
import FlowNode from './FlowNode';
import StartNode from '../StartNode/StartNode';
import RHSDrawer from '../RHSDrawer/RHSDrawer';
import TriggerConfigPanel from '../RHSDrawer/TriggerConfigPanel';
import CustomTaskPanel from '../RHSDrawer/CustomTaskPanel';
import BranchConfigPanel from '../RHSDrawer/BranchConfigPanel';
export default {
  title: 'Internal/FlowNode',
  component: FlowNode,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['trigger', 'task', 'branch', 'connector', 'line', 'end'],
    },
    hasToggle: { control: 'boolean' },
    toggleEnabled: { control: 'boolean' },
    hasAiIcon: { control: 'boolean' },
  },
  args: {
    onDelete: () => console.log('delete'),
    onMoreClick: () => console.log('more'),
    onToggle: () => console.log('toggle'),
    onAddClick: () => console.log('add'),
  },
};

export const TriggerCard = {
  args: {
    type: 'trigger',
    title: 'Trigger',
    stepNumber: 1,
    description: 'When a new review is received or updated',
    subtitle: 'Agent triggers on new or updated reviews across all sources and locations',
    hasAiIcon: false,
    hasToggle: true,
    toggleEnabled: true,
  },
};

export const TaskCard = {
  args: {
    type: 'task',
    title: 'Task',
    stepNumber: 2,
    description: 'Identify relevant mentions in the review',
    subtitle: 'Extract product or service specific feedback from the review',
    hasAiIcon: true,
    hasToggle: true,
    toggleEnabled: true,
  },
};

export const TaskCardNoAI = {
  args: {
    type: 'task',
    title: 'Task',
    stepNumber: 3,
    description: 'Send a review response',
    subtitle: 'Reply to the review using the generated response',
    hasAiIcon: false,
    hasToggle: true,
    toggleEnabled: true,
  },
};

export const BranchCard = {
  args: {
    type: 'branch',
    title: 'Branch',
    stepNumber: 2,
    description: 'Based on conditions',
    subtitle: 'Build condition-specific flows',
    hasAiIcon: false,
    hasToggle: true,
    toggleEnabled: false,
  },
};

export const Connector = {
  args: {
    type: 'connector',
  },
};

export const LineConnector = {
  args: {
    type: 'line',
  },
};

export const EndChip = {
  args: {
    type: 'end',
  },
};

export const AllNodes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <StartNode
        title="Review response agent replying autonomously"
        subtitle="All locations"
      />
      <FlowNode type="line" />
      <FlowNode
        type="trigger"
        title="Trigger"
        stepNumber={1}
        description="When a new review is received or updated"
        subtitle="Agent triggers on new or updated reviews across all sources and locations"
        hasToggle
        toggleEnabled
      />
      <FlowNode type="connector" />
      <FlowNode
        type="task"
        title="Task"
        stepNumber={2}
        description="Identify relevant mentions in the review"
        subtitle="Extract product or service specific feedback from the review"
        hasAiIcon
        hasToggle
        toggleEnabled
      />
      <FlowNode type="connector" />
      <FlowNode
        type="branch"
        title="Branch"
        stepNumber={3}
        description="Based on conditions"
        subtitle="Build condition-specific flows"
        hasToggle
      />
      <FlowNode type="connector" />
      <FlowNode
        type="task"
        title="Task"
        stepNumber={4}
        description="Generate response"
        subtitle="Generate a contextual response based on the review content"
        hasAiIcon
        hasToggle
        toggleEnabled
      />
      <FlowNode type="connector" />
      <FlowNode
        type="task"
        title="Task"
        stepNumber={5}
        description="Send a review response"
        subtitle="Reply to the review using the generated response"
        hasToggle
        toggleEnabled
      />
      <FlowNode type="end" />
    </div>
  ),
};

/* ─── Node + Corresponding RHS Panel ─── */
export const TriggerWithRHS = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StartNode title="Review response agent 1" subtitle="AI-powered review response agent" />
          <FlowNode type="line" />
          <FlowNode
            type="trigger"
            title="Trigger"
            stepNumber={1}
            description="When a new review is received or updated"
            subtitle="Schedule-based: Schedule-based trigger"
            hasToggle
            toggleEnabled
          />
          <FlowNode type="end" />
        </div>
        <TriggerConfigPanel
          triggerName="Schedule-based"
          description="Schedule-based"
        />
      </div>
    );
  },
};

export const TaskWithRHS = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StartNode title="Review response agent 1" subtitle="AI-powered review response agent" />
          <FlowNode type="line" />
          <FlowNode
            type="task"
            title="Task"
            stepNumber={1}
            description="Identify relevant mentions"
            subtitle="Custom: Custom AI task"
            hasAiIcon
            hasToggle
            toggleEnabled
          />
          <FlowNode type="end" />
        </div>
        <div style={{ height: 700 }}>
          <CustomTaskPanel
            taskName="Identify relevant mentions in the review"
            description="Extract product or service-specific feedback from the review"
          />
        </div>
      </div>
    );
  },
};

export const BranchWithRHS = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <StartNode title="Review response agent 1" subtitle="AI-powered review response agent" />
          <FlowNode type="line" />
          <FlowNode
            type="branch"
            title="Branch"
            stepNumber={1}
            description="Based on conditions"
            subtitle="Branch: Branch logic"
            hasToggle
            toggleEnabled
          />
          <FlowNode type="end" />
        </div>
        <div style={{ height: 700 }}>
          <BranchConfigPanel
            branchName="Legal"
            description="Route reviews related to legal or compliance matters."
            conditionGroups={[
              [{ field: '1.Review.sentiment', operator: 'is equal to', value: 'Negative' }],
              [{ field: '3.identified_team', operator: 'is equal to', value: 'Legal' }],
            ]}
          />
        </div>
      </div>
    );
  },
};

export const StartNodeWithRHS = {
  render: () => {
    return (
      <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}>
        <StartNode title="Review response agent 1" subtitle="AI-powered review response agent" />
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
      </div>
    );
  },
};

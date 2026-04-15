import React from 'react';
import FlowCanvas from './FlowCanvas';

export default {
  title: 'Agent Builder/Modules/FlowCanvas',
  component: FlowCanvas,
  parameters: {
    layout: 'fullscreen',
  },
};

const NODE_WIDTH = 400;
const CENTER_X = 300;

const SAMPLE_NODES = [
  {
    id: 'start',
    type: 'start',
    position: { x: CENTER_X - 220, y: 0 },
    data: {
      title: 'Review response agent replying autonomously',
      subtitle: 'All locations',
    },
  },
  {
    id: 'trigger',
    type: 'trigger',
    position: { x: CENTER_X - NODE_WIDTH / 2, y: 150 },
    data: {
      title: 'Trigger',
      stepNumber: 1,
      description: 'When a new review is received or updated',
      subtitle: 'Agent triggers on new or updated reviews across all sources and locations',
    },
  },
  {
    id: 'task-1',
    type: 'task',
    position: { x: CENTER_X - NODE_WIDTH / 2, y: 400 },
    data: {
      title: 'Task',
      stepNumber: 2,
      description: 'Identify relevant mentions in the review',
      subtitle: 'Extract product or service specific feedback from the review',
      hasAiIcon: true,
      hasToggle: true,
      toggleEnabled: true,
    },
  },
  {
    id: 'branch',
    type: 'branch',
    position: { x: CENTER_X - NODE_WIDTH / 2, y: 650 },
    data: {
      title: 'Branch',
      stepNumber: 2,
      description: 'Based on conditions',
      subtitle: 'Build condition-specific flows',
      hasToggle: true,
      toggleEnabled: false,
    },
  },
  {
    id: 'task-2',
    type: 'task',
    position: { x: CENTER_X - NODE_WIDTH / 2, y: 900 },
    data: {
      title: 'Task',
      stepNumber: 3,
      description: 'Identify custom tokens',
      subtitle: 'Detect city, location, staff, address or any custom location data mentioned in the review',
      hasAiIcon: true,
      hasToggle: true,
      toggleEnabled: true,
    },
  },
  {
    id: 'task-3',
    type: 'task',
    position: { x: CENTER_X - NODE_WIDTH / 2, y: 1150 },
    data: {
      title: 'Task',
      stepNumber: 4,
      description: 'Generate response',
      subtitle: 'Generate a contextual response based on the review content, identified mentions and custom tokens',
      hasAiIcon: true,
      hasToggle: true,
      toggleEnabled: true,
    },
  },
  {
    id: 'task-4',
    type: 'task',
    position: { x: CENTER_X - NODE_WIDTH / 2, y: 1400 },
    data: {
      title: 'Task',
      stepNumber: 5,
      description: 'Send a review response',
      subtitle: 'Reply to the review using the generated response',
      hasAiIcon: true,
      hasToggle: true,
      toggleEnabled: true,
    },
  },
  {
    id: 'end',
    type: 'end',
    position: { x: CENTER_X - 20, y: 1620 },
    data: {},
  },
];

const SAMPLE_EDGES = [
  { id: 'e-start-trigger', source: 'start', target: 'trigger', type: 'addButton' },
  { id: 'e-trigger-task1', source: 'trigger', target: 'task-1', type: 'addButton' },
  { id: 'e-task1-branch', source: 'task-1', target: 'branch', type: 'addButton' },
  { id: 'e-branch-task2', source: 'branch', target: 'task-2', type: 'addButton' },
  { id: 'e-task2-task3', source: 'task-2', target: 'task-3', type: 'addButton' },
  { id: 'e-task3-task4', source: 'task-3', target: 'task-4', type: 'addButton' },
  { id: 'e-task4-end', source: 'task-4', target: 'end', type: 'addButton' },
];

export const Default = {
  render: () => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FlowCanvas
        nodes={SAMPLE_NODES}
        edges={SAMPLE_EDGES}
        orientation="vertical"
      />
    </div>
  ),
};

export const Empty = {
  render: () => (
    <div style={{ width: '100vw', height: '100vh' }}>
      <FlowCanvas nodes={[]} edges={[]} orientation="vertical" />
    </div>
  ),
};

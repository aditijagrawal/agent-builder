import React, { useState } from 'react';
import AgentBuilder from './AgentBuilder';

export default {
  title: 'Agent Builder/Templates/AgentBuilderTemplate',
  component: AgentBuilder,
  parameters: {
    layout: 'fullscreen',
  },
};

/* ─── Shared node shapes ─── */

const triggerNode = {
  id: 'node-trigger-1',
  flowType: 'trigger',
  data: {
    title: 'Trigger',
    stepNumber: 1,
    description: 'When a new review is received or updated',
    subtitle: 'Schedule-based: Schedule-based',
    hasToggle: true,
    toggleEnabled: true,
  },
};

const customTaskNode = {
  id: 'node-task-1',
  flowType: 'task',
  data: {
    title: 'Task',
    stepNumber: 2,
    description: 'Identify relevant mentions in the review',
    subtitle: 'Custom: Analyze customer review',
    hasAiIcon: true,
    hasToggle: true,
    toggleEnabled: true,
  },
};

const branchNode = {
  id: 'node-branch-1',
  flowType: 'branch',
  data: {
    title: 'Branch',
    stepNumber: 3,
    description: 'Based on conditions',
    subtitle: 'Branch: Route by sentiment',
    hasToggle: true,
    toggleEnabled: true,
  },
};

const generateTaskNode = {
  id: 'node-task-2',
  flowType: 'task',
  data: {
    title: 'Task',
    stepNumber: 4,
    description: 'Generate response',
    subtitle: 'Custom: Generate contextual response',
    hasAiIcon: true,
    hasToggle: true,
    toggleEnabled: true,
  },
};

const sendTaskNode = {
  id: 'node-task-3',
  flowType: 'task',
  data: {
    title: 'Task',
    stepNumber: 5,
    description: 'Send a review response',
    subtitle: 'Reply to the review using generated response',
    hasAiIcon: false,
    hasToggle: true,
    toggleEnabled: true,
  },
};

/* ─── Stories ─── */

/** Empty canvas — just the Start + End chip, no nodes added yet */
export const EmptyCanvas = {
  render: () => (
    <AgentBuilder
      appTitle="Reviews AI"
      pageTitle="Review response agent 1"
      activeNavId="reviews"
      initialNodeList={[]}
    />
  ),
};

/** Start node clicked → Agent Details RHS panel open */
export const WithAgentDetailsRHSOpen = {
  render: () => (
    <AgentBuilder
      appTitle="Reviews AI"
      pageTitle="Review response agent 1"
      activeNavId="reviews"
      initialNodeList={[]}
      initialSelectedNodeId="__start__"
      initialDrawerOpen
    />
  ),
};

/** Trigger node selected → TriggerConfigPanel open */
export const WithTriggerRHSOpen = {
  render: () => (
    <AgentBuilder
      appTitle="Reviews AI"
      pageTitle="Review response agent 1"
      activeNavId="reviews"
      initialNodeList={[triggerNode]}
      initialNodeDetails={{
        [triggerNode.id]: {
          triggerName: 'Schedule-based',
          description: 'Schedule-based',
          conditions: [
            { field: 'Review source', operator: 'is equal to', value: 'Google' },
            { logic: 'OR', field: 'Review source', operator: 'is equal to', value: 'Birdeye' },
          ],
        },
      }}
      initialSelectedNodeId={triggerNode.id}
      initialDrawerOpen
    />
  ),
};

/** Branch node selected → BranchConfigPanel open */
export const WithBranchRHSOpen = {
  render: () => (
    <AgentBuilder
      appTitle="Reviews AI"
      pageTitle="Review response agent 1"
      activeNavId="reviews"
      initialNodeList={[triggerNode, branchNode]}
      initialNodeDetails={{
        [triggerNode.id]: {
          triggerName: 'Schedule-based',
          description: 'Schedule-based',
          conditions: [],
        },
        [branchNode.id]: {
          branchName: 'Legal',
          description: 'Route reviews related to legal or compliance matters.',
          basedOn: 'Conditions',
          conditionGroups: [
            [{ field: '1.Review.sentiment', operator: 'is equal to', value: 'Negative' }],
            [{ field: '3.identified_team', operator: 'is equal to', value: 'Legal' }],
          ],
        },
      }}
      initialSelectedNodeId={branchNode.id}
      initialDrawerOpen
    />
  ),
};

/** Custom Task selected → CustomTaskPanel open (collapsed view) */
export const WithCustomTaskRHSOpen = {
  render: () => (
    <AgentBuilder
      appTitle="Reviews AI"
      pageTitle="Review response agent 1"
      activeNavId="reviews"
      initialNodeList={[triggerNode, customTaskNode]}
      initialNodeDetails={{
        [triggerNode.id]: {
          triggerName: 'Schedule-based',
          description: 'Schedule-based',
          conditions: [],
        },
        [customTaskNode.id]: {
          taskName: 'Identify relevant mentions in the review',
          description: 'Extract product or service-specific feedback from the review',
          llmModel: 'Balanced',
          systemPrompt: 'You are an expert support analyst. Identify product or service entities.',
          userPrompt: 'Review: {{review.text}}. Return concise entities and sentiment direction.',
        },
      }}
      initialSelectedNodeId={customTaskNode.id}
      initialDrawerOpen
    />
  ),
};

/** Custom Task → Expanded view (full-screen modal) */
export const WithCustomTaskExpanded = {
  render: () => (
    <AgentBuilder
      appTitle="Reviews AI"
      pageTitle="Review response agent 1"
      activeNavId="reviews"
      initialNodeList={[triggerNode, customTaskNode]}
      initialNodeDetails={{
        [triggerNode.id]: {
          triggerName: 'Schedule-based',
          description: 'Schedule-based',
          conditions: [],
        },
        [customTaskNode.id]: {
          taskName: 'Identify relevant mentions in the review',
          description: 'Extract product or service-specific feedback from the review',
          llmModel: 'Balanced',
          systemPrompt: 'You are an expert support analyst. Identify product or service entities.',
          userPrompt: 'Review: {{review.text}}. Return concise entities and sentiment direction.',
        },
      }}
      initialSelectedNodeId={customTaskNode.id}
      initialDrawerOpen
      initialExpandedView
    />
  ),
};

/** Full realistic agent flow, no RHS open */
export const FullFlow = {
  render: () => (
    <AgentBuilder
      appTitle="Reviews AI"
      pageTitle="Review response agent 1"
      activeNavId="reviews"
      initialNodeList={[
        triggerNode,
        customTaskNode,
        branchNode,
        generateTaskNode,
        sendTaskNode,
      ]}
      initialNodeDetails={{
        [triggerNode.id]: {
          triggerName: 'Schedule-based',
          description: 'Schedule-based',
          conditions: [],
        },
        [customTaskNode.id]: {
          taskName: 'Identify relevant mentions in the review',
          description: 'Extract product or service-specific feedback from the review',
          llmModel: 'Balanced',
          systemPrompt: '',
          userPrompt: '',
        },
        [branchNode.id]: {
          branchName: 'Legal',
          description: 'Route legal reviews.',
          basedOn: 'Conditions',
          conditionGroups: [[{ field: '1.Review.sentiment', operator: 'is equal to', value: 'Negative' }]],
        },
        [generateTaskNode.id]: {
          taskName: 'Generate response',
          description: 'Generate contextual response based on the review content.',
          llmModel: 'Fast',
          systemPrompt: '',
          userPrompt: '',
        },
        [sendTaskNode.id]: {
          agentName: 'Send review response',
          goals: '',
          outcomes: '',
          locations: [],
          moreLocationsCount: 0,
        },
      }}
    />
  ),
};

import React from 'react';
import CanvasCard from './CanvasCard';

export default {
  title: 'Agent Builder/Molecules/Canvas/CanvasCard',
  component: CanvasCard,
  parameters: { layout: 'padded' },
};

export const Trigger = {
  render: () => (
    <CanvasCard
      nodeType="trigger"
      label="Trigger"
      hasToggle
      toggleEnabled
      stepNumber={1}
      title="When a new review is received or updated"
      description="Reviews: Triggers on new or updated reviews across all sources and locations"
    />
  ),
};

export const Task = {
  render: () => (
    <CanvasCard
      nodeType="task"
      label="Task"
      hasToggle
      toggleEnabled
      stepNumber={2}
      title="Identify relevant mentions in the review"
      description="Extract product or service-specific feedback from the review"
    />
  ),
};

export const TaskLLM = {
  render: () => (
    <CanvasCard
      nodeType="task"
      label="Task"
      hasAiIcon
      hasToggle
      toggleEnabled
      stepNumber={2}
      title="Identify relevant mentions in the review"
      description="LLM: Extract product or service-specific feedback from the review"
    />
  ),
};

export const Branch = {
  render: () => (
    <CanvasCard
      nodeType="branch"
      label="Branch"
      hasToggle
      toggleEnabled
      hasAddButton
      stepNumber={3}
      title="Based on conditions"
      description="Build condition-specific flows"
    />
  ),
};

export const Loop = {
  render: () => (
    <CanvasCard
      nodeType="loop"
      label="Loop"
      hasToggle
      toggleEnabled
      stepNumber={4}
      title="Repeat until condition is met"
      description="Iterate over a set of steps until the exit condition is true"
    />
  ),
};

export const Parallel = {
  render: () => (
    <CanvasCard
      nodeType="parallel"
      label="Parallel tasks"
      hasToggle
      toggleEnabled
      hasAddButton
      stepNumber={3}
      title="Run tasks simultaneously"
      description="Execute multiple branches in parallel"
    />
  ),
};

export const Delay = {
  render: () => (
    <CanvasCard
      nodeType="delay"
      label="Delay"
      hasToggle
      toggleEnabled
      stepNumber={4}
      title="Wait before continuing"
      description="Pause the workflow for a set duration"
    />
  ),
};

export const AllTypes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <CanvasCard nodeType="trigger" label="Trigger" hasToggle toggleEnabled stepNumber={1} title="When a new review is received or updated" description="Reviews: Triggers on new or updated reviews" />
      <CanvasCard nodeType="task" label="Task" hasAiIcon hasToggle toggleEnabled stepNumber={2} title="Identify relevant mentions in the review" description="LLM: Extract product or service-specific feedback" />
      <CanvasCard nodeType="task" label="Task" hasToggle toggleEnabled stepNumber={2} title="Send a review response" description="Reviews: Post a reply to the selected review" />
      <CanvasCard nodeType="branch" label="Branch" hasToggle toggleEnabled hasAddButton stepNumber={3} title="Based on conditions" description="Build condition-specific flows" />
      <CanvasCard nodeType="loop" label="Loop" hasToggle toggleEnabled stepNumber={4} title="Repeat until condition is met" description="Iterate over a set of steps until the exit condition is true" />
      <CanvasCard nodeType="parallel" label="Parallel tasks" hasToggle toggleEnabled hasAddButton stepNumber={3} title="Run tasks simultaneously" description="Execute multiple branches in parallel" />
      <CanvasCard nodeType="delay" label="Delay" hasToggle toggleEnabled stepNumber={4} title="Wait before continuing" description="Pause the workflow for a set duration" />
    </div>
  ),
};

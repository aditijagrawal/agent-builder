import React, { useState } from 'react';
import CustomTaskPanel from './CustomTaskPanel';

export default {
  title: 'Agent Builder/Modules/ExpandedConfigModal',
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

function Stage({ children }) {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0 }}>
        {children}
      </div>
    </div>
  );
}

function ExpandedStory(args) {
  const [state, setState] = useState({ ...args });
  return (
    <Stage>
      <CustomTaskPanel
        {...state}
        isExpandedView
        onChange={(field, value) => setState((prev) => ({ ...prev, [field]: value }))}
      />
    </Stage>
  );
}

/** Expanded modal — prompts empty (authoring start state) */
export const EmptyPrompts = {
  name: 'Expanded — Empty prompts',
  render: (args) => <ExpandedStory {...args} />,
  args: {
    taskName: 'Identify relevant mentions in the review',
    description: 'Extract product or service-specific feedback from the review',
    llmModel: 'Fast',
    systemPrompt: '',
    userPrompt: '',
  },
};

/** Expanded modal — short prompts filled in */
export const ShortPrompts = {
  name: 'Expanded — Short prompts',
  render: (args) => <ExpandedStory {...args} />,
  args: {
    taskName: 'Identify relevant mentions in the review',
    description: 'Extract product or service-specific feedback from the review',
    llmModel: 'Balanced',
    systemPrompt: 'You are an expert support analyst. Identify product or service entities.',
    userPrompt: 'Review: {{review.text}}. Return concise entities and sentiment direction.',
  },
};

/** Expanded modal — dense, long prompts (stress test for layout) */
export const DensePrompts = {
  name: 'Expanded — Dense/long prompts',
  render: (args) => <ExpandedStory {...args} />,
  args: {
    taskName: 'Generate response strategy from nuanced customer feedback',
    description: 'Analyze detailed review context and produce a structured response plan with constraints.',
    llmModel: 'Balanced',
    systemPrompt: `You are a senior CX analyst.\nUse only provided context.\nOutput JSON with issues, tone, and suggested next action.\nPrioritize legal/compliance signals.`,
    userPrompt: `Review: {{review.text}}\nBusiness profile: {{business.profile}}\nRecent interactions: {{customer.history}}\nReturn fields:\n1) intent\n2) urgency\n3) risk\n4) response_strategy`,
  },
};

/** Expanded modal — Fast model selected */
export const ModelFast = {
  name: 'Expanded — Model: Fast',
  render: (args) => <ExpandedStory {...args} />,
  args: {
    taskName: 'Quick sentiment check',
    description: 'Fast scan for review sentiment.',
    llmModel: 'Fast',
    systemPrompt: 'You are a sentiment classifier.',
    userPrompt: 'Review: {{review.text}}. Return: positive, negative, or neutral.',
  },
};

/** Collapsed view (entry point before expanding) */
export const CollapsedEntry = {
  name: 'Collapsed — Entry state',
  render: (args) => {
    const [state, setState] = useState({ ...args });
    const [isExpanded, setIsExpanded] = useState(false);
    return (
      <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0 }}>
          <CustomTaskPanel
            {...state}
            isExpandedView={isExpanded}
            onToggleExpandedView={() => setIsExpanded((prev) => !prev)}
            onChange={(field, value) => setState((prev) => ({ ...prev, [field]: value }))}
          />
        </div>
      </div>
    );
  },
  args: {
    taskName: 'Identify relevant mentions in the review',
    description: 'Extract product or service-specific feedback from the review',
    llmModel: 'Fast',
    systemPrompt: 'You are an expert support analyst.',
    userPrompt: 'Review: {{review.text}}. Return entities and sentiment.',
  },
};

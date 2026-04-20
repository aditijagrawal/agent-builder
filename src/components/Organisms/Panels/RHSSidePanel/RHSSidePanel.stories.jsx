import RHSSidePanel from './RHSSidePanel';

export default {
  title: 'Agent Builder/Organisms/Panels/RHSSidePanel',
  component: RHSSidePanel,
  parameters: {
    layout: 'fullscreen',
  },
};

export const AgentDetails = {
  args: {
    variant: 'agentDetails',
    onClose: () => {},
    onSave: () => {},
  },
};

export const LLMTask = {
  args: {
    variant: 'llmTask',
    onClose: () => {},
    onSave: () => {},
    onPreview: () => {},
    onExpand: () => {},
  },
};

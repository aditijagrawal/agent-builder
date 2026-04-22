import RHSPanelHeader from './RHSPanelHeader';

export default {
  title: 'Agent Builder/Molecules/RHSPanel/RHSPanelHeader',
  component: RHSPanelHeader,
};

export const Default = {
  args: {
    title: 'Agent details',
    onPreview: () => {},
    onExpand: () => {},
    onClose: () => {},
  },
};

export const WithoutActions = {
  args: {
    title: 'Agent details',
    showActions: false,
    onClose: () => {},
  },
};

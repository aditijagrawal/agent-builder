import RHSSidePanelHeader from './RHSSidePanelHeader';

export default {
  title: 'Agent Builder/Organisms/Panels/RHSSidePanelHeader',
  component: RHSSidePanelHeader,
};

export const Default = {
  args: {
    title: 'Agent details',
    onPreview: () => {},
    onExpand: () => {},
    onClose: () => {},
  },
};

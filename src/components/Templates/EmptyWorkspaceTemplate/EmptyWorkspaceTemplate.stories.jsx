import EmptyWorkspaceTemplate from './EmptyWorkspaceTemplate';

export default {
  title: 'Agent Builder/Templates/EmptyWorkspaceTemplate',
  component: EmptyWorkspaceTemplate,
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  args: {
    appTitle: 'Reviews AI',
    pageTitle: 'Review response agent  1',
    activeNavId: 'reviews',
    onCreateFromScratch: () => {},
    onUseTemplate: () => {},
  },
};

import AddOutputFieldModal from './AddOutputFieldModal';

export default {
  title: 'Agent Builder/Organisms/Modals/RHS/AddOutputFieldModal',
  component: AddOutputFieldModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      story: { inline: true },
    }
  },
};

export const Default = {
  args: {
    onClose: () => {},
    onAdd: () => {},
  },
};

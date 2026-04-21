import AddContextModal from './AddContextModal';

export default {
  title: 'Agent Builder/Organisms/Modals/RHS/AddContextModal',
  component: AddContextModal,
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

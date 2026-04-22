import { useState } from 'react';
import PrimaryRailNav from './PrimaryRailNav';

export default {
  title: 'Agent Builder/Molecules/PrimaryRailNav',
  component: PrimaryRailNav,
};

export const Default = {
  render: (args) => {
    const [activeNavId, setActiveNavId] = useState('overview');
    return (
      <div style={{ height: 600, display: 'flex' }}>
        <PrimaryRailNav {...args} activeNavId={activeNavId} onNavChange={setActiveNavId} />
      </div>
    );
  },
  args: {},
};

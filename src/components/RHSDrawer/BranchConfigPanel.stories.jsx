import React from 'react';
import BranchConfigPanel from './BranchConfigPanel';

export default {
  title: 'Internal/BranchConfigPanel',
  component: BranchConfigPanel,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: {
    branchName: 'Legal',
    description: 'Route reviews related to legal or compliance matters.',
    conditionGroups: [
      [{ field: '1.Review.sentiment', operator: 'is equal to', value: 'Negative' }],
      [{ field: '3.identified_team', operator: 'is equal to', value: 'Legal' }],
    ],
  },
};

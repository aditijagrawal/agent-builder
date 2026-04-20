import React from 'react';
import CustomTaskPanel from './CustomTaskPanel';

export default {
  title: 'Internal/CustomTaskPanel',
  component: CustomTaskPanel,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: {
    taskName: 'Identify relevant mentions in the review',
    description: 'Extract product or service-specific feedback from the review',
  },
};

import React from 'react';
import TriggerConfigPanel from './TriggerConfigPanel';

export default {
  title: 'Internal/TriggerConfigPanel',
  component: TriggerConfigPanel,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: {
    triggerName: 'Schedule-based',
    description: 'Schedule-based',
  },
};

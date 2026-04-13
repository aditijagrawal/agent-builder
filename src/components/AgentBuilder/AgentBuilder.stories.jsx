import React from 'react';
import AgentBuilder from './AgentBuilder';

export default {
  title: 'Pages/AgentBuilder',
  component: AgentBuilder,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = {
  render: () => (
    <AgentBuilder
      appTitle="Reviews AI"
      pageTitle="Review response agent  1"
      activeNavId="reviews"
    />
  ),
};

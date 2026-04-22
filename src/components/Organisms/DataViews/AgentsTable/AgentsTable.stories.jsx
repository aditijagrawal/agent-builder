import AgentsTable from './AgentsTable';

export default {
  title: 'Agent Builder/Organisms/DataViews/AgentsTable',
  component: AgentsTable,
  parameters: {
    layout: 'padded',
  },
};

export const Default = {};

export const AllStatuses = {
  args: {
    agents: [
      { id: 1, name: 'Positive review response', description: 'Auto-responds to 4–5 star reviews', status: 'Active', metrics: '6h 20m saved', locations: 12 },
      { id: 2, name: 'Negative review response', description: 'Drafts empathetic replies for 1–3 star reviews', status: 'Paused', metrics: '3h 45m saved', locations: 8 },
      { id: 3, name: 'Weekly digest agent', description: 'Summarises review trends every Monday', status: 'Draft', metrics: '—', locations: 0 },
    ],
  },
};

import TemplateLibrary from './TemplateLibrary';

export default {
  title: 'Agent Builder/Organisms/DataViews/TemplateLibrary',
  component: TemplateLibrary,
  parameters: { layout: 'fullscreen' },
  decorators: [
    (Story) => (
      <div style={{ padding: 40, background: '#f4f6f7', minHeight: '100vh' }}>
        <Story />
      </div>
    ),
  ],
};

export const Default = {
  args: {
    initialCount: 7,
    onUseTemplate: () => {},
    templates: [
      { id: '1', title: 'Customer Support Agent', description: 'Handles customer inquiries, resolves tickets, and escalates complex issues to human agents automatically.' },
      { id: '2', title: 'Data Analysis Agent', description: 'Processes datasets, generates insights, and produces reports to help teams make data-driven decisions.' },
    ],
  },
};

export const ThreePerRow = {
  args: {
    columns: 3,
    initialCount: 6,
    onUseTemplate: () => {},
    templates: [
      { id: '1', title: 'Customer Support Agent', description: 'Handles customer inquiries, resolves tickets, and escalates complex issues to human agents automatically.' },
      { id: '2', title: 'Data Analysis Agent', description: 'Processes datasets, generates insights, and produces reports to help teams make data-driven decisions.' },
      { id: '3', title: 'Lead Qualification Agent', description: 'Evaluates inbound leads against qualification criteria and routes high-value prospects to the sales team.' },
      { id: '4', title: 'Onboarding Agent', description: 'Guides new users through product setup, answers common questions, and tracks onboarding milestone completion.' },
      { id: '5', title: 'Email Triage Agent', description: 'Sorts and prioritizes incoming emails, drafts responses, and flags urgent messages for immediate attention.' },
      { id: '6', title: 'Scheduling Agent', description: 'Manages calendar availability, books meetings across time zones, and sends reminders to all participants.' },
    ],
  },
};

export const WithSeeMore = {
  args: {
    initialCount: 4,
    onUseTemplate: () => {},
    onSeeMore: () => alert('Navigate to Agents dashboard'),
    templates: [
      { id: '1', title: 'Customer Support Agent', description: 'Handles customer inquiries, resolves tickets, and escalates complex issues to human agents automatically.' },
      { id: '2', title: 'Data Analysis Agent', description: 'Processes datasets, generates insights, and produces reports to help teams make data-driven decisions.' },
      { id: '3', title: 'Lead Qualification Agent', description: 'Evaluates inbound leads against qualification criteria and routes high-value prospects to the sales team.' },
      { id: '4', title: 'Onboarding Agent', description: 'Guides new users through product setup, answers common questions, and tracks onboarding milestone completion.' },
      { id: '5', title: 'Email Triage Agent', description: 'Sorts and prioritizes incoming emails, drafts responses, and flags urgent messages for immediate attention.' },
      { id: '6', title: 'Scheduling Agent', description: 'Manages calendar availability, books meetings across time zones, and sends reminders to all participants.' },
      { id: '7', title: 'Content Moderation Agent', description: 'Reviews user-generated content against community guidelines and takes automated action on policy violations.' },
      { id: '8', title: 'Billing Support Agent', description: 'Answers billing questions, processes refund requests, and updates subscription details for customers.' },
    ],
  },
};

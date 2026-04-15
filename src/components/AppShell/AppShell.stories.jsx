import React, { useState } from 'react';
import AppShell from './AppShell';

export default {
  title: 'Agent Builder/Foundations/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    appTitle: { control: 'text' },
    pageTitle: { control: 'text' },
    activeNavId: {
      control: 'select',
      options: [
        'overview', 'inbox', 'listings', 'reviews', 'referrals',
        'payments', 'appointments', 'social', 'surveys', 'ticketing',
        'contacts', 'campaigns', 'reports', 'insights', 'competitors',
      ],
    },
    publishDisabled: { control: 'boolean' },
  },
};

export const Default = {
  render: (args) => {
    const [activeNav, setActiveNav] = useState(args.activeNavId ?? 'reviews');
    return (
      <AppShell
        {...args}
        activeNavId={activeNav}
        onNavChange={setActiveNav}
      />
    );
  },
  args: {
    appTitle: 'Reviews AI',
    pageTitle: 'Review response agent 1',
    activeNavId: 'reviews',
    publishDisabled: true,
  },
};

export const PublishEnabled = {
  render: (args) => {
    const [activeNav, setActiveNav] = useState(args.activeNavId ?? 'reviews');
    return (
      <AppShell
        {...args}
        activeNavId={activeNav}
        onNavChange={setActiveNav}
        onPublish={() => alert('Publish clicked!')}
      />
    );
  },
  args: {
    appTitle: 'Reviews AI',
    pageTitle: 'Review response agent 1',
    activeNavId: 'reviews',
    publishDisabled: false,
  },
};

export const ListingsVariant = {
  render: (args) => {
    const [activeNav, setActiveNav] = useState(args.activeNavId ?? 'listings');
    return (
      <AppShell
        {...args}
        activeNavId={activeNav}
        onNavChange={setActiveNav}
      />
    );
  },
  args: {
    appTitle: 'Listings AI',
    pageTitle: 'Listings scan agent 1',
    activeNavId: 'listings',
    publishDisabled: true,
  },
};

export const WithContent = {
  render: () => {
    const [activeNav, setActiveNav] = useState('reviews');
    return (
      <AppShell
        appTitle="Reviews AI"
        pageTitle="Review response agent 1"
        activeNavId={activeNav}
        onNavChange={setActiveNav}
        publishDisabled
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            color: '#9e9e9e',
            fontSize: 14,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          Canvas content goes here
        </div>
      </AppShell>
    );
  },
};

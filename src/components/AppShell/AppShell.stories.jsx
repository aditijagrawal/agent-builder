import React, { useState } from 'react';
import AppShell from './AppShell';

export default {
  title: 'Agent Builder/Foundations/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
};

export const Default = () => {
  const [activeNav, setActiveNav] = useState('listings');
  return (
    <AppShell
      appTitle="Listings AI"
      pageTitle="Listings scan agent  1"
      activeNavId={activeNav}
      onNavChange={setActiveNav}
      onBack={() => alert('Back clicked')}
      publishDisabled
    />
  );
};

export const WithContent = () => {
  const [activeNav, setActiveNav] = useState('listings');
  return (
    <AppShell
      appTitle="Listings AI"
      pageTitle="Listings scan agent  1"
      activeNavId={activeNav}
      onNavChange={setActiveNav}
      publishDisabled={false}
      onPublish={() => alert('Publishing...')}
    >
      <div style={{ padding: 24 }}>
        <div
          style={{
            background: '#fff',
            borderRadius: 8,
            padding: 20,
            boxShadow: '0 2px 12px rgba(33,33,33,0.06)',
            maxWidth: 400,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: 20, color: '#555' }}
            >
              ballot
            </span>
            <span style={{ fontSize: 14, color: '#212121' }}>Task</span>
          </div>
          <ol start={1} style={{ paddingLeft: 24, fontSize: 14, color: '#212121' }}>
            <li style={{ marginBottom: 4 }}>Scan listings for accuracy</li>
            <li style={{ marginBottom: 4 }}>Identify missing information</li>
            <li>Generate competitive keywords</li>
          </ol>
        </div>
      </div>
    </AppShell>
  );
};

export const DifferentPage = () => {
  const [activeNav, setActiveNav] = useState('reviews');
  return (
    <AppShell
      appTitle="Reviews"
      pageTitle="Review response template"
      activeNavId={activeNav}
      onNavChange={setActiveNav}
      publishDisabled={false}
    >
      <div style={{ padding: 24, color: '#757575', fontSize: 14 }}>
        Content area for the reviews page.
      </div>
    </AppShell>
  );
};

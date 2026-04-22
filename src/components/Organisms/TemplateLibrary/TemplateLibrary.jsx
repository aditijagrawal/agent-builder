import React from 'react';
import TemplateCard from '../../Molecules/TemplateCard/TemplateCard';

const DEFAULT_TEMPLATES = [
  { id: '1', title: 'Review response agent replying using templates', description: 'Uses pre-defined templates and responds to reviews automatically.' },
  { id: '2', title: 'Review response agent replying autonomously', description: 'Uses AI to analyze review sentiment, generates and posts unique, context aware replies automatically.' },
  { id: '3', title: 'Review response agent replying after human approval', description: 'Uses AI to analyze review sentiment, generates and sends unique, context-aware replies for a human approval before posting.' },
  { id: '4', title: 'Review response agent suggesting replies in dashboard', description: 'Uses AI to analyze review sentiment, generates and shows unique, context-aware replies in the dashboard for one-click manual posting.' },
];

export default function TemplateLibrary({
  templates = DEFAULT_TEMPLATES,
  variant = 'grid',
  initialCount = 3,
  onUseTemplate,
  onSeeMore,
}) {
  const visible = variant === 'see-more' ? templates.slice(0, initialCount) : templates;
  const hasMore = variant === 'see-more' && templates.length > initialCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {visible.map((t) => (
          <TemplateCard
            key={t.id}
            title={t.title}
            description={t.description}
            onUse={() => onUseTemplate?.(t.id)}
          />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={() => onSeeMore?.()}
          style={{
            alignSelf: 'center',
            background: 'none',
            border: '1px solid #e5e9f0',
            borderRadius: 4,
            padding: '6px 16px',
            cursor: 'pointer',
            fontSize: 14,
            fontFamily: '"Roboto", sans-serif',
            color: '#1976d2',
            letterSpacing: '-0.28px',
            lineHeight: '20px',
          }}
        >
          See more
        </button>
      )}
    </div>
  );
}

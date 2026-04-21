import React from 'react';
import TemplateCard from '../../Molecules/TemplateCard/TemplateCard';

const DEFAULT_TEMPLATES = [
  { id: '1', title: 'Customer Support Agent', description: 'Handles customer inquiries, resolves tickets, and escalates complex issues to human agents automatically.' },
  { id: '2', title: 'Data Analysis Agent', description: 'Processes datasets, generates insights, and produces reports to help teams make data-driven decisions.' },
  { id: '3', title: 'Lead Qualification Agent', description: 'Evaluates inbound leads against qualification criteria and routes high-value prospects to the sales team.' },
  { id: '4', title: 'Onboarding Agent', description: 'Guides new users through product setup, answers common questions, and tracks onboarding milestone completion.' },
  { id: '5', title: 'Email Triage Agent', description: 'Sorts and prioritizes incoming emails, drafts responses, and flags urgent messages for immediate attention.' },
  { id: '6', title: 'Scheduling Agent', description: 'Manages calendar availability, books meetings across time zones, and sends reminders to all participants.' },
  { id: '7', title: 'Content Moderation Agent', description: 'Reviews user-generated content against community guidelines and takes automated action on policy violations.' },
  { id: '8', title: 'Billing Support Agent', description: 'Answers billing questions, processes refund requests, and updates subscription details for customers.' },
];

export default function TemplateLibrary({
  templates = DEFAULT_TEMPLATES,
  initialCount = 2,
  columns = 4,
  onUseTemplate,
  onSeeMore,
}) {
  const visible = templates.slice(0, initialCount);
  const hasMore = templates.length > initialCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(visible.length, columns)}, 1fr)`, gap: 24, justifyContent: 'center' }}>
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

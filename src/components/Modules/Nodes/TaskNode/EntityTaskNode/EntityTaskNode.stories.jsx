import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';

export default {
  title: 'Agent Builder/Modules/Nodes/TaskNode/EntityTaskNode',
  parameters: { layout: 'centered' },
};

const TASK_CARDS = [
  { label: 'Review', icon: 'grade' },
  { label: 'Ticketing', icon: 'confirmation_number' },
  { label: 'Contact', icon: 'group' },
  { label: 'Referral', icon: 'redeem' },
  { label: 'Surveys', icon: 'task_alt' },
  { label: 'External apps', icon: 'grid_view' },
];

export const LHSPreview = {
  render: () => (
    <div className="lhs-drawer" style={{ padding: '12px 24px' }}>
      {TASK_CARDS.map((card) => (
        <CardRow key={card.label} label={card.label} icon={card.icon} action="chevron" />
      ))}
    </div>
  ),
};

export const CanvasPreview = {
  render: () => (
    <div style={{ padding: 24, color: '#9e9e9e', fontFamily: 'sans-serif', fontSize: 14 }}>
      EntityTaskNode Canvas Preview — not yet implemented
    </div>
  ),
};

export const RHSPreview = {
  render: () => (
    <div style={{ padding: 24, color: '#9e9e9e', fontFamily: 'sans-serif', fontSize: 14 }}>
      EntityTaskNode RHS Preview — not yet implemented
    </div>
  ),
};

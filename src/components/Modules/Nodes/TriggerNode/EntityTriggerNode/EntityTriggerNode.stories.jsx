import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';

export default {
  title: 'Agent Builder/Modules/Nodes/TriggerNode/EntityTriggerNode',
  parameters: { layout: 'centered' },
};

const TRIGGER_CARDS = [
  { label: 'Reviews', icon: 'grade' },
  { label: 'Inbox', icon: 'sms' },
  { label: 'Listings', icon: 'location_on' },
  { label: 'Social', icon: 'workspaces' },
  { label: 'Surveys', icon: 'assignment_turned_in' },
  { label: 'Ticketing', icon: 'shapes' },
  { label: 'Contact', icon: 'group' },
  { label: 'External apps', icon: 'grid_view' },
];

export const LHSPreview = {
  render: () => (
    <div className="lhs-drawer" style={{ padding: '12px 24px' }}>
      {TRIGGER_CARDS.map((card) => (
        <CardRow key={card.label} label={card.label} icon={card.icon} action="chevron" />
      ))}
    </div>
  ),
};

export const CanvasPreview = {
  render: () => (
    <div style={{ padding: 24, color: '#9e9e9e', fontFamily: 'sans-serif', fontSize: 14 }}>
      EntityTriggerNode Canvas Preview — not yet implemented
    </div>
  ),
};

export const RHSPreview = {
  render: () => (
    <div style={{ padding: 24, color: '#9e9e9e', fontFamily: 'sans-serif', fontSize: 14 }}>
      EntityTriggerNode RHS Preview — not yet implemented
    </div>
  ),
};

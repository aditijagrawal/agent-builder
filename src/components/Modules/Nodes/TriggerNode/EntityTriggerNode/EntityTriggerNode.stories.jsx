import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import CanvasCard from '../../../../Molecules/Canvas/CanvasCard/CanvasCard';
import ConfigModal from '../../../ExpandedConfigModal/ConfigModal/ConfigModal';


export default {
  title: 'Agent Builder/Modules/Nodes/Trigger/EntityTrigger',
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
    <CanvasCard
      nodeType="trigger"
      label="Trigger"
      hasToggle
      toggleEnabled
      stepNumber={1}
      title="When a new review is received or updated"
      description="Reviews: Triggers on new or updated reviews across all sources and locations"
    />
  ),
};

export const ExpandedRHS = {
  render: () => <ConfigModal />,
};

export const RHSPreview = {
  render: () => null,
};

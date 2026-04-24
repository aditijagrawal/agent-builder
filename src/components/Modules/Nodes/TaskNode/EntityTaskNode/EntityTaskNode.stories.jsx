import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import CanvasCard from '../../../../Molecules/Canvas/CanvasCard/CanvasCard';
import ConfigModal from '../../../ExpandedConfigModal/ConfigModal/ConfigModal';


export default {
  title: 'Agent Builder/Modules/Nodes/Task/EntityTask',
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
    <CanvasCard
      nodeType="task"
      label="Task"
      hasToggle
      toggleEnabled
      stepNumber={2}
      title="Send a review response"
      description="Reviews: Post a reply to the selected review"
    />
  ),
};

export const ExpandedRHS = {
  render: () => <ConfigModal />,
};

export const RHSPreview = {
  render: () => null,
};

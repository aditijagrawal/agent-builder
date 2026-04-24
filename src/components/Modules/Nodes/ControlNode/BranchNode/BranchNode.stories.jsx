import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import CanvasCard from '../../../../Molecules/Canvas/CanvasCard/CanvasCard';
import ConfigModal from '../../../ExpandedConfigModal/ConfigModal/ConfigModal';

export default {
  title: 'Agent Builder/Modules/Nodes/Control/Branch',
  parameters: { layout: 'centered' },
};

export const LHSPreview = {
  render: () => (
    <div className="lhs-drawer" style={{ padding: '12px 24px' }}>
      <CardRow label="Branch" icon="account_tree" action="drag" />
    </div>
  ),
};

export const CanvasPreview = {
  render: () => (
    <CanvasCard
      nodeType="branch"
      label="Branch"
      hasToggle
      toggleEnabled
      hasAddButton
      stepNumber={3}
      title="Based on conditions"
      description="Build condition-specific flows"
    />
  ),
};

export const ExpandedRHS = {
  render: () => <ConfigModal />,
};

export const RHSPreview = {
  render: () => null,
};

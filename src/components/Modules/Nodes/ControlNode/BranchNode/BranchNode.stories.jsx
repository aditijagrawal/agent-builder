import React from 'react';
import { CardRow } from '../../../../LHSDrawer/LHSDrawer';
import '../../../../LHSDrawer/LHSDrawer.css';
import FlowNode from '../../../../FlowNode/FlowNode';
import BranchConfigPanel from '../../../../RHSDrawer/BranchConfigPanel';
import ConfigModal from '../../../ExpandedConfigModal/ConfigModal/ConfigModal';

export default {
  title: 'Agent Builder/Modules/Nodes/ControlNode/BranchNode',
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
    <FlowNode
      type="branch"
      title="Branch"
      stepNumber={3}
      description="Based on conditions"
      subtitle="Branch: Route by sentiment"
      hasToggle
      toggleEnabled
      onToggle={() => {}}
      onMoreClick={() => {}}
      onAddClick={() => {}}
      onDelete={() => {}}
    />
  ),
};

export const ExpandedRHS = {
  render: () => <ConfigModal />,
};

export const RHSPreview = {
  render: () => (
    <div style={{ height: 700 }}>
      <BranchConfigPanel
        branchName="Legal"
        description="Route reviews related to legal or compliance matters."
        conditionGroups={[
          [{ field: '1.Review.sentiment', operator: 'is equal to', value: 'Negative' }],
          [{ field: '3.identified_team', operator: 'is equal to', value: 'Legal' }],
        ]}
      />
    </div>
  ),
};

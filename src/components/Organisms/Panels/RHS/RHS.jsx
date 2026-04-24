import React from 'react';
import RHSSidePanelHeader from '../../../Molecules/RHS/RHSHeader/RHSHeader';
import RHSSidePanelFooter from '../../../Molecules/RHS/RHSFooter/RHSFooter';
import AgentDetailsBody from './AgentDetailsBody';
import LLMTaskBody from './LLMTaskBody';

const VARIANTS = {
  agentDetails: {
    body: AgentDetailsBody,
    showActions: false,
    showPromptStrength: false,
  },
  llmTask: {
    body: LLMTaskBody,
    showActions: true,
    showPromptStrength: true,
  },
};

export default function RHS({ variant = 'agentDetails', title, bodyProps, onClose, onSave, onPreview, onExpand }) {
  const config = VARIANTS[variant];
  const Body = config.body;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      width: 390,
      height: '100%',
      background: '#ffffff',
      borderLeft: '1px solid #e5e9f0',
      fontFamily: '"Roboto", arial, sans-serif',
    }}>
      <RHSSidePanelHeader
        title={title || 'Title'}
        onPreview={onPreview}
        onExpand={onExpand}
        onClose={onClose}
        showActions={config.showActions}
      />

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 15px',
        boxSizing: 'border-box',
      }}>
        <Body {...(bodyProps || {})} />
      </div>

      <RHSSidePanelFooter
        onSave={onSave}
        showPromptStrength={config.showPromptStrength}
        promptStrength="Weak"
        promptFillWidth={52}
        onViewSuggestions={() => {}}
      />
    </div>
  );
}

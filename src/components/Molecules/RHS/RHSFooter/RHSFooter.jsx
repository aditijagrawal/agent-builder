import React, { useState } from 'react';
import Button from '@birdeye/elemental/core/atoms/Button/index.js';
import CloseIcon from '../RHSHeader/icons/close.svg';

const font = '"Roboto", arial, sans-serif';

const SUGGESTIONS = [
  'Add examples of reviews and expected outputs to improve accuracy',
  'Specify what to return if no product or service is mentioned',
];

function PromptStrengthBar({ promptStrength, promptFillWidth, strengthColor, onToggle, toggleLabel }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 18 }}>
        <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', letterSpacing: '-0.24px', fontFamily: font, color: '#212121' }}>
          {'Prompt strength: '}
          <span style={{ color: strengthColor }}>{promptStrength}</span>
        </span>
        <button
          onClick={onToggle}
          style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, lineHeight: '18px', color: '#8f8f8f', fontFamily: font }}
        >
          {toggleLabel}
        </button>
      </div>
      <div style={{ position: 'relative', height: 5, width: '100%', borderRadius: 4, background: '#eaeaea' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, height: 5, width: promptFillWidth, borderRadius: 4, background: strengthColor }} />
      </div>
    </div>
  );
}

export default function RHSPanelFooter({
  onSave,
  saveLabel = 'Save',
  disabled = false,
  showPromptStrength = false,
  promptStrength = 'Weak',
  promptFillWidth = 52,
}) {
  const [expanded, setExpanded] = useState(false);

  const strengthColor = {
    Weak: '#de1b0c',
    Medium: '#fbc123',
    Strong: '#49a830',
  }[promptStrength] || '#de1b0c';

  return (
    <div style={{
      background: '#ffffff',
      borderBottom: '1px solid #e5e9f0',
      borderLeft: '1px solid #e5e9f0',
      borderRight: '1px solid #e5e9f0',
      borderRadius: '0 0 8px 8px',
      padding: '16px 16px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      boxShadow: expanded ? '0px 2px 12px 0px rgba(33,33,33,0.06)' : 'none',
      transition: 'box-shadow 0.2s ease',
    }}>
      {showPromptStrength && expanded && (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => setExpanded(false)}
              style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label="Close suggestions"
            >
              <img src={CloseIcon} alt="Close" style={{ width: 16, height: 16 }} />
            </button>
          </div>
          <p style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', letterSpacing: '-0.24px', color: '#8f8f8f', fontFamily: font, margin: 0 }}>
            Suggestions to improve your prompt
          </p>
          <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 0 }}>
            {SUGGESTIONS.map((s) => (
              <li key={s} style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', letterSpacing: '-0.24px', color: '#8f8f8f', fontFamily: font }}>
                {s}
              </li>
            ))}
          </ul>
        </>
      )}
      {showPromptStrength && (
        <PromptStrengthBar
          promptStrength={promptStrength}
          promptFillWidth={promptFillWidth}
          strengthColor={strengthColor}
          onToggle={() => setExpanded((v) => !v)}
          toggleLabel={expanded ? 'Hide' : 'View suggestions'}
        />
      )}
      <Button
        type="primary"
        label={saveLabel}
        expanded
        disabled={disabled}
        onClick={onSave}
      />
    </div>
  );
}

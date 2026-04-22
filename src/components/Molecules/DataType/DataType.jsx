import React from 'react';
import './DataType.css';

const VARIANT_CONFIG = {
  variable: { icon: 'data_object', label: 'Variable' },
  document: { icon: 'draft', label: 'Document' },
  link: { icon: 'link', label: 'link' },
  tool: { icon: 'build', label: 'Tool' },
};

export default function DataType({ type = 'variable', label, onRemove }) {
  const config = VARIANT_CONFIG[type];
  const displayLabel = label ?? config.label;

  return (
    <div className={`data-type data-type--${type}`}>
      <div className="data-type__icon-container">
        <span className="material-symbols-outlined">{config.icon}</span>
      </div>
      <span className="data-type__label">{displayLabel}</span>
      <button className="data-type__close" onClick={onRemove} aria-label="Remove">
        <span className="material-symbols-outlined">close</span>
      </button>
    </div>
  );
}

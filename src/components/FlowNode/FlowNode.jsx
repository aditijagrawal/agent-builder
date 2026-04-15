import React, { useState, useRef, useEffect } from 'react';
import Toggle from '@birdeye/elemental/core/atoms/Toggle/index.js';
import './FlowNode.css';

const ICON_CONFIG = {
  trigger: { icon: 'bolt', modifier: 'trigger' },
  task: { icon: 'description', modifier: 'task' },
  branch: { icon: 'call_split', modifier: 'branch' },
};

function CardNode({
  type,
  title,
  subtitle,
  stepNumber,
  description,
  hasAiIcon,
  hasToggle,
  toggleEnabled,
  onToggle,
  onMoreClick,
  onAddClick,
  onDelete,
}) {
  const config = ICON_CONFIG[type];
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToggle = (component, event) => {
    onToggle?.(event.target.checked);
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
    onMoreClick?.();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    onDelete?.();
  };

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className={`flow-node flow-node--card flow-node--${type}`}>
      <div className="flow-node__header">
        <div className="flow-node__header-left">
          <div className={`flow-node__icon-circle flow-node__icon-circle--${config.modifier}`}>
            <span className="material-symbols-outlined">{config.icon}</span>
          </div>
          <span className="flow-node__title">{title}</span>
        </div>
        <div className="flow-node__header-right">
          {hasAiIcon && (
            <div className="flow-node__ai-icon">
              <span className="material-symbols-outlined">auto_awesome</span>
            </div>
          )}
          {hasToggle && (
            <div className="flow-node__toggle">
              <Toggle
                name={`toggle-${type}`}
                checked={toggleEnabled}
                onChange={handleToggle}
                roundedToggle
              />
            </div>
          )}
          {type === 'branch' && (
            <button className="flow-node__action-btn flow-node__action-btn--add" onClick={onAddClick}>
              <span className="material-symbols-outlined">add_circle</span>
            </button>
          )}
          <div className="flow-node__more-wrapper" ref={menuRef}>
            <button className="flow-node__action-btn" onClick={handleMoreClick}>
              <span className="material-symbols-outlined">more_vert</span>
            </button>
            {menuOpen && (
              <div className="flow-node__context-menu">
                <button className="flow-node__context-menu-item flow-node__context-menu-item--delete" onClick={handleDelete}>
                  <span className="material-symbols-outlined">delete</span>
                  <span>Delete</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      {(stepNumber != null || description) && (
        <div className="flow-node__body">
          {stepNumber != null && description && (
            <ol className="flow-node__step" start={stepNumber}>
              <li><span>{description}</span></li>
            </ol>
          )}
          {subtitle && (
            <p className="flow-node__description">{subtitle}</p>
          )}
        </div>
      )}
    </div>
  );
}

function Connector({ onAddClick }) {
  return (
    <div className="flow-node flow-node--connector">
      <div className="flow-node__connector-line" />
      <button className="flow-node__add-btn" onClick={onAddClick}>
        <span className="material-symbols-outlined">add</span>
      </button>
      <div className="flow-node__connector-line" />
    </div>
  );
}

function LineConnector() {
  return (
    <div className="flow-node flow-node--line">
      <div className="flow-node__connector-line" />
    </div>
  );
}

function EndNode() {
  return (
    <div className="flow-node flow-node--end flow-node--end-chip-only">
      <div className="flow-node__end-chip">End</div>
    </div>
  );
}

export default function FlowNode({
  type = 'trigger',
  title,
  subtitle,
  stepNumber,
  description,
  hasAiIcon = false,
  hasToggle = false,
  toggleEnabled = false,
  onToggle,
  onMoreClick,
  onAddClick,
  onDelete,
}) {
  if (type === 'connector') {
    return <Connector onAddClick={onAddClick} />;
  }
  if (type === 'line') {
    return <LineConnector />;
  }
  if (type === 'end') {
    return <EndNode />;
  }
  return (
    <CardNode
      type={type}
      title={title}
      subtitle={subtitle}
      stepNumber={stepNumber}
      description={description}
      hasAiIcon={hasAiIcon}
      hasToggle={hasToggle}
      toggleEnabled={toggleEnabled}
      onToggle={onToggle}
      onMoreClick={onMoreClick}
      onAddClick={onAddClick}
      onDelete={onDelete}
    />
  );
}

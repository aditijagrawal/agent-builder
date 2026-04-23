import React, { useState, useRef, useEffect } from 'react';
import Toggle from '@birdeye/elemental/core/atoms/Toggle/index.js';
import Button from '@birdeye/elemental/core/atoms/Button/index.js';
import './CanvasNodeHeader.css';

const AddIcon = () => <span className="material-symbols-outlined cnh__btn-icon">add_circle</span>;
const MoreIcon = () => <span className="material-symbols-outlined cnh__btn-icon">more_vert</span>;
const DeleteIcon = () => <span className="material-symbols-outlined cnh__btn-icon cnh__btn-icon--delete">delete</span>;

const ICON_CONFIG = {
  trigger:  { icon: 'bolt',           modifier: 'trigger'  },
  task:     { icon: 'task_alt',       modifier: 'task'     },
  branch:   { icon: 'account_tree',   modifier: 'branch'   },
  parallel: { icon: 'splitscreen_add', modifier: 'parallel' },
  loop:     { icon: 'repeat',         modifier: 'loop'     },
};

export default function CanvasNodeHeader({
  nodeType = 'task',
  label,
  hasToggle = false,
  toggleEnabled = true,
  onToggleChange,
  hasAiIcon = false,
  hasAddButton = false,
  onAddClick,
  onMenuClick,
  onDelete,
}) {
  const config = ICON_CONFIG[nodeType] || ICON_CONFIG.task;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleMoreClick = (e) => {
    e.stopPropagation();
    setMenuOpen((v) => !v);
    onMenuClick?.();
  };

  const handleDelete = (e) => {
    e.stopPropagation();
    setMenuOpen(false);
    onDelete?.();
  };

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  return (
    <div className="cnh">
      <div className="cnh__left">
        <div className={`cnh__icon-circle cnh__icon-circle--${config.modifier}`}>
          <span className="material-symbols-outlined">{config.icon}</span>
        </div>
        <span className="cnh__label">{label}</span>
      </div>
      <div className="cnh__right">
        {hasAiIcon && (
          <div className="cnh__ai-icon">
            <span className="material-symbols-outlined">auto_awesome</span>
          </div>
        )}
        {hasToggle && (
          <Toggle
            name={`cnh-toggle-${nodeType}`}
            checked={toggleEnabled}
            onChange={(_, e) => onToggleChange?.(e.target.checked)}
            roundedToggle
          />
        )}
        {hasAddButton && (
          <Button type="link" customIcon={<AddIcon />} onClick={onAddClick} noHover aria-label="Add" />
        )}
        <div className="cnh__more-wrapper" ref={menuRef}>
          <Button type="link" customIcon={<MoreIcon />} onClick={handleMoreClick} noHover aria-label="More options" />
          {menuOpen && (
            <div className="cnh__context-menu">
              <button className="cnh__context-menu-item cnh__context-menu-item--delete" onClick={handleDelete}>
                <DeleteIcon />
                <span>Delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

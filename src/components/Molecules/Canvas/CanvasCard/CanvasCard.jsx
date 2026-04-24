import React, { useState } from 'react';
import CanvasNodeHeader from '../CanvasNodeHeader/CanvasNodeHeader';
import CanvasNodeBody from '../CanvasNodeBody/CanvasNodeBody';
import './CanvasCard.css';

export default function CanvasCard({
  nodeType = 'task',
  label,
  stepNumber,
  title,
  description,
  hasAiIcon = false,
  hasToggle = false,
  toggleEnabled = true,
  onToggleChange,
  hasAddButton = false,
  onAddClick,
  onDelete,
}) {
  const [on, setOn] = useState(toggleEnabled);

  const handleToggle = (val) => {
    setOn(val);
    onToggleChange?.(val);
  };

  return (
    <div className="canvas-card">
      <CanvasNodeHeader
        nodeType={nodeType}
        label={label}
        hasAiIcon={hasAiIcon}
        hasToggle={hasToggle}
        toggleEnabled={on}
        onToggleChange={handleToggle}
        hasAddButton={hasAddButton}
        onAddClick={onAddClick}
        onDelete={onDelete}
      />
      {(stepNumber != null || title) && (
        <CanvasNodeBody
          nodeType={nodeType}
          stepNumber={stepNumber}
          title={title}
          description={description}
        />
      )}
    </div>
  );
}

import React from 'react';
import FormInput from '@birdeye/elemental/core/atoms/FormInput/index.js';
import Button from '@birdeye/elemental/core/atoms/Button/index.js';
import './RHSDrawer.css';

export default function RHSDrawer({
  agentName = '',
  goals = '',
  outcomes = '',
  locations = [],
  moreLocationsCount = 0,
  onOpenLocations,
  onClose,
  onSave,
  onChange,
  isExpandedView = false,
  onToggleExpandedView,
}) {
  return (
    <div className={`rhs-drawer ${isExpandedView ? 'rhs-drawer--expanded' : ''}`}>
      <div className="rhs-drawer__header">
        <span className="rhs-drawer__header-title">Agent details</span>
        <div className="rhs-drawer__header-actions">
          {onToggleExpandedView && (
            <button
              className="rhs-drawer__icon-btn"
              onClick={onToggleExpandedView}
              aria-label={isExpandedView ? 'Collapse panel' : 'Expand panel'}
            >
              <span className="material-symbols-outlined">
                {isExpandedView ? 'close_fullscreen' : 'open_in_full'}
              </span>
            </button>
          )}
          <button className="rhs-drawer__icon-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>

      <div className="rhs-drawer__body">
        <div className="rhs-drawer__field">
          <FormInput
            name="agentName"
            type="text"
            label="Agent name *"
            value={agentName}
            placeholder="Enter agent name"
            onChange={(e, value) => onChange?.('agentName', value)}
          />
        </div>

        <div className="rhs-drawer__textarea">
          <label>
            Goals<span className="rhs-drawer__required"> *</span>
          </label>
          <textarea
            value={goals}
            placeholder="Enter goals"
            onChange={(e) => onChange?.('goals', e.target.value)}
          />
        </div>

        <div className="rhs-drawer__textarea">
          <label>Outcomes</label>
          <textarea
            value={outcomes}
            placeholder="Enter outcomes"
            onChange={(e) => onChange?.('outcomes', e.target.value)}
          />
        </div>

        <div className="rhs-drawer__locations">
          <div className="rhs-drawer__locations-label">
            <span>Locations</span>
            <span className="rhs-drawer__required">*</span>
            <span className="material-symbols-outlined">info</span>
          </div>
          <div className="rhs-drawer__chips">
            {locations.map((loc) => (
              <span key={loc.id} className="rhs-drawer__chip">
                {loc.id} - {loc.name}
              </span>
            ))}
          </div>
          {moreLocationsCount > 0 && (
            <button
              className="rhs-drawer__more-link"
              onClick={onOpenLocations}
            >
              + {moreLocationsCount} more
            </button>
          )}
          {locations.length === 0 && (
            <button
              className="rhs-drawer__add-condition"
              onClick={onOpenLocations}
            >
              <span className="material-symbols-outlined">add_circle</span>
              <span>Select locations</span>
            </button>
          )}
        </div>
      </div>

      <div className="rhs-drawer__footer">
        <Button
          theme="primary"
          label="Save"
          onClick={onSave}
        />
      </div>
    </div>
  );
}

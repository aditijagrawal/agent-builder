import React, { useState } from 'react';
import FormInput from '@birdeye/elemental/core/atoms/FormInput/index.js';
import Button from '@birdeye/elemental/core/atoms/Button/index.js';
import { Select, SelectItem } from '@birdeye/elemental/core/atoms/Select/index.js';
import AdvancedFiltersModal from './AdvancedFiltersModal';
import FieldsModal from './FieldsModal';
import './RHSDrawer.css';

const DEFAULT_CONDITION = { field: '', operator: '', value: '', logic: 'OR' };

const FIELD_OPTIONS = ['Source', 'Rating', 'Sentiment', 'Location', 'Language', 'Review.sentiment', 'identified_team'];
const OPERATOR_OPTIONS = ['is', 'is not', 'is equal to', 'is not equal to', 'contains', 'does not contain'];
const VALUE_OPTIONS = ['Google', 'Yelp', 'Facebook', 'TripAdvisor', 'All sources', 'Positive', 'Negative', 'Neutral'];

export default function TriggerConfigPanel({
  triggerName = '',
  description = '',
  conditions: initialConditions,
  onClose,
  onSave,
  onChange,
  isExpandedView = false,
  onToggleExpandedView,
}) {
  const [conditions, setConditions] = useState(
    initialConditions || [
      { logic: '', field: 'Review source', operator: 'is equal to', value: 'Google' },
      { logic: 'OR', field: 'Review source', operator: 'is equal to', value: 'Birdeye' },
    ]
  );
  const [isAdvancedFiltersOpen, setIsAdvancedFiltersOpen] = useState(false);
  const [activeModalIndex, setActiveModalIndex] = useState(null);

  const handleConditionChange = (index, key, value) => {
    const updated = conditions.map((c, i) =>
      i === index ? { ...c, [key]: value } : c
    );
    setConditions(updated);
    onChange?.('conditions', updated);
  };

  const addCondition = () => {
    const updated = [...conditions, { ...DEFAULT_CONDITION }];
    setConditions(updated);
    onChange?.('conditions', updated);
  };

  const removeCondition = (index) => {
    const updated = conditions.filter((_, i) => i !== index);
    setConditions(updated);
    onChange?.('conditions', updated);
  };

  return (
    <div className={`rhs-drawer ${isExpandedView ? 'rhs-drawer--expanded' : ''}`}>
      <div className="rhs-drawer__header">
        <span className="rhs-drawer__header-title">Trigger</span>
        <div className="rhs-drawer__header-actions">
          <button className="rhs-drawer__icon-btn">
            <span className="material-symbols-outlined">play_arrow</span>
          </button>
          {onToggleExpandedView && (
            <button
              className="rhs-drawer__icon-btn"
              onClick={onToggleExpandedView}
              aria-label={isExpandedView ? 'Collapse trigger panel' : 'Expand trigger panel'}
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
            name="triggerName"
            type="text"
            label="Trigger name *"
            value={triggerName}
            placeholder="Enter trigger name"
            onChange={(e, value) => onChange?.('triggerName', value)}
          />
        </div>

        <div className="rhs-drawer__textarea">
          <label>
            Description<span className="rhs-drawer__required"> *</span>
          </label>
          <textarea
            value={description}
            placeholder="Enter description"
            onChange={(e) => onChange?.('description', e.target.value)}
          />
        </div>

        <div className="rhs-drawer__section">
          <div className="rhs-drawer__section-label">Trigger conditions</div>

          <div className="rhs-drawer__conditions-card">
            {conditions.map((cond, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && (
                  <div className="rhs-drawer__logic-select-wrap">
                    <select
                      className="rhs-drawer__logic-select"
                      value={cond.logic || 'OR'}
                      onChange={(e) => handleConditionChange(idx, 'logic', e.target.value)}
                    >
                      <option value="OR">OR</option>
                      <option value="AND">AND</option>
                    </select>
                    <span className="material-symbols-outlined rhs-drawer__logic-chevron">expand_more</span>
                  </div>
                )}
                
                {/* Field variable selector row */}
                <div
                  className="rhs-drawer__var-select"
                  onClick={() => setActiveModalIndex(idx)}
                  style={{ marginBottom: 8 }}
                >
                  <div className="rhs-drawer__var-chip">
                    {/* {+} icon */}
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{flexShrink: 0}}>
                      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#1976D2" fill="#E3F2FD"/>
                      <text x="8" y="11.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1976D2" fontFamily="monospace">+</text>
                    </svg>
                    <span className="rhs-drawer__var-chip-label">{cond.field || 'Select field'}</span>
                    <button
                      className="rhs-drawer__var-chip-remove"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCondition(idx);
                      }}
                    >
                      <span className="material-symbols-outlined">close</span>
                    </button>
                  </div>
                  <span className="material-symbols-outlined rhs-drawer__var-chevron">expand_more</span>
                </div>

                {/* Operator */}
                <div className="rhs-drawer__stacked-select" style={{ marginBottom: 8 }}>
                  <Select
                    value={cond.operator || undefined}
                    onChange={(e, val) => handleConditionChange(idx, 'operator', val)}
                    placeHolder="Operator"
                    variant="outlined"
                  >
                    {OPERATOR_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </Select>
                </div>

                {/* Value */}
                <div className="rhs-drawer__stacked-select">
                  <Select
                    value={cond.value || undefined}
                    onChange={(e, val) => handleConditionChange(idx, 'value', val)}
                    placeHolder="Value"
                    variant="outlined"
                  >
                    {VALUE_OPTIONS.map((opt) => (
                      <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                    ))}
                  </Select>
                </div>
              </React.Fragment>
            ))}

            <button className="rhs-drawer__add-condition" onClick={addCondition} style={{ marginTop: 12 }}>
              <span className="material-symbols-outlined">add_circle</span>
              <span>Add condition</span>
            </button>
          </div>
        </div>

        <button 
          className="rhs-drawer__advanced-link" 
          style={{ alignSelf: 'flex-start', margin: '16px 0 24px 0' }}
          onClick={() => setIsAdvancedFiltersOpen(true)}
        >
          Advanced filters
        </button>

        <div className="rhs-drawer__section">
          <div className="rhs-drawer__section-label">Preview</div>
          <div style={{ background: '#f5f5f5', borderRadius: 4, padding: 12, marginTop: 8, fontFamily: 'monospace', fontSize: 13, color: '#555' }}>
            <span style={{ color: '#8f8f8f', display: 'block', marginBottom: 8 }}>IF</span>
            <span style={{ color: '#212121' }}>Review.source == ("Google" || "Birdeye");</span>
          </div>
        </div>
      </div>

      <div className="rhs-drawer__footer">
        <Button theme="primary" label="Save" onClick={onSave} />
      </div>

      <AdvancedFiltersModal 
        isOpen={isAdvancedFiltersOpen} 
        onClose={() => setIsAdvancedFiltersOpen(false)} 
      />

      {activeModalIndex !== null && (
        <FieldsModal 
          isOpen={true} 
          onClose={() => setActiveModalIndex(null)}
          selectedValue={conditions[activeModalIndex]?.field}
          onSelect={(field) => {
             handleConditionChange(activeModalIndex, 'field', field);
             setActiveModalIndex(null);
          }}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import FormInput from '@birdeye/elemental/core/atoms/FormInput/index.js';
import Button from '@birdeye/elemental/core/atoms/Button/index.js';
import { Select, SelectItem } from '@birdeye/elemental/core/atoms/Select/index.js';
import './RHSDrawer.css';

const DEFAULT_CONDITION = { field: '', operator: '', value: '' };

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
}) {
  const [conditions, setConditions] = useState(
    initialConditions || [
      { ...DEFAULT_CONDITION },
      { ...DEFAULT_CONDITION },
      { ...DEFAULT_CONDITION },
    ]
  );

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

  return (
    <div className="rhs-drawer">
      <div className="rhs-drawer__header">
        <span className="rhs-drawer__header-title">Trigger</span>
        <div className="rhs-drawer__header-actions">
          <button className="rhs-drawer__icon-btn">
            <span className="material-symbols-outlined">play_arrow</span>
          </button>
          <button className="rhs-drawer__icon-btn">
            <span className="material-symbols-outlined">open_in_full</span>
          </button>
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
              <div key={idx} className="rhs-drawer__stacked-select">
                <Select
                  value={cond.field || undefined}
                  onChange={(e, val) => handleConditionChange(idx, 'field', val)}
                  placeHolder="Select"
                  variant="outlined"
                >
                  {FIELD_OPTIONS.map((opt) => (
                    <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                  ))}
                </Select>
              </div>
            ))}

            <button className="rhs-drawer__add-condition" onClick={addCondition}>
              <span className="material-symbols-outlined">add_circle</span>
              <span>Add condition</span>
            </button>
          </div>
        </div>
      </div>

      <div className="rhs-drawer__footer">
        <Button theme="primary" label="Save" onClick={onSave} />
      </div>
    </div>
  );
}

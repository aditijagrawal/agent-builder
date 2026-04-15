import React, { useState } from 'react';
import FormInput from '@birdeye/elemental/core/atoms/FormInput/index.js';
import Button from '@birdeye/elemental/core/atoms/Button/index.js';
import { Select, SelectItem } from '@birdeye/elemental/core/atoms/Select/index.js';
import './RHSDrawer.css';

const FIELD_OPTIONS = ['1.Review.sentiment', '2.Review.rating', '3.identified_team', '4.Review.source', '5.Review.language'];
const OPERATOR_OPTIONS = ['is equal to', 'is not equal to', 'is greater than', 'is less than', 'contains', 'does not contain'];
const BASED_ON_OPTIONS = ['Conditions', 'Expression', 'AI classification'];

const DEFAULT_GROUP = [
  { field: '1.Review.sentiment', value: 'Negative' },
];

export default function BranchConfigPanel({
  branchName = '',
  description = '',
  basedOn = 'Conditions',
  conditionGroups: initialGroups,
  onClose,
  onSave,
  onChange,
  isExpandedView = false,
  onToggleExpandedView,
}) {
  const [conditionGroups, setConditionGroups] = useState(
    initialGroups || [
      [{ field: '1.Review.sentiment', operator: 'is equal to', value: 'Negative' }],
      [{ field: '3.identified_team', operator: 'is equal to', value: 'Legal' }],
    ]
  );

  const updateGroups = (newGroups) => {
    setConditionGroups(newGroups);
    onChange?.('conditionGroups', newGroups);
  };

  const handleConditionChange = (groupIdx, condIdx, key, value) => {
    const updated = conditionGroups.map((group, gi) =>
      gi === groupIdx
        ? group.map((cond, ci) => (ci === condIdx ? { ...cond, [key]: value } : cond))
        : group
    );
    updateGroups(updated);
  };

  const removeFieldTag = (groupIdx, condIdx) => {
    const group = conditionGroups[groupIdx];
    if (group.length <= 1 && conditionGroups.length <= 1) return;
    if (group.length <= 1) {
      updateGroups(conditionGroups.filter((_, gi) => gi !== groupIdx));
    } else {
      const updated = conditionGroups.map((g, gi) =>
        gi === groupIdx ? g.filter((_, ci) => ci !== condIdx) : g
      );
      updateGroups(updated);
    }
  };

  const addCondition = () => {
    // Add to last group
    const lastIdx = conditionGroups.length - 1;
    const updated = conditionGroups.map((g, gi) =>
      gi === lastIdx
        ? [...g, { field: '', operator: 'is equal to', value: '' }]
        : g
    );
    updateGroups(updated);
  };

  return (
    <div className={`rhs-drawer ${isExpandedView ? 'rhs-drawer--expanded' : ''}`}>
      <div className="rhs-drawer__header">
        <span className="rhs-drawer__header-title">Branch</span>
        <div className="rhs-drawer__header-actions">
          <button className="rhs-drawer__icon-btn">
            <span className="material-symbols-outlined">play_arrow</span>
          </button>
          {onToggleExpandedView && (
            <button
              className="rhs-drawer__icon-btn"
              onClick={onToggleExpandedView}
              aria-label={isExpandedView ? 'Collapse branch panel' : 'Expand branch panel'}
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
            name="branchName"
            type="text"
            label="Branch name *"
            value={branchName}
            placeholder="Enter name"
            onChange={(e, value) => onChange?.('branchName', value)}
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
          <div className="rhs-drawer__section-label">
            Based on<span className="rhs-drawer__required"> *</span>
          </div>
          <div className="rhs-drawer__stacked-select">
            <Select
              value={basedOn}
              onChange={(e, val) => onChange?.('basedOn', val)}
              placeHolder="Select..."
              variant="outlined"
            >
              {BASED_ON_OPTIONS.map((opt) => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </Select>
          </div>
        </div>

        <div className="rhs-drawer__section">
          <div className="rhs-drawer__section-label">Filter conditions</div>

          {conditionGroups.map((group, groupIdx) => (
            <React.Fragment key={groupIdx}>
              {groupIdx > 0 && (
                <div className="rhs-drawer__or-separator">
                  <span className="rhs-drawer__or-text">OR</span>
                  <span className="material-symbols-outlined rhs-drawer__or-chevron">expand_more</span>
                </div>
              )}
              <div className="rhs-drawer__conditions-card">
                {group.map((cond, condIdx) => (
                  <React.Fragment key={condIdx}>
                    {/* Field tag row */}
                    <div className="rhs-drawer__tag-select">
                      <div className="rhs-drawer__tag-chip">
                        <span className="rhs-drawer__tag-icon">{'{x}'}</span>
                        <span className="rhs-drawer__tag-label">{cond.field || 'Select field'}</span>
                        <button
                          className="rhs-drawer__tag-remove"
                          onClick={() => removeFieldTag(groupIdx, condIdx)}
                        >
                          <span className="material-symbols-outlined">close</span>
                        </button>
                      </div>
                      <div className="rhs-drawer__tag-select-dropdown">
                        <Select
                          value={cond.field || undefined}
                          onChange={(e, val) => handleConditionChange(groupIdx, condIdx, 'field', val)}
                          placeHolder=""
                          variant="outlined"
                        >
                          {FIELD_OPTIONS.map((opt) => (
                            <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                          ))}
                        </Select>
                      </div>
                    </div>

                    {/* Operator */}
                    <div className="rhs-drawer__stacked-select">
                      <Select
                        value={cond.operator}
                        onChange={(e, val) => handleConditionChange(groupIdx, condIdx, 'operator', val)}
                        placeHolder="Select operator"
                        variant="outlined"
                      >
                        {OPERATOR_OPTIONS.map((opt) => (
                          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                        ))}
                      </Select>
                    </div>

                    {/* Value */}
                    <div className="rhs-drawer__stacked-input">
                      <input
                        type="text"
                        className="rhs-drawer__condition-value-input"
                        value={cond.value}
                        placeholder="Enter value"
                        onChange={(e) => handleConditionChange(groupIdx, condIdx, 'value', e.target.value)}
                      />
                    </div>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}

          <button className="rhs-drawer__add-condition" onClick={addCondition}>
            <span className="material-symbols-outlined">add_circle</span>
            <span>Add condition</span>
          </button>
        </div>

        <button className="rhs-drawer__advanced-link">
          Advanced filters
        </button>
      </div>

      <div className="rhs-drawer__footer">
        <Button theme="primary" label="Save" onClick={onSave} />
      </div>
    </div>
  );
}

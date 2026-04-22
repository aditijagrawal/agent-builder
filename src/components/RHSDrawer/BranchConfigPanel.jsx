import React, { useState } from 'react';
import FormInput from '@birdeye/elemental/core/atoms/FormInput/index.js';
import { Select, SelectItem } from '@birdeye/elemental/core/atoms/Select/index.js';
import RHSPanelHeader from '../Molecules/RHSPanel/RHSPanelHeader/RHSPanelHeader';
import RHSPanelFooter from '../Molecules/RHSPanel/RHSPanelFooter/RHSPanelFooter';

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

  const font = '"Roboto", arial, sans-serif';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: 390, height: '100%', background: '#ffffff', borderLeft: '1px solid #e5e9f0', fontFamily: font }}>
      <RHSPanelHeader
        title="Branch"
        showActions
        onPreview={onClose}
        onExpand={onClose}
        onClose={onClose}
      />

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px 15px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 20 }}>
        <FormInput
          name="branchName"
          type="text"
          label="Branch name *"
          value={branchName}
          placeholder="Enter name"
          onChange={(e, value) => onChange?.('branchName', value)}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#212121', fontFamily: font }}>Description</span>
            <span style={{ fontSize: 12, lineHeight: '18px', color: '#de1b0c', fontFamily: font }}>*</span>
          </div>
          <textarea
            value={description}
            placeholder="Enter description"
            onChange={(e) => onChange?.('description', e.target.value)}
            style={{ width: '100%', height: 80, border: '1px solid #e5e9f0', borderRadius: 4, padding: '8px 12px', fontSize: 14, fontFamily: font, resize: 'none', boxSizing: 'border-box', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#212121', fontFamily: font }}>Based on</span>
            <span style={{ fontSize: 12, lineHeight: '18px', color: '#de1b0c', fontFamily: font }}>*</span>
          </div>
          <Select value={basedOn} onChange={(e, val) => onChange?.('basedOn', val)} placeHolder="Select..." variant="outlined">
            {BASED_ON_OPTIONS.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
          </Select>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#212121', fontFamily: font }}>Filter conditions</span>

          {conditionGroups.map((group, groupIdx) => (
            <React.Fragment key={groupIdx}>
              {groupIdx > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, padding: '4px 0' }}>
                  <span style={{ fontSize: 12, color: '#8f8f8f', fontFamily: font }}>OR</span>
                  <i className="icon_phoenix-expand_more" style={{ fontSize: 16, color: '#8f8f8f' }} />
                </div>
              )}
              <div style={{ border: '1px solid #e5e9f0', borderRadius: 4, padding: '12px 10px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {group.map((cond, condIdx) => (
                  <React.Fragment key={condIdx}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 4, border: '1px solid #e5e9f0', borderRadius: 4, padding: '0 8px', height: 28, flex: 1, minWidth: 0 }}>
                        <span style={{ fontSize: 12, color: '#555555', fontFamily: font }}>{'{x}'}</span>
                        <span style={{ fontSize: 12, color: '#212121', fontFamily: font, flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cond.field || 'Select field'}</span>
                        <button onClick={() => removeFieldTag(groupIdx, condIdx)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                          <i className="icon_phoenix-close" style={{ fontSize: 16, color: '#8f8f8f' }} />
                        </button>
                      </div>
                      <div style={{ width: 120, flexShrink: 0 }}>
                        <Select value={cond.field || undefined} onChange={(e, val) => handleConditionChange(groupIdx, condIdx, 'field', val)} placeHolder="" variant="outlined">
                          {FIELD_OPTIONS.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                        </Select>
                      </div>
                    </div>
                    <Select value={cond.operator} onChange={(e, val) => handleConditionChange(groupIdx, condIdx, 'operator', val)} placeHolder="Select operator" variant="outlined">
                      {OPERATOR_OPTIONS.map((opt) => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                    </Select>
                    <input
                      type="text"
                      value={cond.value}
                      placeholder="Enter value"
                      onChange={(e) => handleConditionChange(groupIdx, condIdx, 'value', e.target.value)}
                      style={{ width: '100%', height: 36, border: '1px solid #e5e9f0', borderRadius: 4, padding: '0 12px', fontSize: 14, fontFamily: font, outline: 'none', boxSizing: 'border-box' }}
                    />
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}

          <button onClick={addCondition} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
            <i className="icon_phoenix-add_circle" style={{ fontSize: 20, color: '#1976d2' }} />
            <span style={{ fontSize: 12, lineHeight: '18px', color: '#1976d2', fontFamily: font }}>Add condition</span>
          </button>
        </div>

        <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontSize: 12, color: '#1976d2', fontFamily: font, textAlign: 'left' }}>
          Advanced filters
        </button>
      </div>

      <RHSPanelFooter onSave={onSave} />
    </div>
  );
}

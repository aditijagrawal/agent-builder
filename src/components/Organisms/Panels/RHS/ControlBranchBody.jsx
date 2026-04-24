import React, { useState } from 'react';
import SingleSelect from '@birdeye/elemental/core/atoms/SingleSelect/index.js';

const font = '"Roboto", arial, sans-serif';

const BASED_ON_OPTIONS = [
  { value: 'conditions', label: 'Conditions' },
  { value: 'field_value', label: 'Field value' },
  { value: 'step_output', label: 'Step output' },
];

function SectionLabel({ label, required }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 18 }}>
      <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#212121', fontFamily: font }}>
        {label}
      </span>
      {required && <span style={{ fontSize: 12, lineHeight: '18px', color: '#de1b0c', fontFamily: font }}>*</span>}
    </div>
  );
}

function BranchItem({ index, name }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '8px 12px', border: '1px solid #e5e9f0', borderRadius: 4,
      background: '#fff', gap: 8,
    }}>
      <span style={{ fontSize: 14, lineHeight: '20px', color: '#212121', fontFamily: font, letterSpacing: '-0.28px' }}>
        {index + 1}. {name}
      </span>
      <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#8f8f8f', flexShrink: 0 }}>
        drag_indicator
      </span>
    </div>
  );
}

export default function ControlBranchBody({ initialValues = {} }) {
  const [basedOn, setBasedOn] = useState(initialValues.basedOn ?? 'conditions');
  const [branches, setBranches] = useState(initialValues.branches ?? []);
  const [nextId, setNextId] = useState((initialValues.branches?.length ?? 0) + 1);

  function addBranch() {
    setBranches((prev) => [...prev, { id: nextId, name: `Branch ${nextId}` }]);
    setNextId((n) => n + 1);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <SectionLabel label="Based on" required />
        <SingleSelect
          name="basedOn"
          selected={basedOn}
          options={BASED_ON_OPTIONS}
          onChange={(opt) => setBasedOn(opt.value)}
          placeholder="Select"
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <SectionLabel label="Branches" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {branches.map((b, i) => (
            <BranchItem key={b.id} index={i} name={b.name} />
          ))}
        </div>
        <button
          onClick={addBranch}
          style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: '4px 0', cursor: 'pointer', alignSelf: 'flex-start' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: 20, color: '#1976d2' }}>add_circle</span>
          <span style={{ fontSize: 14, lineHeight: '20px', color: '#1976d2', fontFamily: font }}>Add</span>
        </button>
      </div>
    </div>
  );
}

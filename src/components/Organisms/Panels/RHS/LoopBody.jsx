import React, { useState } from 'react';
import FormInput from '@birdeye/elemental/core/atoms/FormInput/index.js';
import TextArea from '@birdeye/elemental/core/atoms/TextArea/index.js';
import SingleSelect from '@birdeye/elemental/core/atoms/SingleSelect/index.js';

const font = '"Roboto", arial, sans-serif';

const LOOP_OVER_OPTIONS = [
  { value: 'reviews_list', label: '{{reviews_list}}' },
  { value: 'items', label: '{{items}}' },
  { value: 'contacts', label: '{{contacts}}' },
  { value: 'results', label: '{{results}}' },
];

function RadioOption({ label, value, selected, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', userSelect: 'none' }}>
      <div style={{ position: 'relative', width: 16, height: 16, flexShrink: 0 }}>
        <input
          type="radio"
          value={value}
          checked={selected === value}
          onChange={() => onChange(value)}
          style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', margin: 0, cursor: 'pointer' }}
        />
        <div style={{
          width: 16, height: 16, borderRadius: '50%',
          border: `2px solid ${selected === value ? '#1976d2' : '#bdbdbd'}`,
          background: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxSizing: 'border-box',
        }}>
          {selected === value && (
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#1976d2' }} />
          )}
        </div>
      </div>
      <span style={{ fontSize: 14, lineHeight: '20px', color: '#212121', fontFamily: font }}>{label}</span>
    </label>
  );
}

function SectionLabel({ label, showInfo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 18 }}>
      <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', letterSpacing: '-0.24px', color: '#212121', fontFamily: font }}>
        {label}
      </span>
      {showInfo && <i className="icon_phoenix-info" style={{ fontSize: 16, color: '#8f8f8f', cursor: 'pointer' }} />}
    </div>
  );
}

export default function LoopBody({ initialValues = {} }) {
  const [name, setName] = useState(initialValues.name ?? '');
  const [description, setDescription] = useState(initialValues.description ?? '');
  const [loopMode, setLoopMode] = useState(initialValues.loopMode ?? 'manual');
  const [loopOver, setLoopOver] = useState(initialValues.loopOver ?? null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <FormInput
        name="loopName"
        type="text"
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <TextArea
        name="description"
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        noFloatingLabel
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#212121', fontFamily: font }}>
          How should this loop run?
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <RadioOption label="Manual" value="manual" selected={loopMode} onChange={setLoopMode} />
          <RadioOption label="Set from variable" value="variable" selected={loopMode} onChange={setLoopMode} />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <SectionLabel label="Loop over" showInfo />
        <SingleSelect
          name="loopOver"
          selected={loopOver}
          options={LOOP_OVER_OPTIONS}
          onChange={(opt) => setLoopOver(opt.value)}
          placeholder="Select variable"
        />
      </div>
    </div>
  );
}

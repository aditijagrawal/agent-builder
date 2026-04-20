import React, { useState } from 'react';
import FormInput from '@birdeye/elemental/core/atoms/FormInput/index.js';
import TextArea from '@birdeye/elemental/core/atoms/TextArea/index.js';

const font = '"Roboto", arial, sans-serif';

export default function AgentDetailsBody() {
  const [values, setValues] = useState({ agentName: '', goals: '', outcomes: '' });
  const set = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      <FormInput
        name="agentName"
        type="text"
        label="Agent name"
        value={values.agentName}
        onChange={set('agentName')}
        required
      />
      <TextArea
        name="goals"
        label="Goals"
        value={values.goals}
        onChange={set('goals')}
        required
        noFloatingLabel
      />
      <TextArea
        name="outcomes"
        label="Outcomes"
        value={values.outcomes}
        onChange={set('outcomes')}
        noFloatingLabel
      />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 400, lineHeight: '18px', fontFamily: font }}>
          <span style={{ color: '#212121' }}>Locations</span>
          <span style={{ color: '#de1b0c' }}>*</span>
          <i className="icon_phoenix-info" style={{ fontSize: 16, color: '#8f8f8f', cursor: 'pointer' }} />
        </div>
        <span onClick={() => {}} style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: '#1976d2', cursor: 'pointer', fontFamily: font }}>
          + Add
        </span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import FormInput from '@birdeye/elemental/core/atoms/FormInput/index.js';
import TextArea from '@birdeye/elemental/core/atoms/TextArea/index.js';
import Button from '@birdeye/elemental/core/atoms/Button/index.js';
import SingleSelect from '@birdeye/elemental/core/atoms/SingleSelect/index.js';
import CloseIcon from '../../RHSPanelHeader/icons/close.svg';
import ExpandAllIcon from '../../RHSPanelHeader/icons/expand_all.svg';

const font = '"Roboto", arial, sans-serif';

export default function ScheduleBased({
  onClose,
  onExpand,
  onSave,
  frequencyOptions = [],
  dayOptions = [],
  timeOptions = [],
  defaultFrequency,
  defaultDay,
  defaultTime,
}) {
  const [frequency, setFrequency] = useState(defaultFrequency ?? frequencyOptions[0] ?? '');
  const [day, setDay] = useState(defaultDay ?? dayOptions[0] ?? '');
  const [time, setTime] = useState(defaultTime ?? timeOptions[0] ?? '');

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', background: '#ffffff',
      border: '1px solid #e5e9f0', borderRadius: 8, width: '100%',
      height: '100%', overflow: 'hidden', position: 'relative', boxSizing: 'border-box',
    }}>
      {/* Header — sticky */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, height: 54,
        padding: '0 16px', background: '#ffffff', flexShrink: 0,
        position: 'sticky', top: 0, zIndex: 1,
      }}>
        <span style={{
          flex: 1, fontSize: 16, fontWeight: 400, lineHeight: '24px',
          letterSpacing: '-0.32px', color: '#555555', fontFamily: font,
        }}>
          Trigger
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, borderRadius: 4 }}>
            <i className="icon_phoenix-play_arrow" style={{ fontSize: 16, color: '#212121' }} />
          </button>
          <button onClick={onExpand} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>
            <img src={ExpandAllIcon} alt="Expand" style={{ width: 24, height: 24, transform: 'rotate(90deg)' }} />
          </button>
          <button onClick={onClose} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24 }}>
            <img src={CloseIcon} alt="Close" style={{ width: 24, height: 24 }} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 20,
        padding: '2px 16px 100px', overflowY: 'auto', flex: 1,
      }}>
        {/* Trigger name — read only */}
        <FormInput
          name="triggerName"
          type="text"
          label="Trigger name"
          value="Schedule based"
          readOnly
          required
        />

        {/* Description — read only */}
        <TextArea
          name="description"
          label="Description"
          value="Runs the workflow on a set schedule"
          readOnly
          required
          noFloatingLabel
        />

        {/* Frequency */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 18 }}>
            <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#212121', fontFamily: font }}>Frequency</span>
            <span style={{ fontSize: 12, lineHeight: '18px', color: '#de1b0c', fontFamily: font }}>*</span>
          </div>
          <SingleSelect
            name="frequency"
            selected={frequency}
            options={frequencyOptions.map((opt) => ({ value: opt, label: opt }))}
            onChange={(opt) => setFrequency(opt.value)}
            placeholder="Select frequency"
          />
        </div>

        {/* Day */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 18 }}>
            <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#212121', fontFamily: font }}>Day</span>
            <span style={{ fontSize: 12, lineHeight: '18px', color: '#de1b0c', fontFamily: font }}>*</span>
          </div>
          <SingleSelect
            name="day"
            selected={day}
            options={dayOptions.map((opt) => ({ value: opt, label: opt }))}
            onChange={(opt) => setDay(opt.value)}
            placeholder="Select day"
          />
        </div>

        {/* Time */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 18 }}>
            <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', color: '#212121', fontFamily: font }}>Time</span>
            <span style={{ fontSize: 12, lineHeight: '18px', color: '#de1b0c', fontFamily: font }}>*</span>
          </div>
          <SingleSelect
            name="time"
            selected={time}
            options={timeOptions.map((opt) => ({ value: opt, label: opt }))}
            onChange={(opt) => setTime(opt.value)}
            placeholder="Select time"
          />
        </div>
      </div>

      {/* Footer — sticky at bottom */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '20px 16px', background: '#ffffff',
        borderTop: '1px solid #e5e9f0',
      }}>
        <Button
          theme="primary"
          label="Save"
          onClick={() => onSave?.({ frequency, day, time })}
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}

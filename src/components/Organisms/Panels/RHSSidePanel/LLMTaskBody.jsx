import React, { useState, useRef, useEffect } from 'react';
import FormInput from '@birdeye/elemental/core/atoms/FormInput/index.js';
import TextArea from '@birdeye/elemental/core/atoms/TextArea/index.js';
import ExpandAllIcon from '../../../Molecules/RHSPanel/RHSPanelHeader/icons/expand_all.svg';
import CloseIcon from '../../../Molecules/RHSPanel/RHSPanelHeader/icons/close.svg';
import AiWandIcon from './icons/ai_text_grammar_wand.svg';
import DotsIcon from './icons/dots.svg';
import AddOutputFieldModal from './AddOutputFieldModal';
import FieldPickerModal from './FieldPickerModal';

const font = '"Roboto", arial, sans-serif';

const MOCK_GENERATED_FIELDS = [
  'sentiment_score',
  'key_themes',
  'staff_rating',
  'overall_experience',
  'recommendation_likelihood',
];

function FieldLabel({ label, required, showInfo }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 18 }}>
      <span style={{ fontSize: 12, fontWeight: 400, lineHeight: '18px', letterSpacing: '-0.24px', color: '#212121', fontFamily: font, whiteSpace: 'nowrap' }}>
        {label}
      </span>
      {required && <span style={{ fontSize: 12, lineHeight: '18px', color: '#de1b0c', fontFamily: font }}>*</span>}
      {showInfo && <i className="icon_phoenix-info" style={{ fontSize: 16, color: '#8f8f8f', cursor: 'pointer' }} />}
    </div>
  );
}

function AddBox({ onAdd, children }) {
  return (
    <div style={{ border: '1px solid #e5e9f0', borderRadius: 4, padding: '16px 10px', width: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column', gap: 24 }}>
      <button onClick={onAdd} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
        <i className="icon_phoenix-add_circle" style={{ fontSize: 20, color: '#1976d2' }} />
        <span style={{ fontSize: 12, lineHeight: '18px', letterSpacing: '-0.24px', color: '#1976d2', fontFamily: font }}>Add</span>
      </button>
      {children}
    </div>
  );
}

function LLMModelDropdown({ value, onChange }) {
  return (
    <div style={{ position: 'relative' }}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%', height: 36, border: '1px solid #e5e9f0', borderRadius: 4,
          padding: '0 12px', fontSize: 14, fontWeight: 400, lineHeight: '20px',
          color: '#212121', fontFamily: font, background: '#ffffff',
          appearance: 'none', cursor: 'pointer', boxSizing: 'border-box',
        }}
      >
        <option value="Fast">Fast</option>
        <option value="Standard">Standard</option>
        <option value="Advanced">Advanced</option>
      </select>
      <div style={{ position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
        <i className="icon_phoenix-expand_more" style={{ fontSize: 20, color: '#212121' }} />
      </div>
    </div>
  );
}

function PromptTextArea({ value, onChange, placeholder, height, showBuildIcon, iconBottom, onFieldIconClick }) {
  return (
    <div style={{ position: 'relative', border: '1px solid #e5e9f0', borderRadius: 4, height, boxSizing: 'border-box', background: '#ffffff', width: '100%' }}>
      <textarea
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          width: '100%', height: '100%', border: 'none', outline: 'none', resize: 'none',
          padding: '8px 12px 36px', fontSize: 14, fontWeight: 400, lineHeight: '20px',
          letterSpacing: '-0.28px', color: '#212121', fontFamily: font,
          boxSizing: 'border-box', background: 'transparent',
        }}
      />
      <div style={{ position: 'absolute', bottom: iconBottom, left: 11, display: 'flex', alignItems: 'center', gap: 10, height: 20 }}>
        <i className="icon_phoenix-data_object" style={{ fontSize: 16, color: '#555555', cursor: 'pointer' }} onClick={onFieldIconClick} />
        {showBuildIcon && <i className="icon_phoenix-build" style={{ fontSize: 16, color: '#555555', cursor: 'pointer' }} />}
        <i className="icon_phoenix-edit_note" style={{ fontSize: 16, color: '#555555', cursor: 'pointer' }} />
      </div>
      <div style={{ position: 'absolute', bottom: iconBottom, right: 13, cursor: 'pointer', height: 20, display: 'flex', alignItems: 'center' }}>
        <img src={ExpandAllIcon} alt="Expand" style={{ width: 20, height: 20, transform: 'rotate(90deg)' }} />
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <>
      <style>{`@keyframes llm-spin{to{transform:rotate(360deg)}}`}</style>
      <div style={{
        width: 16, height: 16, borderRadius: '50%',
        border: '2px solid #e5e9f0', borderTopColor: '#6d36bf',
        animation: 'llm-spin 0.8s linear infinite', flexShrink: 0,
      }} />
    </>
  );
}

const menuItemBase = {
  display: 'flex', alignItems: 'center', gap: 4, width: '100%',
  background: 'none', border: 'none', padding: '8px', cursor: 'pointer',
  borderRadius: 4, textAlign: 'left', boxSizing: 'border-box',
};

function MoreActionsMenu({ onClose, onRestore, onRegenerate }) {
  const ref = useRef(null);
  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  return (
    <div ref={ref} style={{
      position: 'absolute', bottom: 28, left: 0, zIndex: 100,
      background: '#ffffff', borderRadius: 4,
      boxShadow: '0px 3px 14px 2px rgba(0,0,0,0.15)',
      padding: 8, width: 200,
    }}>
      <div style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.8px', color: '#cccccc', textTransform: 'uppercase', fontFamily: font, padding: '0 8px', marginBottom: 8 }}>
          Generate
        </div>
        <button onClick={onRestore} style={{ ...menuItemBase, background: '#f9f7fd' }}>
          <i className="icon_phoenix-history" style={{ fontSize: 16, color: '#6834b7', flexShrink: 0 }} />
          <span style={{ fontSize: 13, lineHeight: '16px', color: '#6834b7', fontFamily: font }}>Restore original</span>
        </button>
        <button onClick={onRegenerate} style={menuItemBase}>
          <i className="icon_phoenix-restart_alt" style={{ fontSize: 16, color: '#212121', flexShrink: 0 }} />
          <span style={{ fontSize: 13, lineHeight: '16px', color: '#212121', fontFamily: font }}>Regenerate</span>
        </button>
      </div>
      <div>
        <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.8px', color: '#cccccc', textTransform: 'uppercase', fontFamily: font, padding: '0 8px', marginBottom: 8 }}>
          Modify
        </div>
        {[
          { icon: 'icon_phoenix-mic', label: 'Change tone', hasArrow: true },
          { icon: 'icon_phoenix-short_text', label: 'Make shorter' },
          { icon: 'icon_phoenix-notes', label: 'Make longer' },
          { icon: 'icon_phoenix-spellcheck', label: 'Fix spelling and grammar' },
        ].map(({ icon, label, hasArrow }) => (
          <button key={label} style={menuItemBase}>
            <i className={icon} style={{ fontSize: 16, color: '#212121', flexShrink: 0 }} />
            <span style={{ flex: 1, fontSize: 13, lineHeight: '16px', color: '#212121', fontFamily: font }}>{label}</span>
            {hasArrow && <i className="icon_phoenix-chevron_right" style={{ fontSize: 16, color: '#212121' }} />}
          </button>
        ))}
      </div>
    </div>
  );
}

const aiBoxStyle = {
  background: '#f9f7fd',
  border: '1px solid #6d36bf',
  borderRadius: 8,
  padding: '10px 20px',
  position: 'relative',
  width: '100%',
  boxSizing: 'border-box',
  minHeight: 80,
};

export default function LLMTaskBody() {
  const [values, setValues] = useState({ taskName: '', description: '', llmModel: 'Fast', systemPrompt: '', userPrompt: '' });
  const [showOutputModal, setShowOutputModal] = useState(false);
  const [outputFields, setOutputFields] = useState([]);
  const [fieldPickerPrompt, setFieldPickerPrompt] = useState(null); // 'system' | 'user' | null
  const [generateState, setGenerateState] = useState('idle'); // 'idle' | 'generating' | 'generated'
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const set = (field) => (val) => setValues((v) => ({ ...v, [field]: val }));

  function handleGenerate() {
    setGenerateState('generating');
    setTimeout(() => setGenerateState('generated'), 2000);
  }

  function handleRegenerate() {
    setShowMoreMenu(false);
    setGenerateState('generating');
    setTimeout(() => setGenerateState('generated'), 2000);
  }

  function handleCloseGenerate() {
    setGenerateState('idle');
    setShowMoreMenu(false);
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <FormInput name="taskName" type="text" label="Task name" value={values.taskName} onChange={(e) => set('taskName')(e.target.value)} required />
      <TextArea name="description" label="Description" value={values.description} onChange={(e) => set('description')(e.target.value)} required noFloatingLabel />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FieldLabel label="LLM Model" showInfo />
        <LLMModelDropdown value={values.llmModel} onChange={set('llmModel')} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FieldLabel label="Context" showInfo />
        <AddBox onAdd={() => {}} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FieldLabel label="Input fields" showInfo />
        <AddBox onAdd={() => {}} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FieldLabel label="System prompt" required />
        <PromptTextArea value={values.systemPrompt} onChange={(e) => set('systemPrompt')(e.target.value)} placeholder="Enter prompt" height={140} showBuildIcon={false} iconBottom={13} onFieldIconClick={() => setFieldPickerPrompt('system')} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FieldLabel label="User prompt" required />
        <PromptTextArea value={values.userPrompt} onChange={(e) => set('userPrompt')(e.target.value)} placeholder="Enter prompt" height={150} showBuildIcon iconBottom={12} onFieldIconClick={() => setFieldPickerPrompt('user')} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <FieldLabel label="Output fields" showInfo />

        {generateState === 'idle' && (
          <div style={{ border: '1px solid #e5e9f0', borderRadius: 4, padding: '16px 10px', width: '100%', boxSizing: 'border-box' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <button onClick={() => setShowOutputModal(true)} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                <i className="icon_phoenix-add_circle" style={{ fontSize: 20, color: '#1976d2' }} />
                <span style={{ fontSize: 12, lineHeight: '18px', letterSpacing: '-0.24px', color: '#1976d2', fontFamily: font }}>Add</span>
              </button>
              <div style={{ width: 1, height: 16, background: '#e5e9f0', flexShrink: 0 }} />
              <button onClick={handleGenerate} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                <img src={AiWandIcon} alt="Generate" style={{ width: 20, height: 20 }} />
                <span style={{ fontSize: 12, lineHeight: '18px', letterSpacing: '-0.24px', color: '#8f8f8f', fontFamily: font }}>Generate from prompt</span>
              </button>
            </div>
          </div>
        )}

        {generateState === 'generating' && (
          <div style={aiBoxStyle}>
            <div style={{ position: 'absolute', bottom: 10, left: 20, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Spinner />
              <span style={{ fontSize: 11, color: '#212121', opacity: 0.3, fontFamily: font }}>Generating summary</span>
            </div>
          </div>
        )}

        {generateState === 'generated' && (
          <div style={aiBoxStyle}>
            <button onClick={handleCloseGenerate} style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
              <img src={CloseIcon} alt="Close" style={{ width: 24, height: 24 }} />
            </button>
            <ul style={{ margin: '0 0 28px', padding: '0 0 0 16px', fontSize: 13, lineHeight: '21px', color: '#212121', fontFamily: font }}>
              {MOCK_GENERATED_FIELDS.map((f) => <li key={f}>{f}</li>)}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
              <button onClick={handleRegenerate} style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
                <i className="icon_phoenix-restart_alt" style={{ fontSize: 16, color: '#6d36bf' }} />
                <span style={{ fontSize: 13, color: '#6d36bf', fontFamily: font }}>Regenerate</span>
              </button>
              <div style={{ width: 1, height: 13, background: '#d9d9d9', flexShrink: 0 }} />
              <div style={{ position: 'relative' }}>
                <button onClick={() => setShowMoreMenu((v) => !v)} style={{ display: 'flex', alignItems: 'center', background: 'none', border: 'none', padding: 4, cursor: 'pointer', borderRadius: '50%' }}>
                  <img src={DotsIcon} alt="More options" style={{ width: 24, height: 24 }} />
                </button>
                {showMoreMenu && (
                  <MoreActionsMenu
                    onClose={() => setShowMoreMenu(false)}
                    onRestore={handleCloseGenerate}
                    onRegenerate={handleRegenerate}
                  />
                )}
              </div>
            </div>
          </div>
        )}

        {outputFields.map((f, i) => (
          <div key={i} style={{ fontSize: 12, lineHeight: '18px', color: '#212121', fontFamily: font, padding: '4px 0' }}>
            {f.fieldName} <span style={{ color: '#8f8f8f' }}>({f.fieldType})</span>
          </div>
        ))}
      </div>

      {showOutputModal && (
        <AddOutputFieldModal
          onClose={() => setShowOutputModal(false)}
          onAdd={(field) => setOutputFields((prev) => [...prev, field])}
        />
      )}

      {fieldPickerPrompt && (
        <FieldPickerModal
          onClose={() => setFieldPickerPrompt(null)}
          onSelectField={(field) => {
            const key = fieldPickerPrompt === 'system' ? 'systemPrompt' : 'userPrompt';
            set(key)(values[key] + `{{${field}}}`);
            setFieldPickerPrompt(null);
          }}
        />
      )}
    </div>
  );
}

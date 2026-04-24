import React, { useState, useRef, useEffect } from 'react';
import Modal from '@birdeye/elemental/core/atoms/Modal/index.js';
import Button from '@birdeye/elemental/core/atoms/Button/index.js';
import Toggle from '@birdeye/elemental/core/atoms/Toggle/index.js';
import {
  blue100, gray900, gray100, gray90, gray2000, gray20, white,
} from '@birdeye/elemental/core/sass/js/colors.js';
import CloseIcon from '../../../Modules/RHSPanel/RHSPanelHeader/icons/close.svg';

const font = '"Roboto", arial, sans-serif';
const TABS = ['Fields', 'Knowledge', 'Brand', 'Industry'];

// ── Fields tab data ──────────────────────────────────────────────────────────

const SECTIONS = [
  {
    id: 'business', label: 'Business', count: 7, max: 100, defaultOpen: true,
    fields: [
      { name: 'Provider first name', description: 'Name of the business provider', source: 'Birdeye', sample: 'Raynil', anonymize: true, showInOutput: true },
      { name: 'Provider last name', description: 'Name of the business provider', source: 'Birdeye', sample: 'Kumar', anonymize: true, showInOutput: false },
      { name: 'Business category', description: 'Primary business category', source: 'Birdeye', sample: 'Food', anonymize: false, showInOutput: true },
      { name: 'Service offered', description: 'Service the customer received', source: 'Zendesk', sample: 'Consultation', anonymize: true, showInOutput: true },
      { name: 'Business hours', description: 'Operating hours of the location', source: 'Zendesk', sample: '10.00 AM - 04.00 PM', anonymize: true, showInOutput: true },
      { name: 'Location email', description: 'Primary business category', source: 'Birdeye', sample: 'xyz@business.com', anonymize: true, showInOutput: true },
      { name: 'Location phone', description: 'Service the customer received', source: 'Birdeye', sample: '+91 9829199109', anonymize: true, showInOutput: true },
    ],
  },
  { id: 'reviews', label: 'Reviews', count: 5, defaultOpen: false, fields: [] },
  { id: 'contact', label: 'Contact', count: 2, defaultOpen: false, fields: [] },
  {
    id: 'survey', label: 'Survey', count: 5, max: 100, defaultOpen: true,
    fields: [
      { name: 'Survey name', description: 'Name of the business provider', source: 'Birdeye', sample: 'Raynil', anonymize: true, showInOutput: true },
      { name: 'Survey response', description: 'Name of the business provider', source: 'Birdeye', sample: 'Kumar', anonymize: true, showInOutput: false },
      { name: 'Survey NPS', description: 'Primary business category', source: 'Birdeye', sample: 'Food', anonymize: false, showInOutput: true },
    ],
  },
  { id: 'users', label: 'Users', count: 2, defaultOpen: false, fields: [] },
  { id: 'ticketing', label: 'Ticketing', count: 6, defaultOpen: false, fields: [] },
];

// ── Brand tab data ───────────────────────────────────────────────────────────

const BRAND_ITEMS = [
  { name: 'Brand Profile', description: 'Everything about your business including description, mission statement, slogans, market positioning, products & services, competitors, and marketing goals', checked: true },
  { name: 'Target Customers', description: 'Information about your customers including audience overview, buying triggers, value propositions, and key segments', checked: false },
  { name: 'Style and Voice', description: 'Visual and writing style of your business including colors, fonts, imagery style, brand personality, tone of writing, and voice guidelines for emails, social posts, blogs, and reviews', checked: true },
  { name: 'Media', description: 'Media assets including logos, favicons, social images, and other key graphics pulled from the website', checked: false },
  { name: 'Guardrails', description: "Boundaries for AI including what it should and shouldn't say, topics to avoid, preferred phrases, and any other do's and don'ts to keep content on-brand", checked: false },
];

// ── Shared icon components ───────────────────────────────────────────────────

function CheckboxChecked() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <rect width="18" height="18" rx="2" fill={blue100} />
      <path d="M4 9L7.5 12.5L14 6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckboxUnchecked() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <rect x="0.5" y="0.5" width="17" height="17" rx="1.5" fill="white" stroke={gray2000} />
    </svg>
  );
}

function CheckboxIndeterminate() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ flexShrink: 0 }}>
      <rect width="18" height="18" rx="2" fill={blue100} />
      <path d="M5 9H13" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SortArrowUp() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 10L8 6L12 10" stroke={gray900} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronDown({ size = 16, color = gray900 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 6L8 10L12 6" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronUp({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 10L8 6L12 10" stroke={gray900} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M6 4L10 8L6 12" stroke={gray90} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InfoIcon({ color = gray90 }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="7" stroke={color} strokeWidth="1.5" />
      <path d="M8 7V11" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="5" r="0.75" fill={color} />
    </svg>
  );
}

function CloseSmallIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <path d="M4 4L12 12M12 4L4 12" stroke={gray90} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M5 2h7l4 4v12a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" fill="#e8f5e9" stroke="#388e3c" strokeWidth="1.2" />
      <path d="M12 2v4h4" stroke="#388e3c" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M7 9h6M7 12h4" stroke="#388e3c" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
      <path d="M8.5 11.5a4 4 0 005.66 0l2-2a4 4 0 00-5.66-5.66l-1 1" stroke="#c2185b" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M11.5 8.5a4 4 0 00-5.66 0l-2 2a4 4 0 005.66 5.66l1-1" stroke="#c2185b" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

// ── Fields tab ───────────────────────────────────────────────────────────────

const colStyle = {
  name: { flex: '3 1 0', minWidth: 0, paddingLeft: 4 },
  source: { flex: '1.5 1 0', minWidth: 0 },
  sample: { flex: '2 1 0', minWidth: 0 },
  anonymize: { flex: '1.5 1 0', minWidth: 0 },
  showInOutput: { flex: '2 1 0', minWidth: 0 },
};

function FieldsTableRow({ field }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${gray2000}`, minHeight: 70, overflow: 'hidden' }}>
      <div style={{ flex: '0 0 61px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CheckboxChecked />
      </div>
      <div style={{ ...colStyle.name, paddingRight: 8 }}>
        <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: gray900, fontFamily: font }}>{field.name}</div>
        <div style={{ fontSize: 12, lineHeight: '18px', color: gray100, fontFamily: font, marginTop: 2 }}>{field.description}</div>
      </div>
      <div style={colStyle.source}>
        <span style={{ fontSize: 14, lineHeight: '20px', color: gray900, fontFamily: font }}>{field.source}</span>
      </div>
      <div style={colStyle.sample}>
        <span style={{ fontSize: 14, lineHeight: '20px', color: gray900, fontFamily: font }}>{field.sample}</span>
      </div>
      <div style={{ ...colStyle.anonymize, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {field.anonymize ? <CheckboxChecked /> : <CheckboxUnchecked />}
      </div>
      <div style={{ ...colStyle.showInOutput, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {field.showInOutput ? <CheckboxChecked /> : <CheckboxUnchecked />}
      </div>
    </div>
  );
}

const TABLE_HEADER = (
  <div style={{ display: 'flex', alignItems: 'center', borderBottom: `1px solid ${gray2000}`, minHeight: 48, background: white }}>
    <div style={{ flex: '0 0 61px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CheckboxIndeterminate />
    </div>
    <div style={{ ...colStyle.name, display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: gray900, fontFamily: font, paddingRight: 8 }}>
      Name <SortArrowUp />
    </div>
    <div style={{ ...colStyle.source, display: 'flex', alignItems: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: gray900, fontFamily: font }}>
      Source <SortArrowUp />
    </div>
    <div style={{ ...colStyle.sample, fontSize: 13, fontWeight: 500, color: gray900, fontFamily: font }}>
      Sample data
    </div>
    <div style={{ ...colStyle.anonymize, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: gray900, fontFamily: font }}>
      Anonymize <InfoIcon /> <ChevronDown />
    </div>
    <div style={{ ...colStyle.showInOutput, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 13, fontWeight: 500, color: gray900, fontFamily: font }}>
      Show in output <InfoIcon /> <ChevronDown />
    </div>
  </div>
);

function FieldsSection({ section }) {
  const [open, setOpen] = useState(section.defaultOpen);
  const label = section.max
    ? `${section.label} (${section.count}/${section.max})`
    : `${section.label} (${section.count})`;

  return (
    <div>
      <div
        onClick={() => setOpen((v) => !v)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 24px', background: gray20, cursor: 'pointer',
          borderTop: `1px solid ${gray2000}`, borderBottom: `1px solid ${gray2000}`,
        }}
      >
        {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: gray900, fontFamily: font }}>
          {label}
        </span>
      </div>
      {open && section.fields.length > 0 && (
        <div>
          {TABLE_HEADER}
          {section.fields.map((field) => <FieldsTableRow key={field.name} field={field} />)}
          <div style={{ padding: '10px 24px' }}>
            <button style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}>
              <span style={{ fontSize: 14, color: blue100, fontFamily: font }}>View more</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function FieldsTab() {
  return (
    <>
      <div style={{ padding: '12px 24px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          height: 40, border: `1px solid ${gray2000}`, borderRadius: 4,
          padding: '0 12px', boxSizing: 'border-box', background: white,
        }}>
          <i className="icon_phoenix-search" style={{ fontSize: 18, color: gray90, flexShrink: 0 }} />
          <input
            placeholder="Search fields"
            style={{
              flex: 1, border: 'none', outline: 'none',
              fontSize: 14, lineHeight: '20px', letterSpacing: '-0.28px',
              color: gray900, fontFamily: font, background: 'transparent',
            }}
          />
        </div>
      </div>
      {SECTIONS.map((section) => (
        <FieldsSection key={section.id} section={section} />
      ))}
    </>
  );
}

// ── Brand tab ────────────────────────────────────────────────────────────────

function BrandTab() {
  return (
    <div style={{ padding: '8px 0' }}>
      {BRAND_ITEMS.map((item, i) => (
        <div
          key={item.name}
          style={{
            display: 'flex', alignItems: 'flex-start', gap: 16,
            padding: '16px 24px',
            borderBottom: i < BRAND_ITEMS.length - 1 ? `1px solid ${gray2000}` : 'none',
          }}
        >
          <div style={{ paddingTop: 2 }}>
            {item.checked ? <CheckboxChecked /> : <CheckboxUnchecked />}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: gray900, fontFamily: font }}>
              {item.name}
            </div>
            <div style={{ fontSize: 12, lineHeight: '18px', color: gray100, fontFamily: font, marginTop: 2 }}>
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Knowledge tab ────────────────────────────────────────────────────────────

const KB_FILES = ['Algorithm.pdf', 'Brand_junction.xls', 'Caretaker.png', 'Development.pdf', 'Food.jpeg', 'Information.pdf'];

function AddFileDropdown({ onClose, onAdd }) {
  const [showKB, setShowKB] = useState(false);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(['Brand_junction.xls']);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) onClose();
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const filtered = KB_FILES.filter((f) => f.toLowerCase().includes(search.toLowerCase()));

  function toggleFile(file) {
    setSelected((prev) => prev.includes(file) ? prev.filter((f) => f !== file) : [...prev, file]);
  }

  const menuItemStyle = (active) => ({
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    padding: '9px 12px', cursor: 'pointer', fontSize: 14, lineHeight: '20px',
    color: gray900, fontFamily: font, background: active ? gray20 : white,
    border: 'none', width: '100%', textAlign: 'left',
  });

  return (
    <div
      ref={ref}
      style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 200, display: 'flex', filter: 'drop-shadow(0px 4px 12px rgba(33,33,33,0.16))' }}
    >
      {/* Left panel */}
      <div style={{
        width: 240, background: white, borderRadius: showKB ? '4px 0 0 4px' : 4,
        border: `1px solid ${gray2000}`, overflow: 'hidden',
      }}>
        <button style={menuItemStyle(false)} onClick={onClose}>Upload</button>
        <button style={menuItemStyle(showKB)} onMouseEnter={() => setShowKB(true)}>
          Select from Knowledge base <ChevronRight />
        </button>
      </div>

      {/* Right panel */}
      {showKB && (
        <div style={{
          width: 240, background: white,
          border: `1px solid ${gray2000}`, borderLeft: 'none',
          borderRadius: '0 4px 4px 0', display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ padding: '10px 12px', borderBottom: `1px solid ${gray2000}` }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              border: `1px solid ${gray2000}`, borderRadius: 4,
              padding: '6px 10px', background: white,
            }}>
              <i className="icon_phoenix-search" style={{ fontSize: 16, color: gray90, flexShrink: 0 }} />
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search"
                style={{
                  flex: 1, border: 'none', outline: 'none',
                  fontSize: 13, lineHeight: '18px', color: gray900,
                  fontFamily: font, background: 'transparent',
                }}
              />
            </div>
          </div>
          <div style={{ maxHeight: 220, overflowY: 'auto', flex: 1 }}>
            {filtered.map((file) => {
              const checked = selected.includes(file);
              return (
                <button
                  key={file}
                  onClick={() => toggleFile(file)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '10px 12px', border: 'none',
                    background: white, cursor: 'pointer', textAlign: 'left',
                    borderBottom: `1px solid ${gray2000}`,
                  }}
                >
                  {checked ? <CheckboxChecked /> : <CheckboxUnchecked />}
                  <span style={{ fontSize: 14, lineHeight: '20px', color: gray900, fontFamily: font }}>{file}</span>
                </button>
              );
            })}
          </div>
          <div style={{ padding: '10px 12px', borderTop: `1px solid ${gray2000}`, display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="primary" label="Done" onClick={() => { onAdd(selected); onClose(); }} />
          </div>
        </div>
      )}
    </div>
  );
}

function LinkRow({ url, onRemove }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '10px 12px', border: `1px solid ${gray2000}`, borderRadius: 4,
      background: white, marginBottom: 8,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
        <LinkIcon />
        <span style={{ fontSize: 14, lineHeight: '20px', color: gray900, fontFamily: font, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {url}
        </span>
      </div>
      <button onClick={onRemove} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexShrink: 0, marginLeft: 8 }}>
        <CloseSmallIcon />
      </button>
    </div>
  );
}

function AddLinkRow({ onConfirm, onCancel }) {
  const [value, setValue] = useState('');
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      padding: '8px 12px', border: `1.5px solid ${blue100}`, borderRadius: 4,
      background: white, marginBottom: 8,
    }}>
      <LinkIcon />
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter' && value.trim()) onConfirm(value.trim()); if (e.key === 'Escape') onCancel(); }}
        placeholder="Enter URL"
        style={{
          flex: 1, border: 'none', outline: 'none',
          fontSize: 14, lineHeight: '20px', color: gray900,
          fontFamily: font, background: 'transparent',
        }}
      />
      <button onClick={onCancel} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M4 4L12 12M12 4L4 12" stroke="#e53935" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
      <button onClick={() => { if (value.trim()) onConfirm(value.trim()); }} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', flexShrink: 0 }}>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 8L6.5 11.5L13 5" stroke={blue100} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  );
}

function KnowledgeTab() {
  const [files, setFiles] = useState(['Product list.PDF']);
  const [showFileDropdown, setShowFileDropdown] = useState(false);
  const [links, setLinks] = useState(['https://www.aspendental.com/productsandservices']);
  const [addingLink, setAddingLink] = useState(false);

  function handleAddFiles(selected) {
    setFiles((prev) => [...new Set([...prev, ...selected])]);
  }

  function handleRemoveFile(index) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  function handleConfirmLink(url) {
    setLinks((prev) => [...prev, url]);
    setAddingLink(false);
  }

  function handleRemoveLink(index) {
    setLinks((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <div style={{ padding: '20px 24px', display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Files section */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: gray900, fontFamily: font }}>Files</span>
          <InfoIcon color={gray90} />
        </div>
        {files.map((file, i) => (
          <div key={file + i} style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '10px 12px', border: `1px solid ${gray2000}`, borderRadius: 4,
            background: white, marginBottom: 8,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <FileIcon />
              <span style={{ fontSize: 14, lineHeight: '20px', color: gray900, fontFamily: font }}>{file}</span>
            </div>
            <button onClick={() => handleRemoveFile(i)} style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex' }}>
              <CloseSmallIcon />
            </button>
          </div>
        ))}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <button
            onClick={() => setShowFileDropdown((v) => !v)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <i className="icon_phoenix-add_circle" style={{ fontSize: 18, color: blue100 }} />
            <span style={{ fontSize: 14, lineHeight: '20px', color: blue100, fontFamily: font }}>Add</span>
          </button>
          {showFileDropdown && (
            <AddFileDropdown
              onClose={() => setShowFileDropdown(false)}
              onAdd={handleAddFiles}
            />
          )}
        </div>
      </div>

      {/* Links section */}
      <div>
        <div style={{ marginBottom: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: gray900, fontFamily: font }}>Links</span>
        </div>
        {links.map((url, i) => (
          <LinkRow key={url + i} url={url} onRemove={() => handleRemoveLink(i)} />
        ))}
        {addingLink && (
          <AddLinkRow onConfirm={handleConfirmLink} onCancel={() => setAddingLink(false)} />
        )}
        {!addingLink && (
          <button
            onClick={() => setAddingLink(true)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}
          >
            <i className="icon_phoenix-add_circle" style={{ fontSize: 18, color: blue100 }} />
            <span style={{ fontSize: 14, lineHeight: '20px', color: blue100, fontFamily: font }}>Add</span>
          </button>
        )}
      </div>
    </div>
  );
}

// ── Industry tab ─────────────────────────────────────────────────────────────

function IndustryTab() {
  const [enabled, setEnabled] = useState(true);
  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 24px',
      borderBottom: `1px solid ${gray2000}`,
    }}>
      <div>
        <div style={{ fontSize: 14, fontWeight: 500, lineHeight: '20px', color: gray900, fontFamily: font }}>
          Industry context
        </div>
        <div style={{ fontSize: 12, lineHeight: '18px', color: gray100, fontFamily: font, marginTop: 2, maxWidth: 600 }}>
          Built-in industry expertise and compliance guidelines created by Birdeye. Enable this to send industry context along with your prompts
        </div>
      </div>
      <Toggle
        name="industryContext"
        checked={enabled}
        onChange={() => setEnabled((v) => !v)}
        className=""
      />
    </div>
  );
}

// ── Main component ───────────────────────────────────────────────────────────

export default function AddContextModal({ onClose, onAdd }) {
  const [activeTab, setActiveTab] = useState('Fields');

  return (
    <Modal
      dialogOptions={{
        isOpen: true,
        onCloseModal: onClose,
        shouldCloseOnOverlayClick: true,
        shouldCloseOnEsc: true,
        showCloseIcon: false,
        title: 'Context',
        dialogStyles: {
          content: { padding: 0, maxWidth: 1050, top: 40, height: 680, display: 'flex', flexDirection: 'column' },
        },
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 24px',
        borderBottom: `1px solid ${gray2000}`,
      }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 500, lineHeight: '24px', letterSpacing: '-0.32px', color: gray900, fontFamily: font }}>
            Context
          </div>
          <div style={{ fontSize: 12, lineHeight: '18px', color: gray100, fontFamily: font, marginTop: 2 }}>
            This is sent to the LLM to improve the accuracy and quality of responses.
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Button type="primary" label="Save" onClick={onAdd} />
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', display: 'flex', alignItems: 'center' }}
          >
            <img src={CloseIcon} alt="Close" style={{ width: 20, height: 20 }} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', alignItems: 'flex-end', borderBottom: `1px solid ${gray2000}`, padding: '0 24px' }}>
        {TABS.map((tab) => {
          const isActive = tab === activeTab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '14px 16px 12px',
                fontSize: 14, fontWeight: isActive ? 500 : 400,
                lineHeight: '20px', letterSpacing: '-0.28px',
                color: isActive ? blue100 : gray900,
                fontFamily: font,
                borderBottom: isActive ? `2px solid ${blue100}` : '2px solid transparent',
                marginBottom: -1,
              }}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        {activeTab === 'Fields' && <FieldsTab />}
        {activeTab === 'Knowledge' && <KnowledgeTab />}
        {activeTab === 'Brand' && <BrandTab />}
        {activeTab === 'Industry' && <IndustryTab />}
      </div>
    </Modal>
  );
}

import React, { useState } from 'react';
import './FieldsModal.css';

const DEFAULT_CATEGORIES = [
  {
    id: 'trigger',
    label: '1.Trigger',
    count: 4,
    fields: ['1. Review.source', '1. Review.sentiment', '1. Review.rating', '1. Review.spam', '1. Review.comment'],
  },
  {
    id: 'task1',
    label: '2.Task: Identify relevant...',
    count: 4,
    fields: ['2. Review.source', '2. Review.sentiment', '2. Review.rating', '2. identified_team'],
  },
  {
    id: 'task2',
    label: '3.Task: custom tokens',
    count: 5,
    fields: ['3. Location', '3. Language', '3. Token.a', '3. Token.b', '3. Token.c'],
  },
  {
    id: 'task3',
    label: '4.Task: Generate resp...',
    count: 2,
    fields: ['4. Response.draft', '4. Response.template'],
  },
  {
    id: 'task4',
    label: '5.Task : Send a review r...',
    count: 5,
    fields: ['5. Send.status', '5. Send.platform', '5. Send.timestamp', '5. Send.id', '5. Send.retry'],
  },
];

// The {+} icon SVG that matches the screenshot style
function VariableIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="15" height="15" rx="7.5" stroke="#1976D2" fill="#E3F2FD"/>
      <text x="8" y="11.5" textAnchor="middle" fontSize="9" fontWeight="700" fill="#1976D2" fontFamily="monospace">{'{+}'}</text>
    </svg>
  );
}

export default function FieldsModal({ isOpen, onClose, onSelect, selectedValue }) {
  const [activeTab, setActiveTab] = useState('Local');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState(DEFAULT_CATEGORIES[0].id);

  if (!isOpen) return null;

  const activeFields = DEFAULT_CATEGORIES.find(c => c.id === activeCategory)?.fields ?? [];
  const filtered = searchQuery
    ? DEFAULT_CATEGORIES.flatMap(c => c.fields).filter(f => f.toLowerCase().includes(searchQuery.toLowerCase()))
    : activeFields;

  return (
    <div className="fields-modal-overlay" onClick={onClose}>
      <div className="fields-modal" onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div className="fields-modal__header">
          <span className="fields-modal__title">Fields</span>
          <button className="fields-modal__close" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="fields-modal__tabs">
          <button
            className={`fields-modal__tab ${activeTab === 'System' ? 'active' : ''}`}
            onClick={() => setActiveTab('System')}
          >
            System
          </button>
          <button
            className={`fields-modal__tab ${activeTab === 'Local' ? 'active' : ''}`}
            onClick={() => setActiveTab('Local')}
          >
            Local
          </button>
        </div>

        {/* Search */}
        <div className="fields-modal__search-container">
          <span className="material-symbols-outlined fields-modal__search-icon">search</span>
          <input
            type="text"
            className="fields-modal__search"
            placeholder="Search"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Body */}
        <div className="fields-modal__body">
          {/* Sidebar */}
          {!searchQuery && (
            <div className="fields-modal__sidebar">
              {DEFAULT_CATEGORIES.map(cat => (
                <div
                  key={cat.id}
                  className={`fields-modal__category ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat.id)}
                >
                  <span className="fields-modal__category-label">{cat.label}</span>
                  <div className="fields-modal__category-right">
                    <span className="fields-modal__category-count">{cat.count}</span>
                    <span className="material-symbols-outlined fields-modal__category-arrow">chevron_right</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Field chips */}
          <div className={`fields-modal__content ${searchQuery ? 'fields-modal__content--full' : ''}`}>
            {filtered.map(field => (
              <button
                key={field}
                className={`fields-modal__chip ${selectedValue === field ? 'active' : ''}`}
                onClick={() => { onSelect(field); onClose(); }}
              >
                <div className="fields-modal__chip-icon">
                  <VariableIcon />
                </div>
                <span className="fields-modal__chip-label">{field}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

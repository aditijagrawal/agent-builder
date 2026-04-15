import React, { useState } from 'react';
import './AdvancedFiltersModal.css';

export default function AdvancedFiltersModal({ isOpen, onClose }) {
  const [filters, setFilters] = useState([
    { logic: 'When', field: 'Review source', operator: 'equals', value: 'Google' },
    { logic: 'or', field: 'Review source', operator: 'equals', value: 'Birdeye' }
  ]);

  if (!isOpen) return null;

  return (
    <div className="advanced-filters-overlay" onClick={onClose}>
      <div className="advanced-filters-modal" onClick={e => e.stopPropagation()}>
        <div className="advanced-filters__header">
          <h2>Advanced filters</h2>
        </div>

        <div className="advanced-filters__body">
          {filters.map((f, idx) => (
             <div className="advanced-filters__row" key={idx}>
               {idx === 0 ? (
                 <div className="advanced-filters__logic-label">When</div>
               ) : (
                 <div className="advanced-filters__logic-select">
                   <select
                     className="adv-filters__logic-select"
                     value={f.logic}
                     onChange={(e) => {}}
                   >
                     <option value="or">or</option>
                     <option value="and">and</option>
                   </select>
                   <span className="material-symbols-outlined adv-filters__logic-chevron">expand_more</span>
                 </div>
               )}

               <div className="advanced-filters__input-group">
                 <div className="advanced-filters__input-chip">
                   <span>{f.field}</span>
                   <span className="material-symbols-outlined close-icon">close</span>
                 </div>
                 <div className="advanced-filters__input-chip">
                   <span>{f.operator}</span>
                   <span className="material-symbols-outlined close-icon">close</span>
                 </div>
                 <div className="advanced-filters__input-chip">
                   <span>{f.value}</span>
                   <span className="material-symbols-outlined close-icon">close</span>
                 </div>
                 <button className="advanced-filters__trash-btn">
                   <span className="material-symbols-outlined">delete</span>
                 </button>
               </div>
             </div>
          ))}
          
          <button className="advanced-filters__add-btn">
            <span className="material-symbols-outlined">add_circle</span>
            <span>Add filter</span>
            <span className="material-symbols-outlined" style={{fontSize: 16}}>expand_more</span>
          </button>
        </div>

        <div className="advanced-filters__footer">
          <button className="advanced-filters__close-btn" onClick={onClose}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useMemo } from 'react';
import Button from '@birdeye/elemental/core/atoms/Button/index.js';
import './RHSDrawer.css';

const ALL_LOCATIONS = [
  { id: '1001', name: 'Mountain view, CA' },
  { id: '1002', name: 'Seattle, WA' },
  { id: '1003', name: 'Dallas, TX' },
  { id: '1004', name: 'Chicago, IL' },
  { id: '1008', name: 'Phoenix, AZ' },
  { id: '1014', name: 'Atlanta, GA' },
  { id: '1009', name: 'Denver, CO' },
  { id: '1015', name: 'Boston, MA' },
  { id: '1010', name: 'New York, NY' },
  { id: '1016', name: 'Philadelphia, PA' },
  { id: '1011', name: 'Austin, TX' },
  { id: '1017', name: 'San Antonio, TX' },
  { id: '1012', name: 'Portland, OR' },
  { id: '1018', name: 'San Diego, CA' },
  { id: '1013', name: 'Miami, FL' },
  { id: '1019', name: 'Dallas, TX' },
];

const SELECT_BY_OPTIONS = ['Location', 'Region', 'Division', 'City', 'Zip'];

export default function LocationsDrawer({
  selectedIds: initialSelectedIds,
  onBack,
  onSave,
}) {
  const [selectedIds, setSelectedIds] = useState(
    initialSelectedIds || ['1001', '1002', '1004', '1011']
  );
  const [search, setSearch] = useState('');
  const [selectBy, setSelectBy] = useState('Location');
  const [showSelectByDropdown, setShowSelectByDropdown] = useState(false);

  const filteredLocations = useMemo(() => {
    if (!search.trim()) return ALL_LOCATIONS;
    const q = search.toLowerCase();
    return ALL_LOCATIONS.filter(
      (loc) =>
        loc.id.includes(q) || loc.name.toLowerCase().includes(q)
    );
  }, [search]);

  const selectedCount = selectedIds.length;
  const allSelected = filteredLocations.length > 0 && filteredLocations.every((loc) => selectedIds.includes(loc.id));
  const someSelected = filteredLocations.some((loc) => selectedIds.includes(loc.id)) && !allSelected;

  const toggleLocation = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (allSelected) {
      const filteredIds = filteredLocations.map((loc) => loc.id);
      setSelectedIds((prev) => prev.filter((id) => !filteredIds.includes(id)));
    } else {
      const filteredIds = filteredLocations.map((loc) => loc.id);
      setSelectedIds((prev) => [...new Set([...prev, ...filteredIds])]);
    }
  };

  const handleSave = () => {
    const selected = ALL_LOCATIONS.filter((loc) => selectedIds.includes(loc.id));
    onSave?.(selected);
  };

  return (
    <div className="rhs-drawer">
      <div className="rhs-drawer__header">
        <div className="locations-drawer__header-left">
          <button className="rhs-drawer__icon-btn" onClick={onBack}>
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <span className="rhs-drawer__header-title">Locations</span>
        </div>
        <div className="rhs-drawer__header-actions">
          <Button theme="primary" label="Save" onClick={handleSave} />
        </div>
      </div>

      <div className="rhs-drawer__body">
        <div className="locations-drawer__select-by">
          <span className="locations-drawer__select-by-text">
            Choose the locations this agent will work for. Select by{' '}
          </span>
          <span
            className="locations-drawer__select-by-link"
            onClick={() => setShowSelectByDropdown(!showSelectByDropdown)}
          >
            {selectBy.toLowerCase()}
            <span className="material-symbols-outlined locations-drawer__select-by-chevron">expand_more</span>
          </span>
          <span className="material-symbols-outlined locations-drawer__info-icon">info</span>

          {showSelectByDropdown && (
            <div className="locations-drawer__select-by-dropdown">
              {SELECT_BY_OPTIONS.map((opt) => (
                <div
                  key={opt}
                  className={`locations-drawer__select-by-option ${opt === selectBy ? 'locations-drawer__select-by-option--active' : ''}`}
                  onClick={() => {
                    setSelectBy(opt);
                    setShowSelectByDropdown(false);
                  }}
                >
                  <span>{opt}</span>
                  {opt === selectBy && (
                    <span className="material-symbols-outlined">check</span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="locations-drawer__search">
          <span className="material-symbols-outlined locations-drawer__search-icon">search</span>
          <input
            type="text"
            className="locations-drawer__search-input"
            placeholder="Search location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="locations-drawer__list">
          {/* Select All row */}
          <div className="locations-drawer__row locations-drawer__row--header" onClick={toggleAll}>
            <span className={`locations-drawer__checkbox ${allSelected ? 'locations-drawer__checkbox--checked' : someSelected ? 'locations-drawer__checkbox--indeterminate' : ''}`}>
              {allSelected && <span className="material-symbols-outlined">check</span>}
              {someSelected && !allSelected && <span className="locations-drawer__checkbox-dash">-</span>}
            </span>
            <span className="locations-drawer__row-label">Select all</span>
            <span className="locations-drawer__row-count">{selectedCount} locations selected</span>
          </div>

          {/* Location rows */}
          {filteredLocations.map((loc) => {
            const isChecked = selectedIds.includes(loc.id);
            return (
              <div
                key={loc.id}
                className="locations-drawer__row"
                onClick={() => toggleLocation(loc.id)}
              >
                <span className={`locations-drawer__checkbox ${isChecked ? 'locations-drawer__checkbox--checked' : ''}`}>
                  {isChecked && <span className="material-symbols-outlined">check</span>}
                </span>
                <span className="locations-drawer__row-label">
                  {loc.id} - {loc.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

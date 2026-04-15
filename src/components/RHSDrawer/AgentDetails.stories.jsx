import React, { useState } from 'react';
import RHSDrawer from './RHSDrawer';
import LocationsDrawer from './LocationsDrawer';
import AdvancedFiltersModal from './AdvancedFiltersModal';
import FieldsModal from './FieldsModal';

export default {
  title: 'Agent Builder/Modules/AgentDetails',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

function StoryStage({ children, width = 1160, height = 760, dimmed = false }) {
  return (
    <div style={{ position: 'relative', width, height }}>
      {dimmed && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(33, 33, 33, 0.28)',
          }}
        />
      )}
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0 }}>{children}</div>
    </div>
  );
}

/* ─── Agent Overview Panel ─── */

function AgentOverviewStory(args) {
  const [state, setState] = useState({ ...args });
  const [showLocations, setShowLocations] = useState(false);

  const handleLocationsSave = (selectedLocations) => {
    setState((prev) => ({
      ...prev,
      locations: selectedLocations.slice(0, 3),
      moreLocationsCount: Math.max(0, selectedLocations.length - 3),
    }));
    setShowLocations(false);
  };

  return (
    <div style={{ position: 'relative', width: 1160, height: 760 }}>
      <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0 }}>
        <RHSDrawer
          {...state}
          onOpenLocations={() => setShowLocations(true)}
          onChange={(field, value) => setState((prev) => ({ ...prev, [field]: value }))}
        />
      </div>

      {showLocations && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
          <button
            type="button"
            aria-label="Close locations drawer"
            onClick={() => setShowLocations(false)}
            style={{
              position: 'absolute',
              inset: 0,
              border: 'none',
              background: 'rgba(33, 33, 33, 0.28)',
              cursor: 'pointer',
            }}
          />
          <div style={{ position: 'absolute', top: 0, right: 0, bottom: 0 }}>
            <LocationsDrawer
              selectedIds={state.locations.map((loc) => loc.id)}
              onBack={() => setShowLocations(false)}
              onSave={handleLocationsSave}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export const AgentOverviewEmpty = {
  name: 'AgentOverviewPanel — Empty',
  render: (args) => <AgentOverviewStory {...args} />,
  args: {
    agentName: '',
    goals: '',
    outcomes: '',
    locations: [],
    moreLocationsCount: 0,
  },
};

export const AgentOverviewFilled = {
  name: 'AgentOverviewPanel — Filled',
  render: (args) => <AgentOverviewStory {...args} />,
  args: {
    agentName: 'Review response agent 1',
    goals: 'Respond to customer reviews promptly and professionally, maintaining brand voice and addressing specific customer feedback.',
    outcomes: 'Improved customer satisfaction scores, faster response times, and consistent brand messaging across all review platforms.',
    locations: [
      { id: '1001', name: 'Mountain view, CA' },
      { id: '1002', name: 'Seattle, WA' },
      { id: '1004', name: 'Chicago, IL' },
    ],
    moreLocationsCount: 1,
  },
};

/* ─── LocationsDrawer ─── */

export const LocationsWithSelections = {
  name: 'LocationsDrawer — With selections',
  render: () => (
    <StoryStage dimmed>
      <LocationsDrawer
        selectedIds={['1001', '1002', '1004', '1011']}
        onBack={() => console.log('Back')}
        onSave={(selected) => console.log('Saved:', selected)}
      />
    </StoryStage>
  ),
};

export const LocationsEmpty = {
  name: 'LocationsDrawer — Empty',
  render: () => (
    <StoryStage dimmed>
      <LocationsDrawer
        selectedIds={[]}
        onBack={() => console.log('Back')}
        onSave={(selected) => console.log('Saved:', selected)}
      />
    </StoryStage>
  ),
};

/* ─── AdvancedFiltersModal ─── */

function AdvancedFiltersStory({ filters: initialFilters }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ position: 'relative', width: 900, height: 600, background: '#f5f5f5' }}>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ margin: 16, padding: '8px 16px', cursor: 'pointer' }}
        >
          Re-open Advanced Filters
        </button>
      )}
      <AdvancedFiltersModal isOpen={open} onClose={() => setOpen(false)} />
    </div>
  );
}

export const AdvancedFiltersWithConditions = {
  name: 'AdvancedFiltersModal — With conditions',
  render: () => <AdvancedFiltersStory />,
};

export const AdvancedFiltersEmptyState = {
  name: 'AdvancedFiltersModal — Empty',
  render: () => {
    const [open, setOpen] = useState(true);
    return (
      <div style={{ position: 'relative', width: 900, height: 600, background: '#f5f5f5' }}>
        {!open && (
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{ margin: 16, padding: '8px 16px', cursor: 'pointer' }}
          >
            Re-open
          </button>
        )}
        <AdvancedFiltersModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
    );
  },
};

/* ─── FieldSelectorModal ─── */

function FieldsModalStory({ selectedValue: initialValue = '', searchQuery = '' }) {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(initialValue);
  return (
    <div style={{ position: 'relative', width: 900, height: 600, background: '#f5f5f5' }}>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          style={{ margin: 16, padding: '8px 16px', cursor: 'pointer' }}
        >
          Re-open Field Selector
        </button>
      )}
      <FieldsModal
        isOpen={open}
        selectedValue={selected}
        onSelect={(field) => setSelected(field)}
        onClose={() => setOpen(false)}
      />
    </div>
  );
}

export const FieldSelectorDefault = {
  name: 'FieldSelectorModal — Default',
  render: () => <FieldsModalStory />,
};

export const FieldSelectorWithSelection = {
  name: 'FieldSelectorModal — Pre-selected field',
  render: () => <FieldsModalStory selectedValue="1. Review.sentiment" />,
};

export const FieldSelectorSearching = {
  name: 'FieldSelectorModal — Search results',
  render: () => <FieldsModalStory searchQuery="sentiment" />,
};

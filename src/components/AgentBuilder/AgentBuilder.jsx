import React, { useState, useCallback } from 'react';
import AppShell from '../AppShell/AppShell';
import LHSDrawer from '../LHSDrawer/LHSDrawer';
import FlowCanvas from '../FlowCanvas/FlowCanvas';
import RHSDrawer from '../RHSDrawer/RHSDrawer';
import TriggerConfigPanel from '../RHSDrawer/TriggerConfigPanel';
import CustomTaskPanel from '../RHSDrawer/CustomTaskPanel';
import BranchConfigPanel from '../RHSDrawer/BranchConfigPanel';
import LocationsDrawer from '../RHSDrawer/LocationsDrawer';
import './AgentBuilder.css';

const NODE_WIDTH = 400;
const START_NODE_WIDTH = 340;
const END_NODE_WIDTH = 60;
const START_NODE_ID = '__start__';
const END_NODE_ID = '__end__';

function buildFlow(nodeList, startData) {
  let y = 0;
  const nodes = [];
  const edges = [];

  // Start node (always present)
  nodes.push({
    id: START_NODE_ID,
    type: 'start',
    position: { x: 0, y },
    data: { title: startData.title, subtitle: startData.subtitle },
  });
  y += 150;

  // User-added nodes
  nodeList.forEach((item, i) => {
    const nodeId = item.id;
    const prevId = i === 0 ? START_NODE_ID : nodeList[i - 1].id;
    nodes.push({
      id: nodeId,
      type: item.flowType,
      position: { x: 0, y },
      data: { ...item.data },
    });
    edges.push({
      id: `e-${prevId}-${nodeId}`,
      source: prevId,
      target: nodeId,
      type: 'addButton',
    });
    y += 250;
  });

  // End chip (always present)
  const lastId = nodeList.length > 0 ? nodeList[nodeList.length - 1].id : START_NODE_ID;
  nodes.push({
    id: END_NODE_ID,
    type: 'end',
    position: { x: 0, y },
    data: {},
  });
  edges.push({
    id: `e-${lastId}-${END_NODE_ID}`,
    source: lastId,
    target: END_NODE_ID,
    type: 'addButton',
  });

  return { nodes, edges };
}

let nodeIdCounter = 0;
function nextId() {
  nodeIdCounter += 1;
  return `node-${nodeIdCounter}`;
}

export default function AgentBuilder({
  appTitle = 'Reviews AI',
  pageTitle = 'Review response agent  1',
  activeNavId = 'reviews',
  initialNodeList = [],
  initialNodeDetails = {},
  initialSelectedNodeId = null,
  initialDrawerOpen = false,
  initialExpandedView = false,
}) {
  const [navId, setNavId] = useState(activeNavId);
  const [nodeList, setNodeList] = useState(initialNodeList);
  const [selectedNodeId, setSelectedNodeId] = useState(initialSelectedNodeId);
  const [drawerOpen, setDrawerOpen] = useState(initialDrawerOpen);
  const [nodeDetails, setNodeDetails] = useState(initialNodeDetails);
  const [locationsDrawerOpen, setLocationsDrawerOpen] = useState(false);
  const [isExpandedView, setIsExpandedView] = useState(initialExpandedView);

  const handleDeleteNode = useCallback((nodeId) => {
    setNodeList((prev) => {
      const updated = prev.filter((n) => n.id !== nodeId);
      return updated.map((n, i) => ({
        ...n,
        data: { ...n.data, stepNumber: i + 1 },
      }));
    });
    setNodeDetails((prev) => {
      const copy = { ...prev };
      delete copy[nodeId];
      return copy;
    });
    if (selectedNodeId === nodeId) {
      setSelectedNodeId(null);
      setDrawerOpen(false);
      setIsExpandedView(false);
    }
  }, [selectedNodeId]);

  const startData = { title: pageTitle, subtitle: 'AI-powered review response agent' };
  const { nodes: rawNodes, edges } = buildFlow(nodeList, startData);

  // Inject onDelete into each user node's data
  const nodes = rawNodes.map((n) => {
    if (n.id === START_NODE_ID || n.id === END_NODE_ID) return n;
    return {
      ...n,
      data: { ...n.data, onDelete: () => handleDeleteNode(n.id) },
    };
  });

  const selectedNode = nodeList.find((n) => n.id === selectedNodeId);

  const handleDropNode = useCallback(({ type, label, description }) => {
    const id = nextId();

    // Determine flow node type and title
    let flowType = 'task';
    let title = 'Task';
    let hasAiIcon = false;

    if (type === 'trigger') {
      flowType = 'trigger';
      title = 'Trigger';
    } else if (type === 'branch') {
      // Branch and Delay from Controls section
      flowType = label === 'Delay' ? 'task' : 'branch';
      title = label;
    } else if (type === 'task') {
      flowType = 'task';
      title = 'Task';
      // AI icon only for Custom tasks
      hasAiIcon = label === 'Custom';
    }

    const newNode = {
      id,
      flowType,
      data: {
        title,
        stepNumber: null,
        description,
        subtitle: `${label}: ${description}`,
        hasAiIcon,
        hasToggle: true,
        toggleEnabled: true,
      },
    };

    setNodeList((prev) => {
      const updated = [...prev, newNode];
      // Assign step numbers
      return updated.map((n, i) => ({
        ...n,
        data: { ...n.data, stepNumber: i + 1 },
      }));
    });

    // Build default details based on node type
    let details = {};
    if (type === 'trigger') {
      details = {
        triggerName: label || '',
        description: description || '',
        conditions: [
          { field: '', operator: '', value: '' },
          { field: '', operator: '', value: '' },
          { field: '', operator: '', value: '' },
        ],
      };
    } else if (type === 'branch' && label === 'Branch') {
      details = {
        branchName: '',
        description: '',
        basedOn: 'Conditions',
        conditionGroups: [
          [{ field: '', operator: 'is equal to', value: '' }],
        ],
      };
    } else if (type === 'task' && label === 'Custom') {
      details = {
        taskName: 'Identify relevant mentions in the review',
        description: 'Extract product or service-specific feedback from the review',
        llmModel: 'Fast',
        systemPrompt: '',
        userPrompt: '',
      };
    } else {
      details = {
        agentName: description,
        goals: '',
        outcomes: '',
        locations: [],
        moreLocationsCount: 0,
      };
    }

    setNodeDetails((prev) => ({
      ...prev,
      [id]: details,
    }));
  }, []);

  const handleNodeClick = useCallback((node) => {
    if (node.type === 'end') return;
    setSelectedNodeId(node.id);
    setDrawerOpen(true);
    setIsExpandedView(false);
  }, []);

  const handleCloseDrawer = useCallback(() => {
    setDrawerOpen(false);
    setSelectedNodeId(null);
    setLocationsDrawerOpen(false);
    setIsExpandedView(false);
  }, []);

  const handleOpenLocationsDrawer = useCallback(() => {
    setLocationsDrawerOpen(true);
  }, []);

  const handleCloseLocationsDrawer = useCallback(() => {
    setLocationsDrawerOpen(false);
  }, []);

  const handleDetailChange = useCallback((field, value) => {
    setNodeDetails((prev) => ({
      ...prev,
      [selectedNodeId]: {
        ...prev[selectedNodeId],
        [field]: value,
      },
    }));
  }, [selectedNodeId]);

  const startDetails = nodeDetails[START_NODE_ID] || {
    agentName: pageTitle,
    goals: 'Respond to customer reviews promptly and professionally, maintaining brand voice and addressing specific customer feedback.',
    outcomes: 'Improved customer satisfaction scores, faster response times, and consistent brand messaging across all review platforms.',
    locations: [
      { id: '1001', name: 'Mountain view, CA' },
      { id: '1002', name: 'Seattle, WA' },
      { id: '1004', name: 'Chicago, IL' },
    ],
    moreLocationsCount: 1,
  };
  const currentDetails = selectedNodeId ? nodeDetails[selectedNodeId] : null;
  const selectedDrawerDetails = selectedNodeId === START_NODE_ID ? startDetails : currentDetails;

  const saveSelectedLocations = useCallback((selectedLocations) => {
    if (!selectedNodeId) return;

    const chips = selectedLocations.slice(0, 3);
    const moreCount = Math.max(0, selectedLocations.length - 3);

    setNodeDetails((prev) => ({
      ...prev,
      [selectedNodeId]: {
        ...prev[selectedNodeId],
        locations: chips,
        moreLocationsCount: moreCount,
      },
    }));
    setLocationsDrawerOpen(false);
  }, [selectedNodeId]);

  const renderRHSPanel = () => {
    // Start node → Agent details
    if (selectedNodeId === START_NODE_ID) {
      return (
        <RHSDrawer
          agentName={startDetails.agentName}
          goals={startDetails.goals}
          outcomes={startDetails.outcomes}
          locations={startDetails.locations}
          moreLocationsCount={startDetails.moreLocationsCount}
          onOpenLocations={handleOpenLocationsDrawer}
          onClose={handleCloseDrawer}
          onSave={handleCloseDrawer}
          onChange={(field, value) => {
            setNodeDetails((prev) => ({
              ...prev,
              [START_NODE_ID]: { ...startDetails, [field]: value },
            }));
          }}
        />
      );
    }

    if (!selectedNode || !currentDetails) return null;

    const { flowType } = selectedNode;

    // Trigger → TriggerConfigPanel
    if (flowType === 'trigger') {
      return (
        <TriggerConfigPanel
          triggerName={currentDetails.triggerName ?? ''}
          description={currentDetails.description ?? ''}
          conditions={currentDetails.conditions}
          onClose={handleCloseDrawer}
          onSave={handleCloseDrawer}
          onChange={handleDetailChange}
        />
      );
    }

    // Branch → BranchConfigPanel
    if (flowType === 'branch') {
      return (
        <BranchConfigPanel
          branchName={currentDetails.branchName ?? ''}
          description={currentDetails.description ?? ''}
          basedOn={currentDetails.basedOn || 'Conditions'}
          conditionGroups={currentDetails.conditionGroups}
          onClose={handleCloseDrawer}
          onSave={handleCloseDrawer}
          onChange={handleDetailChange}
        />
      );
    }

    // Task (Custom) → CustomTaskPanel
    if (flowType === 'task' && selectedNode.data?.hasAiIcon) {
      return (
        <CustomTaskPanel
          taskName={currentDetails.taskName ?? ''}
          description={currentDetails.description ?? ''}
          llmModel={currentDetails.llmModel || 'Fast'}
          systemPrompt={currentDetails.systemPrompt || ''}
          userPrompt={currentDetails.userPrompt || ''}
          onClose={handleCloseDrawer}
          onSave={handleCloseDrawer}
          isExpandedView={isExpandedView}
          onToggleExpandedView={() => setIsExpandedView((prev) => !prev)}
          onChange={handleDetailChange}
        />
      );
    }

    // Default task → Agent details style panel
    return (
      <RHSDrawer
        agentName={currentDetails.agentName}
        goals={currentDetails.goals}
        outcomes={currentDetails.outcomes}
        locations={currentDetails.locations || []}
        moreLocationsCount={currentDetails.moreLocationsCount || 0}
        onOpenLocations={handleOpenLocationsDrawer}
        onClose={handleCloseDrawer}
        onSave={handleCloseDrawer}
        onChange={handleDetailChange}
      />
    );
  };

  return (
    <AppShell
      appTitle={appTitle}
      pageTitle={pageTitle}
      activeNavId={navId}
      onNavChange={setNavId}
      publishDisabled
    >
      <div className="agent-builder">
        <div className="agent-builder__lhs">
          <LHSDrawer defaultTab="Create manually" triggerOpen tasksOpen={false} controlsOpen={false} />
        </div>
        <div className={`agent-builder__canvas ${drawerOpen ? 'agent-builder__canvas--with-rhs' : ''}`}>
          <FlowCanvas
            nodes={nodes}
            edges={edges}
            onNodeClick={handleNodeClick}
            onDropNode={handleDropNode}
            selectedNodeId={selectedNodeId}
            orientation="vertical"
          />
        </div>
        {drawerOpen && (
          <div className="agent-builder__rhs">
            {renderRHSPanel()}
          </div>
        )}
        {locationsDrawerOpen && selectedDrawerDetails && (
          <div className="agent-builder__overlay">
            <button
              className="agent-builder__blanket el-blanket"
              type="button"
              aria-label="Close locations drawer"
              onClick={handleCloseLocationsDrawer}
            />
            <div className="agent-builder__overlay-drawer">
              <LocationsDrawer
                selectedIds={[
                  ...(selectedDrawerDetails.locations || []).map((loc) => loc.id),
                ]}
                onBack={handleCloseLocationsDrawer}
                onSave={saveSelectedLocations}
              />
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

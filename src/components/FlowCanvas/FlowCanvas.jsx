import React, { useMemo, useCallback } from 'react';
import {
  ReactFlow,
  Handle,
  Position,
  BaseEdge,
  getStraightPath,
  ReactFlowProvider,
  useReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import StartNode from '../StartNode/StartNode';
import FlowNode from '../FlowNode/FlowNode';
import './FlowCanvas.css';

/* ─── Custom Node Wrappers ─── */
function StartNodeWrapper({ data }) {
  return (
    <div className="flow-canvas__node-center">
      <StartNode title={data.title} subtitle={data.subtitle} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function TriggerNodeWrapper({ data }) {
  return (
    <div className="flow-canvas__node-center">
      <Handle type="target" position={Position.Top} />
      <FlowNode type="trigger" {...data} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function TaskNodeWrapper({ data }) {
  return (
    <div className="flow-canvas__node-center">
      <Handle type="target" position={Position.Top} />
      <FlowNode type="task" {...data} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function BranchNodeWrapper({ data }) {
  return (
    <div className="flow-canvas__node-center">
      <Handle type="target" position={Position.Top} />
      <FlowNode type="branch" {...data} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}

function EndNodeWrapper() {
  return (
    <div className="flow-canvas__node-center">
      <Handle type="target" position={Position.Top} />
      <FlowNode type="end" />
    </div>
  );
}

/* ─── Custom Edge with Add Button ─── */
function AddButtonEdge({ id, sourceX, sourceY, targetX, targetY, style }) {
  const [edgePath, labelX, labelY] = getStraightPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} style={style} />
      <foreignObject
        width={28}
        height={28}
        x={labelX - 14}
        y={labelY - 14}
      >
        <div className="flow-canvas__edge-add-wrapper">
          <button className="flow-canvas__edge-add">
            <span className="material-symbols-outlined">add</span>
          </button>
        </div>
      </foreignObject>
    </>
  );
}

/* ─── Node & Edge Types (stable references) ─── */
const NODE_TYPES = {
  start: StartNodeWrapper,
  trigger: TriggerNodeWrapper,
  task: TaskNodeWrapper,
  branch: BranchNodeWrapper,
  end: EndNodeWrapper,
};

const EDGE_TYPES = {
  addButton: AddButtonEdge,
};

/* ─── Toolbar ─── */
function FlowCanvasToolbar({ orientation = 'vertical', onOrientationChange, onRun }) {
  return (
    <div className="flow-canvas__toolbar">
      <div className="flow-canvas__toolbar-group">
        <button
          className={`flow-canvas__toolbar-btn ${orientation === 'vertical' ? 'flow-canvas__toolbar-btn--active' : ''}`}
          onClick={() => onOrientationChange?.('vertical')}
        >
          <span className="material-symbols-outlined">arrow_downward</span>
        </button>
        <button
          className={`flow-canvas__toolbar-btn ${orientation === 'horizontal' ? 'flow-canvas__toolbar-btn--active' : ''}`}
          onClick={() => onOrientationChange?.('horizontal')}
        >
          <span className="material-symbols-outlined">arrow_forward</span>
        </button>
      </div>
      <div className="flow-canvas__toolbar-zoom">
        <span>100%</span>
        <span className="material-symbols-outlined">expand_more</span>
      </div>
      <button className="flow-canvas__toolbar-run" onClick={onRun}>
        <span className="material-symbols-outlined">play_arrow</span>
      </button>
    </div>
  );
}

/* ─── Main FlowCanvas ─── */
function FlowCanvasInner({
  nodes = [],
  edges = [],
  onNodeClick,
  onDropNode,
  orientation = 'vertical',
  onOrientationChange,
  onRun,
  selectedNodeId,
}) {
  const { screenToFlowPosition } = useReactFlow();

  const defaultEdgeOptions = useMemo(
    () => ({
      type: 'addButton',
      style: { stroke: '#ccd5e4', strokeDasharray: '4 4', strokeWidth: 1 },
    }),
    []
  );

  const handleNodeClick = useCallback(
    (event, node) => onNodeClick?.(node),
    [onNodeClick]
  );

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const handleDrop = useCallback(
    (event) => {
      event.preventDefault();
      const type = event.dataTransfer.getData('application/reactflow-type');
      const label = event.dataTransfer.getData('application/reactflow-label');
      const description = event.dataTransfer.getData('application/reactflow-description');
      if (!type) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      onDropNode?.({ type, label, description, position });
    },
    [screenToFlowPosition, onDropNode]
  );

  const styledNodes = useMemo(
    () =>
      nodes.map((n) => ({
        ...n,
        className: n.id === selectedNodeId ? 'flow-canvas__node--selected' : '',
      })),
    [nodes, selectedNodeId]
  );

  return (
    <div className="flow-canvas">
      <FlowCanvasToolbar
        orientation={orientation}
        onOrientationChange={onOrientationChange}
        onRun={onRun}
      />
      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        nodeTypes={NODE_TYPES}
        edgeTypes={EDGE_TYPES}
        defaultEdgeOptions={defaultEdgeOptions}
        onNodeClick={handleNodeClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        proOptions={{ hideAttribution: true }}
        nodesDraggable={false}
        nodesConnectable={false}
        panOnScroll
        zoomOnScroll
      />
    </div>
  );
}

export default function FlowCanvas(props) {
  return (
    <ReactFlowProvider>
      <FlowCanvasInner {...props} />
    </ReactFlowProvider>
  );
}

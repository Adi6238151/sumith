"use client";
import ReactFlow, { Background } from "reactflow";
import "reactflow/dist/style.css";

const nodes = [
  { id: "1", position: { x: 0, y: 0 }, data: { label: "AT&T Active" }, type: "default" },
  { id: "2", position: { x: 200, y: 100 }, data: { label: "Firewall" }, type: "default" },
  { id: "3", position: { x: 400, y: 0 }, data: { label: "MDF03" }, type: "default" },
];

const edges = [
  { id: "e1-2", source: "1", target: "2" },
  { id: "e2-3", source: "2", target: "3" },
];

export default function TopologyFlow() {
  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      zoomOnScroll={false}
      panOnDrag={false}
      nodesDraggable={false}
      nodesConnectable={false}
      elementsSelectable={false}
      fitView={false}
      defaultViewport={{ x: 16, y: 90, zoom: 0.75 }}
    >
      <Background gap={16} size={1} />
    </ReactFlow>
  );
}

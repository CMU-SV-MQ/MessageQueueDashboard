/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Header from "../components/Header";
import { useMemo } from "react";
import ReactFlow, { useNodesState, useEdgesState } from "reactflow";
import "reactflow/dist/style.css";
import { topics, consumerGroups, relationships } from "../data";

// Helper function to transform your data into React Flow elements
const transformDataToElements = (topics, consumerGroups, relationships) => {
  const nodes = [];
  const edges = [];

  topics.forEach((topic, index) => {
    const topicGroupHeight = (topic.partitions.length + 1) * 50;
    nodes.push({
      id: `group_${topic.id}`,
      type: "group",
      position: { x: 0, y: index * (topicGroupHeight + 20) },
      data: { label: `Topic: ${topic.id}` },
      style: { width: 250, height: topicGroupHeight },
    });

    topic.partitions.forEach((partition, pIndex) => {
      nodes.push({
        id: `${topic.id}_${partition}`,
        position: { x: 10, y: pIndex * 50 + 10 },
        data: { label: `Partition: ${partition}` },
        parentNode: `group_${topic.id}`,
        extent: "parent",
      });
    });
  });

  consumerGroups.forEach((group, index) => {
    const groupHeight = (group.consumers.length + 1) * 50;
    nodes.push({
      id: `group_${group.id}`,
      type: "group",
      position: { x: 400, y: index * (groupHeight + 20) },
      data: { label: `Consumer Group: ${group.id}` },
      style: { width: 250, height: groupHeight },
    });

    group.consumers.forEach((consumer, cIndex) => {
      nodes.push({
        id: consumer,
        position: { x: 10, y: cIndex * 50 + 10 }, // TODO: adjust relative consumer nodes position
        data: { label: `Consumer: ${consumer}` },
        parentNode: `group_${group.id}`,
        extent: "parent",
      });
    });
  });

  // Create edges for relationships
  relationships.forEach((relation) => {
    edges.push({
      id: `e${relation.consumer}-${relation.topic}-${relation.partition}`,
      source: relation.consumer,
      target: `${relation.topic}_${relation.partition}`,
      label: relation.type,
    });
  });

  return { nodes, edges };
};

export default function RelationshipView() {
  const { nodes: initialNodes, edges: initialEdges } = useMemo(
    () => transformDataToElements(topics, consumerGroups, relationships),
    []
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div>
      <Header />
      <div style={{ width: "100vw", height: "100vh", paddingLeft: "20px" }}>
        <br></br>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
        />
      </div>
    </div>
  );
}

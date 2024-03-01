/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import Header from "../components/Header";
import React, { useMemo, useEffect } from "react";
import ReactFlow, { useNodesState, useEdgesState, Handle } from "reactflow";
import "reactflow/dist/style.css";
import { topics, consumerGroups, relationships } from "../data";
import { ChakraProvider, Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import GroupNode from "../components/groupNode";

const columnXPosition = {
  topics: 100, // x position for topics column
  consumerGroups: 500, // x position for consumer groups column
};
const groupSpacing = 20; // vertical spacing between groups

const MotionBox = motion(Box);

const CustomNode = ({ data }) => {
  const isPartition = data.label.startsWith("P");
  const bgColor = isPartition ? "gray.300" : "blue.300";
  return (
    <MotionBox
      bg={bgColor}
      p={2}
      border="2px"
      borderColor="gray.400"
      borderRadius="md"
      boxShadow="base"
      layout
      initial={{ opacity: 0.5 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      style={{ position: "relative" }}
    >
      <Text fontSize="sm" textAlign="center">
        {data.label}
      </Text>
      <Handle
        type="target"
        position="left"
        id={`${data.id}_left`}
        style={{ top: "50%", borderRadius: 0, background: "#555" }} // Handles can also be styled to match
      />
      <Handle
        type="source"
        position="right"
        id={`${data.id}_right`}
        style={{ top: "50%", borderRadius: 0, background: "#555" }}
      />
    </MotionBox>
  );
};

const nodeTypes = {
  custom: CustomNode,
  group: GroupNode,
};

// Helper function to transform your data into React Flow elements
const transformDataToElements = (topics, consumerGroups, relationships) => {
  let currentTopicY = 0;
  let currentConsumerGroupY = 0;

  const nodes = [];
  const edges = [];

  topics.forEach((topic, index) => {
    const topicGroupHeight = (topic.partitions.length + 1) * 50;
    nodes.push({
      id: `group_${topic.id}`,
      type: "group",
      position: { x: columnXPosition.topics, y: currentTopicY },
      data: { label: topic.id },
      style: { height: topicGroupHeight },
    });
    currentTopicY += topicGroupHeight + groupSpacing;

    topic.partitions.forEach((partition, pIndex) => {
      nodes.push({
        id: `${topic.id}_${partition}`,
        type: "custom",
        position: { x: 10, y: pIndex * 50 + 10 },
        data: { label: partition },
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
      position: { x: columnXPosition.consumerGroups, y: currentConsumerGroupY },
      data: { label: group.id },
      style: { height: groupHeight },
    });

    currentConsumerGroupY += groupHeight + groupSpacing;

    group.consumers.forEach((consumer, cIndex) => {
      const uniqueConsumerId = `${group.id}_${consumer}`;
      nodes.push({
        id: uniqueConsumerId,
        type: "custom",
        position: { x: 10, y: cIndex * 50 + 10 },
        data: { label: consumer },
        parentNode: `group_${group.id}`,
        extent: "parent",
      });
    });
  });

  // Create edges for relationships
  relationships.forEach((relation) => {
    const edgeColor = relation.type === "stash" ? "red" : "blue";
    const sourceId = `${relation.topic}_${relation.partition}`;
    const targetId = `${relation.consumerGroup}_${relation.consumer}`;

    const edge = {
      id: `e${targetId}-${sourceId}`,
      source: sourceId,
      target: targetId,
      sourceHandle: `${sourceId}_right`,
      targetHandle: `${targetId}_left`,
      label: relation.type,
      style: { stroke: edgeColor },
    };

    console.log("Creating edge:", edge);
    edges.push(edge);
  });

  return { nodes, edges };
};

export default function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Debugging: Log the data to ensure it's being loaded correctly
  console.log("Topics:", topics);
  console.log("Consumer Groups:", consumerGroups);
  console.log("Relationships:", relationships);

  const { nodes: initialNodes, edges: initialEdges } = useMemo(() => {
    try {
      if (
        Array.isArray(topics) &&
        Array.isArray(consumerGroups) &&
        Array.isArray(relationships)
      ) {
        const elements = transformDataToElements(
          topics,
          consumerGroups,
          relationships
        );
        // Debugging: Log the transformed elements
        console.log("Transformed Elements:", elements);
        return elements;
      }
      return { nodes: [], edges: [] };
    } catch (error) {
      // Log any errors that occur during transformation
      console.error("Error transforming data:", error);
      return { nodes: [], edges: [] };
    }
  }, [topics, consumerGroups, relationships]);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges]);

  return (
    <ChakraProvider>
      <Header />
      <div style={{ width: "100vw", height: "100vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView // This can help ensure all nodes are visible within the viewport.
        />
      </div>
    </ChakraProvider>
  );
}
